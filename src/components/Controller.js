import { Button, ButtonGroup, Grid, Paper, Slider, useTheme } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import YouTube from "react-youtube";
import { useEffect, useRef, useState } from "react";
import formattedSeconds from "../utils/formatSeconds";

let videoElement = null;

export default function Controller(props) {
    
    const theme = useTheme();
    const yref = useRef();

    const opts = {
        height: '390',
        width: '693',
        playerVars: {
            autoplay: 0,
        },
    };

    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (videoElement) {
        // get current time
        const elapsed_seconds = videoElement.target.getCurrentTime();

        if(!isPaused)
            console.log(formattedSeconds(elapsed_seconds));

        // Pause and Play video
        if (isPaused) {
            videoElement.target.pauseVideo();
        } else {
            videoElement.target.playVideo();
        }
        }
    }, [isPaused, videoElement]);

    //get current time and video status in real time
    useEffect(() => {
        const interval = setInterval(async () => {
        if (videoElement && videoElement.target.getCurrentTime() > 0) {
            const elapsed_seconds = videoElement.target.getCurrentTime();

            if(!isPaused)
                console.log(formattedSeconds(elapsed_seconds));

            // verify video status
            if (videoElement.target.playerInfo.playerState === 1) {
            //console.log("the video is running");
            } else if (videoElement.target.playerInfo.playerState === 2) {
            //console.log("the video is paused");
            }
        }
        }, 1000);

        return () => {
        clearInterval(interval);
        };
    }, []);

    const _onReady = (event) => {
        videoElement = event;
    };


    const handlePlay = () => {
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(true);
    };

    const handlePrev = () => {
        // Implement your start logic here
        console.log("Prev");
    };

    const handleNext = () => {
        // Implement your end logic here
        console.log("Next");
    };
    
    return (
        <Grid
            display="flex"
            flexDirection="column"
            alignItems="center"
            rowGap={1}
        >
            <YouTube
                ref={yref}
                videoId={props.videoId}
                opts={opts}
                onReady={_onReady}
            />

            <Paper
                sx={{
                    padding: 1,
                    display:"flex",
                    columnGap: 1
                }}
            >
                <Button 
                    onClick={handlePrev}
                    color="primary"
                    variant="contained"
                >
                    <NavigateBeforeIcon />
                </Button>
                <Button 
                    onClick={handlePlay}
                    color="primary"
                    variant="contained"
                >
                    <PlayArrowIcon />
                </Button>
                <Button 
                    onClick={handlePause}
                    color="primary"
                    variant="contained"
                >
                    <PauseIcon />
                </Button>
                <Button 
                    onClick={handleNext}
                    color="primary"
                    variant="contained"
                >
                    <NavigateNextIcon />
                </Button>
            </Paper>

            <Paper
                sx={{
                    padding: 0,
                    display:"flex",
                    columnGap: 1
                }}
            >
                <Button variant="contained">
                    <ControlPointIcon fontSize="small" sx={{marginRight: 1}}/>
                    Add Marker
                </Button>
            </Paper>
        </Grid>
    )
}