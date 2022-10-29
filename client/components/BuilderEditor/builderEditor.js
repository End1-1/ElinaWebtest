import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useBuilderEditor } from 'Talons/Builder/useBuilderEditor';
import Elements from './elements';
import Settings from './settings';
import { Editor, Frame, Element } from "@craftjs/core";
import { Layers } from "@craftjs/layers"
import classes from './builderEditor.module.css';
import Section from 'Components/Section';
// import { Button } from './Elements/button';
import RichContent from 'Components/RichContent';
import Button from 'Components/Button';
import { Container } from './Elements/container';
import { ContainerElement } from './Elements/containerElement';
import { LinkWithSubmenu } from './Elements/linkWithSubmenu';
import { Text } from './Elements/text';
import Slider from 'Components/Slider';
import SocialIcons from 'Components/SocialIcons';
import Logo from 'Components/Logo';
import Block from 'Components/Block';
import ProductSlider from 'Components/ProductSlider';
import TestimonialSlider from 'Components/TestimonialSlider';
import BlogPostsWidget from 'Components/BlogPostsWidget';
import Banner from 'Components/Banner';
import Image from 'Components/Image';
import NewsletterForm from 'Components/NewsletterForm';
import Faq from 'Components/Faq';
import { Default } from './Elements/default';
import { RenderNode } from './renderNode';
import { Viewport } from './viewport';
import ScreenSizes from './screenSizes';
import Loading from './loading';
import Icon from './icon';
// There are cases, when element can be used directly, and there are
// cases, when a wrapper for builder should be used
import CategoryList from '../BuilderEditor/Elements/CategoryList/preview';
import ProductList from '../BuilderEditor/Elements/ProductList/preview';
import './styles.css';

