/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";



export default function ProductItem({ product }) {
  return (
    <div>
      <div className="col">
        <div className="card rounded sombra">
          <img src={product.image} alt="" className="imagen-carta mx-auto " />
          <div className="card-body">
            <h5>{product.name}</h5>
            <p>{product.category}</p>
            <p>${product.price}</p>
            <Link href={`/producto/${product.slug}`}>
              <a>
                <button className="btn btn-primary">Ver Producto</button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
