/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import Layout from "../componentes/Layout";
import { Store } from "../utilidades/Store";
import Link from "next/link";

export default function Cart() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeCartHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  //funcion para actualizar el carrito
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: "CARD_ADD_ITEM", payload: { ...item, quantity } });
  };

  return (
    <Layout title={"shopping cart"}>
      <div className="container mt-5">
        {cartItems.length === 0 ? (
            <div col-sm-6>
              <span className="fs-1">
                Su carrito esta vacio.<br></br>
              </span>{" "}
              <Link href="/">
                <a className="btn btn-primary mt-4 fs-5">Ir a la tienda</a>
              </Link>
            </div>
        ) : (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <img src={item.image} width={80} height={90} alt="" />
                      &nbsp;
                      {item.name}
                    </td>

                    <td>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>{item.price}$</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartHandler(item)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <div>
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
