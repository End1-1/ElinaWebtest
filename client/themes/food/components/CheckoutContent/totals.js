import React from "react";
import defaultClasses from "./totals.module.css";
import { useTotals } from "Talons/Totals/useTotals";
import Price from "Components/Price";
import { mergeClasses } from "Helper/classify";

const Totals = (props) => {
  const { cart } = useTotals();

  const classes = mergeClasses(defaultClasses, props.classes);

  return (
    <table className={classes.root}>
      <thead>
        <tr>
          <th>Product Name</th>
          <th className={classes.quantityHead}>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {cart.items &&
          cart.items.map(({ name, quantity, price }, ind) => {
            return (
              <tr key={ind}>
                <td className={classes.productName}>{name}</td>
                <td>{quantity}</td>
                <td className={classes.priceData}>
                  <Price amount={quantity * price} />
                </td>
              </tr>
            );
          })}
        <tr>
          <td>Price</td>
          <td>{""}</td>
          <td className={classes.priceData}>
            <Price amount={cart.subtotal} />
          </td>
        </tr>
        <tr>
          <td>Delivery</td>
          <td>{""}</td>
          <td className={classes.priceData}>
            <Price amount={cart.shippingTotal} />
          </td>
        </tr>
        {cart.discounts &&
          cart.discounts.map((discount, ind) => (
            <tr key={ind}>
              <td>{discount.name}</td>
              <td>{""}</td>
              <td className={classes.priceData}>
                <Price amount={discount.amount} />
              </td>
            </tr>
          ))}
        <tr>
          <td style={{ padding: "15.5px 0" }} />
          <td />
          <td />
        </tr>
        <tr>
          <td className={classes.grandTotalName}>Total Price</td>
          <td>{""}</td>
          <td className={`${classes.priceData} ${classes.grandTotalprice}`}>
            <Price amount={cart.grandTotal} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Totals;
