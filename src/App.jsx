import {DragAndDrop} from "./components/DragAndDrop/DragAndDrop.jsx";
import {CanvasProvider} from "./components/DragAndDrop/CanvasProvider.jsx";

export const App = () => {

    return (
        <CanvasProvider>
            <DragAndDrop/>
        </CanvasProvider>
    )
}

