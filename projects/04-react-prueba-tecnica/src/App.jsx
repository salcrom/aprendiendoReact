import { useState, useEffect } from "react";
import { getRandomFact } from "./services/facts";
import { useCatImage } from "./hooks/useCatImage";
import { useCatFact } from "./hooks/useCatFact";
import "./App.css";
import { Otro } from "./components/Otro";


const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// {"fact":"A cat usually has about 12 whiskers on each side of its face.","length":61}
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
// const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'


export function App() {
    const { fact, refreshFact } = useCatFact();
    const { imageUrl } = useCatImage({ fact });

    const handleClick = async() => {
        refreshFact()
    }

    return (
        <main>
            <h1>App de gatitos</h1>
            <button onClick={ handleClick }>Get new fact</button>


            {fact && <p>{fact}</p>}
                {imageUrl && (
                    <img
                    src={`${imageUrl}`}
                    alt={`Image extracted using the first three words of the fact: ${fact}`}
                    />
                )}

            <Otro />
        </main>
    );
}
