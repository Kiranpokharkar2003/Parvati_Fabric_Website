import { useState, useEffect } from "react";

export default function useCompare() {
  const [compare, setCompare] = useState(() => {
    return JSON.parse(localStorage.getItem("compare")) || [];
  });

  useEffect(() => {
    localStorage.setItem("compare", JSON.stringify(compare));
  }, [compare]);

  const toggleCompare = (product) => {
    setCompare((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  return { compare, toggleCompare };
}
