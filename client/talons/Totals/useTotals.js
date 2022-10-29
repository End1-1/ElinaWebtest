import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'Talons/App/useTranslations';

export const useTotals = (props) => {
    const { details } = useSelector(state => state.cart);
    const { __ } = useTranslations();

    return {
        cart: details,
        __
    }
}