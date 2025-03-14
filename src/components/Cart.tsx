import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "./CartSlice";
import React from "react";




const Cart = React.memo(() => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="w-64 border-l p-4">
      <h2 className="text-xl font-bold">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600 mt-4">Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center mt-4">
              <img src={item.image} alt={item.title} className="w-12 h-12 object-cover" />
              <div>
                <h3 className="text-sm">{item.title}</h3>
                <p className="text-gray-700">${item.price} x {item.quantity}</p>
                <div className="flex items-center">
                  <button onClick={() => dispatch(decreaseQuantity(item.id))} className="px-2 border">-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(item.id))} className="px-2 border">+</button>
                </div>
              </div>
              <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500">X</button>
            </li>
          ))}
        </ul>
      )}
      <hr className="my-4" />
      <h3 className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
});

export default Cart;
