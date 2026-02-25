import { motion, AnimatePresence } from 'motion/react';
import { Star, ThumbsUp, CheckCircle, MessageSquare, Quote } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useReviews } from '../contexts/ReviewsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Toast } from './Toast';

const showcaseTestimonials = [
  {
    name: "Meera Patil",
    location: "Pune, Maharashtra",
    rating: 5,
    text: "Vatan Masala has become an essential part of my kitchen. The authentic taste reminds me of my grandmother's cooking!",
  },
  {
    name: "Rajesh Kulkarni",
    location: "Satara, Maharashtra",
    rating: 5,
    text: "Being from Patan, I know authentic masala. Vatan Masala maintains that traditional flavor perfectly!",
  },
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "The freshness and aroma are unmatched. My family loves the authentic taste in every meal!",
  },
];

export function ReviewsSection() {
  const { reviews, addReview, getAverageRating, getTotalReviews, markHelpful } = useReviews();
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
  });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addReview({
      productId: 1, // Default to main product
      name: formData.name,
      rating: formData.rating,
      comment: formData.comment,
      verified: false,
    });
    setFormData({ name: '', rating: 5, comment: '' });
    setShowForm(false);
    setShowToast(true);
  };

  const allReviews = reviews.slice(0, 6); // Show first 6 reviews
  const avgRating = getAverageRating(1);
  const totalReviews = getTotalReviews(1);

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
            <Star className="w-4 h-4 text-orange-600 fill-orange-600" />
            <span className="text-sm text-orange-700">{t('customerReviews')}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl text-neutral-900 mb-4">
            {t('whatCustomersSay')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('joinHappyCustomers')}
          </p>
          
          {/* Average Rating Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-orange-200 mt-8 max-w-md mx-auto text-center"
          >
            <div className="text-6xl text-orange-600 mb-2">{avgRating.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-orange-600 fill-orange-600" />
              ))}
            </div>
            <p className="text-neutral-600">{t('basedOnReviews')} {totalReviews}+</p>
          </motion.div>
        </motion.div>

        {/* Showcase Testimonials */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center opacity-50">
                  <Quote className="w-6 h-6 text-orange-600" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-orange-600 fill-orange-600" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-neutral-900">{testimonial.name}</div>
                    <div className="text-sm text-neutral-600">{testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Write Review CTA */}
        <div className="text-center mb-12">
          <p className="text-lg text-neutral-600 mb-4">
            {t('shareExperience')}
          </p>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            <MessageSquare className="w-4 h-4" />
            {t('writeReview')}
          </Button>
        </div>

        {/* Review Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('yourName')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('rating')}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= formData.rating
                              ? 'fill-orange-400 text-orange-400'
                              : 'text-neutral-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('yourReview')}
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-orange-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  >
                    {t('submitReview')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* User-Generated Reviews */}
        {allReviews.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-neutral-900">{review.name}</h3>
                    <p className="text-sm text-neutral-500">
                      {new Date(review.date).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-green-600 text-xs">
                      <CheckCircle className="w-4 h-4" />
                      <span>{t('verifiedPurchase')}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'fill-orange-400 text-orange-400'
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-neutral-700 mb-4 leading-relaxed">{review.comment}</p>

                <button
                  onClick={() => markHelpful(review.id)}
                  className="flex items-center gap-2 text-sm text-neutral-600 hover:text-orange-600 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  {t('helpful')} ({review.helpful})
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Toast
        message="Thank you for your review! It has been submitted successfully."
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}