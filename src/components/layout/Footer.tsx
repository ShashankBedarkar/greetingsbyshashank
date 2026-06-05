import { Link } from 'react-router-dom';
import { Gift, Mail, Phone, MapPin, Instagram, Twitter, Send } from 'lucide-react';
import { useState } from 'react';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Templates', href: '/templates' },
  { name: 'Bulk Orders', href: '/bulk-orders' },
  { name: 'Track Order', href: '/track-order' },
  { name: 'Contact', href: '/contact' },
];

const supportLinks = [
  { name: 'FAQs', href: '/faq' },
  { name: 'Shipping Policy', href: '/shipping' },
  { name: 'Refund Policy', href: '/refund' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms & Conditions', href: '/terms' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-secondary-900 dark:bg-secondary-950 text-secondary-100 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-2xl font-bold">
                <span className="text-primary-400">Greetings</span>
                <span className="text-accent-400"> By Shashank</span>
              </span>
            </Link>
            <p className="text-secondary-400 mb-6 max-w-md">
              Create personalized greeting cards that capture your heartfelt messages. Perfect for every occasion.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-secondary-100">Subscribe to our newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-secondary-800 border border-secondary-700 text-secondary-100 placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </form>
              {subscribed && (
                <p className="mt-2 text-success-400 text-sm">Thank you for subscribing!</p>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-secondary-400">
              <a href="mailto:hello@customgreetings.com" className="flex items-center gap-3 hover:text-primary-400 transition-colors">
                <Mail className="w-5 h-5" />
                hello@customgreetings.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 hover:text-primary-400 transition-colors">
                <Phone className="w-5 h-5" />
                +1 (234) 567-890
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                123 Greeting Lane, Card City
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-secondary-100">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-secondary-100">Customer Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 py-8 border-t border-b border-secondary-800 mb-8">
          <div className="flex items-center gap-2 text-secondary-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm">Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2 text-secondary-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Money Back Guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-secondary-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span className="text-sm">Free Shipping Over $50</span>
          </div>
          <div className="flex items-center gap-2 text-secondary-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
            </svg>
            <span className="text-sm">24/7 Support</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-500 text-sm">
            © {new Date().getFullYear()} Greetings By Shashank. All Rights Reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-secondary-800 text-secondary-400 hover:text-primary-400 transition-colors"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3 text-secondary-500 text-xs">
            <span>We accept:</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-secondary-800 rounded font-medium">Visa</span>
              <span className="px-2 py-1 bg-secondary-800 rounded font-medium">MC</span>
              <span className="px-2 py-1 bg-secondary-800 rounded font-medium">Amex</span>
              <span className="px-2 py-1 bg-secondary-800 rounded font-medium">UPI</span>
              <span className="px-2 py-1 bg-secondary-800 rounded font-medium">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
