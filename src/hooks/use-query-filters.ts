import { useEffect } from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  useEffect(() => {
    const params = {
      ...filters.prices,
      sizes: Array.from(filters.sizes),
      pizzaTypes: Array.from(filters.pizzaTypes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(params, { arrayFormat: "comma" });
    router.push(`?${query}`, { scroll: false });
  }, [
    filters.prices.priceFrom,
    filters.prices.priceTo,
    Array.from(filters.sizes).join(","),
    Array.from(filters.pizzaTypes).join(","),
    Array.from(filters.selectedIngredients).join(","),
    router,
  ]);
};
