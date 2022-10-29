import React from "react";
import classes from "./productList.module.css";
import { useProductList } from "Talons/ProductList/useProductList";
import GalleryItem from "Components/Gallery/item";
import Placeholder from "Components/ProductList/placeholder";

const ProductList = (props) => {
  const { products, isFetchingProducts, placementInfo } = props;

  const { isFetchingList } = useProductList();

  if (isFetchingProducts) {
    return <Placeholder />;
  }

  if (!products.length) {
    return <p>No products found</p>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.list}>
        {products &&
          products.map((product) => (
            <GalleryItem
              key={product.id}
              product={product}
              placementInfo={placementInfo}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
