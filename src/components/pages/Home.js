import { Card, Container, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartValue from "../common/CartValue";
import ProductCard from "../common/ProductCard";

function Home() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleAdd = (name) => {
    dispatch({ type: "ADD_IN_CART", payload: name });
  };

  const handleRemove = (name) => {
    dispatch({ type: "REMOVE_IN_CART", payload: name });
  };
  let total;
  if (state.products.filter((value) => value.selected)?.length > 0) {
    total = state.products
      .filter((value) => value.selected)
      ?.map((value) => value.selected * value.price)
      .reduce((a, b) => b + a);
  }

  return (
    <div className="homePage_wrapper">
      <Container className="pt-3">
        <Grid container>
          <Grid spacing={4} xs="9" className="">
            {state.products &&
              state.products.map((value) => (
                <ProductCard data={value} handleAdd={handleAdd} handleRemove={handleRemove} />
              ))}
          </Grid>
          <Grid spacing={4} xs="3">
            {state.products &&
              state.products
                .filter((value) => value.selected)
                .map((value) => <CartValue data={value} handleAdd={handleAdd} handleRemove={handleRemove} />)}
            {total && <Card style={{ padding: "15px" }}>Total price: {total}</Card>}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
