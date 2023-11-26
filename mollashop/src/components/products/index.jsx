import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/usefetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faGlasses } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { Slider } from "antd"

import "./products.scss";

function Products() {
    const [data, setData, fetchData] = useFetch([]);
    const [columns, setColumns] = useState(3);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColor, setSelectedColor] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isColorOpen, setIsColorOpen] = useState(false);
    const [isSizeOpen, setIsSizeOpen] = useState(false);
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const itemsPerPage = 4;
    const [priceRange, setPriceRange] = useState([0, 120]);

    const handlePriceChange = (value) => {
        setPriceRange(value);
        if (value[0] < priceRange[0] || value[1] > priceRange[1]) {
            fetchData();
        } else {
            const filtered = data.filter(
                (item) => item.price >= value[0] && item.price <= value[1]
            );
            setData([...filtered]);
            setCurrentPage(1);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories, selectedColor, selectedSize]);

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
            setSelectedColor(selectedColor.filter((co) => co !== color));
        } else {
            setSelectedColor([...selectedColor, color]);
        }
    };

    const applySizeFilter = (size) => {
        if (selectedSize.includes(size)) {
            setSelectedSize(selectedSize.filter((s) => s !== size));
        } else {
            setSelectedSize([...selectedSize, size]);
        }
    };

    const applyBrandFilter = (brand) => {
        if (selectedBrand.includes(brand)) {
            setSelectedBrand(selectedBrand.filter((b) => b !== brand));
        } else {
            setSelectedBrand([...selectedBrand, brand]);
        }
    };

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedColor([]);
        setSelectedSize([]);
        setSelectedBrand([]);
        setPriceRange([]);
        setPriceRange([0, 120]); // Reset price range to its initial value
        fetchData(); // Fetch the original data
    };

    const filteredData = data.filter(
        (item) =>
            (selectedCategories.length === 0 ||
                selectedCategories.includes(item.category)) &&
            (selectedColor.length === 0 || selectedColor.includes(item.color)) &&
            (selectedSize.length === 0 || selectedSize.includes(item.size)) &&
            (selectedBrand.length === 0 || selectedBrand.includes(item.brand))
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginationButtons = Array.from({ length: pageNumbers }, (_, index) => (
        <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
        >
            {index + 1}
        </button>
    ));

    return (
        <div className="allcontainer">
            <div className="filtersside">
                <div className="filter">
                    <p>Filters</p>
                    <span onClick={clearAllFilters}>Clear All</span>
                </div>
                <div className="category">
                    <h2 onClick={() => setIsCategoryOpen(!isCategoryOpen)}>Category <FontAwesomeIcon icon={faChevronDown} /></h2>
                    {isCategoryOpen && (
                        <>
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
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="Jumpers"
                                        checked={selectedCategories.includes("Jumpers")}
                                        onChange={() => applyCategoryFilter("Jumpers")}
                                    />
                                    Jumpers
                                </div>
                                <span>1</span>
                            </label>
                        </>
                    )}
                </div>
                {/* ////////////////////////////////////////////////////////////////////////////////// */}
                <div>
                    <h2 className="colortext" onClick={() => setIsColorOpen(!isColorOpen)}>Color <FontAwesomeIcon icon={faChevronDown} /></h2>
                    {isColorOpen && (
                        <>
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
                        </>
                    )}
                </div>
                {/*//////////////////////////////////////////////////////////////////////////////////////////////*/}
                <div className="sizes">
                    <h2 onClick={() => setIsSizeOpen(!isSizeOpen)}>Size <FontAwesomeIcon icon={faChevronDown} /></h2>
                    {isSizeOpen && (
                        <>
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
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="XL"
                                        checked={selectedSize.includes("XL")}
                                        onChange={() => applySizeFilter("XL")}
                                    />
                                    XL
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="XXL"
                                        checked={selectedSize.includes("XXL")}
                                        onChange={() => applySizeFilter("XXL")}
                                    />
                                    XXL
                                </div>
                            </label>
                        </>
                    )}
                </div>
                {/*//////////////////////////////////////////////////////////////////////////////////////////////*/}
                <div className="brand">
                    <h2 onClick={() => setIsBrandOpen(!isBrandOpen)}>Brand <FontAwesomeIcon icon={faChevronDown} /></h2>
                    {isBrandOpen && (
                        <>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="Next"
                                        checked={selectedBrand.includes("Next")}
                                        onChange={() => applyBrandFilter("Next")}
                                    />
                                    Next
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="Geox"
                                        checked={selectedBrand.includes("Geox")}
                                        onChange={() => applyBrandFilter("Geox")}
                                    />
                                    Geox
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="Newbalance"
                                        checked={selectedBrand.includes("Newbalance")}
                                        onChange={() => applyBrandFilter("Newbalance")}
                                    />
                                    Newbalance
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="Ugg"
                                        checked={selectedBrand.includes("Ugg")}
                                        onChange={() => applyBrandFilter("Ugg")}
                                    />
                                    Ugg
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="F&F"
                                        checked={selectedBrand.includes("F&F")}
                                        onChange={() => applyBrandFilter("F&F")}
                                    />
                                    F&F
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="RiverIsland"
                                        checked={selectedBrand.includes("RiverIsland")}
                                        onChange={() => applyBrandFilter("RiverIsland")}
                                    />
                                    RiverIsland
                                </div>
                            </label>

                        </>
                    )}
                </div>
                {/*//////////////////////////////////////////////////////////////////////////////////////////////*/}
                <h2 onClick={() => setIsPriceOpen(!isPriceOpen)}>Price <FontAwesomeIcon icon={faChevronDown} /></h2>
                {isPriceOpen && (
                    <>
                        <Slider
                            range={{
                                draggableTrack: true,


                            }}
                            value={priceRange}
                            max={120}
                            onChange={handlePriceChange}
                        />

                    </>
                )}

            </div>
            <div className="shopside">
                <div className="sort">
                    <div className="sortleft">
                        <p>Showing <span>{filteredData.length} of 12</span> Products</p>
                    </div>
                    <div className="sortright">
                        <p>Sort by:</p>
                        <div>
                            <button className="sortbtn" onClick={handleAtoZ}>A-Z</button>
                            <button className="sortbtn" onClick={handleZtoA}>Z-A</button>
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
                <div
                    className="products"
                    style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
                >
                    {currentItems.map((item) => (
                        <ul key={item.id}>
                            <div className="cardimgs">
                                <img src={item.image} alt="" />
                                <div className="righticons">
                                    <div className="circle"><FontAwesomeIcon icon={faHeart} /></div>
                                    <div className="circle"><FontAwesomeIcon icon={faGlasses} /></div>
                                    <div className="circle"><FontAwesomeIcon icon={faRandom} /></div>
                                </div>
                                <div className="addtocart">
                                    <p>Add To Cart</p>
                                </div>
                            </div>
                            <li>{item.category}</li>
                            <li>{item.name}</li>
                            <li>${item.price}</li>
                        </ul>
                    ))}
                </div>
                <div className="pagination">{paginationButtons}</div>
            </div>
        </div>
    );
}

export default Products;
