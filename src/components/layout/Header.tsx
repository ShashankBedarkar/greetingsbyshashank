import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Heart,
  ShoppingCart,
  User,
  Sun,
  Moon,
  X,
  ChevronDown,
  Sparkles,
  Gift,
  Calendar,
  Building2,
  Truck,
  FileText,
  Globe,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCurrency, type Currency } from '../../contexts/CurrencyContext';
import Button from '../ui/Button';

const categories = [
  {
    name: 'Birthday',
    items: ['Kids Birthday', 'Adult Birthday', 'Milestone Birthday', 'Belated Birthday'],
  },
  {
    name: 'Anniversary',
    items: ['Wedding Anniversary', 'Work Anniversary', 'Dating Anniversary'],
  },
  {
    name: 'Wedding',
    items: ['Engagement', 'Wedding Day', 'Bridal Shower', 'Bachelor Party'],
  },
  {
    name: 'Seasonal',
    items: ['Christmas', 'New Year', 'Valentines Day', 'Mothers Day', 'Fathers Day', 'Easter', 'Diwali', 'Eid'],
  },
  {
    name: 'Special Moments',
    items: ['Graduation', 'Baby Shower', 'New Baby', 'Retirement', 'Sympathy', 'Thank You'],
  },
];

const mainNavItems = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Categories', href: '/categories', hasMegaMenu: true },
  { name: 'Custom Studio', href: '/custom-studio' },
  { name: 'Templates', href: '/templates' },
  { name: 'Bulk Orders', href: '/bulk-orders' },
  { name: 'Track Order', href: '/track-order' },
];

const accountItems = [
  { name: 'My Account', href: '/account', icon: User },
  { name: 'Orders', href: '/account/orders', icon: FileText },
  { name: 'Wishlist', href: '/wishlist', icon: Heart },
  { name: 'Reminders', href: '/account/reminders', icon: Calendar },
  { name: 'Addresses', href: '/account/addresses', icon: Building2 },
];

const currencies: Currency[] = ['USD', 'INR', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SGD'];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, setCurrency, getSymbol } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled || isMobileMenuOpen || isSearchOpen
            ? 'glass shadow-lg'
            : 'bg-transparent'
          }
        `}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-2xl font-bold">
                <span className="text-primary-600 dark:text-primary-400">Greetings</span>
                <span className="text-accent-600 dark:text-accent-400"> By Shashank</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasMegaMenu && setIsCategoryMenuOpen(true)}
                  onMouseLeave={() => item.hasMegaMenu && setIsCategoryMenuOpen(false)}
                >
                  <Link
                    to={item.href}
                    className="px-4 py-2 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors font-medium flex items-center gap-1"
                  >
                    {item.name}
                    {item.hasMegaMenu && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {item.hasMegaMenu && isCategoryMenuOpen && (
                    <div className="absolute top-full left-0 pt-2 w-screen max-w-4xl -translate-x-1/4">
                      <div className="glass rounded-2xl shadow-2xl p-8 animate-fade-in">
                        <div className="grid grid-cols-5 gap-6">
                          {categories.map((category) => (
                            <div key={category.name}>
                              <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-4 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-primary-500" />
                                {category.name}
                              </h3>
                              <ul className="space-y-2">
                                {category.items.map((subItem) => (
                                  <li key={subItem}>
                                    <Link
                                      to={`/shop/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="text-sm text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                    >
                                      {subItem}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700 flex items-center justify-between">
                          <Link
                            to="/categories"
                            className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                          >
                            View All Categories
                          </Link>
                          <div className="flex items-center gap-4 text-sm text-secondary-500 dark:text-secondary-400">
                            <span className="flex items-center gap-1">
                              <Truck className="w-4 h-4" /> Free shipping over $50
                            </span>
                            <span className="flex items-center gap-1">
                              <Gift className="w-4 h-4" /> Gift wrapping available
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="btn-icon"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={toggleTheme}
                className="btn-icon"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
                  className="btn-icon flex items-center gap-1"
                  aria-label="Change currency"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-semibold hidden sm:inline">{currency}</span>
                </button>
                {isCurrencyMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsCurrencyMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 z-50">
                      <div className="glass rounded-xl shadow-xl p-2 animate-slide-down">
                        {currencies.map((curr) => (
                          <button
                            key={curr}
                            onClick={() => {
                              setCurrency(curr);
                              setIsCurrencyMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors text-left ${
                              currency === curr
                                ? 'bg-primary-500 text-white'
                                : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800'
                            }`}
                          >
                            <span className="font-medium">{curr}</span>
                            <span className="text-sm">{getSymbol(curr)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <Link to="/wishlist" className="btn-icon relative">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="btn-icon relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative group">
                  <button className="btn-icon">
                    <User className="w-5 h-5" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="glass rounded-xl shadow-xl p-2 animate-slide-down">
                      <div className="px-4 py-3 border-b border-secondary-200 dark:border-secondary-700">
                        <p className="font-medium text-secondary-900 dark:text-secondary-100">
                          {user.email}
                        </p>
                      </div>
                      {accountItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
                        >
                          <item.icon className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                          <span className="text-secondary-700 dark:text-secondary-300">{item.name}</span>
                        </Link>
                      ))}
                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-error-50 dark:hover:bg-error-950/30 text-error-600 dark:text-error-400 transition-colors"
                      >
                        <X className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/auth">
                  <Button size="sm">Sign In</Button>
                </Link>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn-icon lg:hidden"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="lg:hidden glass border-t border-secondary-200 dark:border-secondary-800 animate-slide-down">
            <div className="container-custom py-4 space-y-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <div className="border-t border-secondary-200 dark:border-secondary-800 pt-2 mt-2">
                  {accountItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setIsSearchOpen(false)}>
          <div className="container-custom pt-20">
            <div className="glass rounded-2xl shadow-2xl p-6 animate-slide-down" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4">
                <Search className="w-6 h-6 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search for cards, templates, or occasions..."
                  className="flex-1 bg-transparent text-xl text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="btn-icon"
                  aria-label="Close search"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <p className="text-sm text-secondary-500 dark:text-secondary-400">Popular searches:</p>
                {['Birthday Cards', 'Thank You Cards', 'Wedding Invitations', 'Holiday Cards'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setIsSearchOpen(false)}
                    className="text-left px-4 py-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-700 dark:text-secondary-300 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
