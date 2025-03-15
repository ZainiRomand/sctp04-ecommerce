import React, { useState, useEffect } from 'react';
import Footer from "./Footer";
import './styles.css';
import Navbar from './Navbar';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import UserProfile from './UserProfile';
import UserLogin from './UserLogin';
import { Route, Switch } from 'wouter';
import ProductsPage from './ProductsPage';
import { useFlashMessage } from './FlashMessageStore';
import ShoppingCart from './ShoppingCart';

export default function App() {

  const {getMessage, clearMessage} = useFlashMessage();
  const flashMessage =  getMessage();

  useEffect(() => {
  const timer = setTimeout(()=>{
    clearMessage();
  },3000);

  return () => {
    clearTimeout(timer);
  }

  }, [flashMessage]);

  return (
    <>
      <Navbar />
      {flashMessage.message && (
        <div className={`alert alert-${flashMessage.type} text-center flash-alert`} role="alert">
          {flashMessage.message}
        </div>
      )}
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/cart" component={ShoppingCart} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={UserLogin} />
        <Route path="/profile" component={UserProfile} />
      </Switch>
      <Footer />
    </>
  )
}