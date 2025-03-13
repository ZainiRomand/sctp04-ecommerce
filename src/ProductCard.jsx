export default function ProductCard(props) {
  return (
      <div className="card">
      <img
        src={props.imageUrl}
        className="card-img-top"
        alt={props.productName}
      />
      <div className="card-body">
        <h5 className="card-title">{props.productName}</h5>
        <p className="card-text">${props.price}</p>
        <button  className="btn btn-primary"
          onClick={props.onAddToCart}
        >Add to Cart</button>
      </div>
    </div>
  )
}