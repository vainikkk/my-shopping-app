const initialState = {
  isLoggedIn: false,
  userData: {},
  products: [
    { Name: "Cheese", price: 2.5, Location: "Refrigerated foods", qty: 2, selected: 0 },
    { Name: "Crisps", price: 3, Location: "the Snack isle", qty: 5, selected: 0 },
    { Name: "pizza", price: 4, Location: "Refrigerated foods", qty: 7, selected: 0 },
    { Name: "Chocolate", price: 1.5, Location: "the Snack isle", qty: 8, selected: 0 },
    { Name: "Self-raising flour", price: 1.5, Location: "Home baking", qty: 0, selected: 0 },
    { Name: "Ground almonds", price: 3, Location: "Home baking", qty: 1, selected: 0 },
  ],
  cartValue: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case "ADD_IN_CART": {
      console.log(action.payload);
      let modifiedData = state.products.map((v) => {
        if (v.Name === action.payload) {
          return {
            ...v,
            selected: v.selected + 1,
            qty: v.qty - 1,
          };
        } else {
          return v;
        }
      });
      console.log(modifiedData);
      return {
        ...state,
        products: modifiedData,
      };
    }
    case "REMOVE_IN_CART": {
      let modifiedData = state.products.map((v) => {
        if (v.Name === action.payload) {
          if (v.selected === 0) {
            return v;
          } else {
            return {
              ...v,
              selected: v.selected - 1,
              qty: v.qty + 1,
            };
          }
        } else {
          return v;
        }
      });
      return {
        ...state,
        products: modifiedData,
      };
    }
    case "LOG_OUT":
      return {
        initialState,
      };
    default:
      return state;
  }
};

export default reducer;
