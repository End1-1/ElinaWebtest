import { useCallback, useEffect, useMemo, useState } from 'react';

const getAttributesFromOutOfStockVariants = (outOfStockVariants, valueId) => {
    let attributes = []
    outOfStockVariants.map(v => {
        const matching = !!v.attributes.find(a => a.optionId == valueId);
        if (matching) {
            attributes = [...attributes, ...v.attributes];
        }
    });
    return attributes
}
export const useSwatch = props => {
    const { onClick, valueId, variants, selectedValues, variant } = props;
    const outOfStockVariants = useMemo(
        () => variants ? variants.filter(v => v.product.quantity < 1) : [], 
    [variants]);

    const handleClick = useCallback(() => {
        onClick(valueId);
    }, [valueId, onClick]);
    const [attributes] = useState(getAttributesFromOutOfStockVariants(outOfStockVariants, valueId));
    const [disabled, setDisabled] = useState(false);
    const [currentOptionValues, setCurrentOptionValues] = useState([]);
    const values = useMemo(
        () => attributes.map(a => a.optionId).filter(v => v !== valueId)
    ,[attributes, valueId]);
    useEffect(() => {
        if(selectedValues) {
            setCurrentOptionValues(Array.from(selectedValues.values()).filter(v => v !== valueId) )
        }
    }, [selectedValues, valueId]);

    useEffect(() => {
        let tempDisabled = false
        for (let index = 0; index < values.length; index++) {
            const element = values[index];
            if (currentOptionValues.includes(element)) {
                tempDisabled = true;
                break;
            }
        }
        setDisabled(tempDisabled)
    }, [attributes, currentOptionValues, onClick, valueId, values])

    return {
        handleClick,
        disabled
    };
};
