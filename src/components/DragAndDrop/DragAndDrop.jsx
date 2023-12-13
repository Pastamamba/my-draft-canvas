import { useState, useRef, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CanvasComponent } from "./CanvasComponent.jsx";
import Box from "@mui/material/Box";
import { Typography, Button as MuiButton } from "@mui/material";

export const DragAndDrop = () => {
    const [open, setOpen] = useState(true);
    const [drawerWidth, setDrawerWidth] = useState(240);
    const dragHandleRef = useRef(null);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleTextDragStart = (e) => {
        e.dataTransfer.setData("item-type", "text");
        e.dataTransfer.setData("text/plain", "New Text");
    };

    const handleButtonDragStart = (e) => {
        e.dataTransfer.setData("item-type", "button");
    };

    const handleMouseMove = (e) => {
        const newWidth = e.clientX - document.body.offsetLeft;
        if (newWidth > 50 && newWidth < 300) {
            setDrawerWidth(newWidth);
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = (e) => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    useEffect(() => {
        if (dragHandleRef.current) {
            dragHandleRef.current.addEventListener('mousedown', handleMouseDown);
        }

        return () => {
            if (dragHandleRef.current) {
                dragHandleRef.current.removeEventListener('mousedown', handleMouseDown);
            }
        };
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            {open && (
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={open}
                    sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth } }}
                >
                    <IconButton onClick={toggleDrawer} style={{ position: 'absolute', top: 0, right: 0 }}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <Box sx={{ overflow: 'auto', paddingTop: '48px' }}> {/* Ota huomioon ChevronLeftIconin korkeus */}
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
                        ref={dragHandleRef}
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
            {!open && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: "50px" }}>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronRightIcon />
                    </IconButton>
                </div>
            )}
            <CanvasComponent />
        </div>
    );
};
