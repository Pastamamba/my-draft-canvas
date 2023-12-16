import React, { useRef, useEffect } from 'react';
import { Rect, Text, Group, Transformer } from 'react-konva';

export const Button = ({ buttonProps, isSelected, onSelect, onChange }) => {
    const shapeRef = useRef();
    const trRef = useRef();
    useEffect(() => {
        if (isSelected && shapeRef.current) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

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
        onChange({ ...buttonProps, ...newAttrs });
    };

    return (
        <React.Fragment>
            <Group
                onClick={onSelect}
                ref={shapeRef}
                x={buttonProps.x}
                y={buttonProps.y}
                draggable
                onDragEnd={(e) => onChange({ ...buttonProps, x: e.target.x(), y: e.target.y() })}
                onTransformEnd={handleTransformEnd}
            >
                <Rect
                    width={100}
                    height={30}
                    fill="blue"
                    cornerRadius={5}
                />
                <Text
                    text={buttonProps.text}
                    fontSize={15}
                    fill="white"
                    width={100}
                    height={30}
                    align="center"
                    verticalAlign="middle"
                />
            </Group>
            {isSelected && (
                <Transformer
                    ref={trRef}
                    rotateEnabled={true}
                    keepRatio={false}
                />
            )}
        </React.Fragment>
    );
};
