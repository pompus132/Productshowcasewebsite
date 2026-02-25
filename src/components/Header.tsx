import { ShoppingCart, Phone, Menu, Heart, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import logo from "figma:asset/66cf9836269a8ebd64d7c272a930bbfdc1841521.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getTotalItems, setIsCartOpen } = useCart();
  const { items: wishlistItems, setIsWishlistOpen } = useWishlist();
  const { t } = useLanguage();
  const cartItemCount = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      // Search functionality will be handled in ProductShowcase
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200" role="banner">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Vatan Masala Logo" 
              className="h-16 w-auto object-contain"
            />
            <div>
              <h1 className="text-orange-600">Vatan Masala</h1>
              <p className="text-xs text-neutral-600" lang="hi">पाटण चे वाटण</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            <a href="#home" className="text-neutral-700 hover:text-orange-600 transition-colors">
              {t('home')}
            </a>
            <a href="#about" className="text-neutral-700 hover:text-orange-600 transition-colors">
              {t('about')}
            </a>
            <a href="#products" className="text-neutral-700 hover:text-orange-600 transition-colors">
              {t('products')}
            </a>
            <a href="#recipes" className="text-neutral-700 hover:text-orange-600 transition-colors">
              {t('recipes')}
            </a>
            <a href="#contact" className="text-neutral-700 hover:text-orange-600 transition-colors">
              {t('contact')}
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Toggle search"
              aria-expanded={searchOpen}
            >
              <Search className="w-5 h-5 text-neutral-700" aria-hidden="true" />
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors relative"
              aria-label={`Open wishlist${wishlistItems.length > 0 ? `, ${wishlistItems.length} items` : ''}`}
            >
              <Heart className="w-5 h-5 text-neutral-700" aria-hidden="true" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center" aria-label={`${wishlistItems.length} items in wishlist`}>
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Contact Button */}
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => window.open('https://wa.me/918600317822', '_blank')}
              aria-label="Contact us on WhatsApp"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>{t('contactUs')}</span>
            </Button>

            {/* Cart Button */}
            <Button 
              size="sm" 
              className="gap-2 bg-orange-600 hover:bg-orange-700 relative"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open cart${cartItemCount > 0 ? `, ${cartItemCount} items` : ''}`}
            >
              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
              <span>{t('cart')}</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" aria-label={`${cartItemCount} items in cart`}>
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t border-neutral-200" role="search">
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search')}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Search products"
                />
              </div>
            </form>
          </div>
        )}

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200" role="navigation" aria-label="Mobile navigation">
            <nav className="flex flex-col gap-4">
              <a href="#home" className="text-neutral-700 hover:text-orange-600 transition-colors">
                {t('home')}
              </a>
              <a href="#about" className="text-neutral-700 hover:text-orange-600 transition-colors">
                {t('about')}
              </a>
              <a href="#products" className="text-neutral-700 hover:text-orange-600 transition-colors">
                {t('products')}
              </a>
              <a href="#recipes" className="text-neutral-700 hover:text-orange-600 transition-colors">
                {t('recipes')}
              </a>
              <a href="#contact" className="text-neutral-700 hover:text-orange-600 transition-colors">
                {t('contact')}
              </a>
              <div className="flex flex-col gap-2 pt-4">
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsWishlistOpen(true)}
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    aria-label={`Wishlist, ${wishlistItems.length} items`}
                  >
                    <Heart className="w-4 h-4" aria-hidden="true" />
                    {t('wishlist')} ({wishlistItems.length})
                  </Button>
                  <LanguageSwitcher />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => window.open('https://wa.me/918600317822', '_blank')}
                  aria-label="Contact us on WhatsApp"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>{t('contactUs')}</span>
                </Button>
                <Button 
                  size="sm" 
                  className="gap-2 bg-orange-600 hover:bg-orange-700 relative"
                  onClick={() => setIsCartOpen(true)}
                  aria-label={`Cart, ${cartItemCount} items`}
                >
                  <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                  <span>{t('cart')} ({cartItemCount})</span>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}