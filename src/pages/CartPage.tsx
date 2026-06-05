import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Gift, Truck, Tag, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { useCurrency } from '../contexts/CurrencyContext';

export default function CartPage() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    loading,
    updateQuantity,
    removeFromCart,
    toggleGiftWrapping,
  } = useCart();
  const { convertPrice, getSymbol } = useCurrency();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount] = useState(5.00);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  const giftWrapFee = cartItems.filter((item) => item.gift_wrapping).length * 2.99;
  const discount = promoApplied ? promoDiscount : 0;
  const shipping = cartTotal > 50 ? 0 : 4.99;
  const total = cartTotal + giftWrapFee + shipping - discount;

  const convertedCartTotal = convertPrice(cartTotal);
  const convertedGiftWrapFee = convertPrice(giftWrapFee);
  const convertedDiscount = convertPrice(discount);
  const convertedShipping = convertPrice(shipping);
  const convertedTotal = convertPrice(total);

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-24">
        <div className="container-custom py-16 text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary-500" />
          <p className="text-secondary-600 dark:text-secondary-400">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-24">
        <div className="container-custom py-16 text-center">
          <div className="w-24 h-24 rounded-full bg-secondary-200 dark:bg-secondary-800 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-secondary-400" />
          </div>
          <h1 className="heading-2 mb-4">Your Cart is Empty</h1>
          <p className="text-body mb-8 max-w-md mx-auto">
            Looks like you haven't added any greeting cards to your cart yet. Start shopping to fill it up!
          </p>
          <Link to="/shop">
            <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-24">
      <div className="container-custom py-8">
        <div className="mb-4">
          <h1 className="heading-2">Shopping Cart</h1>
          <p className="text-secondary-600 dark:text-secondary-400">{cartCount} items in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex gap-6">
                  <Link to={`/product/${item.product_id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-40 object-cover rounded-xl"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <Link
                          to={`/product/${item.product_id}`}
                          className="font-semibold text-lg text-secondary-900 dark:text-secondary-100 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {item.name}
                        </Link>
                        {!item.product_id.startsWith('custom-') && (
                          <p className="text-sm text-primary-600 dark:text-primary-400">Customizable</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-lg hover:bg-error-50 dark:hover:bg-error-950/30 text-error-600 dark:text-error-400 flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center border border-secondary-300 dark:border-secondary-600 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors disabled:opacity-50"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        {getSymbol()}{convertPrice(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleGiftWrapping(item.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        item.gift_wrapping
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'border border-secondary-300 dark:border-secondary-600 hover:border-primary-500'
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                      {item.gift_wrapping ? 'Gift Wrapping Added (+$2.99)' : 'Add Gift Wrapping'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold mb-6 text-secondary-900 dark:text-secondary-100">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="flex-1 input"
                    disabled={promoApplied}
                  />
                  <Button
                    onClick={applyPromoCode}
                    variant={promoApplied ? 'secondary' : 'primary'}
                    disabled={promoApplied}
                  >
                    {promoApplied ? 'Applied' : 'Apply'}
                  </Button>
                </div>
                {promoApplied && (
                  <p className="mt-2 text-sm text-success-600 dark:text-success-400 flex items-center gap-1">
                    <Tag className="w-4 h-4" /> Promo code applied!
                  </p>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-secondary-600 dark:text-secondary-400">
                  <span>Subtotal</span>
                  <span>{getSymbol()}{convertedCartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                {giftWrapFee > 0 && (
                  <div className="flex justify-between text-secondary-600 dark:text-secondary-400">
                    <span>Gift Wrapping</span>
                    <span>{getSymbol()}{convertedGiftWrapFee.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-success-600 dark:text-success-400">
                    <span>Discount</span>
                    <span>-{getSymbol()}{convertedDiscount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="flex justify-between text-secondary-600 dark:text-secondary-400">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-success-600 dark:text-success-400">Free</span>
                  ) : (
                    <span>{getSymbol()}{convertedShipping.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  )}
                </div>
                <div className="border-t border-secondary-200 dark:border-secondary-700 pt-3 flex justify-between text-lg font-bold text-secondary-900 dark:text-secondary-100">
                  <span>Total</span>
                  <span>{getSymbol()}{convertedTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              {cartTotal > 50 && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-success-50 dark:bg-success-950/30 text-success-700 dark:text-success-400 mb-6">
                  <Truck className="w-5 h-5" />
                  <span className="text-sm">You qualify for free shipping!</span>
                </div>
              )}

              <Link to="/checkout">
                <Button className="w-full" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Proceed to Checkout
                </Button>
              </Link>

              <p className="mt-4 text-xs text-center text-secondary-500 dark:text-secondary-400">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
