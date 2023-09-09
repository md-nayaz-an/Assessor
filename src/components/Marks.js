import { Grid, useTheme } from "@mui/material";

export default function Marks (props) {
    const theme = useTheme();
    return(
        <Grid
            width="100%"
            height="100%"
            
            sx={{
                backgroundColor: theme.palette.background.paper,
            }}
        >
            
        </Grid>
    )
}