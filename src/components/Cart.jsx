import { useContext } from "react"
import { CartContext } from "../CartContext"

export default function Cart({ isOpen, handleClose }) {
    const { cart, setCart } = useContext(CartContext)

    const handleRemoveFromCart = (id) => {
        let existingProducts = []
        for (let i = 0; i < cart.products.length; i++) {
            const product = cart.products[i]
            if (!(product.id == id))
            existingProducts.push({
                id: product.id,
                quantity: product.quantity
            })
        }

        fetch('https://dummyjson.com/carts/1', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                merge: false,
                products: existingProducts
            })
        })
        .then(res => res.json())
        .then(updatedCart => setCart(updatedCart))
    }

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
          <div className="absolute bg-white p-8 rounded-lg shadow-lg">
            <span className="absolute top-0 right-0 p-4 cursor-pointer" onClick={handleClose}>
              &times;
            </span>
            <div className="container mx-auto mt-8">
                <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                <div className="border w-auto">
                    <div className="flex justify-between items-center p-4 border-b font-bold">
                    <div className="w-48">Product</div>
                    <div className="w-48">Price</div>
                    <div className="w-48">Quantity</div>
                    <div className="w-48"></div>
                    </div>
                    {Object.keys(cart).length !== 0 ? cart.products.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-4 border-b">
                        <div className="w-48">{item.title}</div>
                        <div className="w-48">${item.price}</div>
                        <div className="w-48">{item.quantity}</div>
                        <button onClick={() => handleRemoveFromCart(item.id)} className="w-48 px-4 py-2 bg-red-500 text-white rounded">Remove</button>
                    </div>
                    )) : <p></p>}
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-bold">Total: ${cart.total}</h3>
            </div>
          </div>
        </div>
    )
}