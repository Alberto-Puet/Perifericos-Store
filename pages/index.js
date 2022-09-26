import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import Layout from "../componentes/Layout";
import ProductItem from "../componentes/ProductItem";
import styles from "../styles/Home.module.css";
import data from "../utilidades/data";

export default function Home() {
  return (
    <Layout title={"Inicio"}>
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-md-2 g-5 mx-auto">
          {data.products.map((product) => (
            <ProductItem key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
