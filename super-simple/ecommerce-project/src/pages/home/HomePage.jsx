import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid";

function HomePage({ cart }) {
  const [products, setProducts] = useState([]); 
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });   
  }, []);

  return (
    <>
      <title>Ecommerce project</title>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}

export default HomePage;
