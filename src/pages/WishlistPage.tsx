import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

export default function WishlistPage() {
  const { wishlistItems, wishlistCount, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (product: { id: string; name: string; price: number; image: string }) => {
    await addToCart(product, 1);
    await removeFromWishlist(product.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-24">
        <div className="container-custom py-16 text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary-500" />
          <p className="text-secondary-600 dark:text-secondary-400">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-24">
        <div className="container-custom py-16 text-center">
          <div className="w-24 h-24 rounded-full bg-secondary-200 dark:bg-secondary-800 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-secondary-400" />
          </div>
          <h1 className="heading-2 mb-4">Your Wishlist is Empty</h1>
          <p className="text-body mb-8 max-w-md mx-auto">
            Save your favorite greeting cards here and never lose track of them.
          </p>
          <Link to="/shop">
            <Button size="lg">Explore Cards</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-24">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="heading-2">My Wishlist</h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="card group">
              <div className="relative aspect-greeting-card overflow-hidden bg-secondary-100 dark:bg-secondary-800">
                <Link to={`/product/${item.product_id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </Link>

                <button
                  onClick={() => removeFromWishlist(item.product_id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-secondary-900/90 text-error-500 hover:bg-error-500 hover:text-white transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5">
                <Link to={`/product/${item.product_id}`}>
                  <h3 className="font-semibold text-lg text-secondary-900 dark:text-secondary-100 mb-2 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={() => handleAddToCart({ id: item.product_id, name: item.name, price: item.price, image: item.image })}
                  className="w-full"
                  size="sm"
                  leftIcon={<ShoppingBag className="w-4 h-4" />}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
