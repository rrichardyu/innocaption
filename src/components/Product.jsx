import { useContext } from "react"
import { CartContext } from "../CartContext"

export default function Product(props) {
    const { cart, setCart } = useContext(CartContext)
    const data = props.data

    const handleAddToCart = () => {
        if (Object.keys(cart).length === 0) {
            fetch('https://dummyjson.com/carts/1', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    merge: false,
                    products: [
                        {
                            id: props.data.id,
                            quantity: 1
                        }
                    ]
                })
            })
            .then(res => res.json())
            .then(updatedCart => setCart(updatedCart))
        } else {
            let existingProducts = []
            for (let i = 0; i < cart.products.length; i++) {
                const product = cart.products[i]
                existingProducts.push({
                    id: product.id,
                    quantity: product.quantity
                })
            }

            existingProducts.push(
                {
                    id: props.data.id,
                    quantity: 1
                }
            )

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
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col flex-wrap">
            <img className="w-full h-40 object-cover" src={data.images[data.images.length - 1]} alt="Item Image" style={{WebkitUserDrag: "none", UserDrag: "none"}} />
            <div className="px-6 py-2 flex-grow">
                <div>
                    <p className="font-bold text-xl py-2 text-left">
                        {data.title}
                    </p>
                </div>
                <div>
                    <p className="text-gray-700 text-base text-left">
                        {data.description}
                    </p>
                </div>
            </div>
            <div className="px-6 py-2">
                <span className="inline-block bg-gray-100 rounded px-3 py-3 text-sm font-semibold text-gray-700 mr-2">${data.price}</span>
                <button className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddToCart}>
                Add to Cart
                </button>
            </div>
        </div>
    )
}