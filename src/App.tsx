import { Hero } from "./components/Hero";
import { TrustBadges } from "./components/TrustBadges";
import { Features } from "./components/Features";
import { ProductShowcase } from "./components/ProductShowcase";
import { Ingredients } from "./components/Ingredients";
import { QualityAssurance } from "./components/QualityAssurance";
import { Recipes } from "./components/Recipes";
import { BulkOrder } from "./components/BulkOrder";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Cart } from "./components/Cart";
import { Wishlist } from "./components/Wishlist";
import { ReviewsSection } from "./components/ReviewsSection";
import { SEOHead } from "./components/SEOHead";
import { Analytics } from "./components/Analytics";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { ReviewsProvider } from "./contexts/ReviewsContext";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <ReviewsProvider>
        <WishlistProvider>
          <CartProvider>
            {/* SEO Meta Tags */}
            <SEOHead />
            
            {/* Analytics Tracking */}
            <Analytics trackingId="G-XXXXXXXXXX" />
            
            <div className="min-h-screen bg-neutral-50">
              <Header />
              <Hero />
              <TrustBadges />
              <Features />
              <ProductShowcase />
              <Ingredients />
              <QualityAssurance />
              <ReviewsSection />
              <Recipes />
              <BulkOrder />
              <Footer />
              <Cart />
              <Wishlist />
            </div>
          </CartProvider>
        </WishlistProvider>
      </ReviewsProvider>
    </LanguageProvider>
  );
}