import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistItem {
  id: number;
  name: string;
  subtitle: string;
  weight: string;
  mrp: number;
  image: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number, weight: string) => void;
  isInWishlist: (id: number, weight: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('vatanMasalaWishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('vatanMasalaWishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id && i.weight === item.weight);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number, weight: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.weight === weight)));
  };

  const isInWishlist = (id: number, weight: string) => {
    return items.some((item) => item.id === id && item.weight === weight);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
