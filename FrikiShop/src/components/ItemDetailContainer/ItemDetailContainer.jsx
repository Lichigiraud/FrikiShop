import { useEffect, useState } from "react"
import ItemDetail from "../ItemDetail/ItemDetail"
import {useParams} from 'react-router-dom'
import { db } from "../../services/firebase/firebaseConfig"
import {getDoc, doc} from 'firebase/firestore'

const ItemDetailContainer = () => {
    const [product, setProduct] = useState (null)
    const [loading, setLoading] = useState (true)


    const {id} = useParams()

    useEffect(() => {
        setLoading(true)
        const docRef = doc(db,'products', id)

        getDoc(docRef)
            .then(response =>{
                const data = response.data()
                const productAdapted = {id: response.id, ...data}
                setProduct(productAdapted)
            })
            .catch(error =>{
                console.log(error)
            })
            .finally(()=>{
                setLoading(false)
            })




        // getProductById (itemId)
        //     .then(response => {
        //         setProduct(response)
        //     })
        //     .catch(error =>{
        //         console.error(error)
        //     })
    }, [id])

    return(
        <div className='ItemDetailContainer'>
            <ItemDetail {...product}/>
        </div>
    )
}
export default ItemDetailContainer