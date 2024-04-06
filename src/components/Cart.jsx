export default function Cart({ isOpen, handleClose }) {
    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
          <div className="absolute bg-white p-8 rounded-lg shadow-lg">
            <span className="absolute top-0 right-0 p-4 cursor-pointer" onClick={handleClose}>
              &times;
            </span>
            <p>This is the cart popup content.</p>
          </div>
        </div>
    )
}