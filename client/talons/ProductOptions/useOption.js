import { useCallback, useMemo, useState } from 'react';
import { useTranslations } from 'Talons/App/useTranslations';

/**
 * Talon for Option.
 *
 * @param {number} props.attribute_id the id of the option
 * @param {string} props.label the label for the option
 * @param {function} props.onSelectionChange callback handler for when the option is clicked
 * @param {string} props.selectedValue the label of the selected option
 * @param {array} props.values an array containing possible values
 */
export const useOption = props => {
    const {
        attributeId,
        label,
        onSelectionChange,
        selectedValue,
        values,
        product={},
        fromListingPage
    } = props;
    const [selection, setSelection] = useState(null);
    const { __ } = useTranslations();

    const initialSelection = useMemo(() => {
        let initialSelection = {};
        const searchValue = selection || selectedValue;
        if (searchValue) {
            initialSelection =
                values.find(value => value.label === searchValue) || {};
        }
        return initialSelection;
    }, [selectedValue, selection, values]);

    const valuesMap = useMemo(() => {
        return new Map(
            values.map(value => [value.id, value.label])
        );
    }, [values]);

    const selectedValueLabel = `Selected ${label}:`;
    const selectedValueDescription =
        selection || initialSelection.default_label || 'None';

    const handleSelectionChange = useCallback(
        selection => {
            setSelection(valuesMap.get(selection));
            if (onSelectionChange) {
                if (fromListingPage) {
                    localStorage.setItem("selectedOptions", JSON.stringify({
                        product: product.id,
                        attributeId,
                        selection
                    }))
                }
                onSelectionChange(attributeId, selection);
            }
        },
        [attributeId, onSelectionChange, valuesMap, fromListingPage, product]
    );
    return {
        handleSelectionChange,
        initialSelection,
        selectedValueLabel,
        selectedValueDescription,
        __
    };
};
