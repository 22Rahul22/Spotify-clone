import React from 'react';
import Header from '../../Components/Header/Header';
import './Body.css';
import { useDataLayerValue } from '../../Redux/DataLayer';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavouriteIcon from '@material-ui/icons/Favorite';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SongRow from '../../Components/SongRow/SongRow'

function Body({ spotify }) {
    const [{ discover_weekly } , dispatch] = useDataLayerValue()

    const playPlaylist = (id) => {
        spotify
            .play({
                context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
            })
            .then((res) => {
                spotify.getMyCurrentPlayingTrack().then((response) => {
                    dispatch({
                        type: "SET_ITEM",
                        item: response.item,
                    });
                    dispatch({
                        type: "SET_PLAYING",
                        playing: true,
                    });
                });
            });
    };

    const playSong = (id) => {
        spotify
            .play({
                uris: [`spotify:track:${id}`],
            })
            .then((res) => {
                spotify.getMyCurrentPlayingTrack().then((r) => {
                    dispatch({
                        type: "SET_ITEM",
                        item: r.item,
                    });
                    dispatch({
                        type: "SET_PLAYING",
                        playing: true,
                    });
                });
            });
    };

    return (
        <div className="body">
            <Header spotify={spotify} />

            <div className="body__info">
                <img src={discover_weekly.images ? discover_weekly.images[0].url : ""} alt=""/>
                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>
            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilledIcon
                        className="body__shuffle"
                        onClick={playPlaylist}
                    />
                    <FavouriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>
                {discover_weekly.tracks ? discover_weekly.tracks.items.map((item) => (
                    <SongRow playSong={playSong} track={item.track} />
                )): null}
            </div>
        </div>
    )
}

export default Body