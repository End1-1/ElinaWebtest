import { useCallback } from 'react';

export const useQuantity = props => {
    const { initialValue, onValueChange, maxQuantity } = props;

    const handleDec = useCallback(() => {
        onValueChange(initialValue == 1 ? 1 : initialValue - 1);
    }, [onValueChange]);

    const handleInc = useCallback(() => {
        // Don't allow to add more than product has
        if (initialValue < parseInt(maxQuantity)) {
            onValueChange(initialValue + 1);
        }
    }, [onValueChange, maxQuantity]);

    return {
        handleDec,
        handleInc,
    }
}