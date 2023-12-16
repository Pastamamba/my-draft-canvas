import { useContext, useState } from "react";
import { CanvasContext } from "./CanvasProvider.jsx";
import { Layer, Stage } from 'react-konva';
import { TextBox } from "./DrawerElements/TextBox.jsx";
import { Button as KonvaButton } from "./DrawerElements/Button.jsx";
import { ZoomControls } from "./ZoomControls.jsx";

export const CanvasComponent = () => {
    const {
        elements,
        addElement,
        updateElement,
        setSelectedId,
        canvasWidth,
        selectedId,
        canvasHeight
    } = useContext(CanvasContext);

    const [scale, setScale] = useState(1);

    const handleDrop = (e) => {
        e.preventDefault();
        const stageElem = e.target.getBoundingClientRect();
        const x = e.clientX - stageElem.left;
        const y = e.clientY - stageElem.top;
        const itemType = e.dataTransfer.getData("item-type");

        if (itemType === "text") {
            const text = e.dataTransfer.getData("text/plain");
            addElement({
                type: 'text',
                x,
                y,
                text,
                fontSize: 20,
                draggable: true,
                id: `text-${Date.now()}`
            });
        } else if (itemType === "button") {
            addElement({
                type: 'button',
                x,
                y,
                text: 'Button',
                fontSize: 20,
                draggable: true,
                id: `button-${Date.now()}`
            });
        }
    };

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId(null);
        }
    };

    const handleWheel = (e) => {
        e.evt.preventDefault();

        const stage = e.target.getStage();
        const scaleBy = 1.1;
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };

        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        setScale(newScale);

        stage.scale({ x: newScale, y: newScale });

        const newPos = {
            x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
        };
        stage.position(newPos);
        stage.batchDraw();
    };

    const zoomIn = () => {
        setScale(scale * 1.1);
    };

    const zoomOut = () => {
        setScale(scale / 1.1);
    };

    return (
        <div style={{
            border: '1px solid grey',
            boxShadow: '5px 5px 5px 3px rgba(0, 0, 0, 0.2)',
            position: "relative"
        }}
             onDrop={handleDrop}
             onDragOver={(e) => e.preventDefault()}>
            <ZoomControls zoomIn={zoomIn} zoomOut={zoomOut} />
            <Stage
                width={canvasWidth}
                height={canvasHeight}
                onMouseDown={checkDeselect}
                scaleX={scale}
                scaleY={scale}
                onWheel={handleWheel}
                draggable>
                <Layer>
                    {elements.map((el) => {
                        if (el.type === 'text') {
                            return <TextBox key={el.id} textProps={el}
                                            onSelect={() => setSelectedId(el.id)}
                                            isSelected={selectedId === el.id}
                                            onChange={(newAttrs) => updateElement(el.id, newAttrs)}/>;
                        } else if (el.type === 'button') {
                            return <KonvaButton key={el.id} buttonProps={el}
                                                onSelect={() => setSelectedId(el.id)}
                                                isSelected={selectedId === el.id}
                                                onChange={(newAttrs) => updateElement(el.id, newAttrs)}/>;
                        }
                        return null;
                    })}
                </Layer>
            </Stage>
        </div>
    );
};
