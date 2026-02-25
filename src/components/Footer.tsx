import { Phone, Mail, MapPin, Facebook, Instagram, MessageSquare, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useState, FormEvent } from "react";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/LanguageContext";
import logo from "figma:asset/66cf9836269a8ebd64d7c272a930bbfdc1841521.png";

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const { setIsCartOpen } = useCart();
  const { t } = useLanguage();

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send newsletter subscription via WhatsApp
    const phoneNumber = '918600317822';
    const whatsappMessage = `📧 *NEWSLETTER SUBSCRIPTION*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Email: ${email}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `✅ New subscriber requesting updates, offers, and recipes.`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

    // Show success message
    setMessage('Thank you! Your subscription request has been sent.');
    setEmail('');
    setIsSubmitting(false);

    // Clear message after 5 seconds
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <footer id="contact" className="bg-neutral-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-neutral-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl mb-2">{t('stayUpdated')}</h3>
              <p className="text-white/70">
                {t('subscribeText')}
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit}>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder={t('enterEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-orange-500 focus:outline-none text-white placeholder:text-neutral-500 disabled:opacity-50"
                />
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-8 disabled:opacity-50"
                >
                  {isSubmitting ? t('sending') : t('subscribe')}
                </Button>
              </div>
              {message && (
                <p className="text-green-400 text-sm mt-2">{message}</p>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="Vatan Masala Logo" 
                className="h-16 w-auto object-contain"
              />
              <div>
                <h3 className="text-lg">Vatan Masala</h3>
                <p className="text-xs text-neutral-400">पाटण चे वाटण</p>
              </div>
            </div>
            <p className="text-neutral-400 mb-6">
              Bringing authentic traditional flavors to your kitchen with premium quality masala since 25+ years.
            </p>

            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com/profile.php?id=61588384425751" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/pompus_watan_masala" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="mailto:pompuswatanmasala@gmail.com"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Send us an email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/918600317822" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Contact us on WhatsApp"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-neutral-400 hover:text-orange-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-neutral-400 hover:text-orange-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#products" className="text-neutral-400 hover:text-orange-500 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#recipes" className="text-neutral-400 hover:text-orange-500 transition-colors">
                  Recipes
                </a>
              </li>
              <li>
                <a href="#bulk-order" className="text-neutral-400 hover:text-orange-500 transition-colors">
                  Bulk Orders
                </a>
              </li>
              <li>
                <a href="#contact" className="text-neutral-400 hover:text-orange-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg mb-4">Our Products</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-orange-500 transition-colors">
                  Vatan Masala 125g
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-orange-500 transition-colors">
                  Vatan Masala 250g
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-orange-500 transition-colors">
                  Vatan Masala 500g
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-orange-500 transition-colors">
                  Bulk Orders
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-orange-500 transition-colors">
                  Gift Packs
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-orange-500 transition-colors">
                  Custom Blends
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-400">
                  At Post – Bhaji Mandai, Patan<br />
                  Tal – Patan, Dist – Satara<br />
                  Maharashtra – 415206
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="tel:+918600317822" className="text-neutral-400 hover:text-orange-500 transition-colors">
                  +91 8600317822
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="mailto:pompuswatanmasala@gmail.com" className="text-neutral-400 hover:text-orange-500 transition-colors">
                  pompuswatanmasala@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <Button 
                onClick={() => setIsCartOpen(true)}
                className="w-full gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Order Now</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">
              © 2025 Vatan Masala. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-neutral-400 hover:text-orange-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-neutral-400 hover:text-orange-500 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-neutral-400 hover:text-orange-500 transition-colors">
                Shipping Policy
              </a>
              <a href="#" className="text-neutral-400 hover:text-orange-500 transition-colors">
                Refund Policy
              </a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-neutral-500">
              FSSAI License No: 21517194000113 | ISO 22000:2018 Certified
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}