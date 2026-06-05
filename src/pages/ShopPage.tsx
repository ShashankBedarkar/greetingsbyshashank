import { useState } from 'react';
import { Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';

const allProducts = [
  {
    id: '1',
    name: 'Elegant Birthday Card',
    price: 12.99,
    compareAtPrice: 15.99,
    image: 'https://images.pexels.com/photos/131995/pexels-photo-131995.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 234,
    isCustomizable: true,
    category: 'birthday',
  },
  {
    id: '2',
    name: 'Wedding Congratulations',
    price: 18.99,
    image: 'https://images.pexels.com/photos/1704088/pexels-photo-1704088.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 5.0,
    reviews: 189,
    isCustomizable: true,
    category: 'wedding',
  },
  {
    id: '3',
    name: 'Holiday Season Greetings',
    price: 9.99,
    compareAtPrice: 14.99,
    image: 'https://images.pexels.com/photos/1661736/pexels-photo-1661736.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    reviews: 312,
    isCustomizable: true,
    category: 'holiday',
  },
  {
    id: '4',
    name: 'Thank You Floral Card',
    price: 11.99,
    image: 'https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 156,
    isCustomizable: true,
    category: 'thank-you',
  },
  {
    id: '5',
    name: 'Anniversary Celebration',
    price: 14.99,
    image: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 98,
    isCustomizable: true,
    category: 'anniversary',
  },
  {
    id: '6',
    name: 'Graduation Congratulations',
    price: 13.99,
    image: 'https://images.pexels.com/photos-251847/pexels-photo-251847.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 145,
    isCustomizable: true,
    category: 'graduation',
  },
  {
    id: '7',
    name: 'New Baby Celebration',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1000183/pexels-photo-1000183.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 167,
    isCustomizable: true,
    category: 'baby',
  },
  {
    id: '8',
    name: 'Sympathy Card',
    price: 10.99,
    image: 'https://images.pexels.com/photos/1585973/pexels-photo-1585973.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 89,
    isCustomizable: true,
    category: 'sympathy',
  },
];

const categories = [
  { id: 'all', name: 'All Cards', count: 8 },
  { id: 'birthday', name: 'Birthday', count: 1 },
  { id: 'wedding', name: 'Wedding', count: 1 },
  { id: 'anniversary', name: 'Anniversary', count: 1 },
  { id: 'holiday', name: 'Holiday', count: 1 },
  { id: 'thank-you', name: 'Thank You', count: 1 },
  { id: 'graduation', name: 'Graduation', count: 1 },
  { id: 'baby', name: 'Baby', count: 1 },
  { id: 'sympathy', name: 'Sympathy', count: 1 },
];

const priceRanges = [
  { id: 'under-10', label: 'Under $10', min: 0, max: 10 },
  { id: '10-15', label: '$10 - $15', min: 10, max: 15 },
  { id: '15-20', label: '$15 - $20', min: 15, max: 20 },
  { id: 'over-20', label: 'Over $20', min: 20, max: 1000 },
];

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'newest', name: 'Newest Arrivals' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'rating', name: 'Top Rated' },
];

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = allProducts
    .filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (selectedPriceRange) {
        const range = priceRanges.find((r) => r.id === selectedPriceRange);
        if (range && (product.price < range.min || product.price >= range.max)) return false;
      }
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-24">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-1 mb-4">Shop Greeting Cards</h1>
          <p className="text-body">Discover our beautiful collection of customizable greeting cards for every occasion.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white dark:bg-secondary-800 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <div className="hidden lg:flex items-center gap-4">
              <span className="text-sm text-secondary-600 dark:text-secondary-400">{filteredProducts.length} products</span>
              {(selectedCategory !== 'all' || selectedPriceRange) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>

            <div className="flex items-center border border-secondary-300 dark:border-secondary-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-secondary-600 dark:text-secondary-400'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-secondary-600 dark:text-secondary-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-4 text-secondary-900 dark:text-secondary-100">Categories</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800'
                      }`}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-4 text-secondary-900 dark:text-secondary-100">Price Range</h3>
              <ul className="space-y-2">
                {priceRanges.map((range) => (
                  <li key={range.id}>
                    <button
                      onClick={() => setSelectedPriceRange(selectedPriceRange === range.id ? null : range.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedPriceRange === range.id
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800'
                      }`}
                    >
                      {range.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Mobile Filters Modal */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setIsFilterOpen(false)}>
              <div
                className="absolute inset-x-4 top-4 bottom-4 bg-white dark:bg-secondary-900 rounded-2xl shadow-2xl overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="btn-icon">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 space-y-6">
                  {/* Search */}
                  <div>
                    <input
                      type="text"
                      placeholder="Search cards..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input"
                    />
                  </div>

                  {/* Categories */}
                  <div>
                    <h4 className="font-semibold mb-4">Categories</h4>
                    <ul className="space-y-2">
                      {categories.map((cat) => (
                        <li key={cat.id}>
                          <button
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                              selectedCategory === cat.id
                                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                : 'text-secondary-600 dark:text-secondary-400'
                            }`}
                          >
                            {cat.name} ({cat.count})
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="font-semibold mb-4">Price Range</h4>
                    <ul className="space-y-2">
                      {priceRanges.map((range) => (
                        <li key={range.id}>
                          <button
                            onClick={() => setSelectedPriceRange(selectedPriceRange === range.id ? null : range.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                              selectedPriceRange === range.id
                                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                : 'text-secondary-600 dark:text-secondary-400'
                            }`}
                          >
                            {range.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="sticky bottom-0 p-4 border-t border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900">
                  <Button onClick={() => setIsFilterOpen(false)} className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">No products found matching your criteria.</p>
                <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
