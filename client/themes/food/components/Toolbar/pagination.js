import React, { useCallback, useMemo } from "react";
import defaultClasses from "./pagination.module.css";

import { usePagination } from "Talons/Pagination/usePagination";

import { mergeClasses } from "Helper/classify";
import { navButtons } from "./constants";
import Tile from "./tile";

const Pagination = (props) => {
  const { currentPage, setPage, totalPages } = props.pageControl;

  const talonProps = usePagination({
    currentPage,
    setPage,
    totalPages,
  });

  const {
    handleLeftSkip,
    handleRightSkip,
    handleNavBack,
    handleNavForward,
    isActiveLeft,
    isActiveRight,
    tiles,
  } = talonProps;

  const navigationTiles = useMemo(
    () =>
      [1, 2, 3, 4, 5, 6, 7, 8].map((tileNumber) => {
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

  // if (totalPages === 1) {
  //   return null;
  // }

  const classes = mergeClasses(defaultClasses, props.classes);

  return (
    <div className={classes.root}>
      <div className={classes.pagination}>
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
    </div>
  );
};

export default Pagination;
