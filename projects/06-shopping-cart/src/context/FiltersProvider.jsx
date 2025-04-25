import { useState } from 'react';
import { FiltersContext } from "./filtersContext";

// 2.Crear el provider, para proveer el contexto
export const FiltersProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        category: "all",
        minPrice: 0,
    });

    return (
        <FiltersContext.Provider
            value={{
                filters,
                setFilters
            }}
        >
            {children}
        </FiltersContext.Provider>
    );
};
