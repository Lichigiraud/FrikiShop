import ItemCount from "../ItemCount/ItemCount"
import { useContext, useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom'
import { CartContext } from "../../context/CartContext";
import { db } from "../../services/firebase/firebaseConfig"
import { collection, doc, getDoc } from "firebase/firestore";

const ItemDetail = () =>
    {
        const { id } = useParams();

        const [quantityAdded, setQuantityAdded] = useState(0);

        const { addItem } = useContext(CartContext);

        const [description, setDescription] = useState("");

        const [stock, setStock] = useState("");

        const [precio, setPrecio] = useState("");

        const [nombre, setNombre] = useState("");

        const [categoria, setCategoria] = useState("");

        const [img, setImg] = useState("");

        const fetchProductData = async (id) => {
            const product = await getDoc(doc(db, "products", id));
            if (product.exists()) {
                setDescription(product.data().description);
                setStock(product.data().stock);
                setPrecio(product.data().precio);
                setNombre(product.data().nombre);
                setCategoria(product.data().categoria);
                setImg(product.data().img);
            } else {
                console.log("El producto no existe");
            }
        };

        useEffect(() => {
            fetchProductData(id);
        }, []);
        console.log(id);

        const handleOnAdd = (quantity) => {
            setQuantityAdded(quantity);

            const item = {
                id,
                nombre,
                precio,
                img,
            };

            addItem(item, quantity);
            };
// const ItemDetail = () => {
//     const [quantityAdded, setQuantityAdded] = useState (0)
    
//     const {addItem}= useContext(CartContext)
//     const [productData, setProductData] = useState(null);
    
//     useEffect(() => {
//         const fetchProductData = async () => {
//             try {
//                 const productRef = doc(db, "products", id);
//                 const productSnapshot = await getDoc(productRef);
//                 if (productSnapshot.exists()) {
//                     setProductData(productSnapshot.data());
//                 }
//             } catch (error) {
//                 console.error("Error fetching product data from Firebase:", error);
//             }
//         };

//         fetchProductData();
//     }, [id]);
    
    
    
//     const handleOnAdd = (quantity) => {
//         setQuantityAdded (quantity)

//         const item= {
//             id, nombre, precio, img,
//         }

//         addItem ( item, quantity)
//     }
//     console.log(productData)
    return (
        <article className="CardItem">
            <header className="Header">
                <h2 className="ItemHeader">
                    {nombre}
                </h2>
            </header>
            <picture>
                <img src={img} alt= {nombre} className="ItemImg"/>
            </picture>
            
            <section>
                <p className="Info">
                    Categoria: {categoria}
                </p>
                <p className="Info">
                    Descripción: {description}
                </p>
                <p className="Info">
                    Precio: ${precio}
                </p>
            </section>
            <footer className='ItemFooter'>
                {
                    quantityAdded > 0 ? (
                        <Link to= '/cart' className='Option'>Terminar compra</Link>
                    ):(
                
                <ItemCount initial={1} stock={stock} onAdd={handleOnAdd}/>
                )
            }
            
            </footer>
        </article>
    )
}
export default ItemDetail