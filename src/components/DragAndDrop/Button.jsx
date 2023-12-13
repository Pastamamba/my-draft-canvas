import React from 'react';
import { Rect, Text, Group } from 'react-konva';

export const Button = ({ buttonProps, isSelected, onSelect, onChange }) => {
    return (
        <Group
            onClick={onSelect}
            x={buttonProps.x}
            y={buttonProps.y}
            draggable
            onDragEnd={(e) => {
                onChange({ ...buttonProps, x: e.target.x(), y: e.target.y() });
            }}>
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
    );
};
