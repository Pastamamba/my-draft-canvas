import React, { useState, useRef, useEffect } from 'react';
import { Text, Transformer } from 'react-konva';

export const TextBox = ({ textProps, isSelected, onSelect, onChange }) => {
    const shapeRef = useRef();
    const trRef = useRef();
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(textProps.text);

    useEffect(() => {
        if (isSelected && shapeRef.current) {
            // Attach transformer to the current shape
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setEditText(e.target.value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
        onChange({ ...textProps, text: editText });
    };

    return (
        <>
            <Text
                onClick={onSelect}
                onDblClick={handleDoubleClick}
                ref={shapeRef}
                {...textProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...textProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={() => {
                    // Get the current node
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // Reset the scale to prevent deformation
                    node.scaleX(1);
                    node.scaleY(1);

                    onChange({
                        ...textProps,
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * scaleX,
                        height: node.height() * scaleY,
                        rotation: node.rotation(),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    rotateEnabled={true}
                    anchorSize={7}
                    borderStrokeWidth={1.5}
                    borderStroke="black"
                    keepRatio={true}
                />
            )}
            {isEditing && (
                <input
                    style={{
                        position: 'absolute',
                        top: `${shapeRef.current.getAbsolutePosition().y}px`,
                        left: `${shapeRef.current.getAbsolutePosition().x}px`,
                        width: `${shapeRef.current.width() * shapeRef.current.scaleX()}px`,
                        border: '1px solid black',
                        padding: '5px',
                        fontSize: '18px',
                        outline: 'none',
                        zIndex: 1000
                    }}
                    type="text"
                    value={editText}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    autoFocus
                />
            )}
        </>
    );
};
