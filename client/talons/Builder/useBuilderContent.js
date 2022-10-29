import React, { Fragment, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Link from 'Components/Link';
import Button from 'Components/Button';
import Image from 'Components/Image';
import RichContent from 'Components/RichContent';
import Section from 'Components/Section';
import Slider from 'Components/Slider';
import Banner from 'Components/Banner';
import ProductList from 'Components/ProductList';
import Block from 'Components/Block';
import NewsletterForm from 'Components/NewsletterForm';
import Logo from 'Components/Logo';
import CategoryList from 'Components/CategoryList';
import TestimonialSlider from 'Components/TestimonialSlider';
import ProductSlider from 'Components/ProductSlider';
import BlogPostsWidget from 'Components/BlogPostsWidget';
import SocialIcons from 'Components/SocialIcons';
import Faq from 'Components/Faq';

export const useBuilderContent = (props) => {
    const { currentLanguage } = useSelector(state => state.shop);
    const getContainerStyles = useCallback((container) => {
        const { padding, margin, flexDirection, alignItems, justifyContent, borderWidth, borderStyle, borderRadius, borderColor } = container.settings || {};
        const additionalStyles = {}

        if (container.children && container.children.map(child => child.type).includes('testimonials')) {
            return {};
        } else {
            return {
                display: 'flex', 
                height: container.settings && container.settings.height ? container.settings.height : 'auto',
                backgroundColor: container.settings && container.settings.backgroundColor ? container.settings.backgroundColor : '',
                width: container.settings && container.settings.width ? container.settings.width : 'auto',
                maxWidth: container.settings && container.settings.maxWidth ? container.settings.maxWidth : 'auto',
                padding: padding ? `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px` : '',
                margin: margin ? `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px` : '',
                flexDirection,
                alignItems,
                justifyContent,
                borderWidth: borderWidth || 0, 
                borderStyle, 
                borderRadius, 
                borderColor,
                ...additionalStyles
            }
        }
    }, []);


    const getItemContent = useCallback((item) => {
        if (item.type == 'section') {
            // Somehow it doesn't work if I put this inside map
            const children = Array.isArray(item.children) && item.children.length ? item.children.map(child => {
                return <Fragment key={child.id}>{getItemContent(child)}</Fragment>;
            }) : null;
            return (
                <Section 
                    key={item.id} 
                    style={getContainerStyles(item)}
                    additionalModuleClasses={item.settings && item.settings.cssModuleClasses ? item.settings.cssModuleClasses.split(',') : []} 
                    additionalGlobalClasses={item.settings && item.settings.globalClasses ? item.settings.globalClasses.split(',') : []} 
                >  
                    {children}
                </Section>
            );
        } else if (item.type == 'textHtmlBlock') {
            return (
                <RichContent 
                    html={item.data.content} 
                    additionalModuleClasses={item.settings.cssModuleClasses ? item.settings.cssModuleClasses.split(',') : []} 
                    additionalGlobalClasses={item.settings.globalClasses ? item.settings.globalClasses.split(',') : []} 
                />
            )
        } else if (item.type == 'text') {
            const { fontSize, fontWeight, fontStyle, text, link, color, margin, globalClasses } = item.settings;
            const globalClassesArray = globalClasses ? globalClasses.split(',') : [];
            const textElementProps = {
                className: `${globalClassesArray.join(' ')}`,
                style: { 
                    fontSize: `${fontSize}px`, 
                    color,
                    fontWeight,
                    fontStyle,
                    margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
                }
            }
            
            // Text may be multilanguage
            const textContent = typeof text == 'object' ? text[currentLanguage] : text;
            const textLink = typeof link == 'object' ? link[currentLanguage] : link;

            if (textLink) {
                return <Link {...textElementProps} to={textLink}>{textContent}</Link>
            } else {
                return <span {...textElementProps}>{textContent}</span>;
            }
        } else if (item.type == 'categoryList') {
            return <CategoryList key={item.id} item={item} />
        } else if (item.type == 'productList') {
            return <ProductList products={item.data.products} key={item.id} item={item} itemsPerRow={item.settings.itemsPerRow} />
        } else if (item.type == 'imageSlider') {
            return <Slider 
                data={item.data ? item.data.slider : false}
                key={item.id} 
                id={item.settings.sliderId} 
                imageHeight={831} 
                imageWidth={1800} 
            />;
        } else if (item.type == 'banner') {
            return <Banner 
                data={item.data.banner}
                key={item.id} 
                id={item.settings.bannerId} 
                imageHeight={609} 
                imageWidth={778} 
                additionalModuleClasses={item.settings.cssModuleClasses ? item.settings.cssModuleClasses.split(',') : []} 
                additionalGlobalClasses={item.settings.globalClasses ? item.settings.globalClasses.split(',') : []} 
            />;
        } else if (item.type == 'block') {
            return <Block 
                key={item.id} 
                blockId={item.settings.blockId} 
                additionalModuleClasses={item.settings.cssModuleClasses ? item.settings.cssModuleClasses.split(',') : []} 
                additionalGlobalClasses={item.settings.globalClasses ? item.settings.globalClasses.split(',') : []} 
            />;
        } else if (item.type == 'newsletterForm') {
            return <NewsletterForm />;
        } else if (item.type == 'faq') {
            return <Faq data={item.data} />;
        } else if (item.type == 'socialIcons') {
            return <SocialIcons icons={item.settings.icons} />;
        } else if (item.type == 'testimonials') {
            return <TestimonialSlider key={item.id} visibleItems={item.settings.visibleItems || 2} />;
        } else if (item.type == 'productSlider') {
            return <ProductSlider key={item.id} type={item.settings.type} id={item.settings.categoryId} visibleItems={item.settings.visibleItems || 2} />;
        } else if (item.type == 'blogPosts') {
            return <BlogPostsWidget key={item.id} visibleItems={item.settings.visibleItems || 2} />;
        } else if (item.type == 'logo') {
            return <Logo key={item.id} />;
        } else if (item.type == 'button') {
            return item.settings.link ? <Link to={item.settings.link}><Button key={item.id}>{item.settings.text}</Button></Link> : <Button key={item.id}>{item.settings.text}</Button>;
        } else if (item.type == 'categoryLink' || item.type == 'pageLink') {
            const { globalClasses } = item.settings;
            const globalClassesArray = globalClasses ? globalClasses.split(',') : [];
            return <Link to={item.data.link || item.settings.link} className={`${globalClassesArray.join(' ')}`}>{item.data.name || item.settings.name}</Link>
        } else if (item.type == 'image') {
            return <Image 
                key={item.id} 
                src={item.settings.image} 
                width={item.settings.width ? item.settings.width : null} 
                height={item.settings.height ? item.settings.height : null} 
                additionalModuleClasses={item.settings.cssModuleClasses ? item.settings.cssModuleClasses.split(',') : []} 
                additionalGlobalClasses={item.settings.globalClasses ? item.settings.globalClasses.split(',') : []} 
            />;
        } else {
            return null;
        }
    }, [currentLanguage]);

    return {
        getItemContent
    }
}