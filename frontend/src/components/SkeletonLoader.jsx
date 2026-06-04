import { motion } from 'framer-motion';

export const ProductSkeleton = ({ viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <motion.div initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.9 }} className="overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white shadow-sm">
        <div className="flex gap-4 p-4 sm:p-5">
          <div className="h-32 w-40 rounded-[1rem] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"></div>
          <div className="flex-1 space-y-3">
            <div className="h-4 w-1/4 rounded-full bg-gray-200"></div>
            <div className="h-6 w-3/4 rounded-full bg-gray-200"></div>
            <div className="h-4 w-full rounded-full bg-gray-200"></div>
            <div className="h-4 w-2/3 rounded-full bg-gray-200"></div>
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <div className="h-6 w-24 rounded-full bg-gray-200"></div>
                <div className="h-4 w-16 rounded-full bg-gray-200"></div>
              </div>
              <div className="h-4 w-20 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.9 }} className="overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white shadow-sm">
      <div className="h-64 w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"></div>
      <div className="space-y-3 p-4">
        <div className="h-4 w-1/3 rounded-full bg-gray-200"></div>
        <div className="h-5 w-full rounded-full bg-gray-200"></div>
        <div className="h-4 w-2/3 rounded-full bg-gray-200"></div>
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <div className="h-6 w-20 rounded-full bg-gray-200"></div>
            <div className="h-4 w-16 rounded-full bg-gray-200"></div>
          </div>
          <div className="h-4 w-16 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </motion.div>
  );
};

export const HeroSliderSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] animate-pulse">
      <div className="h-[400px] w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 md:h-[500px] lg:h-[600px]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="mx-auto h-8 w-64 rounded-full bg-gray-300 md:h-10 md:w-96 lg:h-12"></div>
          <div className="mx-auto h-4 w-48 rounded-full bg-gray-300"></div>
          <div className="flex gap-4 justify-center">
            <div className="h-10 w-32 rounded-full bg-gray-300"></div>
            <div className="h-10 w-32 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CategorySkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-4 h-8 w-48 rounded-full bg-gray-200"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-[1.25rem] border border-gray-200 bg-white p-4">
            <div className="mb-2 h-16 rounded-xl bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded-full bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const BrandSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-6 h-8 w-64 rounded-full bg-gray-200"></div>
      <div className="space-y-3">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center justify-between rounded-[1.25rem] border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-gray-200"></div>
              <div className="h-5 w-32 rounded-full bg-gray-200"></div>
            </div>
            <div className="h-6 w-16 rounded-full bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DealSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-6 h-8 w-64 rounded-full bg-gray-200"></div>
      <div className="flex gap-4 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-1/4">
            <div className="h-48 rounded-[1.25rem] bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const FilterSkeleton = () => {
  return (
    <div className="animate-pulse rounded-[1.5rem] border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 w-24 rounded-full bg-gray-200"></div>
        <div className="h-4 w-16 rounded-full bg-gray-200"></div>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="mb-3 h-5 w-20 rounded-full bg-gray-200"></div>
          <div className="space-y-3">
            <div className="h-2 rounded-full bg-gray-200"></div>
            <div className="h-2 rounded-full bg-gray-200"></div>
          </div>
        </div>
        
        <div>
          <div className="mb-3 h-5 w-20 rounded-full bg-gray-200"></div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                <div className="h-4 w-24 rounded-full bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="mb-3 h-5 w-16 rounded-full bg-gray-200"></div>
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                <div className="h-4 w-20 rounded-full bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
