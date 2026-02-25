import { X, Heart, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function Wishlist() {
  const { items, removeFromWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleMoveToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      subtitle: item.subtitle,
      weight: item.weight,
      mrp: item.mrp,
      image: item.image,
    });
    removeFromWishlist(item.id, item.weight);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/50 z-[60]"
          />

          {/* Wishlist Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-orange-600 fill-orange-600" />
                <h2 className="text-xl">{t('wishlist')}</h2>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Heart className="w-16 h-16 text-neutral-300 mb-4" />
                  <p className="text-neutral-600 mb-2">{t('emptyWishlist')}</p>
                  <p className="text-sm text-neutral-400">{t('startShopping')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.weight}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-contain rounded-lg bg-neutral-50"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-neutral-900">{item.name}</h3>
                          <p className="text-sm text-neutral-600">{item.weight}</p>
                          <p className="text-lg text-orange-600 mt-1">₹{item.mrp}/-</p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button
                          onClick={() => handleMoveToCart(item)}
                          className="flex-1 gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                          size="sm"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {t('moveToCart')}
                        </Button>
                        <Button
                          onClick={() => removeFromWishlist(item.id, item.weight)}
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
