-- Create cart_items table for persistent cross-device cart
CREATE TABLE public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Users can only view their own cart items
CREATE POLICY "Users can view own cart"
ON public.cart_items
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own cart items
CREATE POLICY "Users can insert own cart"
ON public.cart_items
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own cart items (quantity changes)
CREATE POLICY "Users can update own cart"
ON public.cart_items
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own cart items
CREATE POLICY "Users can delete own cart"
ON public.cart_items
FOR DELETE
USING (auth.uid() = user_id);
