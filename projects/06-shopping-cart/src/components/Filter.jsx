import { useId } from 'react';
import { useFilters } from '../hooks/useFilters';
import './Filter.css';

export function Filter() {
    const { filters, setFilters } = useFilters();
    
    const minPriceFilterId = useId();
    const categoryFilterId = useId();

    const handleChangeMinPrice = (event) => {
        // Así HUELE MAL, pero es la forma más sencilla de hacerlo
        // DOS FUENTES DE LA VERDAD
        setFilters((prevState) => ({
            ...prevState,
            minPrice: event.target.value,
        }));
    }

    const handleChangeCategory = (event) => {
        // Así HUELE MAL, pero es la forma más sencilla de hacerlo
        setFilters((prevState) => ({
            ...prevState,
            category: event.target.value,
        }));
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
                <input
                    type="range"
                    id={minPriceFilterId}
                    min="0"
                    max="1000"
                    step="10"
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                />
                <span>${filters.minPrice}</span>
            </div>

            <div>
                <label htmlFor={categoryFilterId}>Categoría</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="laptops">Portátiles</option>
                    <option value="smartphones">Móviles</option>
                </select>
            </div>
        </section>
    );
}
