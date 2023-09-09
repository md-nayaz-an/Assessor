import { Grid, useTheme } from "@mui/material";

export default function Edit(props) {
    const theme = useTheme();
    return(
        <Grid
            minHeight="60%"
            sx={{
                backgroundColor: theme.palette.background.paper,
            }}
        >
            

        </Grid>
    )
}