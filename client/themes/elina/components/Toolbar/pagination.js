import React, { useMemo } from 'react';
import defaultClasses from './pagination.module.css';
import { usePagination } from 'Talons/Pagination/usePagination';
import { mergeClasses } from 'Helper/classify';
import { navButtons } from './constants';
import Tile from './tile';
import IconMoon from 'Components/IconMoon';

const Pagination  = props => {
    const { currentPage, setPage, totalPages } = props.pageControl;
    const talonProps = usePagination({
        currentPage,
        setPage,
        totalPages
    });

    const {
        handleLeftSkip,
        handleRightSkip,
        handleNavBack,
        handleNavForward,
        isActiveLeft,
        isActiveRight,
        tiles
    } = talonProps;
    const navigationTiles = useMemo(
        () =>
            tiles.map((tileNumber,index) => {
                if(index < 3) {
                   return (
                        <Tile
                            isActive={tileNumber === currentPage}
                            key={tileNumber}
                            number={tileNumber}
                            onClick={() => setPage(tileNumber)}
                        />
                    ); 
                }
                
            }),
        [currentPage, tiles, setPage]
    );
    const lastTile = useMemo(
        () => {
            if(tiles.length <= 3) return null
            const last = tiles[tiles.length - 1];
            return <Tile
                        isActive={last === currentPage}
                        number={last}
                        onClick={() => setPage(last)}
                    />
        },
        [tiles, currentPage, setPage]
    )
    if (totalPages === 1) {
        return null;
    }

    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <div className={classes.root}>
            <button
                name={navButtons.prevPage.name}
                active={isActiveLeft}
                onClick={handleNavBack}
                label={navButtons.prevPage.buttonLabel}
                className={classes.prev}
            >
                <IconMoon name="arrow" />
            </button>
                {navigationTiles}
                {
                    tiles.length < 2
                    ?   <div className={classes.dots}>
                            <div className={classes.dot}></div>
                            <div className={classes.dot}></div>
                            <div className={classes.dot}></div>
                        </div>
                    :   null
                }
                {lastTile}
            <button
                name={navButtons.nextPage.name}
                active={isActiveRight}
                onClick={handleNavForward}
                label={navButtons.nextPage.buttonLabel}
                className={classes.next}
            >
                <IconMoon name="arrow" />
            </button>
        </div>
    );
}

export default Pagination;