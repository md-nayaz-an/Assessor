import { Button, Grid, Paper } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function Controller(props) {
    
    const yref = useRef();


    const [isPaused, setIsPaused] = useState(false);
    const [elapsed, setElapsed] = useState(0);

    const handlePlay = () => {
        if(isPaused)
            setIsPaused(false);
    };

    const handlePause = () => {
        if(!isPaused)
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

    const onProgress = e => {
        setElapsed(e.playedSeconds);
    }

    const add = () => {
        props.addNewMarker(elapsed);
    }

    useEffect(() => {
    }, [elapsed])
    
    return (
        <Grid
            display="flex"
            flexDirection="column"
            alignItems="center"
            rowGap={1}
        >
            <ReactPlayer
                ref={yref}
                url={props.videoId}
                height='390px'
                width='693px'
                playing={!isPaused}
                onProgress={onProgress}
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
                <Button 
                    variant="contained"
                    onClick={add}
                >
                    <ControlPointIcon fontSize="small" sx={{marginRight: 1}}/>
                    Add Marker
                </Button>
            </Paper>
        </Grid>
    )
}