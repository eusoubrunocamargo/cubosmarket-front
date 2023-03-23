import { useDrag , useDrop } from 'react-dnd';

function DraggableImage({ preview , index , moveImage }){

    const[{ isDragging } , drag] = useDrag(() => ({
        type: 'image',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop(() => ({
        accept: 'image',
        hover(item, _monitor) {
            if (item.index === index) {
                return;
            }
            moveImage(item.index, index);
            item.index = index;
        },
    }));

    return (
        <div    
            ref={(node) => drag(drop(node))}
            className={index === 0 ? 'previewprincipal' : 'preview'}
            style={{opacity: isDragging ? 0.5 : 1}}>
                <img src={preview} alt='preview'/>
                {index === 0 && <span>principal</span>}
        </div>
    );
};

export default DraggableImage;