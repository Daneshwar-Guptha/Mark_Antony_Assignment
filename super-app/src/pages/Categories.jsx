import { useState } from "react";
import CategoryCard from "../components/CategoryCard";
import { categories } from "../services/movieApi";

function Categories({ selected, onChange, onNext }) {
  const [showError, setShowError] = useState(false);

  const toggle = (name) => {
    const next = selected.includes(name)
      ? selected.filter((category) => category !== name)
      : [...selected, name];
    onChange(next);
    setShowError(next.length < 3);
  };

  const submit = () => {
    if (selected.length < 3) {
      setShowError(true);
      return;
    }
    onNext();
  };

  return (
    <section className="category-page">
      <div className="category-copy">
        <h1 className="brand">Super app</h1>
        <h2>Choose your entertainment category</h2>
        <div className="selected-tags">
          {selected.map((category) => (
            <button key={category} type="button" onClick={() => toggle(category)}>
              {category} <span>x</span>
            </button>
          ))}
        </div>
        {showError && <p className="category-error">Minimum 3 category required</p>}
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard
            category={category}
            key={category.name}
            selected={selected.includes(category.name)}
            onToggle={toggle}
          />
        ))}
      </div>
      <button className="floating-action" type="button" onClick={submit}>
        Next Page
      </button>
    </section>
  );
}

export default Categories;
