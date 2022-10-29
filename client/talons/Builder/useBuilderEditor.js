import { useState, useEffect, useCallback, useMemo } from 'react';
import { gql } from '@apollo/client';
import getApolloClient from 'Apollo/apolloClient';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslations } from 'Talons/App/useTranslations';
import { convertItemsToTreeWithChildren } from 'Helper/convertItemsToTree';

export const useBuilderEditor = (props) => {
    const { content, contentType, id } = props;
    const [message, setMessage] = useState({});
    const [builderData, setBuilderData] = useState(false);
    const { token } = useSelector(state => state.auth);
    const state = useSelector(state => state);
    const { currentLanguage } = useSelector(state => state.shop);
    const { __ } = useTranslations();

    const fetchBuilderData = useCallback(async () => {
        const operationName = contentType == 'menu' ? 'menuBuilderData' : 'builderData';
        const GET_BUILDER_DATA = gql`
          query ${operationName} {
            ${operationName} {
                  elements
              }
          }
        `;

        const apolloClient = getApolloClient(state);
        const { data } = await apolloClient.query({
            query: GET_BUILDER_DATA,
            variables: {},
            fetchPolicy: "no-cache"
        });

        setBuilderData({
            elements: JSON.parse(data[operationName].elements)
        });

    }, [setBuilderData]);

    useEffect(() => {
        fetchBuilderData();
    }, []);

    const [screenSize, setScreenSize] = useState('desktop');
    const [showCopyFrom, setShowCopyFrom] = useState(false);
    const [isUpdatingPage, setIsUpdatingPage] = useState(false);
    const [showLayers, setShowLayers] = useState(false);
    const [showSettings, setShowSettings] = useState(true);

    const prepareRecursive = useCallback((item) => {
        delete item.showSettings;
        delete item.mouseOver;
        delete item.__typename;
        delete item.data;
        if (item.children) {
            item.children = item.children.map(prepareRecursive);
        }
        item.settings = JSON.stringify(item.settings);
        return item;
    }, []);

    const formik = useFormik({
        initialValues: content || {
            desktop: {
                name: '',
                content: []
            }
        },
        onSubmit: async (values) => {
            console.log('values', values, contentType);
            try {
                if (contentType == 'page') {
                    setIsUpdatingPage(true);
                    const apolloClient = getApolloClient(state);
                    const UPDATE_PAGE = gql`
                        mutation updatePageContent($pageId: String!, $content: [PageContentInput]) {
                            updatePageContent (pageId: $pageId, content: $content)
                        }
                    `;
                    // We don't want to change the formik value
                    const contentClone = JSON.parse(JSON.stringify(values));
                    delete contentClone.__typename;
                    const { data } = await apolloClient.mutate({
                        mutation: UPDATE_PAGE,
                        variables: {
                            pageId: id,
                            content: contentClone.map(screenContent => {
                                delete screenContent.__typename;
                                delete screenContent.contentTree;
                                screenContent.content = screenContent.content.map(element => {
                                    delete element.__typename;
                                    delete element.data;
                                    return {
                                        ...element,
                                        settings: JSON.stringify(element.settings)
                                    }
                                });
                                return screenContent;
                            })
                        }
                    });
                    setIsUpdatingPage(false);
                } else if (contentType == 'block') {
                    setIsUpdatingPage(true);
                    const apolloClient = getApolloClient(state);
                    const UPDATE_BLOCK = gql`
                        mutation updateBlockContent($blockId: String!, $content: [PageContentInput]) {
                            updateBlockContent (blockId: $blockId, content: $content)
                        }
                    `;
                    // We don't want to change the formik value
                    const contentClone = JSON.parse(JSON.stringify(values));
                    delete contentClone.__typename;
                    const { data } = await apolloClient.mutate({
                        mutation: UPDATE_BLOCK,
                        variables: {
                            blockId: id,
                            content: contentClone.map(screenContent => {
                                delete screenContent.__typename;
                                delete screenContent.contentTree;
                                screenContent.content = screenContent.content.map(element => {
                                    delete element.__typename;
                                    delete element.data;
                                    return {
                                        ...element,
                                        settings: JSON.stringify(element.settings)
                                    }
                                });
                                return screenContent;
                            })
                        }
                    });
                    setIsUpdatingPage(false);
                } else if (contentType == 'menu') {
                    setIsUpdatingPage(true);
                    const apolloClient = getApolloClient(state);
                    const UPDATE_MENU = gql`
                        mutation updateMenu($menuData: MenuDataInput) {
                            updateMenu (menuData: $menuData)
                        }
                    `;
                    // We don't want to change the formik value
                    const contentClone = JSON.parse(JSON.stringify(values));
                    delete contentClone.__typename;
                    const { data } = await apolloClient.mutate({
                        mutation: UPDATE_MENU,
                        variables: {
                            menuData: {
                                content: contentClone.map(screenContent => {
                                    delete screenContent.__typename;
                                    delete screenContent.contentTree;
                                    screenContent.content = screenContent.content.map(element => {
                                        delete element.__typename;
                                        delete element.data;
                                        delete element.settings.editSubmenu;
                                        return {
                                            ...element,
                                            settings: JSON.stringify(element.settings)
                                        }
                                    });
                                    return screenContent;
                                })
                            }
                        }
                    });
                    setIsUpdatingPage(false);
                }

            } catch (error) {
                console.log('error', error);
                setMessage({
                    type: 'error',
                    text: error.message
                });
                setIsUpdatingPage(false);
            }
            
        },
    });


    // Content of the specific screen size
    const sizeContent = useMemo(() => {
        return formik.values.find(sizeContent => sizeContent.screenSize == screenSize) ? 
            formik.values.find(sizeContent => sizeContent.screenSize == screenSize).content : 
            {};
    }, [screenSize, formik.values]);

    const sizeContentTree = useMemo(() => {
        const converted = convertItemsToTreeWithChildren(sizeContent);
        return converted && converted.length ? converted[0] : {};
    }, [sizeContent]);

    // The index of the content of currently selected size
    const sizeContentIndex = useMemo(() => {
        let screenIndex = false;
        formik.values.map((content, index) => {
            if (content.screenSize == screenSize) {
                screenIndex = index;
                return;
            }
        });
        return screenIndex !== false ? screenIndex : formik.values.length;
    }, [sizeContent, screenSize]);

    const getFieldValue = useCallback((path) => {
        const field = formik.getFieldMeta(path ? `[${sizeContentIndex}].content.${path}` : `[${sizeContentIndex}].content`);
        return field.value;
    }, [formik, sizeContentIndex]);

    const setFieldValue = useCallback((path, value) => {
        formik.setFieldValue(path ? `[${sizeContentIndex}].content.${path}` : `[${sizeContentIndex}].content`, value);
    }, [formik]);

    const setSizeContent = (content) => {
        formik.setFieldValue(`[${sizeContentIndex}].content`, content, false);
    }

    /**
     * Copy content from one screen size to another
     */
    const handleCopyFrom = useCallback((screenSize) => {
        setIsSwitchingScreenSize(true);
        const fromContent = formik.values.find(screenContent => screenContent.screenSize == screenSize);
        formik.setFieldValue(`[${sizeContentIndex}].content`, fromContent.content, false);
        setShowCopyFrom(false);
        setTimeout(() => {
            setIsSwitchingScreenSize(false);
        }, 50);
    }, [formik, setFieldValue, sizeContentIndex]);

    const handleUpdateItem = useCallback(({ item, index }) => {
        if (item.id) {
            const currentValue = getFieldValue(`${index}`);
            if (item.type == 'section') {
                const currentChildren = currentValue.children;
                if (item.settings.columns != currentChildren.length) {
                    if (item.settings.columns > currentChildren.length) {
                        const sectionsToAdd = item.settings.columns - currentChildren.length;
                        const randomId = Math.round(Math.random() * 1000);
                        Array(sectionsToAdd).fill().map(num => {
                            item.children.push({ 
                                type: 'section', 
                                id: `element-section-${randomId}`, 
                                children: [],
                                ratio: 1,
                                align: 'left',
                                direction: 'column',
                                settings: {}
                            });
                        });
                    }
                }
                
            }
            if (index) {
                const currentValue = getFieldValue(`${index}`);
                setFieldValue(`${index}`, item);
            } else {
                setFieldValue('', item);
            }
        } else {
            const parent = index;
            const randomId = Math.round(Math.random() * 1000);
            const elementItem = { 
                type: item.type, 
                id: `element-${item.type}-${randomId}`, 
                children: [],
                ratio: 1,
                align: 'left',
                direction: 'column',
                settings: item.settings
            };
            const updatedItems = formik.getFieldValue(`${parent}`);
            updatedItems.children.push(elementItem);
            // setItems(updatedItems);
            setFieldValue(`${parent}`, updatedItems);
        }
    }, [formik, getFieldValue, setFieldValue]);

    const getDraggableStyle = (isDragging, draggableStyle, item) => {
        return {
            // some basic styles to make the items look a bit nicer
            userSelect: "none",
            width: '100%',
            // change background colour if dragging
            background: isDragging ? "lightgreen" : "",
            border: '1px solid #c3c3c3',
        
            // styles we need to apply on draggables
            ...draggableStyle,
            width: item.settings && item.settings.width ? item.settings.width : '100%',
            maxWidth: item.settings && item.settings.maxWidth ? item.settings.maxWidth : 'auto',
        }
    };

    const getElementDetails = useCallback((type) => {
        console.log('Getting for ', type, builderData);
        if (!builderData) return false;
        let elementData = false;
        console.log('builderData cool', builderData);
        builderData.elements.map(group => {
            const itemInGroup = group.items.find(item => item.type == type);
            if (itemInGroup) {
                elementData = itemInGroup;
            }
        })
        return elementData;
    }, [builderData]);

    // This is just to trigger the re-render of the builder, otherwise
    // screen size changes change the sizeContentTree, but builder still shows the old data
    const [isSwitchingScreenSize, setIsSwitchingScreenSize] = useState(false);

    const switchScreenSize = useCallback((screenSize) => {
        setIsSwitchingScreenSize(true);
        if (!formik.values.find(sizeContent => sizeContent.screenSize == screenSize)) {
            formik.setValues([...formik.values, {
                screenSize,
                content: [
                    {
                        type: 'section', 
                        id: `ROOT`, 
                        children: [],
                    }
                ]
            }]);
        }
        setScreenSize(screenSize);
        setTimeout(() => {
            setIsSwitchingScreenSize(false);
        }, 50);
    }, [formik]);

    return {
        formik, 
        switchScreenSize,
        screenSize,
        isSwitchingScreenSize,
        showCopyFrom,
        builderData,
        sizeContent,
        sizeContentTree,
        getDraggableStyle,
        getElementDetails,
        handleUpdateItem,
        handleCopyFrom,
        setShowCopyFrom,
        isUpdatingPage,
        setFieldValue,
        currentLanguage,
        message,
        setSizeContent,
        showLayers, 
        setShowLayers,
        showSettings,
        setShowSettings,
        __
    }
}