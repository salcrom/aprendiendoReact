import { Link } from "../Link";

export default function Page404() {
    return (
        <>
            <div>
                <h1>This is not fine</h1>
                <img
                    src="https://midu.dev/images/this-is-fine-404.gif"
                    alt="this-is-not-fine"
                />
            </div>
            <div>
                <Link to="/">Volver a la home</Link>
            </div>
        </>
    );
}
