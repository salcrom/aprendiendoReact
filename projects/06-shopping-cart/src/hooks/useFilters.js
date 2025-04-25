import { useContext } from 'react';
import { FiltersContext } from '../context/filtersContext.js';


export const useFilters = () => {
    const { filters, setFilters } = useContext(FiltersContext);

    const filterProducts = (products) => {
        return products.filter(product => {
            return (
                product.price >= filters.minPrice &&
                (filters.category === "all" || filters.category === product.category)
            );
        })
    }

    return { filters, filterProducts, setFilters }

}
