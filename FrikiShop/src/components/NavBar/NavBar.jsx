import CartWidget from "../CartWidget/CartWidget.jsx"
import {NavLink, Link} from 'react-router-dom'

const NavBar = () =>{
    return(
        <nav className="NavBar">
            <Link to='/'>
                <h3>FrikiShop</h3>
            </Link>
            <div className="Categorias">
                <NavLink to={`/category/Consola`} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>PlayStation5</NavLink>
                <NavLink to={`/category/Consola`} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Xbox Serie X </NavLink>
                <NavLink to={`/category/Computadoras`} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Pc Gamer</NavLink>
            </div>
            <CartWidget/>
        </nav>
)}


export default NavBar