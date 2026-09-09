import React, { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart, Filter, Grid, List } from 'lucide-react';
import Cart from './cart';
import Checkout from './Checkout';

export default function BuyPerfume({ setActiveSection }) {
  // Data & UI state
  const [perfumes, setPerfumes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [page, setPage] = useState(1);
  const limit = 12;
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });
  const [cartMessage, setCartMessage] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  // Fetch filter metadata once
  useEffect(() => {
    fetch('/api/perfumes/meta/brands')
      .then(r => r.json())
      .then(setBrands)
      .catch(console.error);

    fetch('/api/perfumes/meta/categories')
      .then(r => r.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  // Fetch perfumes whenever filters/sort/page change
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page,
      limit,
      sortBy,
      brand,
      category,
      minPrice,
      maxPrice
    }).toString();

    fetch(`/api/perfumes?${params}`)
      .then(r => r.json())
      .then(({ perfumes, pagination }) => {
        setPerfumes(perfumes);
        setPagination(pagination);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, sortBy, brand, category, minPrice, maxPrice]);

  // Add to cart handler
  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    const nextCart = existingItem
      ? cart.map(item => item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item)
      : [...cart, { ...product, quantity: 1 }];

    setCart(nextCart);
    localStorage.setItem('cart', JSON.stringify(nextCart));
    setCartMessage(`${product.name} added to cart!`);
    setTimeout(() => setCartMessage(''), 2000);
  };

  const handleRemoveFromCart = (productId) => {
    const nextCart = cart.filter(item => item.id !== productId);
    setCart(nextCart);
    localStorage.setItem('cart', JSON.stringify(nextCart));
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;

    const nextCart = cart.map(item => item.id === productId
      ? { ...item, quantity }
      : item);
    setCart(nextCart);
    localStorage.setItem('cart', JSON.stringify(nextCart));
  };

  const handleToggleFavorite = (product) => {
    const isFavorite = favorites.includes(product.id);
    const nextFavorites = isFavorite
      ? favorites.filter(id => id !== product.id)
      : [...favorites, product.id];

    setFavorites(nextFavorites);
    localStorage.setItem('favorites', JSON.stringify(nextFavorites));
  };

  const handlePurchaseComplete = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  if (showCheckout) {
    return (
      <Checkout
        cartItems={cart}
        onBack={() => setShowCheckout(false)}
        onPurchaseComplete={handlePurchaseComplete}
      />
    );
  }

  // Card for each perfume
  const ProductCard = ({ p }) => (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition">
      <div className="relative aspect-square">
        <img
          src={p.image_url}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
        />
        {p.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            -{p.discount}%
          </div>
        )}
        {!p.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
        <button
          type="button"
          onClick={() => handleToggleFavorite(p)}
          aria-label={favorites.includes(p.id) ? `Remove ${p.name} from favorites` : `Add ${p.name} to favorites`}
          className={`absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white ${favorites.includes(p.id) ? 'text-red-500' : 'text-gray-600'}`}
        >
          <Heart className={`w-4 h-4 ${favorites.includes(p.id) ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between text-sm text-purple-600 mb-1">
          <span>{p.brand}</span>
          <span className="text-gray-500">{p.category}</span>
        </div>
        <h3 className="font-bold text-gray-900 mb-2">{p.name}</h3>
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(p.rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-gray-600">({p.review_count})</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold">${p.price.toFixed(2)}</span>
            {p.original_price > p.price && (
              <span className="text-sm text-gray-500 line-through">
                ${p.original_price.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={() => handleAddToCart(p)}
            disabled={!p.inStock}
            className={`flex items-center space-x-1 px-3 py-1 rounded ${
              p.inStock
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-xs">{p.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Cart message */}
      {cartMessage && (
        <div className="mb-4 text-green-600 font-semibold text-center">{cartMessage}</div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Buy Premium Perfumes</h1>
        <p className="text-gray-600">Authentic fragrances at unbeatable prices</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4 space-y-6 sticky top-24">
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="flex items-center mb-4 text-lg font-semibold">
              <Filter className="w-5 h-5 mr-2" /> Filters
            </div>
            <label className="block mb-2">Brand</label>
            <select
              value={brand}
              onChange={e => setBrand(e.target.value)}
              className="w-full border rounded px-2 py-1 mb-4"
            >
              <option value="">All</option>
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            <label className="block mb-2">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full border rounded px-2 py-1 mb-4"
            >
              <option value="all">All</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <label className="block mb-2">Price Range</label>
            <div className="flex space-x-2 mb-4">
              <input
                type="number"
                value={minPrice}
                onChange={e => setMinPrice(Number(e.target.value))}
                className="w-1/2 border rounded px-2 py-1"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-1/2 border rounded px-2 py-1"
              />
            </div>

            <label className="block mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </aside>

        {/* Main Grid/List and Cart */}
        <div className="lg:w-3/4 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] gap-8 items-start">
          <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Showing {pagination.total} products · Cart ({cart.reduce((total, item) => total + item.quantity, 0)})</span>
            <div className="space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'text-purple-600' : 'text-gray-400'}
              >
                <Grid />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'text-purple-600' : 'text-gray-400'}
              >
                <List />
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-center py-12">Loading...</p>
          ) : perfumes.length === 0 ? (
            <p className="text-center py-12">No perfumes found.</p>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-6'
            }>
              {perfumes.map(p => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded"
            >
              Prev
            </button>
            <span>Page {pagination.page} of {pagination.pages}</span>
            <button
              onClick={() => setPage(prev => Math.min(prev + 1, pagination.pages))}
              disabled={page === pagination.pages}
              className="px-4 py-2 border rounded"
            >
              Next
            </button>
          </div>
          </div>

          <aside className="xl:sticky xl:top-24">
            <Cart
              cartItems={cart}
              onRemove={handleRemoveFromCart}
              onQuantityChange={handleQuantityChange}
              onCheckout={() => setShowCheckout(true)}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}