const BuilderEditor = (props) => {
    const { setEditorEnabled, contentType } = props;
    const {
        formik,
        switchScreenSize,
        isSwitchingScreenSize,
        screenSize,
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
    } = useBuilderEditor(props);

    const elementComponentMap = useMemo(() => {
        if (!builderData) return {};
        let map = {};
        builderData.elements.map(group => {
            group.items.map(item => {
                if (item.type == 'section') {
                    map[item.type] = ContainerElement;
                } else if (['pageLink', 'categoryLink'].includes(item.type)) {
                    map[item.type] = LinkWithSubmenu;
                } else {
                    map[item.type] = Default;
                }
            })
        })
        return map;
    }, [builderData]);

    const elementComponentMapReal = useMemo(() => {
        if (!builderData) return {};
        let map = {};
        builderData.elements.map(group => {
            group.items.map(item => {
                if (item.type == 'button') {
                    map[item.type] = Button;
                } else if (item.type == 'text') {
                    map[item.type] = Text;
                } else if (item.type == 'textHtmlBlock') {
                    map[item.type] = RichContent;
                } else if (item.type == 'section') {
                    map[item.type] = ContainerElement;
                } else if (item.type == 'imageSlider') {
                    map[item.type] = Slider;
                } else if (item.type == 'socialIcons') {
                    map[item.type] = SocialIcons;
                } else if (item.type == 'testimonials') {
                    map[item.type] = TestimonialSlider;
                } else if (item.type == 'productSlider') {
                    map[item.type] = ProductSlider;
                } else if (item.type == 'productList') {
                    map[item.type] = ProductList;
                } else if (item.type == 'blogPosts') {
                    map[item.type] = BlogPostsWidget;
                } else if (item.type == 'newsletterForm') {
                    map[item.type] = NewsletterForm;
                } else if (item.type == 'faq') {
                    map[item.type] = Faq;
                } else if (item.type == 'logo') {
                    map[item.type] = Logo;
                } else if (item.type == 'block') {
                    map[item.type] = Block;
                } else if (item.type == 'categoryList') {
                    map[item.type] = CategoryList;
                } else if (item.type == 'banner') {
                    map[item.type] = Banner;
                } else if (item.type == 'image') {
                    map[item.type] = Image;
                } else {
                    map[item.type] = Default;
                }
            })
        })
        return map;
    }, [builderData]);

    const elementDefaultSettings = useMemo(() => {
        if (!builderData) return {};
        let map = {};
        builderData.elements.map(group => {
            group.items.map(item => {
                // We use type + id as identifier, because for example
                // for category/page links type is not unique
              const currentItem = (item.type && item.id) ? (item.type + '#' + item.id) : (item?.identifier)
              map[currentItem] = item.defaultSettings;
            })
        })
        return map;
    }, [builderData]);

    const getItemContent = useCallback((item, index, isMain = false, params = { snapshot: {} }) => {
        if (item.type == 'section') {
            let containerProps = {
                color: { r: 0, g: 0, b: 0, a: 1 },
                height: contentType == 'menu' ? '50px' : '300px'
            };
            if (contentType == 'menu') {
                containerProps = {
                    ...containerProps,
                    id: item.id || '',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }
            return (
                <Element
                    canvas
                    is={Container}
                    color={{ r: 0, g: 0, b: 0, a: 1 }}
                    height="300px"
                    width="100%"
                    {...containerProps}
                    // isMenuCanvas will help us don't allow elements to be dropped to main menu section
                    // besides the categoryLink, pageLink, etc...
                    custom={{ elementType: 'section', isMenuCanvas: contentType == 'main' && isMain }}
                    {...item.settings}
                >
                    {Array.isArray(item.children) && item.children.length > 0 ? item.children.map((child, childIndex) => {
                        return getItemContent(child, `${index ? index + '.' : ''}children[${childIndex}]`, false, {});
                    }) : null}
                </Element>
            );
        } else {
            let content = null;
            if (item.type == 'imageSlider') {
                if (item.settings.sliderId) {
                    content = <Default key={item.id} elementType={'imageSlider'} {...item.settings} />;
                } else {
                    content = <div>Image Slider</div>
                }
            } else if (item.type == 'blogPosts') {
                content = <BlogPostsWidget count={item.settings.count} visibleItems={item.settings.visibleItems || 2} />;
            } else if (['categoryLink', 'pageLink'].includes(item.type)) {
                content = <LinkWithSubmenu elementType={item.type} {...item.settings} submenuChildren={item.children} />;
            } else if (['textHtmlBlock', 'categoryList', 'banner', 'productList', 'socialIcons', 'text', 'logo', 'block', 'image', 'testimonials', 'faq', 'newsletterForm', 'button', 'productSlider'].includes(item.type)) {
                content = <Default key={item.id} elementType={item.type} {...item.settings} />;
            }
            return content;
        }

    }, [formik.values, sizeContentTree, screenSize]);

    const [content, setContent] = useState(false);

    useEffect(() => {
        if (content && content.length) {
            setSizeContent(content);
        }
    }, [content]);

    // We can't do anything until builder data is fetched
    if (builderData == false) {
        return true;
    }

    // This is just to trigger the re-render of the builder, otherwise
    // screen size changes change the sizeContentTree, but builder still shows the old data
    if (isSwitchingScreenSize) {
        // Showing preloader will be a good idea
        return null;
    }

    return (
        <Editor
            resolver={elementComponentMap}
            builderData={builderData}
            elementComponentMap={elementComponentMap}
            elementComponentMapReal={elementComponentMapReal}
            currentLanguage={currentLanguage}
            getItemContent={getItemContent}
            // We want the toolbar next to each rendered element
            onRender={RenderNode}
            onNodesChange={query => {
                const json = query.serialize();
                const decoded = JSON.parse(json);
                const converted = [];
                for (const elementId in decoded) {
                    if (Object.hasOwnProperty.call(decoded, elementId)) {
                        const element = decoded[elementId];
                        const { defaultSettings, elementType, ...settings } = element.props;
                        converted.push({
                            id: elementId,
                            type: element.custom.elementType || element.props.elementType,
                            parent: element.parent || null,
                            settings: settings,
                            // This second condition is for megamenu
                            children: [...element.nodes, ...Object.values(element.linkedNodes)]
                        });
                    }
                }
                setContent(converted);
            }}
        >
            <div className={classes.root}>
                <Elements builderData={builderData} __={__} elementComponentMap={elementComponentMap} elementDefaultSettings={elementDefaultSettings} />
                <Viewport>
                    <Frame>
                        {getItemContent(sizeContentTree, '', true)}
                    </Frame>
                </Viewport>
                <div className={`${classes.toolbar} builder-toolbar`}>
                    <div className={classes.main}>
                        <div className={classes.actions}>
                            <button className={classes.save} onClick={() => formik.submitForm()}>{isUpdatingPage ? <Loading /> : __('submit')}</button>
                            <span className={classes.close} onClick={() => setEditorEnabled(false)}>{__('close')}</span>
                        </div>
                        <ScreenSizes screenSize={screenSize} switchScreenSize={switchScreenSize} />
                        <div className={classes.stageActions}>
                            <div className={classes.copyFrom}>
                                <button className={classes.yellowBtn} onClick={() => setShowCopyFrom(!showCopyFrom)}>{__('copy')}</button>
                                {showCopyFrom && <ul>
                                    {screenSize != 'mobile' && <li onClick={() => handleCopyFrom('mobile')}>Mobile</li>}
                                    {screenSize != 'tablet' && <li onClick={() => handleCopyFrom('tablet')}>Tablet</li>}
                                    {screenSize != 'desktop' && <li onClick={() => handleCopyFrom('desktop')}>Desktop</li>}
                                </ul>}
                            </div>
                        </div>
                        <div className={`${classes.sectionSwitch} ${showSettings ? classes.visible : ''}`} onClick={() => setShowSettings(!showSettings)}>
                            <div>
                                <Icon name={'pencil'} size={22} classes={{ icon: classes.sectionSwitchIcon }} />
                                <span className={classes.sectionSwitchLabel}>{__('customize')}</span>
                            </div>
                            <Icon name={'arrow'} size={5} classes={{ icon: classes.sectionSwitchArrow }} />
                        </div>
                        {showSettings && <Settings builderData={builderData} setSizeContent={setSizeContent} />}
                    </div>
                    <div>
                        <div className={`${classes.sectionSwitch} ${showLayers ? classes.visible : ''}`} onClick={() => setShowLayers(!showLayers)}>
                            <div>
                                <Icon name={'layers'} size={22} classes={{ icon: classes.layersSwitchIcon }} />
                                <span className={classes.sectionSwitchLabel}>{__('layers')}</span>
                            </div>
                            <Icon name={'arrow'} size={5} classes={{ icon: classes.sectionSwitchArrow }} />
                        </div>
                        {showLayers && <Layers />}
                    </div>
                </div>
            </div>
        </Editor>
    );
}

export default BuilderEditor;