import { Grid, List, ListItemButton, ListItemText, styled, useTheme } from "@mui/material";
import { useRef, useState } from "react";

import Search from "./components/Search";
import Controller from "./components/Controller";
import Details from "./components/Details";

export default function Home() {
    const StyledGrid = styled(Grid)(({ theme }) => ({
        display: 'grid',
        gridAutoColumns: '1fr',
        gridAutoRows: '1fr',
        gridGap: '0.5em 0.5em',
        placeItems: 'stretch stretch',
        placeContent: 'stretch stretch',
        gridAutoFlow: 'row',
        width: '100%',
        height: "100%",
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.default,

        [theme.breakpoints.up('lg')]: {
            // Styles for lg breakpoint
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'repeat(16, 1fr)'
        },
    }));

    const theme = useTheme();

    const [videoUrl, setVideoUrl] = useState('');
    const [edit, setEdit] = useState(false);
    const [videoId, setVideoId] = useState("650090d7c042a750d6fb5aae");

    const detailsRef = useRef(null);

    const addNewMarker = (duration) => {
        if (detailsRef.current) {
            detailsRef.current.addNewMarker(duration);
        }
    };

    const onSave = () => {
        fetch('http://localhost:8000/videos/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                url: videoUrl,
                title: "1test_title",
                description: "1test_description"
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setVideoId(data.videoid);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
  
    }

    return(

        <StyledGrid>
            <Grid

                sx={{
                    backgroundColor: theme.palette.background.paper,
                    gridArea: "1 / 1 / 17 / 3",
                    overflowY: "scroll",
                    borderRadius: 1,
                    paddingRight: 0,
                }}
            >
                <List
                    sx={{
                        width: "100%",
                    }}
                >
                    <ListItemButton
                        selected={true}
                    >
                        <ListItemText
                            primary="Video 1"
                            secondary="Description"
                        />
                    </ListItemButton>
                </List>
            </Grid>

            <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                rowGap={2}

                sx={{
                    backgroundColor: theme.palette.background.paper,
                    gridArea: "1 / 3 / 17 / 10",
                    borderRadius: 1,
                }}
            >
                <Search
                    videoUrl={videoUrl}
                    setVideoUrl={setVideoUrl}
                    edit={edit}
                    setEdit={setEdit}
                    onSave={onSave}
                />

                <Controller
                    videoUrl={videoUrl}
                    addNewMarker={addNewMarker}
                />
            </Grid>
            
            <Grid
                sx={{
                    backgroundColor: theme.palette.background.default,
                    gridArea: "1 / 10 / 17 / 13",
                }}
            >
                <Details
                    ref={detailsRef}
                    videoId={videoId}
                />
            </Grid>
        </StyledGrid>
    )
}