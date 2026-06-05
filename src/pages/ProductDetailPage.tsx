import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Minus, Plus, Heart, ShoppingCart, Star, Check, Truck, Gift, Shield, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';

const product = {
  id: '1',
  name: 'Elegant Birthday Card',
  price: 12.99,
  compareAtPrice: 15.99,
  description: 'Celebrate special moments with our beautifully crafted birthday card. Features elegant typography, premium paper stock, and a modern design that\'s perfect for any age.',
  images: [
    'https://images.pexels.com/photos/131995/pexels-photo-131995.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1148734/pexels-photo-1148734.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos-251847/pexels-photo-251847.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  rating: 4.8,
  reviews: 234,
  category: 'Birthday',
  sku: 'BD-2024-001',
  inStock: true,
  customizable: true,
  features: [
    'Premium 350gsm card stock',
    'Elegant foil accents',
    'Matching envelope included',
    'Blank interior for personal message',
    'Size: 5" x 7"',
  ],
};

const relatedProducts = [
  {
    id: '2',
    name: 'Wedding Congratulations',
    price: 18.99,
    image: 'https://images.pexels.com/photos/1704088/pexels-photo-1704088.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 5.0,
    reviews: 189,
    isCustomizable: true,
  },
  {
    id: '3',
    name: 'Holiday Season Greetings',
    price: 9.99,
    image: 'https://images.pexels.com/photos/1661736/pexels-photo-1661736.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    reviews: 312,
    isCustomizable: true,
  },
  {
    id: '4',
    name: 'Thank You Floral Card',
    price: 11.99,
    image: 'https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 156,
    isCustomizable: true,
  },
];

const reviews = [
  {
    id: 1,
    author: 'Sarah M.',
    rating: 5,
    date: '2 days ago',
    content: 'Beautiful card! The quality exceeded my expectations. Fast shipping too!',
    verified: true,
  },
  {
    id: 2,
    author: 'John D.',
    rating: 5,
    date: '1 week ago',
    content: 'Perfect for my wife\'s birthday. The paper quality is premium and the design is elegant.',
    verified: true,
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-24">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400 mb-8">
          <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-primary-600 dark:hover:text-primary-400">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary-600 dark:text-primary-400">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-greeting-card rounded-2xl overflow-hidden bg-white dark:bg-secondary-800 shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-24 h-28 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx
                      ? 'border-primary-500'
                      : 'border-transparent hover:border-primary-300'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              {discount > 0 && (
                <span className="badge badge-error mb-4">Save {discount}%</span>
              )}
              <h1 className="heading-2 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-warning-400 fill-warning-400'
                          : 'text-secondary-300 dark:text-secondary-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-secondary-600 dark:text-secondary-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  ${product.price.toFixed(2)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xl text-secondary-400 line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-body">{product.description}</p>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
                Quantity
              </label>
              <div className="flex items-center border border-secondary-300 dark:border-secondary-600 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Link to="/cart" className="flex-1">
                <Button size="lg" rightIcon={<ShoppingCart className="w-5 h-5" />}>
                  Add to Cart
                </Button>
              </Link>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-4 rounded-xl border-2 transition-colors ${
                  isWishlisted
                    ? 'bg-error-50 border-error-500 text-error-500'
                    : 'border-secondary-300 dark:border-secondary-600 hover:border-error-300'
                }`}
                aria-label="Add to wishlist"
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {product.customizable && (
              <Link to="/custom-studio" className="block mb-8">
                <div className="p-6 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20 border border-primary-200 dark:border-primary-800">
                  <p className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                    Customize This Card
                  </p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                    Add your personal touch with our design studio
                  </p>
                  <Button variant="outline" size="sm">Open Design Studio</Button>
                </div>
              </Link>
            )}

            {/* Features */}
            <div className="space-y-3 mb-8">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-secondary-700 dark:text-secondary-300">
                  <Check className="w-5 h-5 text-success-500" />
                  {feature}
                </div>
              ))}
            </div>

            {/* USP Badges */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-secondary-50 dark:bg-secondary-800/50 rounded-xl mb-8">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-success-600 dark:text-success-400" />
                <div>
                  <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">Ships in 2-3 days</p>
                  <p className="text-xs text-secondary-500">Free shipping over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">Quality Guarantee</p>
                  <p className="text-xs text-secondary-500">30-day returns</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                <div>
                  <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">Gift Wrapping</p>
                  <p className="text-xs text-secondary-500">Premium packaging</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-warning-500" />
                <div>
                  <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">4.9 Average</p>
                  <p className="text-xs text-secondary-500">2,300+ reviews</p>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-secondary-100 dark:bg-secondary-800 rounded-xl">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                <div className="text-sm">
                  <p className="font-medium text-secondary-900 dark:text-secondary-100">Free Shipping</p>
                  <p className="text-secondary-500 dark:text-secondary-400">Orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                <div className="text-sm">
                  <p className="font-medium text-secondary-900 dark:text-secondary-100">Gift Wrap</p>
                  <p className="text-secondary-500 dark:text-secondary-400">Available</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                <div className="text-sm">
                  <p className="font-medium text-secondary-900 dark:text-secondary-100">Guarantee</p>
                  <p className="text-secondary-500 dark:text-secondary-400">30-day return</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <h2 className="heading-3 mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-secondary-900 dark:text-secondary-100">{review.author}</span>
                        {review.verified && (
                          <span className="badge badge-success text-xs">Verified</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-warning-400 fill-warning-400'
                                : 'text-secondary-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-secondary-500 dark:text-secondary-400">{review.date}</span>
                  </div>
                  <p className="text-secondary-700 dark:text-secondary-300">{review.content}</p>
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4 text-secondary-900 dark:text-secondary-100">
                Review Summary
              </h3>
              <div className="flex items-center gap-6 mb-6">
                <div className="text-center">
                  <p className="text-5xl font-bold text-secondary-900 dark:text-secondary-100">{product.rating}</p>
                  <div className="flex items-center gap-1 justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-warning-400 fill-warning-400'
                            : 'text-secondary-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">{product.reviews} reviews</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">Write a Review</Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="heading-3 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="card card-hover">
                <div className="aspect-greeting-card overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold mb-2 text-secondary-900 dark:text-secondary-100">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary-600 dark:text-primary-400">${product.price.toFixed(2)}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning-400 fill-warning-400" />
                      <span className="text-sm text-secondary-600 dark:text-secondary-400">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
