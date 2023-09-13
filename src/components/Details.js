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


    useEffect(()=> {
        fetch(`http://localhost:8000/questions/list/${props.videoId}`, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setMarkerLis(data)
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, [props.videoId]);
    
    const taddNewMarker = (duration) => {
        console.log(duration);
        setMarkerLis((prevMarkers) => [
            ...prevMarkers, 
            {
                id: prevMarkers.length + 1,
                title: "New Title " + (prevMarkers.length + 1),
                timestamp: duration,
                summary: "",
                question: "",
                options: [
                    {
                        optionId: 1,
                        option: "",
                        isCorrect: false,
                    }
                ],
            }
        ]);

        console.log(markerLis);
    };

    const addNewMarker = (duration) => {
        console.log(duration);

        fetch('http://localhost:8000/questions/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                videoid: props.videoId,
                timestamp: duration
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

                setMarkerLis((prevMarkers) => [
                    ...prevMarkers, 
                    {
                        _id: data.questionid,
                        title: "New Title " + (prevMarkers.length + 1),
                        timestamp: duration,
                        summary: "",
                        question: "",
                        options: [],
                    }
                ]);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

        

        console.log(markerLis);
    };
    
    useEffect(()=> {
        console.log({markerLis});
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
                    markItem={markerLis.find((q) => q._id === selected)}
                    videoId={props.videoId}
                />
            }
        </Grid>
    )
})

export default Details;