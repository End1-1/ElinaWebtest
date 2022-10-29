import React from 'react';
import classes from 'Components/Block/block.module.css';
import Builder from 'Components/Builder';
import { useBlock } from 'Talons/Block/useBlock';
import RichContent from 'Components/RichContent';


const Block = (props) => {
    const { blockId } = props;

    const { block } = useBlock({
        blockId
    });

    if (!block) return null;

    const contentType = block.contentType || 'builder';

    return (
        <div className={`${classes.root} ${classes[`block-${blockId}`] || ''}`}>
            {contentType == 'builder' ? 
                <Builder contentType={'block'} id={block.id} page={block} content={block.content} /> : 
                <RichContent html={block.contentHtml} />
            }
        </div>
    );
}

export default Block;