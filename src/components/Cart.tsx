import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "../redux/store";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "./CartSlice";
import React, { useCallback } from "react";

const Cart = React.memo(() => {
  const cart = useSelector(
    (state: RootState) => state.cart.items,
    shallowEqual
  );
  const dispatch = useDispatch();

  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toLocaleString();

  const handleIncrease = useCallback(
    (id: number) => dispatch(increaseQuantity(id)),
    [dispatch]
  );
  const handleDecrease = useCallback(
    (id: number) => dispatch(decreaseQuantity(id)),
    [dispatch]
  );
  const handleRemove = useCallback(
    (id: number) => dispatch(removeFromCart(id)),
    [dispatch]
  );

  return (
    <div className="w-96 max-w-full h-screen flex flex-col bg-white shadow-lg p-4">
      <div className="flex-grow overflow-auto pr-2">
        {cart.length === 0 ? (
          <p className="text-gray-600 mt-4">Your cart is empty</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center border-b pb-2 gap-4 w-full"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex flex-col flex-grow min-w-0">
                  <h3 className="text-sm font-medium truncate">{item.title}</h3>
                  <p className="text-gray-700">
                    ${item.price} x {item.quantity}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="px-3 border bg-gray-100 hover:bg-gray-200 transition rounded-md"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="px-3 border bg-gray-100 hover:bg-gray-200 transition rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t pt-4 bg-white p-4 shadow-md sticky bottom-0">
        <h3 className="text-lg font-bold">Total: ${totalPrice}</h3>
      </div>
    </div>
  );
});

export default Cart;
