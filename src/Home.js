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

    const [videoId, setVideoId] = useState('');

    const detailsRef = useRef(null);

    const addNewMarker = (duration) => {
        // Call the addNewMarker function from the child component using the ref
        if (detailsRef.current) {
            detailsRef.current.addNewMarker(duration);
        }
    };

    return(

        <StyledGrid>
            <Grid
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    gridArea: "1 / 1 / 17 / 3",
                    overflowY: "scroll",
                    borderRadius: 1,
                }}
            >
                <List>
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
                    setVideoId={setVideoId}
                />

                <Controller
                    videoId={videoId}
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
                />
            </Grid>
        </StyledGrid>
    )
}