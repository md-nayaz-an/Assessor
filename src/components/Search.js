import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import videoIdParser from "../utils/videoIdParser";

export default function Search (props) {


    const [url, setUrl] = useState('');
    const [err, setErr] = useState(false);

    const onChange = (e) => {
        setUrl(e.target.value);
    }

    const onSubmit = (e, url) => {
        e.preventDefault();
        let id = videoIdParser(url);

        if(id) {
            setErr(false);
            props.setVideoId(url);
        }
        else {
            setErr(true);
        }
    }
    return(
        <form
            onSubmit={props.onSubmit}
            style={{
                width: "100%"
            }}
        >
        <Grid
            display="flex"
            alignItems="center"
            justifyContent="center"
            columnGap={1}

            width="100%"
        >
                <TextField
                    id="url"
                    size="small"
                    label="YouTube URL"
                    placeholder="Paste the YouTube URL"
                    
                    onChange={onChange}
                    value={url}

                    error={err}
                    helperText={err ? "Invalid URL" : ""}

                    sx={{
                        width: "50%"
                    }}
                />

                <Button
                    variant="contained"
                    onClick={(e) => onSubmit(e, url)}
                >
                    Search
                </Button>
        </Grid>
        </form>
    )
}