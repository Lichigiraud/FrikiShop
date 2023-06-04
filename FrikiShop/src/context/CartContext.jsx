import { createContext, useState } from "react"

export const CartContext = createContext ({
    cart:[]
})

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState ([])

    console.log(cart)

    const addItem = (item, quantity) => {
        if(!isInCart(item.id)) {
            setCart(prev => [...prev, {...item, quantity}])
        }else{
            console.error ('El producto ya fue agregado')
        }
    }

    const removeItem = (itemId) => {
        const cartUpdated = cart.filter(prod => prod.id !== itemId)
        setCart (cartUpdated)
    }

    const clearCart = () => {
        setCart([])
    }

    const isInCart = (itemId) => {
        return cart.some (prod => prod.id === itemId)
    }

    const getTotal = () => {
        let total = 0;
        cart.forEach((products) => {
            total += (products.quantity * products.price)
        })
        return total;
    }
    const getQuantity = () => {
        let quantity = 0
        cart.forEach((products) => {
            quantity += products.quantity
        });
        return quantity;
    };


    return(
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, getTotal, getQuantity}}>
            { children }
        </CartContext.Provider>
    )

}
export default CartContext
