import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const ZoomControls = ({ zoomIn, zoomOut }) => {
    return (
        <div style={{ position: 'absolute', right: '10px', top: '10px', zIndex: 100 }}>
            <IconButton onClick={zoomOut}>
                <RemoveIcon />
            </IconButton>
            <IconButton onClick={zoomIn}>
                <AddIcon />
            </IconButton>
        </div>
    );
};
