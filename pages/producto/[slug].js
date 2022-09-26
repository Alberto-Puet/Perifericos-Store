/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import Layout from "../../componentes/Layout";
import Router, { useRouter } from "next/router";
import data from "../../utilidades/data";
import { Store } from "../../utilidades/Store";

export default function ProductScreen() {
  // inicializar el estado
  const { state, dispatch } = useContext(Store);

  const router = useRouter();

  const { query } = useRouter();
  const { slug } = query;

  const product = data.products.find((x) => x.slug === slug);

  if (!product) {
    return (
      <div className=" row align-items-center justify-content-center vh-100 ">
        <span className="bg-danger col-sm-4 py-5 rounded text-center fs-4">Producto no encontrado</span>
      </div>
    );
  }

  // funcion para agregar al carrito
  // donde enviamos a guardar en nuestra variable de estado global
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((i) => i.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert("En es te momento no contamos con el Stock suficiente");
      return;
    }

    dispatch({ type: "CARD_ADD_ITEM", payload: { ...product, quantity } });
    // router.push("/cart");
  };

  return (
    <div>
      <Layout title={product.name}>
        <div className="container mt-5">
          <button
            className="btn btn-secondary mb-4"
            onClick={() => router.push("/")}
          >
            Volver a la tienda
          </button>
          <div className="card mb-3 maximo-card">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={product.image}
                  className="img-fluid rounded-start imagen-carta"
                  alt="imagen-producto"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{product.name}</h5>
                  <p className="card-title">{product.price}$</p>
                  <p className="card-title"><span className="fw-bold">Conección:</span> {product.category}</p>
                  <p className="card-text mb-5">
                    <span className="fw-bold">Descripción: <br></br></span> {product.description}{" "}
                  </p>
                  <p>{product.countInStock > 0 ? <span className="bg-success p-2 rounded fw-bold">Hay Stock</span> : <span className="bg-danger p-2 rounded fw-bold">En este momento no contamos con Stock</span> }</p>
                  <button
                    className="btn btn-primary mt-4"
                    onClick={addToCartHandler}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
