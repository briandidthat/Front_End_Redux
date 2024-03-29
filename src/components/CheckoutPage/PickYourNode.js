import React from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import { nodeImg } from "../../assets";
import { products } from "./products";

const styles = () => ({
  button: {
    display: "block",
    paddingBottom: "2rem"
  },
  formControl: {
    minWidth: 120
  }
});

const PickYourNode = ({ addItemToCart, removeItemFromCart, classes }) => {
  const [item, setItem] = React.useState();
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    setItem(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <React.Fragment>
      <div>
        <img src={nodeImg} alt="nodeImg" className="Node" />
      </div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="open-select">Storage</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={item || ""}
          onChange={handleChange}
          inputProps={{
            name: "price",
            id: "open-select"
          }}
        >
          {products.map((item, index) => {
            return (
              <MenuItem value={item} key={index}>
                ${item.itemCost} {item.itemDesc}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <br />
      <br />
      <Button color="primary" onClick={() => (item ? addItemToCart(item) : "")}>
        Add Item
      </Button>
      <Button
        color="primary"
        onClick={() => (item ? removeItemFromCart(item.itemId) : "")}
      >
        Remove Item
      </Button>
    </React.Fragment>
  );
};

PickYourNode.propTypes = {
  classes: PropTypes.object.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired
};

export default withStyles(styles)(PickYourNode);
