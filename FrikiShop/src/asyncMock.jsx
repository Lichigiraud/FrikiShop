import playStation5 from './catalogo/playStation5.jpeg'
import xboxSerieX from'./catalogo/xboxSerieX.jpeg'
import pcGamer from'./catalogo/pcGamer.jpeg'
const products = [
    {
        id: '1',
        nombre: 'PlayStation 5',
        precio: 400000,
        categoria: 'consolas',
        img: playStation5,
        stock: 25,
        description: 'descripcion de la play'
        
    },
    {
        id: '2',
        nombre: 'Xbox Serie X',
        precio: 300000,
        categoria: 'consolas',
        img: xboxSerieX,
        stock: 15 ,
        description:'descripcion de la xbox'
    },
    {
        id: '3',
        nombre: 'Pc Gamer',
        precio: 250000 ,
        categoria: 'computadoras' ,
        img: pcGamer,
        stock: 4,
        description: 'descripcion de la pc',
    }
]
export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 500)
    })
}
export const getProductById =(productId)=>{
    return new Promise ((resolve)=>{
        setTimeout (() => {
            resolve(products.find((prod) => prod.id === productId))
        }, 500)
    })
}
export const getProductsByCategory = (productCategory) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find((prod) => prod.categoria === productCategory));
        }, 500);
    });
}