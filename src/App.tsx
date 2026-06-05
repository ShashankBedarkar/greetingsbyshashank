import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AuthPage from './pages/AuthPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DesignStudioPage from './pages/DesignStudioPage';
import WishlistPage from './pages/WishlistPage';
import TemplatesPage from './pages/TemplatesPage';
import BulkOrdersPage from './pages/BulkOrdersPage';
import TrackOrderPage from './pages/TrackOrderPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <CurrencyProvider>
              <Router>
              <div className="min-h-screen flex flex-col bg-white dark:bg-secondary-950 transition-colors duration-300">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/shop/:category" element={<ShopPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/custom-studio" element={<DesignStudioPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/templates" element={<TemplatesPage />} />
                    <Route path="/bulk-orders" element={<BulkOrdersPage />} />
                    <Route path="/track-order" element={<TrackOrderPage />} />
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
            </CurrencyProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
