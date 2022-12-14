/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Store } from "../utilidades/Store";

export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store);

  const { cart } = state;

  const [cartItemsCount, setcartItemsCount] = useState(0);

  useEffect(() => {
    setcartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <div>
      <Head>
        <title>{title ? title : "tienda"}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand ">Inicio</a>
          </Link>
          
          <div id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/cart">
                  <a className="nav-link fs-5 text-white">
                    Tu Carrito
                    <span className="text-white bg-success rounded px-2 py-1 mx-2">
                      {cartItemsCount}
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}
