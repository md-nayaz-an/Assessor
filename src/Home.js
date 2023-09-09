import { Grid, styled, useTheme } from "@mui/material";
import { useState } from "react";

import Search from "./components/Search";
import Controller from "./components/Controller";
import Marks from "./components/Marks";

export default function Home() {
    const StyledGrid = styled(Grid)(({ theme }) => ({
        display: 'grid',
        gridAutoColumns: '1fr',
        gridAutoRows: '1fr',
        gridGap: '1em 1em',
        placeItems: 'stretch stretch',
        placeContent: 'stretch stretch',
        gridAutoFlow: 'row',
        width: '100%',
        height: "100%",
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,

        [theme.breakpoints.up('lg')]: {
            // Styles for lg breakpoint
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'repeat(16, 1fr)'
        },
    }));

    const theme = useTheme();

    const [videoId, setVideoId] = useState('');

    

    return(

        <StyledGrid>

            
            <Grid
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    gridArea: "1 / 1 / 17 / 3",
                }}
            >

            </Grid>

            <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                rowGap={2}

                sx={{
                    backgroundColor: theme.palette.background.paper,
                    gridArea: "1 / 3 / 17 / 10"
                }}
            >
                <Search
                    setVideoId={setVideoId}
                />

                <Controller
                    videoId={videoId}
                />
            </Grid>
            
            <Grid
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    gridArea: "1 / 10 / 8 / 13",
                }}
            >
                <Marks />
            </Grid>

            <Grid
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    gridArea: "8 / 10 / 17 / 13",
                }}
            >

            </Grid>
        </StyledGrid>
    )
}