import {useContext} from "react";
import {CanvasContext} from "./CanvasProvider.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

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

    const selectedElement = elements.find(el => el.id === selectedId);

    const handleElementChange = (prop) => (event) => {
        const val = prop === "text" ? event.target.value : parseInt(event.target.value)

        if (selectedElement) {
            updateElement(selectedElement.id, {...selectedElement, [prop]: val});
        }
    };

    return (
        <Box padding={2}>
            {!selectedId ? (
                <>
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
                </>
            ) : (
                <>
                    <Typography sx={{fontSize: "12px"}}>Selected Item: {selectedId}</Typography>
                    <TextField
                        label="Text"
                        value={selectedElement?.text || ''}
                        onChange={handleElementChange('text')}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Font Size"
                        type="number"
                        value={selectedElement?.fontSize || 20}
                        onChange={handleElementChange('fontSize')}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="X Position"
                        type="number"
                        value={selectedElement?.x || 0}
                        onChange={handleElementChange('x')}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Y Position"
                        type="number"
                        value={selectedElement?.y || 0}
                        onChange={handleElementChange('y')}
                        margin="normal"
                        fullWidth
                    />
                </>
            )}
        </Box>
    );
};
