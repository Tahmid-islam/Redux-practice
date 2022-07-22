const { default: produce } = require("immer");
const { createStore } = require("redux");

const initialState = {
  name: "Vishwas",
  address: {
    street: "123 main St",
    city: "Boston",
    state: "MA",
  },
};

const UPDATE_INFO = "UPDATE_INFO";

const updateInfo = (street, city) => {
  return {
    type: UPDATE_INFO,
    payload: {
      street,
      city,
    },
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INFO:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload
      //     }
      //   }
      return produce(state, (draft) => {
        draft.address.street = action.payload.street;
        draft.address.city = action.payload.city;
      });
    default: {
      return state;
    }
  }
};

const store = createStore(reducer);
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("Updated States", store.getState());
});
store.dispatch(updateInfo("Sekhertek road 8", "Dhaka"));
unsubscribe();
