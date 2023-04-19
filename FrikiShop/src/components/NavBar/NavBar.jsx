import CartWidget from "../CartWidget/CartWidget"
import "../../App.css"
const NavBar = () =>{
    return(
        <div>
            <h1>FrikiShop</h1>
            <button>xbox</button>
            <button>playstation</button>
            <button>PC</button>
            <CartWidget/>
        </div>
    )
}


export default NavBar