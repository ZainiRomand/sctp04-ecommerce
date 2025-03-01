import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
import './styles.css';

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">E-Shop</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Header />
      <main className="container my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          <div className="col-md-3 mb-4">
              <ProductCard
                imageUrl="https://picsum.photos/id/20/300/200"
                productName="Product 1"
                price={19.99}
              />
          </div>
          <div className="col-md-3 mb-4">
              <ProductCard
                imageUrl="https://picsum.photos/id/1/300/200"
                productName="Product 2"
                price={29.99}
              />
          </div>
          <div className="col-md-3 mb-4">
              <ProductCard
                imageUrl="https://picsum.photos/id/26/300/200"
                productName="Product 3"
                price={39.99}
              />
          </div>
          <div className="col-md-3 mb-4">
              <ProductCard
                imageUrl="https://picsum.photos/id/96/300/200"
                productName="Product 4"
                price={49.99}
              />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}