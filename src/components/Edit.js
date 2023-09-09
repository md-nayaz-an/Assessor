import { Button, Checkbox, Grid, TextField, useTheme } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";

export default function Edit(props) {
    const theme = useTheme();

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

                value={props.markItem.title}
            />

            <TextField
                multiline

                id="summary"
                label="Summary"

                minRows={2}
                maxRows={4}
                value={props.markItem.Summary}
            />

            <TextField

                id="question"
                label="Question"

                value={props.markItem.question}
            />

            <Options
                options={props.markItem.options}
            />

        </Grid>
    )
}

function Options(props) {

    const [options, setOptions] = useState(props.options);
    const addNewOption = () => {
        setOptions(options => [
            ...options,
            {
                optionId: options.length + 1,
                option: "",
                isCorrect: false,
            }
        ])
    }
    return(
        <>
            {
                options.map((item, key) => {
                    return(
                        <Grid
                            display="flex"
                            flexDirection="row"
                            width="100%"
                            columnGap={1}
                        >
                            <TextField
                                size="small"

                                id={"option" + item.optionId}
                                label={"Option " + item.optionId}
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