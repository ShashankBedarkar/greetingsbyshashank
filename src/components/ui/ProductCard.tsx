import { forwardRef } from 'react';
import { Heart, ShoppingCart, Star, Check, Truck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCurrency } from '../../contexts/CurrencyContext';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  isFeatured?: boolean;
  isCustomizable?: boolean;
  onClick?: () => void;
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      id,
      name,
      price,
      compareAtPrice,
      image,
      rating,
      reviews,
      isFeatured,
      isCustomizable,
      onClick,
    },
    ref
  ) => {
    const { addToCart, cartItems } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { convertPrice, getSymbol } = useCurrency();

    const inWishlist = isInWishlist(id);
    const inCart = cartItems.some(item => item.product_id === id);

    const discount = compareAtPrice ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;
    const convertedPrice = convertPrice(price);
    const convertedComparePrice = compareAtPrice ? convertPrice(compareAtPrice) : undefined;

    const handleAddToCart = async (e: React.MouseEvent) => {
      e.stopPropagation();
      await addToCart({ id, name, price, image }, 1);
    };

    const handleToggleWishlist = async (e: React.MouseEvent) => {
      e.stopPropagation();
      await toggleWishlist({ id, name, price, image });
    };

    return (
      <div ref={ref} className="card card-hover group cursor-pointer" onClick={onClick}>
        <div className="relative aspect-greeting-card overflow-hidden bg-secondary-100 dark:bg-secondary-800">
          <Link to={`/product/${id}`}>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </Link>

          {discount > 0 && (
            <div className="absolute top-4 left-4 badge badge-error">-{discount}%</div>
          )}

          {isFeatured && (
            <div className="absolute top-4 right-4 badge badge-primary">Featured</div>
          )}

          {isCustomizable && (
            <div className="absolute bottom-4 left-4 badge badge-success">Customizable</div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <button
              onClick={handleToggleWishlist}
              className={`p-3 rounded-full transition-colors shadow-lg ${
                inWishlist
                  ? 'bg-error-500 text-white'
                  : 'bg-white/90 dark:bg-secondary-900/90 text-secondary-700 dark:text-secondary-300 hover:bg-white dark:hover:bg-secondary-900 hover:text-error-500'
              }`}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleAddToCart}
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
          <Link to={`/product/${id}`}>
            <h3 className="font-semibold text-lg text-secondary-900 dark:text-secondary-100 mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {name}
            </h3>
          </Link>

          {rating !== undefined && reviews !== undefined && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? 'text-warning-400 fill-warning-400'
                        : 'text-secondary-300 dark:text-secondary-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                {rating.toFixed(1)}
              </span>
              <span className="text-sm text-secondary-500 dark:text-secondary-400">
                ({reviews.toLocaleString()} reviews)
              </span>
            </div>
          )}

          {/* USP Badges */}
          <div className="flex items-center gap-3 mb-3 text-xs">
            <div className="flex items-center gap-1.5 text-success-600 dark:text-success-400">
              <Truck className="w-3.5 h-3.5" />
              <span>Ships in 2-3 days</span>
            </div>
            {isCustomizable && (
              <div className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Customize</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {getSymbol()}{convertedPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {convertedComparePrice && (
                <span className="text-base text-secondary-400 line-through">
                  {getSymbol()}{convertedComparePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';

export default ProductCard;
