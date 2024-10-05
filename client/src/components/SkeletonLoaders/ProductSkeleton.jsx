import { Skeleton } from "../ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="p-4 border border-gray-200 rounded-md shadow-sm">
      {/* Image Skeleton */}
      <div className="w-full h-48 mb-4">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Product Title Skeleton */}
      <div className="mb-2">
        <Skeleton className="h-6 w-3/4" />
      </div>

      {/* Price Skeleton */}
      <div className="mb-2">
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* Add to Cart Button Skeleton */}
      <div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
