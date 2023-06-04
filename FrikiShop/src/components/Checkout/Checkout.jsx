
import { useState, useContext } from "react";
import { collection, query, where, getDocs, Timestamp, addDoc } from "firebase/firestore";
import { writeBatch, commitBatch } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import { documentId } from "firebase/firestore";
import CartContext from "../../context/CartContext";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState("");

    const { cart, total, clearCart } = useContext(CartContext);

    const createOrder = async ({ nombre, telefono, email }) => {
    setLoading(true);

    try {
        const objOrder = {
        buyer: {
            nombre,
            telefono,
            email,
        },
        items: cart,
        total: total,
        date: Timestamp.fromDate(new Date()),
        };

        const batch = new writeBatch(db);
        const outOfStock = [];
        const ids = cart.map((prod) => prod.id);
        const productsRef = collection(db, "products");
        const productsAddedFromFirestore = await getDocs(
        query(productsRef, where(documentId(), "in", ids))
    );

    if (productsAddedFromFirestore.size !== cart.length) {
        throw new Error("Algunos productos no fueron encontrados en la base de datos");
    }

    productsAddedFromFirestore.forEach((doc) => {
        const product = doc.data();
        const item = cart.find((prod) => prod.id === doc.id);

        if (product.stock >= item.quantity) {
        batch.update(doc.ref, { stock: product.stock - item.quantity });
        } else {
        outOfStock.push(item);
        }
    });

        if (outOfStock.length === 0) {
        const ordersRef = collection(db, "orders");
        const newOrderRef = await addDoc(ordersRef, objOrder);
        setOrderId(newOrderRef.id);
        clearCart();
    } else {
        throw new Error("Los siguientes productos están agotados: " + outOfStock.map((item) => item.title).join(", "));
    }

        await commitBatch(batch);
    } catch (error) {
        console.error("Error al crear el pedido:", error);
    } finally {
        setLoading(false);
    }
    };

    if (loading) {
    return <h1>Se está generando su orden...</h1>;
    }

    if (orderId) {
    return <h1>El id de su orden es: {orderId}</h1>;
    }

    return (
    <div>
        <h1>Checkout</h1>
        <CheckoutForm onConfirm={createOrder} />
    </div>
    );
};

export default Checkout;

// import { useState, useContext } from "react";
// import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
// import { writeBatch } from "firebase/firestore";
// import CartContext from "../../context/CartContext";
// import { db } from "../../services/firebase/firebaseConfig";

// const Checkout = () =>{
//     const [loading, setLoading] = useState (false)
//     const [orderId, setOrderId] = useState ('')

//     const { cart, total, clearCart} = useContext(CartContext)

//     const createOrder = async ({ nombre, telefono, email}) => {
//         setLoading(true)

//         try{
//             const objOrder = {
//                 buyer: {
//                     nombre, telefono, email
//                 },
//                 items: cart,
//                 total: total,
//                 date: Timestamp.fromDate(new Date())
//             }
//             const batch = writeBatch (db)
//             const outOfStock=[]
//             const ids= cart.map(prod => prod.id)
//             const productsRef=collection(db, 'products')
//             const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(),'in', ids)))
            
//         }
//     }

//     if(loading) {
//         return <h1>Se esta generando su orden...</h1>
//     }

//     if(orderId){
//         return <h1>El id de su orden es:{orderId}</h1>
//     }

//     return(
//         <div>
//             <h1>Checkout</h1>
//             <CheckoutForm onConfirm={createOrder}/>
//         </div>
//     )
// }

// export default Checkout