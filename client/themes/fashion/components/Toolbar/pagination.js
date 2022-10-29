import React, { useCallback, useMemo } from 'react';
import defaultClasses from './pagination.module.css';

import { usePagination } from 'Talons/Pagination/usePagination';

import { mergeClasses } from 'Helper/classify';
import { navButtons } from './constants';
import Tile from './tile';

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

    const classes = mergeClasses(defaultClasses, props.classes);

    const navigationTiles = useMemo(
        () =>
            tiles.map(tileNumber => {
                return (
                    <Tile
                        classes={{root_active: classes.active}}
                        isActive={tileNumber === currentPage}
                        key={tileNumber}
                        number={tileNumber}
                        onClick={() => setPage(tileNumber)}
                    />
                );
            }),
        [currentPage, tiles, setPage]
    );

    if (totalPages === 1) {
        return null;
    }

    return (
        <div className={classes.root}>
            <button
                name={navButtons.prevPage.name}
                active={isActiveLeft}
                onClick={handleNavBack}
                label={navButtons.prevPage.buttonLabel}
                className={classes.prev}
            />
            {navigationTiles}
            <button
                name={navButtons.nextPage.name}
                active={isActiveRight}
                onClick={handleNavForward}
                label={navButtons.nextPage.buttonLabel}
                className={classes.next}
            />
        </div>
    );
}

export default Pagination;