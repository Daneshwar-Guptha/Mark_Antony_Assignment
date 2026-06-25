function CategoryCard({ category, selected, onToggle }) {
  const handleImageError = (event) => {
    event.currentTarget.hidden = true;
    event.currentTarget.nextElementSibling.hidden = false;
  };

  return (
    <button
      className={`category-card ${selected ? "selected" : ""}`}
      type="button"
      style={{ backgroundColor: category.color }}
      onClick={() => onToggle(category.name)}
    >
      <span>{category.name}</span>
      {category.image ? (
        <>
          <img src={category.image} alt={`${category.name} movie category`} onError={handleImageError} />
          <div className="category-image-placeholder" hidden>
            {category.name}
          </div>
        </>
      ) : (
        <div className="category-image-placeholder">{category.name}</div>
      )}
    </button>
  );
}

export default CategoryCard;
