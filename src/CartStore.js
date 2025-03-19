import { atom, useAtom } from 'jotai';
import { produce } from 'immer';

// the initial cart will be the starting value of our shopping cart
// const initialCart = [
//     {
//         "id": 1,
//         "product_id": 1,
//         "quantity": 10,
//         "productName": "Organic Green Tea",
//         "price": 12.99,
//         "imageUrl": "https://picsum.photos/id/225/300/200",
//         "description": "Premium organic green tea leaves, rich in antioxidants and offering a smooth, refreshing taste."
//     },
// ]

const initialCart = []


// create an atom for the shopping cart (atom == shared state)
const cartAtom = atom(initialCart);

// A custom hook
export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);

    // Function to calculate the total price of items in the cart
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };


    const addToCart = (product) => {

        // the updateCartFunc will recieve the current shopping cart array
        // and return what should the new value of the shopping cart
        // later, this updatedCartFunc will be passed as the first parameter of setCart
        const updateCartFunc = (prevCart) => {


            // produce will call the recipe function for us (the 2nd parameter) and
            // it will pass prevCart to the draft
            const modifiedCart = produce(prevCart, (draft) => {

                // whatever changes is made to draft will be in the new version of the shopping cart

                // check if the product is already in the shopping cart
                const existingIndex = prevCart.findIndex(cartItem => cartItem.product_id === product.product_id);

                // -1 index means doesn't exist
                // so if the product is not in the shopping cart
                if (existingIndex === -1) {
                    draft.push(product); // add the product to the shopping cart
                } else {
                    // if the item is already in the shopping cart
                    draft[existingIndex].quantity += 1;
                }

                // only need to return draft if it is a primitive (i.e, not array or not object)
                //return draft;

            })

            // whatever is returned from the updateFuncFunction will be the new value of the shopping cart
            return modifiedCart;

        }

        // When setCart runs, it will automatically call updateCartFunc, and pass the current value of the cart 
        // as the first parameter to updateCartFunc
        setCart(updateCartFunc);
    }


    const modifyQuantity = (product_id, quantity) => {

        const updateCartFunc = (prevCart) => {
            const modifiedCart = produce(prevCart, (draft) => {

                // find the index of the product that we are updating
                const existingIndex = prevCart.findIndex(cartItem => cartItem.product_id === product_id);

                if (existingIndex === -1) {
                    return;
                } else {

                    if (quantity > 0) {
                        draft[existingIndex].quantity = quantity;
                    } else {
                        draft.splice(existingIndex, 1);
                    }


                }

            })

            return modifiedCart;
        }

        setCart(updateCartFunc);

    }

    const removeFromCart = (product_id) => {
        const updateCartFunc = (prevCart) => {

            // produce will call the recipe function (the arrow function in the second parameter)
            // and pass prevCart as draft, and whatever changes is made to draft, it will return as the new  value
            const modified = produce(prevCart, (draft) => {

                // find the index of the product that we are updating
                const existingIndex = prevCart.findIndex(cartItem => cartItem.product_id === product_id);

                if (existingIndex !== -1) {
                    draft.splice(existingIndex, 1);
                }

            })

            // because whatever updateCartFunc returns will be the new value for the atom
            return modified;

        }

        // when setCart is called, it will automatically call the function in its first parameter - in this case, updatedCartFunc
        // and it will pass the current value of the shopping cart to it
        setCart(updateCartFunc);
    }

    return {
        cart,
        getCartTotal,
        addToCart,
        modifyQuantity,
        removeFromCart
    }
}