import {useContext} from "react";
import {CanvasContext} from "./CanvasProvider.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const RightDrawerContent = () => {

    const {
        elements,
        addElement,
        updateElement,
        setSelectedId,
        selectedId,
        canvasWidth,
        canvasHeight,
        setCanvasWidth,
        setCanvasHeight
    } = useContext(CanvasContext);

    const handleWidthChange = (event) => {
        setCanvasWidth(Number(event.target.value));
    };

    const handleHeightChange = (event) => {
        setCanvasHeight(Number(event.target.value));
    };

    if(!selectedId) {
        return(
            <Box padding={2}>
                <TextField
                    label="Canvas Width"
                    type="number"
                    value={canvasWidth}
                    onChange={handleWidthChange}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Canvas Height"
                    type="number"
                    value={canvasHeight}
                    onChange={handleHeightChange}
                    margin="normal"
                    fullWidth
                />
            </Box>
        )
    }
    return(
        <h1>Selected Item</h1>
    )
}
