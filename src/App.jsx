import { useEffect, useState } from 'react'
import './App.css'
import Product from './components/Product'
import Cart from './components/Cart';
import { CartContext } from './CartContext';

export default function App() {
  const [cart, setCart] = useState({})
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);


  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(response => response.json())
      .then(data => setProducts(data.products))
  }, [])

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const filteredProducts = products.filter(product =>
    product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <CartContext.Provider value={{cart, setCart}}>
    <div className="w-full">
      <div className="fixed top-0 left-0 w-full bg-gray-200 p-4 shadow-md">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-1/2 p-2 rounded border"
        />
        <div>
          <button className="mt-2" onClick={toggleCart}>Cart</button>
          {isCartOpen && <>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
            <Cart isOpen={isCartOpen} handleClose={toggleCart} />
          </>}
        </div>
      </div>
      <div className="mt-20">
        {
          filteredProducts.length
          ? <div className="grid grid-cols-3 gap-4">
              {
                filteredProducts.map((product) => (
                  <Product key={product.id} data={product} />
                ))
              }
            </div>
          : <p className="text-center font-bold w-full">No products found</p>
        }
      </div>
    </div>
    </CartContext.Provider>
  )
}

