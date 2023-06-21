import { useState, useContext } from "react";
import {
    collection,
    query,
    where,
    getDocs,
    Timestamp,
} from "firebase/firestore";
import { writeBatch } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import { documentId, addDoc } from "firebase/firestore";
import CartContext from "../../context/CartContext";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
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
            const batch = writeBatch(db);

            const outOfStock = [];

            const ids = cart.map((prod) => prod.id);

            const productsRef = collection(db, "products");

            const productsAddedFromFirestore = await getDocs(
                query(productsRef, where(documentId(), "in", ids))
            );

            const { docs } = productsAddedFromFirestore;

            docs.forEach((doc) => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock;

                const productAddedToCart = cart.find(
                    (prod) => prod.id === doc.id
                );
                const prodQuantity = productAddedToCart?.quantity;

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc });
                }
            });

            if (outOfStock.length === 0) {
                await batch.commit();

                const orderRef = collection(db, "orders");
                const orderAdded = await addDoc(orderRef, objOrder);

                setOrderId(orderAdded.id);
                clearCart();
            } else {
                throw new Error(
                    "Los siguientes productos estan agotados: " +
                        outOfStock.map((item) => item.title).join(", ")
                );
            }
        } catch (error) {
            console.error("Error al crear el pedido:", error);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <h1>Se esta generando su orden...</h1>;
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
export default Checkout;