import React, { useState } from 'react';
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
import './styles.css';
import Nav from './Nav';


export default function App() {


  /*   function Button() {
      const handleClick = () => {
        console.log('Button clicked!');
      };
  
      return (
        <button onClick={handleClick}>
          Click me
        </button>
      );
    } */

  return (
    <>
      <Nav />
      <Header />
      <main className="container my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          <div className="col-md-3 mb-4">
            <ProductCard
              imageUrl="https://picsum.photos/id/20/300/200"
              productName="Product 1"
              price={19.99}
            />
          </div>
          <div className="col-md-3 mb-4">
            <ProductCard
              imageUrl="https://picsum.photos/id/1/300/200"
              productName="Product 2"
              price={29.99}
            />
          </div>
          <div className="col-md-3 mb-4">
            <ProductCard
              imageUrl="https://picsum.photos/id/26/300/200"
              productName="Product 3"
              price={39.99}
            />
          </div>
          <div className="col-md-3 mb-4">
            <ProductCard
              imageUrl="https://picsum.photos/id/96/300/200"
              productName="Product 4"
              price={49.99}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}