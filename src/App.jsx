import React, { useState, useEffect } from 'react';
import Footer from "./Footer";
import Header from "./Header";
import './styles.css';
import Navbar from './Navbar';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import { Route, Switch } from 'wouter';
import ProductsPage from './ProductPage';

export default function App() {

  return (
    <>
      <Navbar />
      <Header />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
      <Footer />
    </>
  )
}