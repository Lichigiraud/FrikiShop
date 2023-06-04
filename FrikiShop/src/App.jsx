import './App.css'
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import CartView from './components/CartView/CartView'


function App() {
  return(
      <div className="app">
        <BrowserRouter>
          <CartProvider>
              <NavBar/>
              <Routes>
                <Route path='/' element={<ItemListContainer greeting={'Todos nuestros productos'}/>}/>
                <Route path='/category/:categoriaId' element={<ItemListContainer greeting={'Productos por categoria'} />}/>
                <Route path='/item/:id' element={<ItemDetailContainer/>}/>
                <Route path='/cart' element={<CartView/>}/>
                <Route path='*' element={<h1>404 NOT FOUND</h1>}/>
              </Routes>
              </CartProvider>
        </BrowserRouter>
      </div>
  );
}

export default App
