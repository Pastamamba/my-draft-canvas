import { createContext, useState, useMemo, useCallback } from 'react';

export const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
    const [elements, setElements] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const [canvasWidth, setCanvasWidth] = useState(500);
    const [canvasHeight, setCanvasHeight] = useState(500);

    const addElement = useCallback((element) => {
        setElements(prevElements => [...prevElements, element]);
    }, []);

    const updateElement = useCallback((id, newProps) => {
        setElements(prevElements => prevElements.map(el => {
            if (el.id === id) {
                return { ...el, ...newProps };
            }
            return el;
        }));
    }, []);

    const removeElement = useCallback((id) => {
        setElements(prevElements => prevElements.filter(el => el.id !== id));
    }, []);

    const contextValue = useMemo(() => ({
        elements,
        addElement,
        updateElement,
        removeElement,
        setSelectedId,
        selectedId,
        canvasHeight,
        setCanvasHeight,
        canvasWidth,
        setCanvasWidth
    }), [elements, selectedId, addElement, updateElement, removeElement, canvasWidth, setCanvasWidth, canvasHeight, setCanvasHeight]);

    return (
        <CanvasContext.Provider value={contextValue}>
            {children}
        </CanvasContext.Provider>
    );
};
