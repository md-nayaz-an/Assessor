import { Grid, List, ListItemButton, ListItemText, useTheme } from "@mui/material"
import formattedSeconds from "../utils/formatSeconds"

export default function Marks (props) {
    const theme = useTheme();

    const onItemClick = (id) => {
        console.log(id);
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
                borderRadius: 1,
            }}
        >
            <List>
            {
                props.markerLis.map((item, key) => {
                    return(
                    <ListItemButton
                        key={item.id}
                        selected={props.selected === item.id}
                        onClick={() => onItemClick(item._id)}
                    >
                        <ListItemText
                            primary={item.title}
                            secondary={formattedSeconds(item.timestamp)}
                        />
                    </ListItemButton>
                )})
            }
            </List>
    </Grid>
    )
}