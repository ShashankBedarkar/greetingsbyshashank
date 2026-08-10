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

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isSearchOpen]);

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
          <div className="flex items-center justify-between h-16 sm:h-20 min-w-0">
            {/* Mobile menu button - left side on small screens */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              className="btn-icon lg:hidden flex-shrink-0 relative z-[70]"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center gap-2 group min-w-0 flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow flex-shrink-0">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="font-display text-lg sm:text-2xl font-bold whitespace-nowrap">
                <span className="text-primary-600 dark:text-primary-400">Greetings</span>
                <span className="text-accent-600 dark:text-accent-400 hidden xs:inline"> By Shashank</span>
              </span>
            </Link>

            {/* Desktop nav */}
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

            {/* Right side icons */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="btn-icon"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme toggle - hidden on very small screens, moved to mobile menu */}
              <button
                onClick={toggleTheme}
                className="btn-icon hidden sm:flex"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              {/* Currency - hidden on small screens, moved to mobile menu */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
                  className="btn-icon flex items-center gap-1"
                  aria-label="Change currency"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-semibold">{currency}</span>
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

              {/* Wishlist - hidden on very small screens */}
              <Link to="/wishlist" className="btn-icon relative hidden sm:flex">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart - always visible */}
              <Link to="/cart" className="btn-icon relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Sign in / account - hidden on small screens, moved to mobile menu */}
              {user ? (
                <div className="relative group hidden sm:block">
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
                <Link to="/auth" className="hidden sm:block">
                  <Button size="sm">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-5rem)] bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800 shadow-2xl animate-slide-down overflow-y-auto overscroll-contain z-[60]">
            <div className="container-custom py-4 space-y-2 min-h-full pb-8">
              {/* Sign in / account - at top so it's always visible */}
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-secondary-500 dark:text-secondary-400 border-b border-secondary-200 dark:border-secondary-800 pb-2 mb-2">
                    Signed in as {user.email}
                  </div>
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
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-error-50 dark:hover:bg-error-950/30 text-error-600 dark:text-error-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3"
                >
                  <Button size="md" className="w-full">Sign In</Button>
                </Link>
              )}

              {/* Nav links */}
              <div className="border-t border-secondary-200 dark:border-secondary-800 pt-2 mt-2 space-y-2">
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
              </div>

              {/* Mobile-only items */}
              <div className="border-t border-secondary-200 dark:border-secondary-800 pt-2 mt-2 space-y-2">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="w-5 h-5" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-5 h-5" />
                      <span>Light Mode</span>
                    </>
                  )}
                </button>

                {/* Currency selector in mobile menu */}
                <div className="px-4 py-3">
                  <div className="flex items-center gap-3 mb-3 text-secondary-700 dark:text-secondary-300">
                    <Globe className="w-5 h-5" />
                    <span className="font-medium">Currency: {currency} ({getSymbol(currency)})</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {currencies.map((curr) => (
                      <button
                        key={curr}
                        onClick={() => setCurrency(curr)}
                        className={`px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currency === curr
                            ? 'bg-primary-500 text-white'
                            : 'text-secondary-700 dark:text-secondary-300 bg-secondary-100 dark:bg-secondary-800'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wishlist link in mobile menu */}
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="ml-auto bg-error-500 text-white text-xs rounded-full px-2 py-0.5">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setIsSearchOpen(false)}>
          <div className="container-custom pt-20">
            <div className="glass rounded-2xl shadow-2xl p-6 animate-slide-down" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4">
                <Search className="w-6 h-6 text-secondary-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search for cards, templates, or occasions..."
                  className="flex-1 min-w-0 bg-transparent text-lg sm:text-xl text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="btn-icon flex-shrink-0"
                  aria-label="Close search"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
