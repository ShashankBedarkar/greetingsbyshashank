import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

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

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [localWishlist, setLocalWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setLocalWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(localWishlist));
  }, [localWishlist]);

  const fetchWishlist = useCallback(async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      if (userId) {
        const { data, error } = await supabase
          .from('wishlists')
          .select(`
            id,
            product_id,
            created_at,
            products!inner (
              name,
              price,
              images
            )
          `)
          .eq('user_id', userId);

        if (error) throw error;

        const items: WishlistItem[] = (data || []).map((item: any) => ({
          id: item.id,
          product_id: item.product_id,
          name: item.products.name,
          price: item.products.price,
          image: item.products.images?.[0] || 'https://images.pexels.com/photos/131995/pexels-photo-131995.jpeg?auto=compress&cs=tinysrgb&w=800',
          created_at: item.created_at,
        }));

        setWishlistItems(items);
      } else {
        setWishlistItems(localWishlist.map(item => ({ ...item, created_at: new Date().toISOString() })));
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlistItems(localWishlist.map(item => ({ ...item, created_at: new Date().toISOString() })));
    } finally {
      setLoading(false);
    }
  }, [localWishlist]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchWishlist();
    });
    return () => subscription.unsubscribe();
  }, [fetchWishlist]);

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlistItems.some(item => item.product_id === productId);
    },
    [wishlistItems]
  );

  const addToWishlist = useCallback(async (product: { id: string; name: string; price: number; image: string }) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      if (userId) {
        const { error } = await supabase.from('wishlists').insert({
          user_id: userId,
          product_id: product.id,
        });

        if (error) throw error;
      }

      const newItem: WishlistItem = {
        id: crypto.randomUUID(),
        product_id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        created_at: new Date().toISOString(),
      };

      setLocalWishlist(prev => {
        if (prev.some(item => item.product_id === product.id)) return prev;
        return [...prev, newItem];
      });

      setWishlistItems(prev => {
        if (prev.some(item => item.product_id === product.id)) return prev;
        return [...prev, newItem];
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      const newItem: WishlistItem = {
        id: crypto.randomUUID(),
        product_id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        created_at: new Date().toISOString(),
      };
      setLocalWishlist(prev => {
        if (prev.some(item => item.product_id === product.id)) return prev;
        return [...prev, newItem];
      });
    }
  }, []);

  const removeFromWishlist = useCallback(async (productId: string) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      if (userId) {
        const { error } = await supabase
          .from('wishlists')
          .delete()
          .eq('user_id', userId)
          .eq('product_id', productId);

        if (error) throw error;
      }

      setLocalWishlist(prev => prev.filter(item => item.product_id !== productId));
      setWishlistItems(prev => prev.filter(item => item.product_id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      setLocalWishlist(prev => prev.filter(item => item.product_id !== productId));
      setWishlistItems(prev => prev.filter(item => item.product_id !== productId));
    }
  }, []);

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
