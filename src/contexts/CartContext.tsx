import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface CartItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  gift_wrapping: boolean;
  gift_message: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  loading: boolean;
  addToCart: (product: { id: string; name: string; price: number; image: string }, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  toggleGiftWrapping: (itemId: string) => Promise<void>;
  updateGiftMessage: (itemId: string, message: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    const storedSession = localStorage.getItem('cart_session_id');
    if (storedSession) {
      setSessionId(storedSession);
    } else {
      const newSessionId = crypto.randomUUID();
      localStorage.setItem('cart_session_id', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  const fetchCart = useCallback(async () => {
    if (!sessionId) return;

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      let query = supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          gift_wrapping,
          gift_message,
          products!inner (
            name,
            price,
            images
          )
        `);

      if (userId) {
        query = query.eq('user_id', userId);
      } else {
        query = query.eq('session_id', sessionId);
      }

      const { data, error } = await query;

      if (error) throw error;

      const items: CartItem[] = (data || []).map((item: any) => ({
        id: item.id,
        product_id: item.product_id,
        name: item.products.name,
        price: item.products.price,
        quantity: item.quantity,
        image: item.products.images?.[0] || 'https://images.pexels.com/photos/131995/pexels-photo-131995.jpeg?auto=compress&cs=tinysrgb&w=800',
        gift_wrapping: item.gift_wrapping || false,
        gift_message: item.gift_message || '',
      }));

      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchCart();
    });
    return () => subscription.unsubscribe();
  }, [fetchCart]);

  const addToCart = useCallback(async (product: { id: string; name: string; price: number; image: string }, quantity = 1) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      const cartItem: any = {
        product_id: product.id,
        quantity,
        gift_wrapping: false,
        gift_message: '',
      };

      if (userId) {
        cartItem.user_id = userId;
      } else {
        cartItem.session_id = sessionId;
      }

      const { error } = await supabase.from('cart_items').insert(cartItem);

      if (error) throw error;

      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      setCartItems(prev => {
        const existingItem = prev.find(item => item.product_id === product.id);
        if (existingItem) {
          return prev.map(item =>
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, {
          id: crypto.randomUUID(),
          product_id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          gift_wrapping: false,
          gift_message: '',
        }];
      });
    }
  }, [sessionId, fetchCart]);

  const removeFromCart = useCallback(async (itemId: string) => {
    try {
      const { error } = await supabase.from('cart_items').delete().eq('id', itemId);
      if (error) throw error;
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    }
  }, []);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    if (quantity < 1) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;
      setCartItems(prev =>
        prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      setCartItems(prev =>
        prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
      );
    }
  }, []);

  const toggleGiftWrapping = useCallback(async (itemId: string) => {
    const item = cartItems.find(i => i.id === itemId);
    if (!item) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ gift_wrapping: !item.gift_wrapping })
        .eq('id', itemId);

      if (error) throw error;
      setCartItems(prev =>
        prev.map(i => (i.id === itemId ? { ...i, gift_wrapping: !i.gift_wrapping } : i))
      );
    } catch (error) {
      console.error('Error toggling gift wrapping:', error);
      setCartItems(prev =>
        prev.map(i => (i.id === itemId ? { ...i, gift_wrapping: !i.gift_wrapping } : i))
      );
    }
  }, [cartItems]);

  const updateGiftMessage = useCallback(async (itemId: string, message: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ gift_message: message })
        .eq('id', itemId);

      if (error) throw error;
      setCartItems(prev =>
        prev.map(item => (item.id === itemId ? { ...item, gift_message: message } : item))
      );
    } catch (error) {
      console.error('Error updating gift message:', error);
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      let query = supabase.from('cart_items').delete();
      if (userId) {
        query = query.eq('user_id', userId);
      } else {
        query = query.eq('session_id', sessionId);
      }

      await query;
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      setCartItems([]);
    }
  }, [sessionId]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleGiftWrapping,
        updateGiftMessage,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
