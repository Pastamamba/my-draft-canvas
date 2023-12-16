import {useState, useRef, useEffect} from 'react';
import { Text, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';

// TextBox component: Used for displaying and editing text elements on the canvas.
export const TextBox = ({ textProps, isSelected, onSelect, onChange }) => {
    // Refs for the text and transformer components.
    const shapeRef = useRef();
    const trRef = useRef();

    // State for managing edit mode and the text value.
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(textProps.text);

    // Effect hook to update the transformer when an element is selected.
    useEffect(() => {
        if (isSelected && shapeRef.current) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    // Function to enable edit mode on double click.
    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    // Function to handle text changes in edit mode.
    const handleInputChange = (e) => {
        setEditText(e.target.value);
    };

    // Function to apply changes and exit edit mode.
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
                // HTML wrapper for the text area to enable editing.
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
