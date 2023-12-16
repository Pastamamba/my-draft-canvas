import {useContext} from "react";
import {CanvasContext} from "./CanvasProvider.jsx";
import {Layer, Stage} from 'react-konva';
import {TextBox} from "./DrawerElements/TextBox.jsx";
import {Button} from "./DrawerElements/Button.jsx";

export const CanvasComponent = () => {
    const {
        elements,
        addElement,
        updateElement,
        setSelectedId,
        selectedId,
        canvasWidth,
        canvasHeight
    } = useContext(CanvasContext);


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

    return (
        <div style={{
            border: '1px solid grey',
            boxShadow: '5px 5px 5px 3px rgba(0, 0, 0, 0.2)',
        }}
             onDrop={handleDrop}
             onDragOver={(e) => e.preventDefault()}>
            <Stage
                width={canvasWidth}
                height={canvasHeight}
                onMouseDown={checkDeselect}>
                <Layer>
                    {elements.map((el) => {
                        if (el.type === 'text') {
                            return <TextBox key={el.id} textProps={el} isSelected={el.id === selectedId}
                                            onSelect={() => setSelectedId(el.id)}
                                            onChange={(newAttrs) => updateElement(el.id, newAttrs)}/>;
                        } else if (el.type === 'button') {
                            return <Button key={el.id} buttonProps={el} isSelected={el.id === selectedId}
                                           onSelect={() => setSelectedId(el.id)}
                                           onChange={(newAttrs) => updateElement(el.id, newAttrs)}/>;
                        }
                        return null;
                    })}
                </Layer>
            </Stage>
        </div>
    );
};
