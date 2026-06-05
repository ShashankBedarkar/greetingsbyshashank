import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Gift, Shield, CreditCard, ChevronRight, Sparkles, Check } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';

const featuredProducts = [
  {
    id: '1',
    name: 'Elegant Birthday Card',
    price: 12.99,
    compareAtPrice: 15.99,
    image: 'https://images.pexels.com/photos/131995/pexels-photo-131995.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 234,
    isCustomizable: true,
    isFeatured: true,
  },
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
    compareAtPrice: 14.99,
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
    isFeatured: true,
  },
];

const categories = [
  { name: 'Birthday', count: 234, image: 'https://images.pexels.com/photos/1148734/pexels-photo-1148734.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Wedding', count: 156, image: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Anniversary', count: 89, image: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Thank You', count: 178, image: 'https://images.pexels.com/photos/1000183/pexels-photo-1000183.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Congrats', count: 134, image: 'https://images.pexels.com/photos/1585973/pexels-photo-1585973.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Holiday', count: 267, image: 'https://images.pexels.com/photos-251847/pexels-photo-251847.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Verified Buyer',
    content: 'The card customization tool is amazing! I created a beautiful birthday card for my mom and she loved it. The quality of the printed card exceeded my expectations.',
    rating: 5,
    image: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Verified Buyer',
    content: 'Fast delivery and excellent quality. The AI message generator helped me write the perfect anniversary message. Will definitely order again!',
    rating: 5,
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Verified Buyer',
    content: 'I ordered 50 custom cards for my business event. The bulk order process was seamless and the cards turned out perfect. Great customer support too!',
    rating: 5,
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

const trustBadges = [
  { icon: Truck, title: 'Fast Shipping', description: 'Ships in 2-3 days' },
  { icon: Star, title: '4.9 Rating', description: '2,300+ 5-star reviews' },
  { icon: Shield, title: 'Premium Quality', description: '100% satisfaction guaranteed' },
  { icon: CreditCard, title: 'Secure Checkout', description: 'SSL encrypted payments' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary-50 dark:from-secondary-950 dark:to-secondary-900">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/50 dark:bg-primary-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/50 dark:bg-accent-900/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-100/30 dark:from-primary-900/10 to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                New: AI-Powered Message Generator
              </div>
              <h1 className="heading-1 mb-6">
                Create{' '}
                <span className="gradient-text">Personalized</span>
                <br />
                Greeting Cards
              </h1>
              <p className="text-body text-xl mb-8 max-w-lg">
                Design beautiful, custom greeting cards for every occasion.
                Add your personal touch with our easy-to-use design studio.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop">
                  <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Shop Now
                  </Button>
                </Link>
                <Link to="/custom-studio">
                  <Button variant="outline" size="lg">
                    Start Designing
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-12">
                <div>
                  <p className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">50K+</p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Happy Customers</p>
                </div>
                <div className="w-px h-12 bg-secondary-300 dark:bg-secondary-700" />
                <div>
                  <p className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">100+</p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Design Templates</p>
                </div>
                <div className="w-px h-12 bg-secondary-300 dark:bg-secondary-700" />
                <div>
                  <p className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">4.9★</p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Average Rating</p>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-left">
              <div className="relative z-10">
                <img
                  src="/ChatGPT_Image_May_31,_2026,_09_48_51_PM.png"
                  alt="Collection of beautifully designed greeting cards for all occasions"
                  className="w-full rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ratings & USP Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Rating Card */}
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-warning-100 dark:bg-warning-900/30 flex items-center justify-center">
                  <Star className="w-7 h-7 text-warning-500 fill-warning-500" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-secondary-900 dark:text-secondary-100">4.9</p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Average Rating</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning-400 fill-warning-400" />
                ))}
              </div>
              <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">2,300+ verified reviews</p>
            </div>

            {/* Fast Shipping Card */}
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center">
                  <Truck className="w-7 h-7 text-success-600 dark:text-success-400" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-secondary-900 dark:text-secondary-100">2-3</p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Days Delivery</p>
                </div>
              </div>
              <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Ships in 2-3 days worldwide</p>
              <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2">Fast & reliable shipping on all orders</p>
            </div>

            {/* Premium Quality Card */}
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">100%</p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Satisfaction</p>
                </div>
              </div>
              <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Premium quality guaranteed</p>
              <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2">30-day money-back guarantee</p>
            </div>

            {/* Customizable Card */}
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                  <Check className="w-7 h-7 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">100+</p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Templates</p>
                </div>
              </div>
              <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Fully customizable cards</p>
              <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2">Design templates for every occasion</p>
            </div>
          </div>
        </div>
      </section>

{/* Featured Products */}
      <section className="section">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="heading-2 mb-4">Featured Cards</h2>
              <p className="text-body max-w-2xl">
                Discover our most popular customizable greeting cards, loved by thousands of customers.
              </p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline font-medium">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/shop">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Shop by Occasion</h2>
            <p className="text-body max-w-2xl mx-auto">
              Find the perfect card for every special moment in your life.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/shop/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative aspect-square rounded-2xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-semibold text-white text-lg">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.count} cards</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Customization Feature */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">
                Design Your Perfect Card
              </h2>
              <p className="text-body text-lg mb-8">
                Our powerful design studio lets you create stunning personalized cards with ease.
                Add photos, custom text, stickers, and more. Let your creativity shine!
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'AI-powered message suggestions',
                  'Drag-and-drop editor',
                  'Hundreds of premium templates',
                  'Photo upload & filters',
                  'QR code for video messages',
                  'Live 3D preview',
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-success-600 dark:text-success-400" />
                    </div>
                    <span className="text-secondary-700 dark:text-secondary-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/custom-studio">
                <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Open Design Studio
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Design Studio Preview"
                className="w-full rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary-900/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">What Our Customers Say</h2>
            <p className="text-body max-w-2xl mx-auto">
              Join thousands of satisfied customers who have created memorable greeting cards.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="glass-card p-8 rounded-2xl">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warning-400 fill-warning-400" />
                  ))}
                </div>
                <p className="text-secondary-700 dark:text-secondary-300 mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-secondary-900 dark:text-secondary-100">{testimonial.name}</p>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-custom">
          <div className="relative glass-card rounded-3xl p-12 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="heading-2 mb-6">
                Ready to Create Something Special?
              </h2>
              <p className="text-body text-lg mb-8">
                Start designing your custom greeting card today. No design skills required.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/shop">
                  <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Browse Cards
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button variant="outline" size="lg">
                    View Templates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
