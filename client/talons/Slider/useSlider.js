import { useCallback, useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSlider } from 'Store/actions/slider';

/**
 * This component will get the data from 2 sources
 * 1 . From props 'data'. This is the case for page builder for example
 * 2 . From Redux 
 */
export const useSlider = props => {
    const { id, data } = props;
    const dispatch = useDispatch();
    const { data: sliders } = useSelector(state => state.slider);
    const [loading, setLoading] = useState(false);
    const { currentLanguage } = useSelector(state => state.shop);
    // This will be used to set height and width of the slider
    const [imageDetails, setImageDetails] = useState({});

    const setSlideImageDetails = useCallback((index, details) => {
        const items = {...imageDetails}
        items[index] = details;
        setImageDetails(items);
    }, [imageDetails]);

    useEffect(() => {
        if (id && !data) {
            dispatch(fetchSlider(id));
        }
    }, [id, currentLanguage, data]);

    const naturalSlideWidth = useMemo(() => {
        const slideWidths = Object.values(imageDetails).map(details => details.width);
        // For now, just take the highest widths
        return Math.max(...slideWidths);
    }, [imageDetails]);

    const naturalSlideHeight = useMemo(() => {
        const slideHeights = Object.values(imageDetails).map(details => details.height);
        // For now, just take the highest height
        return Math.max(...slideHeights);
    }, [imageDetails]);

    return {
        slider: data || (sliders.find(slider => slider.id == id && slider.language == currentLanguage) ? sliders.find(slider => slider.id == id && slider.language == currentLanguage).data : null),
        loading,
        setSlideImageDetails,
        naturalSlideWidth,
        naturalSlideHeight
    }
}