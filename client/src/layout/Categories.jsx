
import '../css/Categories.css';

const Categories = () => {
    const categories = [
        'Fiction',
        'Non-fiction',
        'Science Fiction',
        'Fantasy',
        'Mystery',
        'Romance',
        'Biography',
        'Self-Help',
    ];

    return (
        <div className="categories-container">
            <h2 className="categories-title">Book Categories</h2>
            <div className="categories-grid">
                {categories.map((category, index) => (
                    <a href={`/home/${category}`} key={index} className="category-card">
                        <span>{category}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Categories;
