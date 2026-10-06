import "./ProductCard.css";
import { useCurrency } from "../context/CurrencyProvider";

const ProductCard = ({ products, addToCart, getProductName }) => {
  const { currency, convertPrice } = useCurrency();

  function getProductDescription(product) {
    return product.description ?? "Ingen beskrivning ännu.";
  }

  function getProductPrice(product) {
    return product.price ?? null;
  }

  return (
    <>
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <div>
            <h2>{getProductName(product)}</h2>

            <p>{getProductDescription(product)}</p>

            <img src={product.image_url} alt={getProductName(product)} />
          </div>

          <div className="product-footer">
            <strong className="product-price">
              {convertPrice(Number(getProductPrice(product))).toFixed(2)}{" "}
              {currency}
            </strong>

            <button type="button" onClick={() => addToCart(product)}>
              Lägg i varukorg
            </button>
          </div>
        </article>
      ))}
    </>
  );
};

export default ProductCard;
