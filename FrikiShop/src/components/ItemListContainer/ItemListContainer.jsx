import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ItemList from '../ItemList/itemList'

import {getDocs, collection, query, where} from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'



const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState ([])
    const [loading, setLoading] = useState(true)

    const { categoriaId } = useParams()


    useEffect(() => {
        setLoading(true)

        const collectionRef = categoriaId
            ? query(collection(db, 'products'), where('categoria', '==', categoriaId))
            : collection (db, 'products');

        getDocs(collectionRef)
            .then((response) => {
                const productsAdapted = response.docs.map((doc) =>{
                    const data = doc.data();
                    return {id: doc.id, ...data};
                });
                setProducts(productsAdapted)
            })
            .catch((error) =>{
                console.log(error)
            })
            .finally(()=>{
                setLoading(false)
            })
        }, [categoriaId])
    return(
        <div>
            <h1>{greeting}</h1>
            <ItemList products={products}/>
        </div>
    )
}

export default ItemListContainer;