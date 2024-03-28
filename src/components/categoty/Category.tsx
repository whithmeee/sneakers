import { useState } from "react";
import "./Category.css";

const CATEGORY = [
    "All",
    "Basketball",
    "Lifestyle",
    "Other",
    "Running",
    "Skateboarding",
];

const Category = () => {
    const [activeCategory, setActiveCategory] = useState(0);

    return (
        <div className="category">
            {CATEGORY.map((category, index) => (
                <div
                    onClick={() => setActiveCategory(index)}
                    className={
                        activeCategory === index ? "active" : "category-item"
                    }
                    key={category}
                >
                    {category}
                </div>
            ))}
        </div>
    );
};

export default Category;
