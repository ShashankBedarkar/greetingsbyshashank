import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, XCircle, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

interface OrderStatus {
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  location?: string;
  description: string;
}

interface Order {
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: { name: string; quantity: number; price: number }[];
  total: number;
  tracking?: {
    carrier: string;
    number: string;
    url: string;
  };
  timeline: OrderStatus[];
  shipping: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

const sampleOrders: Record<string, Order> = {
  'GBS-2025-001234': {
    orderNumber: 'GBS-2025-001234',
    date: '2025-01-15',
    status: 'shipped',
    items: [
      { name: 'Elegant Birthday Card', quantity: 2, price: 25.98 },
      { name: 'Wedding Congratulations', quantity: 1, price: 18.99 },
    ],
    total: 54.96,
    tracking: {
      carrier: 'FedEx',
      number: '748928478329',
      url: 'https://fedex.com/track',
    },
    timeline: [
      { status: 'processing', date: '2025-01-15', description: 'Order confirmed and payment received' },
      { status: 'processing', date: '2025-01-16', description: 'Design approved and sent to production' },
      { status: 'shipped', date: '2025-01-17', location: 'New York, NY', description: 'Package picked up by carrier' },
      { status: 'shipped', date: '2025-01-18', location: 'Newark, NJ', description: 'In transit to destination' },
    ],
    shipping: {
      name: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
  },
  'GBS-2025-001235': {
    orderNumber: 'GBS-2025-001235',
    date: '2025-01-10',
    status: 'delivered',
    items: [
      { name: 'Holiday Season Greetings', quantity: 5, price: 49.95 },
    ],
    total: 54.94,
    tracking: {
      carrier: 'UPS',
      number: '1Z999AA10123456784',
      url: 'https://ups.com/track',
    },
    timeline: [
      { status: 'processing', date: '2025-01-10', description: 'Order confirmed' },
      { status: 'shipped', date: '2025-01-11', location: 'Los Angeles, CA', description: 'Package shipped' },
      { status: 'delivered', date: '2025-01-14', location: 'San Francisco, CA', description: 'Delivered to front door' },
    ],
    shipping: {
      name: 'Jane Smith',
      address: '456 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      country: 'USA',
    },
  },
};

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOrder(null);
    setLoading(true);

    setTimeout(() => {
      const upperOrderNumber = orderNumber.toUpperCase().trim();
      if (sampleOrders[upperOrderNumber]) {
        setOrder(sampleOrders[upperOrderNumber]);
      } else if (upperOrderNumber.startsWith('GBS-')) {
        setError('Order not found. Please check your order number and try again.');
      } else {
        setError('Please enter a valid order number (e.g., GBS-2025-001234)');
      }
      setLoading(false);
    }, 800);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="w-5 h-5" />;
      case 'shipped':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400';
      case 'shipped':
        return 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400';
      case 'delivered':
        return 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400';
      case 'cancelled':
        return 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400';
      default:
        return 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-400';
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 pt-24">
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-6">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="heading-1 mb-4">Track Your Order</h1>
            <p className="text-body text-lg">
              Enter your order number to check the status of your shipment
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter order number (e.g., GBS-2025-001234)"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
                  required
                />
              </div>
              <Button type="submit" size="lg" loading={loading}>
                Track
              </Button>
            </div>
            {error && (
              <p className="mt-3 text-error-600 dark:text-error-400 text-center">{error}</p>
            )}
          </form>

          {/* Sample Order Numbers */}
          <div className="text-center mb-10">
            <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-2">Try these sample order numbers:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(sampleOrders).map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setOrderNumber(num);
                    setTimeout(() => {
                      const form = document.querySelector('form');
                      if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                    }, 100);
                  }}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 hover:border-primary-500 transition-colors text-sm font-medium"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Order Details */}
          {order && (
            <div className="space-y-6 animate-fade-in">
              {/* Status Banner */}
              <div className={`rounded-xl p-6 ${getStatusColor(order.status)}`}>
                <div className="flex items-center gap-4">
                  {getStatusIcon(order.status)}
                  <div>
                    <p className="font-semibold text-lg capitalize">{order.status}</p>
                    <p className="text-sm opacity-80">
                      {order.status === 'delivered' && 'Your order has arrived!'}
                      {order.status === 'shipped' && 'Your order is on its way'}
                      {order.status === 'processing' && 'Your order is being prepared'}
                      {order.status === 'cancelled' && 'This order has been cancelled'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tracking Info */}
              {order.tracking && (
                <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">Tracking Number</p>
                      <p className="font-medium text-lg text-secondary-900 dark:text-secondary-100">{order.tracking.number}</p>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">via {order.tracking.carrier}</p>
                    </div>
                    <a
                      href={order.tracking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      Track on {order.tracking.carrier}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4 text-secondary-900 dark:text-secondary-100">Order Items</h3>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-secondary-100 dark:border-secondary-700 last:border-0">
                      <div>
                        <p className="font-medium text-secondary-900 dark:text-secondary-100">{item.name}</p>
                        <p className="text-sm text-secondary-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-primary-600 dark:text-primary-400">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 font-bold">
                    <span className="text-secondary-900 dark:text-secondary-100">Total</span>
                    <span className="text-primary-600 dark:text-primary-400">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4 text-secondary-900 dark:text-secondary-100">Shipping Address</h3>
                <div className="flex items-start gap-3 text-secondary-600 dark:text-secondary-400">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-secondary-100">{order.shipping.name}</p>
                    <p>{order.shipping.address}</p>
                    <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
                    <p>{order.shipping.country}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-6 text-secondary-900 dark:text-secondary-100">Order Timeline</h3>
                <div className="space-y-0">
                  {order.timeline.map((event, idx) => (
                    <div key={idx} className="flex gap-4 pb-6 last:pb-0">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(event.status)}`}>
                          {getStatusIcon(event.status)}
                        </div>
                        {idx < order.timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-secondary-200 dark:bg-secondary-700 my-2" />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="font-medium text-secondary-900 dark:text-secondary-100">{event.description}</p>
                        {event.location && (
                          <p className="text-sm text-secondary-600 dark:text-secondary-400">{event.location}</p>
                        )}
                        <p className="text-xs text-secondary-500 dark:text-secondary-500 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Info */}
              <div className="flex justify-between text-sm text-secondary-500 dark:text-secondary-400">
                <p>Order Number: <span className="font-medium text-secondary-900 dark:text-secondary-100">{order.orderNumber}</span></p>
                <p>Order Date: <span className="font-medium text-secondary-900 dark:text-secondary-100">{new Date(order.date).toLocaleDateString()}</span></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
