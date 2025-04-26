
import './App.css'


function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una página de ejemplo para crear un React Router desde cero.</p>
      <a href='/about'>Ir a sobre nosotros</a>
    </>
  )
}

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <div>
        <img src="https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-4_1562-749.jpg?t=st=1745647360~exp=1745650960~hmac=d232c0da02253f80cbfa002348dc9f869f8ebd2e8496614957789ae4be777be5&w=2000" alt="Sergio" width="300" height="300" />
        <p>
          ¡Hola!, me llamo Sergio y estoy creando un clon de React Router desde
          cero, para aprender con el profesor Miguel Ángel
        </p>
      </div>
      <a href="/">Ir a Home</a>
    </>)
}

function App() {
  return (
    <main>
      <HomePage />
      <AboutPage />
    </main>
  );
}

export default App
