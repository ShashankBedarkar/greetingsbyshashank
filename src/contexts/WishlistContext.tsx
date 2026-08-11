import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface WishlistItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  image: string;
  created_at: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  loading: boolean;
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (product: { id: string; name: string; price: number; image: string }) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  toggleWishlist: (product: { id: string; name: string; price: number; image: string }) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = 'wishlist';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWishlistItems(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
    setLoading(false);
  }, []);

  const persist = useCallback((items: WishlistItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlistItems.some(item => item.product_id === productId),
    [wishlistItems]
  );

  const addToWishlist = useCallback(
    async (product: { id: string; name: string; price: number; image: string }) => {
      setWishlistItems(prev => {
        if (prev.some(item => item.product_id === product.id)) return prev;
        const newItem: WishlistItem = {
          id: crypto.randomUUID(),
          product_id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          created_at: new Date().toISOString(),
        };
        const next = [...prev, newItem];
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const removeFromWishlist = useCallback(
    async (productId: string) => {
      setWishlistItems(prev => {
        const next = prev.filter(item => item.product_id !== productId);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const toggleWishlist = useCallback(
    async (product: { id: string; name: string; price: number; image: string }) => {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product);
      }
    },
    [isInWishlist, addToWishlist, removeFromWishlist]
  );

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        loading,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
