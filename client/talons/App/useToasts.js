import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useToasts = (props) => {
    const { data } = useSelector(state => state.toast);
    
    return {
        talons: data
    }
}