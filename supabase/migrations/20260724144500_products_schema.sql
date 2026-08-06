-- Create categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access for categories
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories FOR SELECT USING (true);

-- Create products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    sku TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id),
    collection TEXT,
    price_cents INTEGER NOT NULL,
    image TEXT NOT NULL,
    is_new BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_bestseller BOOLEAN DEFAULT false,
    description TEXT[] NOT NULL,
    material TEXT NOT NULL,
    finish TEXT NOT NULL,
    dimensions TEXT NOT NULL,
    weight TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    editor_notes TEXT,
    images TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read access for products
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT USING (true);
