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

    return (
        <React.Fragment>
            <Group
                onClick={onSelect}
                ref={shapeRef}
                x={buttonProps.x}
                y={buttonProps.y}
                draggable
                onDragEnd={(e) => {
                    onChange({ ...buttonProps, x: e.target.x(), y: e.target.y() });
                }}
                onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);

                    onChange({
                        ...buttonProps,
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * scaleX,
                        height: node.height() * scaleY,
                        rotation: node.rotation(),
                    });
                }}
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
                    keepRatio={true}
                />
            )}
        </React.Fragment>
    );
};
