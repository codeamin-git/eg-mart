import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import Card from '../../components/Card/Card';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState({ brand_name: '', category: '', minPrice: '', maxPrice: '' });
    const [sort, setSort] = useState('');

    if(loading){
      <Loader />
    }
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading to true before making the request
  
        const response = await axios.get('https://server-ten-jade.vercel.app/', {
          params: {
            page,
            search,
            brand_name: filters.brand_name,
            category: filters.category,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            sort,
          },
        });
  
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading to false after the request (success or error)
      }
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
        <div className='mt-6 space-y-4 md:w-2/3 w-full mx-auto'>
        <div className='flex flex-col md:flex-row justify-between gap-2 space-y-4 items-center'>
          {/* Search Input */}
        <div>
        <label>Search: </label>
        <input type="text" placeholder="product name" value={search} onChange={handleSearchChange} className='input input-bordered rounded-lg border-white transition duration-100 ease-in-out transform border focus:shadow-lg focus:shadow-yellow-100 w-full'/>
        </div>

        {/* brand */}
        <div>
        <label>Brand: </label>
        <input type="text" placeholder='apple/dior/gucci/chanel...' name="brand_name" value={filters.brand_name} onChange={handleFilterChange} className='input input-bordered rounded-lg border-white transition duration-100 ease-in-out transform border focus:shadow-lg focus:shadow-yellow-100 w-full'/>
        </div>
        </div>

        {/* category and sort options */}
        <div className='flex flex-col md:flex-row justify-between gap-2 items-center space-y-4'>
        <div>
        <label>Category: </label>
        <input type="text" placeholder='beauty/sports/apparel/books...' name="category" value={filters.category} onChange={handleFilterChange} className='input input-bordered rounded-lg border-white transition duration-100 ease-in-out transform border focus:shadow-lg focus:shadow-yellow-100 w-full'/>
        </div>
        <div>
        <label>Sort By: </label>
            <select value={sort} onChange={handleSortChange} className='input input-bordered rounded-lg border-white transition duration-100 ease-in-out transform border focus:shadow-lg focus:shadow-yellow-100 w-full'>
                <option value="">Select</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="date_asc">Date: Newest First</option>
            </select>
        </div>
        </div>

        {/* price filtering */}
        <div className='flex flex-col md:flex-row justify-between gap-2 space-y-4 items-center'>
            <div>
            <label>Min Price: </label>
            <input type="number" name="minPrice" placeholder='minimum' value={filters.minPrice} onChange={handleFilterChange} className='input input-bordered rounded-lg border-white transition duration-100 ease-in-out transform border focus:shadow-lg focus:shadow-yellow-100 w-full'/>
            </div>
            <div>
            <label>Max Price: </label>
            <input type="number" name="maxPrice" placeholder='maximum' value={filters.maxPrice} onChange={handleFilterChange} className='input input-bordered rounded-lg border-white transition duration-100 ease-in-out transform border focus:shadow-lg focus:shadow-yellow-100 w-full'/>
            </div>
        </div>

        {/* Product List */}
        <div>
          {products?.map(product => (
            <Card key={product._id} image={product?.product_img} name={product?.product_name} price={product?.price} category={product?.category} brand={product?.brand_name} date={product?.creation_date} />
          ))}
        </div>

        {/* Pagination */}
        <div className='flex justify-center items-center flex-wrap gap-2 py-4'>
  {/* Previous Button */}
  <button
    className={`px-3 py-2 rounded text-sm sm:text-base ${page === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
  >
    Previous
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
    <button
      key={p}
      className={`px-3 py-2 rounded text-sm sm:text-base ${page === p ? 'bg-gray-300 text-black' : 'bg-black text-white hover:bg-gray-800'}`}
      onClick={() => setPage(p)}
      disabled={page === p}
    >
      {p}
    </button>
  ))}

  {/* Next Button */}
  <button
    className={`px-3 py-2 rounded text-sm sm:text-base ${page === totalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
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