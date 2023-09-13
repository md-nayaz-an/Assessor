import { Button, Checkbox, Grid, TextField, useTheme } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from "react";

export default function Edit(props) {
    
    const theme = useTheme();

    const [title, setTitle] = useState(props.markItem.title);
    const [summary, setSummary] = useState(props.markItem.summary);
    const [question, setQuestion] = useState(props.markItem.question);
    const [options, setOptions] = useState(props.markItem.options);

    useEffect(() => {
        setTitle(props.markItem.title);
        setSummary(props.markItem.summary);
        setQuestion(props.markItem.question);
        setOptions(props.markItem.options);

        console.log(props.markItem);
    }, [props.markItem]);
    
    return(
        <Grid
            display="flex"
            flexDirection="column"
            rowGap={2}
            minHeight="60%"
            maxHeight="60%"
            sx={{
                backgroundColor: theme.palette.background.paper,
                overflowY: "scroll",
                padding: 2,
                borderRadius: 1,
            }}
        >
            <TextField
                size="small"
                
                id="title"
                label="Title"

                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
                multiline

                id="summary"
                label="Summary"

                minRows={2}
                maxRows={4}

                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />

            <TextField
                label="Question"

                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <Options
                options={options}
                setOptions={setOptions}
            />

            <Button
                variant="contained"
            >
                Save
            </Button>
        </Grid>
    )
}

function Options(props) {

    const addNewOption = () => {
        props.setOptions(options => [
            ...options,
            {
                optionId: options.length + 1,
                option: "",
                isCorrect: false,
            }
        ])
    }

    useEffect(() => {
//        console.log(props.options);
    }, [props])

    return(
        <>
            {
                props.options.map((item, key) => {
                    return(
                        <Grid
                            display="flex"
                            flexDirection="row"
                            width="100%"
                            columnGap={1}
                        >
                            <TextField
                                size="small"

                                id={"option" + item.option}
                                label={"Option " + item.option}
                                value={item.option}

                                sx={{
                                    width: "85%"
                                }}
                            />
                            <Checkbox
                                checked={item.isCorrect}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Grid>
                    )
                })
            }

            <Button
                variant="outlined"
                sx={{
                    width: "80%"
                }}

                onClick={addNewOption}
            >
                <AddCircleOutlineIcon fontSize="small" sx={{marginRight: 1}}/>
                Add Option
            </Button>
        </>
    )
}