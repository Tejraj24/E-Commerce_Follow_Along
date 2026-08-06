-- Create wishlist_items table for persistent cross-device wishlists
CREATE TABLE public.wishlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;

-- Users can only view their own wishlist items
CREATE POLICY "Users can view own wishlist" 
ON public.wishlist_items 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own wishlist items
CREATE POLICY "Users can insert own wishlist" 
ON public.wishlist_items 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own wishlist items
CREATE POLICY "Users can delete own wishlist" 
ON public.wishlist_items 
FOR DELETE 
USING (auth.uid() = user_id);
