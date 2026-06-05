/*
  # Initial Database Schema for Custom Greetings

  1. New Tables
    - `profiles` - User profile information
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `phone` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `categories` - Card categories
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `description` (text)
      - `image_url` (text)
      - `parent_id` (uuid, references categories)
      - `sort_order` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamp)
    
    - `products` - Greeting card products
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `price` (decimal)
      - `compare_at_price` (decimal)
      - `cost_per_item` (decimal)
      - `sku` (text)
      - `barcode` (text)
      - `quantity` (integer)
      - `category_id` (uuid, references categories)
      - `images` (jsonb array)
      - `tags` (text array)
      - `is_customizable` (boolean)
      - `is_active` (boolean)
      - `is_featured` (boolean)
      - `has_bulk_pricing` (boolean)
      - `meta_title` (text)
      - `meta_description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `templates` - Pre-designed card templates
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `category_id` (uuid, references categories)
      - `preview_url` (text)
      - `design_data` (jsonb)
      - `is_premium` (boolean)
      - `is_active` (boolean)
      - `usage_count` (integer)
      - `created_at` (timestamp)
    
    - `user_designs` - Saved user card designs
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_id` (uuid, references products)
      - `template_id` (uuid, references templates, nullable)
      - `name` (text)
      - `design_data` (jsonb)
      - `preview_url` (text)
      - `qr_code_url` (text)
      - `qr_code_data` (jsonb)
      - `is_public` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `addresses` - User shipping/billing addresses
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `label` (text)
      - `full_name` (text)
      - `phone` (text)
      - `address_line1` (text)
      - `address_line2` (text)
      - `city` (text)
      - `state` (text)
      - `postal_code` (text)
      - `country` (text)
      - `is_default` (boolean)
      - `type` (text - 'shipping' or 'billing')
      - `created_at` (timestamp)
    
    - `cart_items` - Shopping cart
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users, nullable for guest)
      - `session_id` (text for guest users)
      - `product_id` (uuid, references products)
      - `design_id` (uuid, references user_designs, nullable)
      - `quantity` (integer)
      - `gift_wrapping` (boolean)
      - `gift_message` (text)
      - `created_at` (timestamp)
    
    - `wishlists` - User wishlists
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_id` (uuid, references products)
      - `created_at` (timestamp)
    
    - `orders` - Customer orders
      - `id` (uuid, primary key)
      - `order_number` (text, unique)
      - `user_id` (uuid, references auth.users, nullable for guest)
      - `email` (text)
      - `status` (text)
      - `payment_status` (text)
      - `fulfillment_status` (text)
      - `subtotal` (decimal)
      - `tax` (decimal)
      - `shipping` (decimal)
      - `discount` (decimal)
      - `total` (decimal)
      - `currency` (text)
      - `shipping_address` (jsonb)
      - `billing_address` (jsonb)
      - `notes` (text)
      - `tracking_number` (text)
      - `carrier` (text)
      - `shipped_at` (timestamp)
      - `delivered_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `order_items` - Items within orders
      - `id` (uuid, primary key)
      - `order_id` (uuid, references orders)
      - `product_id` (uuid, references products)
      - `design_id` (uuid, references user_designs, nullable)
      - `name` (text)
      - `quantity` (integer)
      - `price` (decimal)
      - `total` (decimal)
      - `gift_wrapping` (boolean)
      - `gift_message` (text)
      - `created_at` (timestamp)
    
    - `reviews` - Product reviews
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_id` (uuid, references products)
      - `rating` (integer, 1-5)
      - `title` (text)
      - `comment` (text)
      - `images` (jsonb array)
      - `is_verified_purchase` (boolean)
      - `is_approved` (boolean)
      - `created_at` (timestamp)
    
    - `reminders` - Birthday/anniversary reminders
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `occasion` (text)
      - `date` (date)
      - `recurring` (boolean)
      - `reminder_days` (integer array - days before to send reminder)
      - `is_active` (boolean)
      - `last_notified` (timestamp)
      - `created_at` (timestamp)
    
    - `coupons` - Discount coupons
      - `id` (uuid, primary key)
      - `code` (text, unique)
      - `description` (text)
      - `discount_type` (text - 'percentage' or 'fixed')
      - `discount_value` (decimal)
      - `min_order_amount` (decimal)
      - `max_uses` (integer)
      - `used_count` (integer)
      - `valid_from` (timestamp)
      - `valid_until` (timestamp)
      - `is_active` (boolean)
      - `created_at` (timestamp)
    
    - `blog_posts` - Blog articles
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `content` (text)
      - `featured_image` (text)
      - `author_id` (uuid, references auth.users)
      - `category` (text)
      - `tags` (text array)
      - `is_published` (boolean)
      - `published_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `newsletter_subscribers` - Email subscribers
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `is_active` (boolean)
      - `subscribed_at` (timestamp)
      - `unsubscribed_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated users to manage their own data
    - Public read access for products, categories, templates
    - Admin-only write access for products, categories, etc.

  3. Important Notes
    - All tables use UUID primary keys with gen_random_uuid()
    - Timestamps use timestamptz for timezone support
    - Foreign keys have ON DELETE CASCADE where appropriate
    - Indexes on frequently queried columns
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text DEFAULT '',
  avatar_url text,
  phone text,
  loyalty_points integer DEFAULT 0,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  image_url text,
  icon_name text,
  parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  price decimal(10, 2) NOT NULL CHECK (price >= 0),
  compare_at_price decimal(10, 2) CHECK (compare_at_price >= 0),
  cost_per_item decimal(10, 2) CHECK (cost_per_item >= 0),
  sku text UNIQUE,
  barcode text,
  quantity integer DEFAULT 0 CHECK (quantity >= 0),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  images jsonb DEFAULT '[]'::jsonb,
  tags text[] DEFAULT ARRAY[]::text[],
  is_customizable boolean DEFAULT true,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  has_bulk_pricing boolean DEFAULT false,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  preview_url text,
  thumbnail_url text,
  design_data jsonb DEFAULT '{}'::jsonb,
  is_premium boolean DEFAULT false,
  is_active boolean DEFAULT true,
  usage_count integer DEFAULT 0,
  tags text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now()
);

-- User designs table
CREATE TABLE IF NOT EXISTS user_designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  template_id uuid REFERENCES templates(id) ON DELETE SET NULL,
  name text NOT NULL,
  design_data jsonb DEFAULT '{}'::jsonb,
  preview_url text,
  qr_code_url text,
  qr_code_data jsonb,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  label text DEFAULT '',
  full_name text NOT NULL,
  phone text,
  address_line1 text NOT NULL,
  address_line2 text,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'US',
  is_default boolean DEFAULT false,
  type text DEFAULT 'shipping' CHECK (type IN ('shipping', 'billing', 'both')),
  created_at timestamptz DEFAULT now()
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id text,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  design_id uuid REFERENCES user_designs(id) ON DELETE SET NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  gift_wrapping boolean DEFAULT false,
  gift_message text,
  created_at timestamptz DEFAULT now()
);

-- Wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, product_id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  fulfillment_status text DEFAULT 'unfulfilled' CHECK (fulfillment_status IN ('unfulfilled', 'partial', 'fulfilled')),
  subtotal decimal(10, 2) NOT NULL CHECK (subtotal >= 0),
  tax decimal(10, 2) DEFAULT 0 CHECK (tax >= 0),
  shipping decimal(10, 2) DEFAULT 0 CHECK (shipping >= 0),
  discount decimal(10, 2) DEFAULT 0 CHECK (discount >= 0),
  total decimal(10, 2) NOT NULL CHECK (total >= 0),
  currency text DEFAULT 'USD',
  shipping_address jsonb,
  billing_address jsonb,
  notes text,
  tracking_number text,
  carrier text,
  shipped_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  design_id uuid REFERENCES user_designs(id) ON DELETE SET NULL,
  name text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  price decimal(10, 2) NOT NULL CHECK (price >= 0),
  total decimal(10, 2) NOT NULL CHECK (total >= 0),
  gift_wrapping boolean DEFAULT false,
  gift_message text,
  created_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text DEFAULT '',
  comment text DEFAULT '',
  images jsonb DEFAULT '[]'::jsonb,
  is_verified_purchase boolean DEFAULT false,
  is_approved boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Reminders table
CREATE TABLE IF NOT EXISTS reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  occasion text NOT NULL,
  date date NOT NULL,
  recurring boolean DEFAULT true,
  reminder_days integer[] DEFAULT ARRAY[7, 3, 1]::integer[],
  is_active boolean DEFAULT true,
  last_notified timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  description text DEFAULT '',
  discount_type text NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value decimal(10, 2) NOT NULL CHECK (discount_value > 0),
  min_order_amount decimal(10, 2) DEFAULT 0,
  max_uses integer,
  used_count integer DEFAULT 0,
  valid_from timestamptz DEFAULT now(),
  valid_until timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text DEFAULT '',
  content text,
  featured_image text,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  category text,
  tags text[] DEFAULT ARRAY[]::text[],
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Categories policies (public read)
CREATE POLICY "Anyone can view active categories"
  ON categories FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- Products policies (public read)
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- Templates policies (public read)
CREATE POLICY "Anyone can view active templates"
  ON templates FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Admins can manage templates"
  ON templates FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- User designs policies
CREATE POLICY "Users can view own designs"
  ON user_designs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view public designs"
  ON user_designs FOR SELECT
  TO authenticated, anon
  USING (is_public = true);

CREATE POLICY "Users can insert own designs"
  ON user_designs FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own designs"
  ON user_designs FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own designs"
  ON user_designs FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Addresses policies
CREATE POLICY "Users can view own addresses"
  ON addresses FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own addresses"
  ON addresses FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own addresses"
  ON addresses FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own addresses"
  ON addresses FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Cart items policies
CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Wishlists policies
CREATE POLICY "Users can view own wishlist"
  ON wishlists FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert to wishlist"
  ON wishlists FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete from wishlist"
  ON wishlists FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Orders policies
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert orders"
  ON orders FOR INSERT
  TO authenticated, anon
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Admins can manage orders"
  ON orders FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- Order items policies
CREATE POLICY "Users can view items from own orders"
  ON order_items FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid()));

CREATE POLICY "Users can insert order items"
  ON order_items FOR INSERT
  TO authenticated, anon
  WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE id = order_id));

-- Reviews policies
CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  TO authenticated, anon
  USING (is_approved = true);

CREATE POLICY "Users can insert reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Reminders policies
CREATE POLICY "Users can view own reminders"
  ON reminders FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert reminders"
  ON reminders FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own reminders"
  ON reminders FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own reminders"
  ON reminders FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Coupons policies (public read for active coupons)
CREATE POLICY "Anyone can view active coupons"
  ON coupons FOR SELECT
  TO authenticated, anon
  USING (is_active = true AND (valid_until IS NULL OR valid_until > now()));

CREATE POLICY "Admins can manage coupons"
  ON coupons FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- Blog posts policies (public read for published posts)
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  TO authenticated, anon
  USING (is_published = true);

CREATE POLICY "Admins can manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- Newsletter subscribers policies
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);

CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category_id);
CREATE INDEX IF NOT EXISTS idx_templates_slug ON templates(slug);

CREATE INDEX IF NOT EXISTS idx_user_designs_user ON user_designs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_designs_product ON user_designs(product_id);

CREATE INDEX IF NOT EXISTS idx_cart_items_user ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_session ON cart_items(session_id);

CREATE INDEX IF NOT EXISTS idx_wishlists_user ON wishlists(user_id);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);

CREATE INDEX IF NOT EXISTS idx_reminders_user ON reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_date ON reminders(date);

CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
