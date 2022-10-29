import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import classes from "./item.module.css";
import { useItem } from "Talons/Gallery/useItem";
import { useTranslations } from "Talons/App/useTranslations";
import Button from "Components/Button";
import ProductPrice from "Components/ProductPrice";
import ProductQuantity from "../ProductQuantity";
import Link from "Components/Link";
import { useProductContent } from "Talons/ProductContent/useProductContent";
import Image from "Components/Image";
import useWindowSize from "Hooks/useWindowSize";

const Item = (props) => {
  const { product, placementInfo } = props;

  const {
    allowedOptions,
    optionSelections,
    handleSelectionChange,
    handleAddToCart,
    variant,
  } = useProductContent({
    product,
  });

  const {
    link,
    isAddingToCart,
    visibleOptions,
    showOptionsPartially,
    setShowOptionsPartially,
    imageUrl,
    showReviewSummary,
  } = useItem({
    product,
    variant,
    placementInfo,
  });

  const { __ } = useTranslations();
  const { isMobile } = useWindowSize();

  const [isMouseOverBtn, setIsMouseOverBtn] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.background}>
        <div className={classes.body}>
          <div className={classes.block}>
            <Link to={link}>
              {product.images && (
                <div className={classes.productImageWrapper}>
                  <Image
                    className={classes.productImage}
                    width={304}
                    src={imageUrl}
                  />
                </div>
              )}
            </Link>
            <div className={classes.prodPriceContainer}>
              {isMobile ? (
                <ProductPrice
                  product={product}
                  variant={variant}
                  place="categoryListing"
                />
              ) : null}
            </div>
          </div>
          <div className={classes.content}>
            <Link to={link}>
              <p className={classes.name}>{product.name}</p>
            </Link>
            <p className={classes.about}>{product.metaDescription}</p>
            <div className={classes.ratingContainer}>
              <StarRatings
                rating={product.averageRating || 0}
                numberOfStars={5}
                starEmptyColor="transparent"
                starRatedColor="#FFB800"
                name="rating"
                starSpacing={!isMobile ? "6px" : "2px"}
                isSelectable={false}
                starDimension={isMobile ? "11px" : "22px"}
              />
            </div>
            <div className={classes.control}>
              {!isMobile ? (
                <div className={classes.priceContainer}>
                  <ProductPrice
                    product={product}
                    variant={variant}
                    place="categoryListing"
                  />
                </div>
              ) : null}
              <div
                className={classes.hoverContainer}
                onMouseOver={!isMobile ? () => setIsMouseOverBtn(true) : null}
                onMouseLeave={!isMobile ? () => setIsMouseOverBtn(false) : null}
              >
                {!isMobile ? (
                  !isMouseOverBtn ? (
                    <Button
                      classes={{ button: classes.button }}
                      priority="secondary"
                      text="Add To Cart"
                    />
                  ) : (
                    <div>
                      <ProductQuantity
                        initialValue={1}
                        classes={{ root: classes.prodQuantity }}
                      />
                      <Button
                        classes={{ button: classes.btnCart }}
                        text="Cart"
                        loading={isAddingToCart}
                        onClick={() => handleAddToCart(product)}
                      />
                    </div>
                  )
                ) : (
                  <div>
                    <ProductQuantity
                      initialValue={1}
                      classes={{ root: classes.prodQuantity }}
                    />
                    <Button
                      classes={{ button: classes.btnCart }}
                      text="Cart"
                      loading={isAddingToCart}
                      onClick={() => handleAddToCart(product)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
