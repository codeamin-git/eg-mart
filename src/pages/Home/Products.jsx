import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({ brand_name: '', category: '', minPrice: '', maxPrice: '' });
    const [sort, setSort] = useState('');

    const fetchProducts = async () => {
        const response = await axios.get('https://server-ten-jade.vercel.app/', {
            params: {
                page,
                search,
                brand_name: filters.brand_name,
                category: filters.category,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
                sort
            }
        });

        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
    };

    useEffect(() => {
        fetchProducts();
    }, [page, search, filters, sort]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setPage(1);
    };

    return (
        <div>
        <h1>Product List</h1>

        {/* Search Input */}
        <input type="text" placeholder="Search products" value={search} onChange={handleSearchChange} />

        {/* Filters */}
        <div>
            <label>Brand: </label>
            <input type="text" name="brand_name" value={filters.brand_name} onChange={handleFilterChange} />
            <label>Category: </label>
            <input type="text" name="category" value={filters.category} onChange={handleFilterChange} />
            <label>Min Price: </label>
            <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
            <label>Max Price: </label>
            <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
        </div>

        {/* Sort Options */}
        <div>
            <label>Sort By: </label>
            <select value={sort} onChange={handleSortChange}>
                <option value="">Select</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="dateNewestFirst">Date: Newest First</option>
            </select>
        </div>

        {/* Product List */}
        <ul>
            {products.map(product => (
                <li key={product._id}>
                    <img src={product.product_img} alt={product.product_name} width="100" />
                    <h3>{product.product_name}</h3>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Brand: {product.brand_name}</p>
                    <p>Category: {product.category}</p>
                </li>
            ))}
        </ul>

        {/* Pagination */}
        <div className='flex justify-center items-center space-x-2 py-4'>
  {/* Previous Button */}
  <button
    className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
  >
    Previous
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
    <button
      key={p}
      className={`px-4 py-2 rounded ${page === p ? 'bg-gray-300 text-black' : 'bg-black text-white hover:bg-gray-800'}`}
      onClick={() => setPage(p)}
      disabled={page === p}
    >
      {p}
    </button>
  ))}

  {/* Next Button */}
  <button
    className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
    onClick={() => setPage(page + 1)}
    disabled={page === totalPages}
  >
    Next
  </button>
</div>
    </div>
    );
};

export default Products;