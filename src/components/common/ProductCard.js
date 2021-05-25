import { Button, Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
  },
});
function ProductCard({ data, handleRemove, handleAdd }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          <span>{data.Name}</span>
          <span style={{ float: "right" }}>{data.qty}</span>
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {data.Location}
        </Typography>
        <Typography variant="body2" component="p">
          ₹{data.price}
        </Typography>
        {data.qty || data.selected ? (
          <div style={{ display: "flex", marginTop: "10px" }}>
            <Button variant="contained" onClick={() => handleRemove(data.Name)}>
              -
            </Button>
            <div style={{ margin: "10px" }}> {data.selected}</div>
            {data.qty ? (
              <Button variant="contained" onClick={() => handleAdd(data.Name)}>
                +
              </Button>
            ) : (
              "Sold Out"
            )}
          </div>
        ) : (
          "Sold Out"
        )}
      </CardContent>
    </Card>
  );
}

export default ProductCard;
