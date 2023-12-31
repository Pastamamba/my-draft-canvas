import { useRef, useEffect, useState } from 'react';
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

    const handleTransformEnd = () => {
        const node = shapeRef.current;
        const newAttrs = {
            x: node.x(),
            y: node.y(),
            width: node.width() * node.scaleX(),
            height: node.height() * node.scaleY(),
            rotation: node.rotation()
        };
        node.scaleX(1);
        node.scaleY(1);
        onChange({ ...textProps, ...newAttrs });
    };

    return (
        <>
            <Text
                onClick={onSelect}
                onDblClick={handleDoubleClick}
                ref={shapeRef}
                {...textProps}
                draggable
                onDragEnd={(e) => onChange({ ...textProps, x: e.target.x(), y: e.target.y() })}
                onTransformEnd={handleTransformEnd}
                visible={!isEditing}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // Rajoitukset transformaatiolle
                        return newBox;
                    }}
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
