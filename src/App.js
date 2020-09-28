import React, { useEffect } from 'react';
import './App.css';
import Login from './Layout/Login/Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import Player from './Layout/Player/Player';
import { useDataLayerValue } from "./Redux/DataLayer";

// This is the super object which will be responsible for
// any interaction between react and spotify
const spotify = new SpotifyWebApi();

function App() {

// React-hooks
  // token->use to store user token after logging in
  // redux
  const [{ token }, dispatch] = useDataLayerValue();


  useEffect(() => {
    const hash = getTokenFromUrl();
    // hash is set to empty string so that no one
    // can see the user token from address bar
    window.location.hash = "";

    // from hash access token is extracted
    let _token = hash.access_token;

    if(_token){

      //if token is present then we change the token state
      dispatch({
        type: "SET_TOKEN",
        token: _token
      })

      // This is giving the access token to the spotify token
      spotify.setAccessToken(_token);

      //It generates the user info which is going to log in
      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user,
        })

      });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      spotify.getPlaylist('37i9dQZEVXcJZyENOWUFo7').then((response => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      }))

      spotify.getMyTopArtists().then((response) => {
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        });
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

    }

  }, [token, dispatch]);

  return (
    <div className="app">
      {
        // if the token is present then it will redirect to Player
        // otherwise it will redirect to Login
        token ? (
            <Player spotify={spotify} />
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
