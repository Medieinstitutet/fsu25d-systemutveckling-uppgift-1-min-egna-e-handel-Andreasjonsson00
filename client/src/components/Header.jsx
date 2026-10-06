import { Link } from "react-router-dom";
import "./Header.css";
import { useCurrency } from "../context/CurrencyProvider";

const Header = ({ auth, onLogout }) => {
  const { currency, setCurrency } = useCurrency();

  return (
    <>
      <header className="site-header">
        <Link to="/">
          <h1>Min e-handel</h1>
        </Link>

        {auth && <strong>{auth.user.role}</strong>}

        <nav>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            aria-label="Välj valuta"
          >
            <option value="SEK">SEK</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
          {auth?.user.role === "admin" && (
            <>
              <Link to="/admin/products">
                <button type="button">Produkter</button>
              </Link>

              <Link to="/orders">
                <button type="button">Ordrar</button>
              </Link>
            </>
          )}

          {auth ? (
            <button type="button" onClick={onLogout}>
              Logga ut
            </button>
          ) : (
            <Link to="/login">Logga in</Link>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
