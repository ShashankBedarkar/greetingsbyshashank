import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Heart, ShoppingCart, Star, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const templateCategories = [
  'All',
  'Birthday',
  'Wedding',
  'Anniversary',
  'Thank You',
  'Holiday',
  'Graduation',
  'Baby Shower',
  'Sympathy',
];

const templates = [
  {
    id: '1',
    name: 'Elegant Birthday',
    category: 'Birthday',
    price: 12.99,
    image: 'https://images.pexels.com/photos/131995/pexels-photo-131995.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 234,
    isPremium: false,
  },
  {
    id: '2',
    name: 'Floral Wedding',
    category: 'Wedding',
    price: 18.99,
    image: 'https://images.pexels.com/photos/1704088/pexels-photo-1704088.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 5.0,
    reviews: 189,
    isPremium: true,
  },
  {
    id: '3',
    name: 'Holiday Wishes',
    category: 'Holiday',
    price: 9.99,
    image: 'https://images.pexels.com/photos/1661736/pexels-photo-1661736.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    reviews: 312,
    isPremium: false,
  },
  {
    id: '4',
    name: 'Thank You Garden',
    category: 'Thank You',
    price: 11.99,
    image: 'https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 156,
    isPremium: true,
  },
  {
    id: '5',
    name: 'Golden Anniversary',
    category: 'Anniversary',
    price: 14.99,
    image: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 98,
    isPremium: false,
  },
  {
    id: '6',
    name: 'Graduation Star',
    category: 'Graduation',
    price: 13.99,
    image: 'https://images.pexels.com/photos-251847/pexels-photo-251847.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 145,
    isPremium: true,
  },
  {
    id: '7',
    name: 'Baby Celebration',
    category: 'Baby Shower',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1000183/pexels-photo-1000183.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 167,
    isPremium: false,
  },
  {
    id: '8',
    name: 'Sympathy Peace',
    category: 'Sympathy',
    price: 10.99,
    image: 'https://images.pexels.com/photos/1585973/pexels-photo-1585973.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 89,
    isPremium: false,
  },
  {
    id: '9',
    name: 'Kids Birthday Fun',
    category: 'Birthday',
    price: 14.99,
    image: 'https://images.pexels.com/photos/1148734/pexels-photo-1148734.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 201,
    isPremium: true,
  },
  {
    id: '10',
    name: 'Easter Joy',
    category: 'Holiday',
    price: 11.99,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 134,
    isPremium: false,
  },
  {
    id: '11',
    name: 'Wedding Bliss',
    category: 'Wedding',
    price: 21.99,
    image: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 5.0,
    reviews: 278,
    isPremium: true,
  },
  {
    id: '12',
    name: 'Milestone Birthday',
    category: 'Birthday',
    price: 15.99,
    image: 'https://images.pexels.com/photos/1000183/pexels-photo-1000183.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 189,
    isPremium: true,
  },
];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPremium, setShowPremium] = useState(false);
  const { addToCart, cartItems } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const filteredTemplates = templates.filter((template) => {
    if (selectedCategory !== 'All' && template.category !== selectedCategory) return false;
    if (showPremium && !template.isPremium) return false;
    if (searchQuery && !template.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleAddToCart = async (template: typeof templates[0]) => {
    await addToCart({
      id: `template-${template.id}`,
      name: `${template.name} Template`,
      price: template.price,
      image: template.image,
    }, 1);
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-24">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-1 mb-4">Card Templates</h1>
          <p className="text-body max-w-2xl">
            Choose from our professionally designed templates. Customize them to create the perfect card for any occasion.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showPremium}
              onChange={(e) => setShowPremium(e.target.checked)}
              className="w-5 h-5 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-secondary-700 dark:text-secondary-300">Premium only</span>
          </label>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {templateCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => {
            const inWishlist = isInWishlist(`template-${template.id}`);
            const inCart = cartItems.some(item => item.product_id === `template-${template.id}`);

            return (
              <div key={template.id} className="card group">
                <div className="relative aspect-greeting-card overflow-hidden bg-secondary-100 dark:bg-secondary-800">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />

                  {template.isPremium && (
                    <div className="absolute top-4 left-4 badge badge-warning">Premium</div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <button
                      onClick={() => toggleWishlist({
                        id: `template-${template.id}`,
                        name: `${template.name} Template`,
                        price: template.price,
                        image: template.image,
                      })}
                      className={`p-3 rounded-full transition-colors shadow-lg ${
                        inWishlist
                          ? 'bg-error-500 text-white'
                          : 'bg-white/90 dark:bg-secondary-900/90 text-secondary-700 hover:text-error-500'
                      }`}
                      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleAddToCart(template)}
                      className={`p-3 rounded-full transition-colors shadow-lg ${
                        inCart
                          ? 'bg-success-500 text-white'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                      aria-label={inCart ? 'Added to cart' : 'Add to cart'}
                    >
                      {inCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400">
                      {template.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-secondary-900 dark:text-secondary-100 mb-2">
                    {template.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(template.rating)
                              ? 'text-warning-400 fill-warning-400'
                              : 'text-secondary-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-secondary-500">({template.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                      ${template.price.toFixed(2)}
                    </span>
                    <Link to={`/custom-studio?template=${template.id}`}>
                      <Button size="sm" variant="outline">
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">No templates found matching your criteria.</p>
            <Button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setShowPremium(false); }} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
