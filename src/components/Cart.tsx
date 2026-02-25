import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, isCartOpen, setIsCartOpen } = useCart();

  const handleWhatsAppOrder = () => {
    const phoneNumber = '918600317822';
    
    // Build order details with proper formatting
    let message = '🛒 *New Order from Website*\n\n';
    message += '━━━━━━━━━━━━━━━━━━━━\n';
    
    items.forEach((item, index) => {
      message += `\n${index + 1}. *${item.name}*\n`;
      message += `   📦 Size: ${item.weight}\n`;
      message += `   🔢 Quantity: ${item.quantity}\n`;
      message += `   💰 Price: Rs.${item.mrp} x ${item.quantity} = Rs.${item.mrp * item.quantity}/-\n`;
    });
    
    message += '\n━━━━━━━━━━━━━━━━━━━━\n';
    message += `\n💵 *Total Amount: Rs.${getTotalPrice()}/-*\n`;
    message += `📦 *Total Items: ${getTotalItems()}*\n\n`;
    message += '✅ Please confirm my order.\n';
    message += '📍 I will share my delivery address after confirmation.';
    
    // Properly encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl text-neutral-900">
                  Your Cart ({getTotalItems()})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-20 h-20 text-neutral-300 mb-4" />
                  <p className="text-neutral-600 mb-2">Your cart is empty</p>
                  <p className="text-sm text-neutral-400">Add some delicious masala to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="bg-orange-50 rounded-xl p-4 border border-orange-100"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-contain rounded-lg bg-white"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-neutral-900">{item.name}</h3>
                              <p className="text-xs text-orange-600">{item.subtitle}</p>
                              <p className="text-sm text-neutral-600">{item.weight}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 hover:bg-red-100 rounded-full transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 bg-white rounded-lg border border-orange-200">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-orange-50 transition-colors rounded-l-lg"
                              >
                                <Minus className="w-4 h-4 text-orange-600" />
                              </button>
                              <span className="w-8 text-center text-neutral-900">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-orange-50 transition-colors rounded-r-lg"
                              >
                                <Plus className="w-4 h-4 text-orange-600" />
                              </button>
                            </div>
                            <div className="text-right">
                              <div className="text-lg text-orange-600">
                                ₹{item.mrp * item.quantity}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-neutral-200 p-6 bg-neutral-50">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-neutral-600">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>₹{getTotalPrice()}/-</span>
                  </div>
                  <div className="flex items-center justify-between text-lg text-neutral-900">
                    <span>Total Amount</span>
                    <span className="text-orange-600">₹{getTotalPrice()}/-</span>
                  </div>
                </div>
                <Button
                  onClick={handleWhatsAppOrder}
                  className="w-full gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-6"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Order via WhatsApp</span>
                </Button>
                <p className="text-xs text-center text-neutral-500 mt-3">
                  Complete your order securely via WhatsApp
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}