import React, { useEffect } from 'react'
import './Footer.css'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import { Grid, Slider } from '@material-ui/core';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import { useDataLayerValue } from '../../Redux/DataLayer';
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

function Footer({ spotify }) {
    const [{ item, playing }, dispatch] = useDataLayerValue();

    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then((response) => {
            dispatch({
                type: "SET_PLAYING",
                playing: response.is_playing,
            });

            dispatch({
                tupe: "SET_ITEM",
                item: response.item,
            })
        })
    }, [spotify, dispatch]);

    const handlePlayPause = () => {
        if(playing) {
            spotify.pause();
            dispatch({
                type: "SET_PLAYING",
                playing: false,
            });
        }else{
            spotify.play();
            dispatch({
                type: "SET_PLAYING",
                playing:true,
            })
        }
    }

    const skipNext = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlayingTrack().then((response) => {
            console.log("Response", response.item.name)
            // console.log("item", item ? item.name : "")
            dispatch({
                type: "SET_ITEM",
                item: response.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        });
    };

    const skipPrevious = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlayingTrack().then((response) => {
            dispatch({
                type: "SET_ITEM",
                item: response.item,
            })
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            })
        })
    }

    return (
        <div className="footer">
            <div className="footer__left">
                <img
                    className="footer__albumLogo"
                    src={item?.album.images[0].url}
                    alt=""
                />
                {item ?
                (
                    <div className="footer__songInfo">
                        <h4>{item.name}</h4>
                        <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
                    </div>
                ) : (
                    <div className="footer__songInfo">
                        <h4>No song is playing</h4>
                        <p>...</p>
                    </div>
                )}
            </div>

            <div className="footer__center">
                <ShuffleIcon className="footer__green" />
                <SkipPreviousIcon onClick={skipPrevious} className="footer__icon" />
                {playing ? (
                    <PauseCircleOutlineIcon
                        fontSize="large"
                        className="footer__icon"
                        onClick={handlePlayPause}
                    />
                ) : (
                    < PlayCircleOutlineIcon
                        fontSize = "large"
                        className = "footer__icon"
                        onClick={handlePlayPause}
                    />
                )}
                <SkipNextIcon onClick={skipNext} className="footer__icon"/>
                <RepeatIcon className="footer__green"/>
            </div>

            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
