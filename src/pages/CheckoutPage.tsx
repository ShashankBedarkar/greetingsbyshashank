import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useCurrency } from '../contexts/CurrencyContext';

const cartItems = [
  {
    id: '1',
    name: 'Elegant Birthday Card',
    price: 12.99,
    quantity: 2,
    image: 'https://images.pexels.com/photos/131995/pexels-photo-131995.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    name: 'Wedding Congratulations',
    price: 18.99,
    quantity: 1,
    image: 'https://images.pexels.com/photos/1704088/pexels-photo-1704088.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'upi'>('card');
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const { convertPrice, getSymbol } = useCurrency();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const convertedSubtotal = convertPrice(subtotal);
  const convertedShipping = convertPrice(shipping);
  const convertedTotal = convertPrice(total);

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-24 pb-12">
      <div className="container-custom">
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-secondary-900 dark:text-secondary-100">
                Contact Information
              </h2>
              <div className="space-y-4">
                <Input label="Email Address" type="email" placeholder="you@example.com" required />
                <Input label="Phone Number" type="tel" placeholder="+1 (234) 567-890" />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-secondary-900 dark:text-secondary-100">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="First Name" placeholder="John" required />
                  <Input label="Last Name" placeholder="Doe" required />
                </div>
                <Input label="Address Line 1" placeholder="123 Main Street" required />
                <Input label="Address Line 2 (Optional)" placeholder="Apt, Suite, Unit, etc." />
                <div className="grid md:grid-cols-3 gap-4">
                  <Input label="City" placeholder="New York" required />
                  <Input label="State / Province" placeholder="NY" required />
                  <Input label="Postal Code" placeholder="10001" required />
                </div>
                <Input label="Country" placeholder="United States" required />
              </div>

              <label className="flex items-center gap-3 mt-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                  className="w-5 h-5 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-secondary-700 dark:text-secondary-300">
                  Billing address same as shipping
                </span>
              </label>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-secondary-900 dark:text-secondary-100">
                Payment Method
              </h2>

              <div className="space-y-4 mb-6">
                {[
                  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                  { id: 'paypal', label: 'PayPal', icon: CreditCard },
                  { id: 'upi', label: 'UPI', icon: CreditCard },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/20'
                        : 'border-secondary-200 dark:border-secondary-700 hover:border-primary-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id as any)}
                      className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                    />
                    <method.icon className={`w-6 h-6 ${paymentMethod === method.id ? 'text-primary-600' : 'text-secondary-400'}`} />
                    <span className={`font-medium ${paymentMethod === method.id ? 'text-primary-700 dark:text-primary-300' : 'text-secondary-700 dark:text-secondary-300'}`}>
                      {method.label}
                    </span>
                  </label>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <Input label="Card Number" placeholder="1234 5678 9012 3456" required />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Expiry Date" placeholder="MM / YY" required />
                    <Input label="CVV" placeholder="123" required />
                  </div>
                  <Input label="Cardholder Name" placeholder="John Doe" required />
                </div>
              )}

              {paymentMethod === 'upi' && (
                <Input label="UPI ID" placeholder="yourname@upi" required />
              )}

              <div className="mt-6 flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400">
                <Lock className="w-4 h-4" />
                Your payment information is encrypted and secure
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-secondary-900 dark:text-secondary-100">
                Delivery Options
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'standard', label: 'Standard Shipping', time: '5-7 business days', price: shipping === 0 ? 'Free' : `${getSymbol()}${convertedShipping.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
                  { id: 'express', label: 'Express Shipping', time: '2-3 business days', price: `${getSymbol()}${convertPrice(9.99).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
                  { id: 'overnight', label: 'Overnight Shipping', time: '1 business day', price: `${getSymbol()}${convertPrice(19.99).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
                ].map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors border-primary-500 bg-primary-50 dark:bg-primary-950/20"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        defaultChecked={option.id === 'standard'}
                        className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                      />
                      <div>
                        <p className="font-medium text-secondary-900 dark:text-secondary-100">{option.label}</p>
                        <p className="text-sm text-secondary-600 dark:text-secondary-400">{option.time}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-secondary-900 dark:text-secondary-100">{option.price}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold mb-6 text-secondary-900 dark:text-secondary-100">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-secondary-900 dark:text-secondary-100 line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">Qty: {item.quantity}</p>
                      <p className="font-semibold text-primary-600 dark:text-primary-400">
                        {getSymbol()}{convertPrice(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-secondary-200 dark:border-secondary-700 pt-4 mb-6">
                <div className="flex justify-between text-secondary-600 dark:text-secondary-400">
                  <span>Subtotal</span>
                  <span>{getSymbol()}{convertedSubtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-secondary-600 dark:text-secondary-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `${getSymbol()}${convertedShipping.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-secondary-200 dark:border-secondary-700 pt-3 text-secondary-900 dark:text-secondary-100">
                  <span>Total</span>
                  <span>{getSymbol()}{convertedTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                <Lock className="w-5 h-5 mr-2" />
                Pay {getSymbol()}{convertedTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-secondary-600 dark:text-secondary-400">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  Secure checkout
                </div>
                <div className="flex items-center gap-3 text-sm text-secondary-600 dark:text-secondary-400">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  30-day money-back guarantee
                </div>
                <div className="flex items-center gap-3 text-sm text-secondary-600 dark:text-secondary-400">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  Order confirmation via email
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
