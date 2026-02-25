import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          className="fixed bottom-6 right-6 z-[100] max-w-md"
        >
          <div className="bg-white rounded-xl shadow-2xl border-2 border-green-500 p-4 flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 pt-1">
              <p className="text-neutral-900 text-sm">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-neutral-500" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
