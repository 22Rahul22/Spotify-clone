// This is the login url
export const authEndpoint = "https://accounts.spotify.com/authorize";

//This is the redirectURI. After user logged in then he/she
// will be redirected to this location
const redirectUri = "http://localhost:3000/";

//This is the private client id from developer.spotify.com
const clientId = "50056a812adf4120b762ddf20883c6a6"

//These are the scopes which tell what type of functionality we want
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "playlist-read-private",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

// returns an object with
// {
// access_token:''
// expires_in:''
// token_type: ''
// }
export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=')
            initial[parts[0]] = decodeURIComponent(parts[1])
            return initial
        }, {});
}
// This is login url after Authentication this will be our url
// in which we can get expiration time, access_toke, token_type
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}
&response_type=token&show_dialog=true`