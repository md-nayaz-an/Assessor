import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import videoIdParser from "../utils/videoIdParser";

export default function Search (props) {


    const [url, setUrl] = useState(props.videoUrl);
    const [err, setErr] = useState(false);
    const [save, setSave] = useState(false);

    const onChange = (e) => {
        setUrl(e.target.value);
    }

    const onSearch = (e, url) => {
        e.preventDefault();
        let id = videoIdParser(url);

        if(id) {
            setErr(false);
            props.setVideoUrl(url);
            setSave(true);
        }
        else {
            setErr(true);
        }
    }

    const onSave = () => {
        props.onSave();
    }

    useEffect(() => {
        console.log(props.videoUrl);

        if(props.videoUrl !== '')
            setSave(true);
    }, [props.videoUrl])

    return(
        <form
            onSubmit={(e) => onSearch(e, url)}
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
                    InputProps={{
                        readOnly: props.edit,
                    }}
                    
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
                    onClick={(e) => onSearch(e, url)}
                >
                    Search
                </Button>
                {
                    (save) ? 
                    <Button
                        variant="contained"
                        onClick={onSave}
                    >
                        save
                    </Button>
                    :                 
                    <></>
                }
        </Grid>
        </form>
    )
}