import CartWidget from "../CartWidget/CartWidget.jsx"
import {NavLink, Link} from 'react-router-dom'

const NavBar = () =>{
    return(
        <nav className="NavBar">
            <Link to='/'>
                <h3>FrikiShop</h3>
            </Link>
            <div className="Categorias">
                <NavLink to={`/category/consolas`} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Consolas</NavLink>
                <NavLink to={`/category/accesorios`} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Accesorios</NavLink>
                <NavLink to={`/category/computadoras`} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Computadoras</NavLink>
            </div>
            <CartWidget/>
        </nav>
)}


export default NavBar