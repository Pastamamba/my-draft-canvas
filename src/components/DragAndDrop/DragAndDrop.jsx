import {useState, useRef, useEffect} from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {CanvasComponent} from "./CanvasComponent.jsx";
import Box from "@mui/material/Box";
import {Typography, Button as MuiButton} from "@mui/material";
import {RightDrawerContent} from "./RightDrawerContent.jsx";

export const DragAndDrop = () => {
    // State and ref for the left drawer
    const [leftOpen, setLeftOpen] = useState(true);
    const [leftDrawerWidth, setLeftDrawerWidth] = useState(240);
    const leftDragHandleRef = useRef(null);

    // State and ref for the right drawer
    const [rightOpen, setRightOpen] = useState(true);
    const [rightDrawerWidth, setRightDrawerWidth] = useState(240);
    const rightDragHandleRef = useRef(null);

    // Toggle functions for the drawers
    const toggleLeftDrawer = () => {
        setLeftOpen(!leftOpen);
    };

    const toggleRightDrawer = () => {
        setRightOpen(!rightOpen);
    };

    // Drag start handler for text elements
    const handleTextDragStart = (e) => {
        e.dataTransfer.setData("item-type", "text");
        e.dataTransfer.setData("text/plain", "New Text");
    };

    // Drag start handler for button elements
    const handleButtonDragStart = (e) => {
        e.dataTransfer.setData("item-type", "button");
    };

    // Mouse move handler for resizing the left drawer dynamically
    const handleLeftMouseMove = (e) => {
        const newWidth = e.clientX - document.body.offsetLeft;
        if (newWidth > 50 && newWidth < 300) {
            setLeftDrawerWidth(newWidth);
        }
    };

    // Mouse up handler to remove event listeners for the left drawer
    const handleLeftMouseUp = () => {
        document.removeEventListener('mousemove', handleLeftMouseMove);
        document.removeEventListener('mouseup', handleLeftMouseUp);
    };

    // Mouse down handler to add event listeners for resizing the left drawer
    const handleLeftMouseDown = () => {
        document.addEventListener('mousemove', handleLeftMouseMove);
        document.addEventListener('mouseup', handleLeftMouseUp);
    };

    // Attach event listener for resizing the left drawer
    useEffect(() => {
        const leftDragHandle = leftDragHandleRef.current;
        if (leftDragHandle) {
            leftDragHandle.addEventListener('mousedown', handleLeftMouseDown);
        }
        return () => {
            if (leftDragHandle) {
                leftDragHandle.removeEventListener('mousedown', handleLeftMouseDown);
            }
        };
    }, [handleLeftMouseDown]);

    // Mouse move handler for resizing the right drawer dynamically
    const handleRightMouseMove = (e) => {
        const newWidth = document.body.offsetWidth - e.clientX;
        if (newWidth > 50 && newWidth < 300) {
            setRightDrawerWidth(newWidth);
        }
    };

    // Mouse up handler to remove event listeners for the right drawer
    const handleRightMouseUp = () => {
        document.removeEventListener('mousemove', handleRightMouseMove);
        document.removeEventListener('mouseup', handleRightMouseUp);
    };

    // Mouse down handler to add event listeners for resizing the right drawer
    const handleRightMouseDown = () => {
        document.addEventListener('mousemove', handleRightMouseMove);
        document.addEventListener('mouseup', handleRightMouseUp);
    };

    // Attach event listener for resizing the right drawer
    useEffect(() => {
        const rightDragHandle = rightDragHandleRef.current;
        if (rightDragHandle) {
            rightDragHandle.addEventListener('mousedown', handleRightMouseDown);
        }
        return () => {
            if (rightDragHandle) {
                rightDragHandle.removeEventListener('mousedown', handleRightMouseDown);
            }
        };
    }, [handleRightMouseDown]);

    return (
        <div style={{display: 'flex'}}>
            {leftOpen && (
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={leftOpen}
                    sx={{width: leftDrawerWidth, flexShrink: 0, '& .MuiDrawer-paper': {width: leftDrawerWidth}}}
                >
                    <IconButton onClick={toggleLeftDrawer} style={{position: 'absolute', top: 0, right: 0}}>
                        <ChevronLeftIcon/>
                    </IconButton>
                    <Box sx={{overflow: 'auto', paddingTop: '48px'}}>
                        <Typography
                            sx={{
                                padding: "1em",
                                margin: "5px",
                                width: "80%",
                                justifyContent: "center",
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid black",
                                borderRadius: "0.2em",
                                '&:hover': {
                                    backgroundColor: 'grey',
                                    cursor: "pointer"
                                },
                            }}
                            draggable={true}
                            onDragStart={handleTextDragStart}
                        >Text field</Typography>

                        <MuiButton
                            variant="outlined"
                            sx={{
                                padding: "1em",
                                margin: "5px",
                                width: "94%",
                                justifyContent: "center",
                                display: "flex",
                                alignItems: "center",
                                '&:hover': {
                                    backgroundColor: 'lightgrey',
                                    cursor: "pointer"
                                },
                            }}
                            draggable={true}
                            onDragStart={handleButtonDragStart}
                        >Button</MuiButton>
                    </Box>
                    <div
                        ref={leftDragHandleRef}
                        style={{
                            width: '5px',
                            cursor: 'ew-resize',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 1000
                        }}
                    ></div>
                </Drawer>
            )}
            {!leftOpen && (
                <div style={{position: 'absolute', top: 0, left: 0, width: "50px"}}>
                    <IconButton onClick={toggleLeftDrawer}>
                        <ChevronRightIcon/>
                    </IconButton>
                </div>
            )}
            <div style={{margin: "30px"}}>
                <CanvasComponent/>
            </div>
            {rightOpen && (
                <Drawer
                    variant="persistent"
                    anchor="right"
                    open={rightOpen}
                    sx={{width: rightDrawerWidth, flexShrink: 0, '& .MuiDrawer-paper': {width: rightDrawerWidth}}}
                >
                    <IconButton onClick={toggleRightDrawer} style={{position: 'absolute', top: 0, left: 0}}>
                        <ChevronRightIcon/>
                    </IconButton>
                    <Box sx={{overflow: 'auto', paddingTop: '48px'}}>
                        <RightDrawerContent/>
                    </Box>
                    <div
                        ref={rightDragHandleRef}
                        style={{
                            width: '5px',
                            cursor: 'ew-resize',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            zIndex: 1000
                        }}
                    ></div>
                </Drawer>
            )}
            {!rightOpen && (
                <div style={{position: 'absolute', top: 0, right: 0, width: "50px"}}>
                    <IconButton onClick={toggleRightDrawer}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
            )}
        </div>
    );
};
