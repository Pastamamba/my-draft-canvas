import {useContext, useState} from "react";
import {CanvasContext} from "./CanvasProvider.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const RightDrawerContent = () => {

    const [isTextIdInvalid, setIsTextIdInvalid] = useState(false);


    const {
        elements,
        updateElement,
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

    const validateTextId = (textId) => {
        const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
        return regex.test(textId);
    };

    const handleElementChange = (prop) => (event) => {
        const val = event.target.value;
        if (selectedElement) {
            if (prop === "text_id") {
                if (validateTextId(val) || val === '') {
                    updateElement(selectedElement.id, {...selectedElement, text_id: val});
                    setIsTextIdInvalid(false);
                } else {
                    setIsTextIdInvalid(true);
                }
            }
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
                    <TextField
                        label="Id"
                        value={selectedElement?.text_id || ''}
                        onChange={handleElementChange("text_id")}
                        error={isTextIdInvalid}
                        helperText={isTextIdInvalid ? "Invalid format: Must start with a letter and contain only letters, numbers, or underscores." : ""}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Text"
                        value={selectedElement?.text || ''}
                        disabled={true}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Font Size"
                        type="number"
                        value={selectedElement?.fontSize || 20}
                        disabled={true}
                        onChange={handleElementChange('fontSize')}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="X Position"
                        type="number"
                        value={selectedElement?.x || 0}
                        disabled={true}
                        onChange={handleElementChange('x')}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Y Position"
                        type="number"
                        value={selectedElement?.y || 0}
                        disabled={true}
                        onChange={handleElementChange('y')}
                        margin="normal"
                        fullWidth
                    />
                </>
            )}
        </Box>
    );
};
