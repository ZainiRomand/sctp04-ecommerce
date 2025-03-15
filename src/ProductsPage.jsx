import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import { useCart } from './CartStore';
import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();
    const [, setLocation] = useLocation();
    const { showMessage } = useFlashMessage();

    const handleAddToCart = (product) => {
        addToCart({
            id: Math.floor(Math.random() * 9999 + 1),
            product_id: product.id,
            productName: product.name,
            quantity: 1,
            price: product.price,
            imageUrl: product.image,
            description: product.description
            // "id": null,
            // "product_id": null,
            // "quantity": null,
            // "productName": null,
            // "price": null,
            // "imageUrl": null,
            // "description": null
        });
        showMessage("Product added to cart", "success");
        setLocation("/cart");
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Our Products</h1>
            <div className="row">
                {products.map(p => (
                    <div key={p.id} className="col-md-4 mb-4">
                        <ProductCard
                            imageUrl={p.image}
                            productName={p.name}
                            price={p.price.toFixed(2)}
                            onAddToCart={() => {
                                handleAddToCart(p)
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
