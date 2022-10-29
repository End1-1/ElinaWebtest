import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslations } from 'Talons/App/useTranslations';
import { fetchBlock } from 'Store/actions/block';

export const useBlock = (props) => {
    const { blockId } = props;
    const { __ } = useTranslations();

    const { data: blocks } = useSelector(state => state.block);
    const { currentLanguage } = useSelector(state => state.shop);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBlock(blockId));
    }, [blockId, currentLanguage]);

    return {
        block: blocks.find(block => block.id == blockId && block.language == currentLanguage) ? blocks.find(block => block.id == blockId && block.language == currentLanguage).data : false,
        __
    }
}