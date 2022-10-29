import React, { useMemo } from 'react';
import defaultClasses from 'Components/Toolbar/pagination.module.css';
import { usePagination } from 'Talons/Pagination/usePagination';
import { mergeClasses } from 'Helper/classify';
import { navButtons } from './constants';
import Tile from 'Components/Toolbar/tile';

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
            tiles.map(tileNumber => {
                return (
                    <Tile
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

    const classes = mergeClasses(defaultClasses, props.classes);

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