// import { useCart } from '../hooks/useCart'
// import { useFilters } from '../hooks/useFilters'
import './Footer.css'


export function Footer() {
  // const { cart } = useCart();
  // const { filters } = useFilters()

  return (
    <footer className="footer">
      {/* {JSON.stringify(filters, null, 2)}
        {JSON.stringify(cart, null, 2)} */}

      <h4>Prueba técnica de React ⚛️ - <span>@midudev</span></h4>
      <h5>Shopping cart con useContext & useReducer</h5>

    </footer>
  );
}
