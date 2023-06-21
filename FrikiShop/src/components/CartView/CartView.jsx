import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartView = () => {
    const { cart, removeItem, getTotal } = useContext(CartContext);

    return cart.length > 0 ? (
        <div>
            {cart.map((products) => (
                <div className="cart-item-container">
                    <img src={products.img} />
                    <span>{products.nombre}</span>
                    <span>{products.precio}</span>

                    <span> Cantidad: {products.quantity} </span>
                    <button onClick={() => removeItem(products.id)}>
                        Eliminar
                    </button>
                </div>
            ))}
            <div>
                <h4>Precio total: {getTotal()}</h4>
                <Link to="/checkout">
                    <button className="Option"> Confirmar compra </button>
                </Link>
            </div>
        </div>
    ) : (
        <div>
            <div className="cart-container">
                <h1>No hay elementos en el carrito</h1>
                <Link to="/" className="Option">
                    <button className="button">Seguir comprando</button>
                </Link>
            </div>
        </div>
    );
};
export default CartView;


// import { useContext } from "react"
// import { CartContext } from "../../context/CartContext"
// import { Link } from "react-router-dom";


// const CartView = () => {
//     const { cart, removeItem, getTotal } = useContext (CartContext);

//     return cart.length > 0 ? (

//         <div>
//             {
//             cart.map ((products) => (
//                 <div className="cart-item-container">
//                     <img src={products.img}/>
//                     <span>{products.nombre}</span>
//                     <span>{products.precio}</span>
                    

//                     <span> Cantidad: {products.quantity} </span>
//                     <button onClick={()=> removeItem(products.id)}>
//                         Eliminar
//                     </button>
//                 </div>
//             ))}
//             <div>
//                 <h4>Precio total: {getTotal()}</h4>
//                 <Link to="/checkout">
//                 <button className="Option"> Confirmar compra </button></Link>
//             </div>
//         </div>
            
//         ):(
//         <div>
//             <div className="cart-container">
//                 <h1>No hay elementos en el carrito</h1>
//                 <Link to="/" className="Option">
//                     <button className="button">Seguir comprando</button>
//                 </Link>
//             </div>
//         </div>
//     )
// }
// export default CartView