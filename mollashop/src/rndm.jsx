import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/usefetch";
import "./products.scss";

function Products() {
    const [data, setData, fetchData] = useFetch([]);
    const [columns, setColumns] = useState(3);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColor, setSelectedColor] = useState([])
    const [selectedSize, setSelectedSize] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    const handleAtoZ = (e) => {
        e.preventDefault();
        const sortByCategory = [...data].sort((a, b) => a.name.localeCompare(b.name));
        setData([...sortByCategory]);
    };
    const handleZtoA = (e) => {
        e.preventDefault();
        const sortByCategory = [...data].sort((a, b) => b.name.localeCompare(a.name));
        setData([...sortByCategory]);
    };
    const handleLowtoHigh = () => {
        const sortByPrice = [...data].sort((a, b) => a.price - b.price)
        setData(sortByPrice)
    }
    const handleHightoLow = () => {
        const sortByPrice = [...data].sort((a, b) => b.price - a.price)
        setData(sortByPrice)
    }

    const sortByTwo = () => {
        setColumns(2);
    };

    const sortByThree = () => {
        setColumns(3);
    };

    const sortByFour = () => {
        setColumns(4);
    };

    const applyCategoryFilter = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const applyColorFilter = (color) => {
        if (selectedColor.includes(color)) {
            setSelectedColor(selectedColor.filter((co) => co !== color))
        }
        else {
            setSelectedColor([...selectedColor, color])
        }
    }
    const applySizeFilter = (size) => {
        if (selectedSize.includes(size)) {
            setSelectedSize(selectedSize.filter((s) => s !== size))
        }
        else {
            setSelectedSize([...selectedSize, size])
        }
    }
    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedColor([])
        setSelectedSize([])
    };

    const filteredData = data.filter(
        (item) =>
            (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
            (selectedColor.length === 0 || selectedColor.includes(item.color)) &&
            (selectedSize.length === 0 || selectedSize.includes(item.size))
    );

    return (
        <div className="allcontainer">
            <div className='filtersside'>
                <div className="filter">
                    <p>Filters</p>
                    <span onClick={clearAllFilters}>Clear All</span>
                </div>
                <div className="category">
                    <label>
                        <div>
                            <input
                                type="checkbox"
                                value="Women"
                                checked={selectedCategories.includes("Women")}
                                onChange={() => applyCategoryFilter("Women")}
                            />
                            Women
                        </div>
                        <span>
                            1
                        </span>
                    </label>
                    <label>
                        <div>
                            <input
                                type="checkbox"
                                value="Dresses"
                                checked={selectedCategories.includes("Dresses")}
                                onChange={() => applyCategoryFilter("Dresses")}
                            />
                            Dresses
                        </div>
                        <span>2</span>
                    </label>
                    <label>
                        <div>
                            <input
                                type="checkbox"
                                value="Jackets"
                                checked={selectedCategories.includes("Jackets")}
                                onChange={() => applyCategoryFilter("Jackets")}
                            />
                            Jackets
                        </div>
                        <span>1</span>
                    </label>
                    <label>
                        <div>
                            <input
                                type="checkbox"
                                value="Jeans"
                                checked={selectedCategories.includes("Jeans")}
                                onChange={() => applyCategoryFilter("Jeans")}
                            />
                            Jeans
                        </div>
                        <span>1</span>
                    </label>
                    <label>
                        <div>
                            <input
                                type="checkbox"
                                value="Shoes"
                                checked={selectedCategories.includes("Shoes")}
                                onChange={() => applyCategoryFilter("Shoes")}
                            />
                            Shoes
                        </div>
                        <span>
                            2
                        </span>
                    </label>
                    <label>
                        <div>
                            <input
                                type="checkbox"
                                value="Bags"
                                checked={selectedCategories.includes("Bags")}
                                onChange={() => applyCategoryFilter("Bags")}
                            />
                            Bags
                        </div>
                        <span>4</span>
                    </label>
                </div>
                {/*//////////////////////////////////////////////////////////////////////////////////////////////*/}
                <div className="colors">
                    <input
                        className="brown"
                        type="checkbox"
                        value="Brown"
                        checked={selectedColor.includes("Brown")}
                        onChange={() => applyColorFilter("Brown")}
                    />

                    <input
                        className="black"
                        type="checkbox"
                        value="Black"
                        checked={selectedColor.includes("Black")}
                        onChange={() => applyColorFilter("Black")}
                    />
                    <input
                        className="yellow"
                        type="checkbox"
                        value="Yellow"
                        checked={selectedColor.includes("Yellow")}
                        onChange={() => applyColorFilter("Yellow")}
                    />
                    <input
                        className="blue"
                        type="checkbox"
                        value="Blue"
                        checked={selectedColor.includes("Blue")}
                        onChange={() => applyColorFilter("Blue")}
                    />
                    <input
                        className="khaki"
                        type="checkbox"
                        value="Khaki"
                        checked={selectedColor.includes("Khaki")}
                        onChange={() => applyColorFilter("Khaki")}
                    />
                    <input
                        className="beige"
                        type="checkbox"
                        value="Beige"
                        checked={selectedColor.includes("Beige")}
                        onChange={() => applyColorFilter("Beige")}
                    />
                    <input
                        className="orange"
                        type="checkbox"
                        value="Orange"
                        checked={selectedColor.includes("Orange")}
                        onChange={() => applyColorFilter("Orange")}
                    />
                </div>
                {/*//////////////////////////////////////////////////////////////////////////////////////////////*/}
                <div className="">
                    <label>
                        <div>
                            <input
                                type="checkbox"
                                value="Xs"
                                checked={selectedSize.includes("Xs")}
                                onChange={() => applySizeFilter("Xs")}
                            />
                            XS
                        </div>
                    </label>
                    <label>
                        <div>
                            <input
                                type="checkbox"
                                value="S"
                                checked={selectedSize.includes("S")}
                                onChange={() => applySizeFilter("S")}
                            />
                            S
                        </div>
                    </label>
                    <label>
                        <div>
                            <input
                                type="checkbox"
                                value="M"
                                checked={selectedSize.includes("M")}
                                onChange={() => applySizeFilter("M")}
                            />
                            M
                        </div>
                    </label>
                    <label>
                        <div>
                            <input
                                type="checkbox"
                                value="L"
                                checked={selectedSize.includes("L")}
                                onChange={() => applySizeFilter("L")}
                            />
                            L
                        </div>
                    </label>
                </div>
                {/*//////////////////////////////////////////////////////////////////////////////////////////////*/}
                <div className="price">
                    <button onClick={handleLowtoHigh}>Low To High</button>
                    <button onClick={handleHightoLow}>High To Low</button>
                </div>
                {/*//////////////////////////////////////////////////////////////////////////////////////////////*/}
            </div>
            <div className="shopside">
                <div className="sort">
                    <div className="sortleft">
                        <p>Showing <span>{filteredData.length} of 56</span> Products</p>
                    </div>
                    <div className="sortright">
                        <p>Sort by:</p>
                        <div>
                            <button onClick={handleAtoZ}>A-Z</button>
                            <button onClick={handleZtoA}>Z-A</button>
                        </div>
                        <button onClick={sortByTwo}>
                            <svg width="10" height="10">
                                <rect x="0" y="0" width="4" height="4"></rect>
                                <rect x="6" y="0" width="4" height="4"></rect>
                                <rect x="0" y="6" width="4" height="4"></rect>
                                <rect x="6" y="6" width="4" height="4"></rect>
                            </svg>
                        </button>
                        <button onClick={sortByThree}>
                            <svg width="16" height="10">
                                <rect x="0" y="0" width="4" height="4"></rect>
                                <rect x="6" y="0" width="4" height="4"></rect>
                                <rect x="12" y="0" width="4" height="4"></rect>
                                <rect x="0" y="6" width="4" height="4"></rect>
                                <rect x="6" y="6" width="4" height="4"></rect>
                                <rect x="12" y="6" width="4" height="4"></rect>
                            </svg>
                        </button>
                        <button onClick={sortByFour}>
                            <svg width="22" height="10">
                                <rect x="0" y="0" width="4" height="4"></rect>
                                <rect x="6" y="0" width="4" height="4"></rect>
                                <rect x="12" y="0" width="4" height="4"></rect>
                                <rect x="18" y="0" width="4" height="4"></rect>
                                <rect x="0" y="6" width="4" height="4"></rect>
                                <rect x="6" y="6" width="4" height="4"></rect>
                                <rect x="12" y="6" width="4" height="4"></rect>
                                <rect x="18" y="6" width="4" height="4"></rect>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="products" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                    {filteredData.map((item) => (
                        <ul key={item.id}>
                            <img src={item.image} alt="" />
                            <li>{item.category}</li>
                            <li>{item.name}</li>
                            <li>${item.price}</li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
