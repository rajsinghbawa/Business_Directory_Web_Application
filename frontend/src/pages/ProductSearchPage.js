import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const ProductSearchPage = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const limit = 6;

  const fetchProducts = async () => {
    try {
      const params = {
        search,
        minPrice,
        maxPrice,
        available: availableOnly,
        page,
        limit,
        sortBy,
        sortOrder
      };
      const res = await API.get('/products', { params });
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, sortBy, sortOrder]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // reset to first page on search
    fetchProducts();
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Browse Products</h2>

        {/* Search Filters */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name"
            className="p-3 border rounded" />
          <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min price"
            className="p-3 border rounded" type="number" />
          <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max price"
            className="p-3 border rounded" type="number" />
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={availableOnly} onChange={() => setAvailableOnly(!availableOnly)} />
            <span>Available only</span>
          </label>
          <button type="submit" className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Search
          </button>
        </form>

        {/* Sort Options */}
        <div className="flex justify-end mb-4 space-x-4 text-sm">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border rounded">
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="p-2 border rounded">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {products.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          ) : (
            products.map((p) => (
              <div key={p._id} className="bg-white rounded shadow p-4">
               <Link to={`/product/${p._id}`}>
  <h3 className="text-xl font-semibold text-blue-800 hover:underline">{p.name}</h3>
</Link>
                <p className="text-gray-600">{p.description}</p>
                <p className="text-green-700 font-medium mt-2">${p.price}</p>
                <p className="text-sm text-gray-500">
                  By: <Link to={`/profile/${p.business._id}`} className="text-blue-500 hover:underline">{p.business.name}</Link>
                </p>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Previous</button>
            <span className="px-4 py-2 bg-blue-100 rounded text-blue-800">Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearchPage;
