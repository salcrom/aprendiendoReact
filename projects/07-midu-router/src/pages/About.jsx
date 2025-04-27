import { Link } from '../Link.jsx'

const i18n = {
    es: {
        title: "Sobre nosotros",
        button: "Ir a la home",
        description:
            "¡Hola!, me llamo Sergio y estoy creando un clon de React Router desde cero, para aprender con el profesor Miguel Ángel",
    },
    en: {
        title: "About",
        button: "Go to home",
        description:
            "¡Hello!, my name is Sergio and I am creating a React Router clone from scratch, to learn with the professor Miguel Angel",
    },
};

const useI18n = (lang) => {
    return i18n[lang] || i18n.es;
}

export default function AboutPage({ routeParams }) {
    const i18n = useI18n(routeParams.lang || "es");

    return (
        <>
            <h1>{i18n.title}</h1>
            <div>
                <img src="https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg?t=st=1745647360~exp=1745650960~hmac=d232c0da02253f80cbfa002348dc9f869f8ebd2e8496614957789ae4be777be5&w=2000" alt="Sergio" width="300" height="300" />
                <p>
                    {i18n.description}
                </p>
            </div>
            <Link to={'/'}>{i18n.button}</Link>
        </>)
}
