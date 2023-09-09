import { Grid, List, ListItemButton, ListItemText, useTheme } from "@mui/material"
import formattedSeconds from "../utils/formatSeconds"

export default function Marks (props) {
    const theme = useTheme();

    const onItemClick = (id) => {
        if(id === props.selected)
            props.setSelected(-1);
        else
            props.setSelected(id);
    }
    return(
        <Grid
            flexGrow={1}

            sx={{
                backgroundColor: theme.palette.background.paper,
                overflowY: "scroll",
            }}
        >
            <List>
            {
                props.markerLis.map((item, key) => {
                    return(
                    <ListItemButton
                        key={item.id}
                        selected={props.selected === item.id}
                        onClick={() => onItemClick(item.id)}
                    >
                        <ListItemText
                            primary={item.title}
                            secondary={formattedSeconds(item.markerDuration)}
                        />
                    </ListItemButton>
                )})
            }
            </List>
    </Grid>
    )
}