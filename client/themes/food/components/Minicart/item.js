import React from "react";
import StarRatings from "react-star-ratings";
import classes from "Components/Minicart/item.module.css";
import Button from "Components/Button";
import Icon from "Components/Icon";
import Price from "Components/Price";
import Image from "Components/Image";
import ProductPrice from "Components/ProductPrice";
import ProductQuantity from "../ProductQuantity";
import Link from "Components/Link";

const Item = (props) => {
  const { item, handleRemoveItem } = props;

  return (
    <div className={classes.root}>
      <div className={classes.body}>
        <div className={classes.block}>
          <div className={classes.productImageWrapper}>
            <Image
              className={classes.productImage}
              width={304}
              src={`${item.thumbnail}`}
            />
          </div>
          <div className={classes.prodPriceContainer}>
            <Price amount={item.price} />
          </div>
        </div>
        <div className={classes.content}>
          <p className={classes.name}>{item.name}</p>
          <p className={classes.about}>{item.sku}</p>
          <div className={classes.ratingContainer}>
            <StarRatings
              rating={item.averageRating || 5}
              numberOfStars={5}
              starEmptyColor="transparent"
              starRatedColor="#FFB800"
              name="rating"
              starSpacing="2px"
              isSelectable={false}
              starDimension="16px"
            />
          </div>
          <div className={classes.control}>
            <div className={classes.hoverContainer}>
              <div>
                <ProductQuantity
                  initialValue={item.quantity}
                  classes={{ root: classes.prodQuantity }}
                />
                <Button classes={{ button: classes.btnCart }} text="Cart" />
              </div>
            </div>
          </div>
        </div>

        <Button
          classes={{ button: classes.deleteBtn }}
          onClick={() => handleRemoveItem(item.id)}
          iconOnly
        >
          <Icon name="X" size="15px" />
        </Button>
      </div>
    </div>
  );
};

export default Item;
