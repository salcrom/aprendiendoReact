import { useEffect } from "react"
import { Link } from "../Link";

export default function SearchPage({ routeParams }) {
    useEffect(() => {
      document.title = `Has buscado: ${routeParams.query}`;
    }, [routeParams.query]);

    return (
        <>
            <div>
                <h1>Has buscado: {routeParams.query}</h1>
            </div>
            <div>
                <Link to="/">Volver a la home</Link>
            </div>
        </>
    )
}
