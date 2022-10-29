import React, { useState, useRef, useEffect } from 'react';
import defaultClasses from './searchBar.module.css';
import Link from 'Components/Link';
import Image from 'Components/Image';
import ProductPrice from 'Components/ProductPrice';
import { useSearchBar } from 'Talons/SearchBar/useSearchBar';
import { mergeClasses } from 'Components/classify';
import IconMoon from 'Components/IconMoon';
import { useDrawer } from 'Talons/Drawer/useDrawer';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import { useHistory } from 'react-router-dom';

const SearchBar = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { handleCloseSearchBar, seeAllButtonLink, seeAllButtonText, value } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [isOpenNoResult, setIsOpenNoResult] = useState(false);
    const { getValue, results, loading, isMobile, showSearchBar, followTrigger, __ } = useSearchBar(props);
    const resultRef = useRef();
    const noResultRef = useRef();
    const history = useHistory();
    useOnClickOutside(resultRef, () => {
        if(isOpen) {
            setFocused(!isOpen);
            setIsOpen(!isOpen);
        }
    });

    useOnClickOutside(noResultRef, () => {
        if(isOpenNoResult) {
            setFocused(!isOpenNoResult);
            setIsOpenNoResult(!isOpenNoResult);
        }
    });

    const { handleToggleDrawer } = useDrawer();

    if (!showSearchBar && followTrigger) {
        return null;
    }

    useEffect(() => {
        if(!!results.items.products.length) {
            setIsOpenNoResult(false);
            setIsOpen(true);
        }
        else 
        if(value) {
            setIsOpenNoResult(true);
        }
        else {
            setIsOpenNoResult(false);
            setIsOpen(false);
        }
        if(!focused) {
            setIsOpenNoResult(false);
            setIsOpen(false);
        }
    }, [results, value, focused]);

    return (
        <div className={classes.root}>
            <div className={`${classes.body} ${loading ? classes.loading : null}`} 
                onClick={(e) => {
                    if(e.target.tagName === "DIV") {
                        setFocused(false); 
                        handleCloseSearchBar(false); 
                        handleToggleDrawer("");
                        return;
                    }
                    setFocused(!focused);
                    if(!!results.items.products.length) {
                        setIsOpen(!isOpen);
                    }
                    else
                    if(value) {
                        setIsOpenNoResult(!isOpenNoResult);
                    }
                }}
            >
                <input type="text" onKeyUp={getValue} placeholder={`${__("search")}...`} className={classes.searchInput} 
                    onKeyDown={(e) => {
                        if (e.keyCode == 13) {
                            if (e.target.value === "") {
                                return;
                            } else {
                                setFocused(false);
                                history.push(seeAllButtonLink);
                            }
                        }
                    }}
                />
                <div className={classes.searchIconFeild}>
                   <IconMoon name="search" classes={{iconClass: classes.searchIcon}}/>
                </div>
                <div className={`${classes.closeField} ${(!!results.items.products.length || isOpenNoResult) && classes.right}`} onClick={(event) => {
                    event.stopPropagation();
                    setFocused(false); 
                    handleCloseSearchBar(false); 
                    handleToggleDrawer("");
                }}>
                    <IconMoon name="close"/>
                </div>
                {isOpen && <div className={classes.result} ref={resultRef}>
                    {seeAllButtonLink && <Link to={seeAllButtonLink} classes={{link: classes.seeAll}}><span>{seeAllButtonText}</span></Link>}
                    {results.items.products.map((result, index) =>                         
                        <Link to={result.urlKey} key={index} classes={{link: classes.item}}>
                            <Image src={`${result.images.length && result.images[0].path}`} width={150} />
                            <div className={classes.info}>
                                <p>{result.name}</p>                        
                                <ProductPrice product={result} />
                            </div>
                            <p>{result.description}</p>
                        </Link>
                    )}
                </div>}
                {isOpenNoResult && 
                    <div className={classes.result} ref={noResultRef}>
                        <h3>{__("no.results")}...</h3>
                    </div>
                }           
            </div>        
        </div>
    )
}

SearchBar.defaultProps = {
    followTrigger: true
}

export default SearchBar;