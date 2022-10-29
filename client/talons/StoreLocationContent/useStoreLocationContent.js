import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchStoreLocations } from "../../store/actions/storeLocations";
import { useTranslations } from 'Talons/App/useTranslations';

export const useStoreLocationContent = () => {
    const dispatch = useDispatch();
    const { storeLocations } = useSelector((state) => state.storeLocation)
    const [showStorePhoneNumber, setShowStorePhoneNumber] = useState("");
    const { __ } = useTranslations();

    useEffect(() => {
        dispatch(fetchStoreLocations())
    }, []);

    return {
        storeLocations,
        showStorePhoneNumber, 
        setShowStorePhoneNumber,
        __
    }
}