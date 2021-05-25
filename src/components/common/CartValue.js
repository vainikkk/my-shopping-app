import { Card, CardContent, Typography } from "@material-ui/core";
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
function CartValue({ data }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {data.Name}
        </Typography>
        <Typography variant="body2" component="p">
          ₹{data.price * data.selected}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CartValue;
