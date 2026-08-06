-- Add a generated search vector column to the products table
ALTER TABLE public.products
ADD COLUMN search_vector tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(array_to_string(description, ' '), '')), 'B')
) STORED;

-- Create a GIN index to speed up text search queries
CREATE INDEX products_search_idx ON public.products USING GIN (search_vector);
