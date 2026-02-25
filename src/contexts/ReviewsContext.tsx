import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Review {
  id: string;
  productId: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

interface ReviewsContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => void;
  getProductReviews: (productId: number) => Review[];
  getAverageRating: (productId: number) => number;
  getTotalReviews: (productId: number) => number;
  markHelpful: (reviewId: string) => void;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

// Default reviews
const defaultReviews: Review[] = [
  {
    id: '1',
    productId: 1,
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Amazing quality! The authentic taste reminds me of my grandmother\'s cooking. Best masala I\'ve ever used.',
    date: '2026-02-20',
    verified: true,
    helpful: 12,
  },
  {
    id: '2',
    productId: 1,
    name: 'Rajesh Patil',
    rating: 5,
    comment: 'खूप छान मसाला! खरच पाटणचा वाटण. प्रत्येक पदार्थाला चवदार बनवतो.',
    date: '2026-02-18',
    verified: true,
    helpful: 8,
  },
  {
    id: '3',
    productId: 2,
    name: 'Sunita Desai',
    rating: 4,
    comment: 'Very good masala. Value for money. Great for daily cooking.',
    date: '2026-02-15',
    verified: true,
    helpful: 5,
  },
  {
    id: '4',
    productId: 1,
    name: 'Amit Kumar',
    rating: 5,
    comment: 'Outstanding blend of spices. Fresh and aromatic. Highly recommended!',
    date: '2026-02-12',
    verified: true,
    helpful: 15,
  },
  {
    id: '5',
    productId: 3,
    name: 'Meena Joshi',
    rating: 5,
    comment: 'Family pack is perfect for us. Lasts the whole month and quality is excellent.',
    date: '2026-02-10',
    verified: true,
    helpful: 7,
  },
  {
    id: '6',
    productId: 2,
    name: 'Suresh Kadam',
    rating: 5,
    comment: 'Perfect balance of spices. Not too spicy, not too mild. Just right!',
    date: '2026-02-08',
    verified: false,
    helpful: 4,
  },
];

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('vatanMasalaReviews');
    return saved ? JSON.parse(saved) : defaultReviews;
  });

  useEffect(() => {
    localStorage.setItem('vatanMasalaReviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review: Omit<Review, 'id' | 'date' | 'helpful'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const getProductReviews = (productId: number) => {
    return reviews.filter((review) => review.productId === productId);
  };

  const getAverageRating = (productId: number) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / productReviews.length;
  };

  const getTotalReviews = (productId: number) => {
    return getProductReviews(productId).length;
  };

  const markHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review
      )
    );
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getAverageRating,
        getTotalReviews,
        markHelpful,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within ReviewsProvider');
  }
  return context;
}
