import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
// import Cart from '../Cart/cart'
import carrito from './assets/cart.svg'



const CartWidget =()=>{
    const { cart, getQuantity } = useContext(CartContext) 

    return cart.length > 0 ?(
    <div>
        <Link to="/cart" className='Option'>
            <img src={carrito} alt="" className='icon' />
            <span className='cantidad'>{getQuantity()}</span>
        </Link>
    </div>
    ):(
    <></>
    )
}
export default CartWidget