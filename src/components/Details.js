import { Grid } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Marks from "./Marks";
import Edit from "./Edit";

const Details = forwardRef((props, ref) => {
    
    useImperativeHandle(ref, () => ({
      addNewMarker: (duration) => addNewMarker(duration),
    }));
    
    const [markerLis, setMarkerLis] = useState([]);
    const [selected, setSelected] = useState(-1);

    const addNewMarker = (duration) => {
        console.log(duration);
        setMarkerLis((prevMarkers) => [
            ...prevMarkers, 
            {
                id: prevMarkers.length + 1,
                title: "New Title " + (prevMarkers.length + 1),
                markerDuration: duration,
                summary: "",
                question: "",
                options: [],
            }
        ]);
    };
    
    useEffect(()=> {
        console.log(markerLis);
    }, [markerLis]);
    
    return(
        <Grid
            display="flex"
            flexDirection="column"
            rowGap={1}

            width="100%"
            height="100%"
        >
            <Marks
                markerLis={markerLis}
                selected={selected}
                setSelected={setSelected}
            />

            {
                (selected !== -1) && 
                <Edit 
                    markItem={markerLis[selected]}
                />
            }
        </Grid>
    )
})

export default Details;