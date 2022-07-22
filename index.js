const { createStore, bindActionCreators, combineReducers } = require("redux");

let CAKE_ORDERED = "CAKE_ORDERED";
let CAKE_RRSTOCKED = "CAKE_RESTOCKED";
let ICECREAM_ORDERED = "ICECREAM_ORDERED";
let ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

const OrderCake = (qty = 1) => {
  return {
    type: CAKE_ORDERED,
    payload: qty
  };
};
const RestokeCake = (qty = 1) => {
  return {
    type: CAKE_RRSTOCKED,
    payload: qty
  };
};
const OrderIcecream = (qty = 1) => {
  return {
    type: ICECREAM_ORDERED,
    payload: qty
  };
};
const RestokeIcecream = (qty = 1) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty
  };
};

// const initialState = {
//   numOfCakes: 10,
//   numofIcecream: 10
// };

const initialCakeState = {
  numOfCakes: 10
};

const initialIcecreamState = {
  numofIcecream: 10
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action?.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state?.numOfCakes - action?.payload
      };
    case CAKE_RRSTOCKED:
      return {
        ...state,
        numOfCakes: state?.numOfCakes + action?.payload
      };
    default:
      return state;
  }
};

const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action?.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numofIcecream: state?.numofIcecream - action?.payload
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numofIcecream: state?.numofIcecream + action?.payload
      };
    default:
      return state;
  }
};

// const store = createStore(reducer);
const rootReducers = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer
});
const store = createStore(rootReducers);
console.log("Initial Cake State", initialCakeState);
console.log("Initial Icecream State", initialIcecreamState);
const unsubscribe = store.subscribe(() => {
  console.log("Updated States", store.getState());
});
// store.dispatch(OrderCake());
// store.dispatch(OrderCake());
// store.dispatch(OrderCake(2));
// store.dispatch(RestokeCake(10));
const actions = bindActionCreators(
  { OrderCake, RestokeCake, OrderIcecream, RestokeIcecream },
  store.dispatch
);
actions.OrderCake(2);
actions.RestokeCake(10);
actions.OrderIcecream(4);
actions.OrderIcecream(4);
actions.RestokeIcecream(3);
console.log("Cake States", store.getState()?.cake?.numOfCakes);
unsubscribe();
 