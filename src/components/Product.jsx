export default function Product(props) {
    const data = props.data

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
                <button className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Add to Cart
                </button>
            </div>
        </div>
    )
}