import { motion } from "motion/react";
import { useState } from "react";
import { ShoppingCart, Star, Package, Heart, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useReviews } from "../contexts/ReviewsContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Toast } from "./Toast";
import frontImage from "figma:asset/615706d9f96f2f2623f9a591957a159d7e8e9f15.png";

const products = [
  {
    id: 1,
    name: "Vatan Masala",
    subtitle: "पाटण चे वाटण",
    description: "Premium blend of traditional spices",
    weight: "125g",
    mrp: 40,
    badge: "Best Seller",
    image: frontImage,
  },
  {
    id: 2,
    name: "Vatan Masala",
    subtitle: "पाटण चे वाटण",
    description: "Premium blend of traditional spices",
    weight: "250g",
    mrp: 80,
    badge: "Value Pack",
    image: frontImage,
  },
  {
    id: 3,
    name: "Vatan Masala",
    subtitle: "पाटण चे वाटण",
    description: "Premium blend of traditional spices",
    weight: "500g",
    mrp: 160,
    badge: "Family Pack",
    image: frontImage,
  },
];

export function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'weight-low' | 'weight-high'>('price-low');
  const { addToCart, setIsCartOpen } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { getAverageRating, getTotalReviews } = useReviews();
  const { t } = useLanguage();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      weight: product.weight,
      mrp: product.mrp,
      image: product.image,
    });
    setToastMessage(`${product.name} (${product.weight}) added to cart!`);
    setShowToast(true);
  };

  const handleToggleWishlist = (product: typeof products[0]) => {
    const inWishlist = isInWishlist(product.id, product.weight);
    if (inWishlist) {
      removeFromWishlist(product.id, product.weight);
      setToastMessage(`Removed from wishlist`);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        subtitle: product.subtitle,
        weight: product.weight,
        mrp: product.mrp,
        image: product.image,
      });
      setToastMessage(`Added to wishlist!`);
    }
    setShowToast(true);
  };

  const toggleWeight = (weight: string) => {
    setSelectedWeights(prev =>
      prev.includes(weight)
        ? prev.filter(w => w !== weight)
        : [...prev, weight]
    );
  };

  const clearFilters = () => {
    setPriceRange({ min: 0, max: 200 });
    setSelectedWeights([]);
    setSortBy('price-low');
  };

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => {
      // Price filter
      if (product.mrp < priceRange.min || product.mrp > priceRange.max) {
        return false;
      }
      // Weight filter
      if (selectedWeights.length > 0 && !selectedWeights.includes(product.weight)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.mrp - b.mrp;
        case 'price-high':
          return b.mrp - a.mrp;
        case 'weight-low':
          return parseInt(a.weight) - parseInt(b.weight);
        case 'weight-high':
          return parseInt(b.weight) - parseInt(a.weight);
        default:
          return 0;
      }
    });

  const activeFiltersCount = 
    (selectedWeights.length > 0 ? 1 : 0) +
    (priceRange.min > 0 || priceRange.max < 200 ? 1 : 0);

  return (
    <section id="products" className="py-20 bg-white" aria-label="Product showcase">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
            <Package className="w-4 h-4 text-orange-600" aria-hidden="true" />
            <span className="text-sm text-orange-700">{t('products')}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl text-neutral-900 mb-4">
            {t('chooseYourPack')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('qualityAllSizes')}
          </p>
        </motion.div>

        {/* Filters and Sort */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
              aria-expanded={showFilters}
              aria-controls="filter-panel"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full" aria-label={`${activeFiltersCount} active filters`}>
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-neutral-600" aria-hidden="true" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-neutral-100 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Sort products"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="weight-low">Weight: Low to High</option>
                <option value="weight-high">Weight: High to Low</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              id="filter-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-neutral-50 rounded-xl p-6 border border-neutral-200"
              role="region"
              aria-label="Filter options"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm text-neutral-700 mb-3">
                    Price Range: ₹{priceRange.min} - ₹{priceRange.max}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                      className="w-full"
                      aria-label="Minimum price"
                    />
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                      className="w-full"
                      aria-label="Maximum price"
                    />
                  </div>
                </div>

                {/* Weight Filter */}
                <div>
                  <label className="block text-sm text-neutral-700 mb-3">
                    Select Weight
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['125g', '250g', '500g'].map(weight => (
                      <button
                        key={weight}
                        onClick={() => toggleWeight(weight)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedWeights.includes(weight)
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-orange-300'
                        }`}
                        aria-pressed={selectedWeights.includes(weight)}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  aria-label="Clear all filters"
                >
                  Clear Filters
                </Button>
                <div className="text-sm text-neutral-600 flex items-center">
                  Showing {filteredAndSortedProducts.length} of {products.length} products
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Product list">
          {filteredAndSortedProducts.map((product, index) => {
            const avgRating = getAverageRating(product.id);
            const totalReviews = getTotalReviews(product.id);
            const inWishlist = isInWishlist(product.id, product.weight);

            return (
              <motion.div
                key={product.id}
                role="listitem"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-white to-orange-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-orange-100 hover:border-orange-300"
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-full text-sm shadow-lg" role="status">
                    {t(product.badge.toLowerCase().replace(' ', ''))}
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => handleToggleWishlist(product)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
                  aria-label={inWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                  aria-pressed={inWishlist}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      inWishlist
                        ? 'fill-red-500 text-red-500'
                        : 'text-neutral-600'
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* Product Image */}
                <div className="relative h-80 bg-white p-8 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 opacity-50" aria-hidden="true" />
                  <img
                    src={product.image}
                    alt={`${product.name} ${product.weight} package`}
                    className="relative w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl text-neutral-900 mb-1">{product.name}</h3>
                    <p className="text-orange-600 mb-2" lang="hi">{product.subtitle}</p>
                    <p className="text-sm text-neutral-600">{product.description}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full" role="img" aria-label={`Rating: ${avgRating > 0 ? avgRating.toFixed(1) : '5.0'} stars`}>
                      <Star className="w-4 h-4 text-orange-600 fill-orange-600" aria-hidden="true" />
                      <span className="text-sm text-orange-700">
                        {avgRating > 0 ? avgRating.toFixed(1) : '5.0'}
                      </span>
                    </div>
                    <span className="text-sm text-neutral-600">
                      ({totalReviews > 0 ? totalReviews : '2847'} {t('reviews').toLowerCase()})
                    </span>
                  </div>

                  {/* Weight and Price */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <div>
                      <div className="text-sm text-neutral-600">{t('netWeight')}</div>
                      <div className="text-2xl text-neutral-900">{product.weight}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-neutral-600">MRP</div>
                      <div className="text-3xl text-orange-600" aria-label={`Price: ${product.mrp} rupees`}>₹{product.mrp}/-</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-6"
                    aria-label={`Add ${product.name} ${product.weight} to cart`}
                  >
                    <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                    <span>{t('addToCart')}</span>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16" role="status">
            <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl text-neutral-700 mb-2">No products found</h3>
            <p className="text-neutral-600 mb-4">Try adjusting your filters</p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
        
        <Toast 
          message={toastMessage} 
          isVisible={showToast} 
          onClose={() => setShowToast(false)} 
        />
      </div>
    </section>
  );
}