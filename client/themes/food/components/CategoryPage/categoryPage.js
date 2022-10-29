import React from "react";
import classes from "./categoryPage.module.css";
import ProductList from "Components/ProductList";
import Toolbar from "Components/Toolbar";
import Head from "Components/Head";
import { useCategoryPage } from "Talons/CategoryPage/useCategoryPage";
import Pagination from "Components/Toolbar/pagination";
import useWindowSize from "Hooks/useWindowSize";
import Button from "Components/Button";

const CategoryPage = (props) => {
  const {
    category,
    categoryProducts,
    pageControl,
    isFetchingCategoryProducts,
    __,
  } = useCategoryPage(props);
  const { isMobile } = useWindowSize();

  return (
    <div className={classes.root}>
      <Head>
        <title>
          {category
            ? category.pageTitle
              ? category.pageTitle
              : category.name
            : ""}
        </title>
        <meta
          name="description"
          content={category ? category.metaDescription : ""}
        />
      </Head>
      <div className={classes.body}>
        <div className={classes.container}>
          {true ? (
            <>
              <h1 className={classes.title}>{category && category.name}</h1>
              <div className={classes.toolbarContainer}>
                <Toolbar
                  pageControl={pageControl}
                  filters={
                    categoryProducts ? categoryProducts.aggregations : []
                  }
                />
              </div>
              <div className={classes.prodListContainer}>
                <ProductList
                  products={categoryProducts.products}
                  isFetchingProducts={isFetchingCategoryProducts}
                  placementInfo={{
                    type: "categoryPage",
                    categoryId: category.id,
                  }}
                />
              </div>
              <div className={classes.footer}>
                {isMobile ? (
                  <div className={classes.btnContainer}>
                    <Button text="Load more" />
                  </div>
                ) : (
                  <Pagination pageControl={pageControl} />
                )}
              </div>
            </>
          ) : (
            <div>Empty</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
