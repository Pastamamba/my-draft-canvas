import React, { useState, useRef, useEffect } from 'react';
import { Text, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';

export const TextBox = ({ textProps, isSelected, onSelect, onChange }) => {
    const shapeRef = useRef();
    const trRef = useRef();
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(textProps.text);

    useEffect(() => {
        if (isSelected && shapeRef.current) {
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
                visible={!isEditing}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                />
            )}
            {isEditing && (
                <Html
                    divProps={{
                        style: {
                            position: 'absolute',
                            top: shapeRef.current.getAbsolutePosition().y + 'px',
                            left: shapeRef.current.getAbsolutePosition().x + 'px',
                            width: shapeRef.current.width() * shapeRef.current.scaleX() + 'px',
                            height: shapeRef.current.height() * shapeRef.current.scaleY() + 'px',
                        }
                    }}
                >
                    <textarea
                        style={{
                            width: '100%',
                            height: '100%',
                            fontSize: `12px`,
                            fontFamily: textProps.fontFamily,
                            textAlign: textProps.align,
                            lineHeight: textProps.lineHeight,
                            color: textProps.fill,
                            border: 'none',
                            padding: '0px',
                            margin: '0px',
                            overflow: 'hidden',
                            background: 'none',
                            outline: 'none',
                            resize: 'none',
                        }}
                        value={editText}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        autoFocus
                    />
                </Html>
            )}
        </>
    );
};
