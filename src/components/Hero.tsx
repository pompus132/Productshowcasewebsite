import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { ShoppingCart, Sparkles, RotateCw } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/LanguageContext";
import frontImage from "figma:asset/615706d9f96f2f2623f9a591957a159d7e8e9f15.png";
import backImage from "figma:asset/4d73cdbfa75b661692c9b2e45b2c87cbd6bf3178.png";

export function Hero() {
  const [isPaused, setIsPaused] = useState(false);
  const [showFront, setShowFront] = useState(true);
  const rotationY = useMotionValue(0);
  const animationRef = useRef<any>(null);
  const { addToCart, setIsCartOpen } = useCart();
  const { t } = useLanguage();

  const handleQuickOrder = () => {
    // Add default 125g pack to cart
    addToCart({
      id: 1,
      name: "Vatan Masala",
      subtitle: "पाटण चे वाटण",
      weight: "125g",
      mrp: 40,
      image: frontImage,
    });
    setIsCartOpen(true);
  };

  // Smooth continuous rotation animation
  useEffect(() => {
    if (isPaused) {
      // Pause at current position
      if (animationRef.current) {
        animationRef.current.stop();
      }
      return;
    }

    // Calculate how far we need to go to complete a full rotation
    const currentRotation = rotationY.get();
    const targetRotation = currentRotation + 360;

    // Smooth continuous rotation
    animationRef.current = animate(rotationY, targetRotation, {
      duration: 10, // Slower rotation for smoother experience
      ease: "linear",
      repeat: Infinity,
      onUpdate: (latest) => {
        // Update front/back indicator based on rotation
        const normalized = latest % 360;
        setShowFront(normalized < 180);
      }
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [isPaused, rotationY]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Spices Background with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1580590562911-89d31480d993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNwaWNlcyUyMGFycmFuZ2VtZW50fGVufDF8fHx8MTc2MjM5MTA1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Spices Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/60" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/20 backdrop-blur-sm rounded-full border border-orange-500/30">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-300">{t('premiumQuality')}</span>
            </div>

            <h1 className="text-5xl lg:text-7xl text-white">
              {t('vatanMasalaTitle')}
            </h1>
            
            <h2 className="text-3xl lg:text-4xl text-orange-400">
              {t('vatanMasalaEnglish')}
            </h2>

            <p className="text-xl text-orange-200">
              {t('patanKaVatan')}
            </p>

            <p className="text-lg text-white/90 leading-relaxed">
              {t('heroDescription')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleQuickOrder}
                size="lg" 
                className="gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-6 shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{t('orderNow')} - ₹40/-</span>
              </Button>
              <Button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                variant="outline" 
                className="px-8 py-6 border-2 border-white bg-transparent text-white hover:bg-white hover:text-neutral-900 transition-all duration-300"
              >
                {t('learnMore')}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl text-orange-400">{t('hundred')}</div>
                <div className="text-sm text-white/80">{t('natural')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl text-orange-400">{t('oneTwoFiveG')}</div>
                <div className="text-sm text-white/80">{t('netWeight')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl text-orange-400">{t('fresh')}</div>
                <div className="text-sm text-white/80">{t('dailyMade')}</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Auto-Rotating 3D Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-2xl mx-auto py-12">
              {/* Multi-layered Ambient Glow */}
              <div className="absolute inset-0 -z-10">
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-r from-orange-600/40 via-red-500/40 to-amber-600/40 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1]
                  }}
                />
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-gradient-to-r from-orange-500/50 via-red-600/50 to-amber-500/50 rounded-full blur-2xl"
                  animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1],
                    delay: 0.5
                  }}
                />
              </div>

              {/* 3D Rotating Container */}
              <motion.div
                className="relative perspective-[2000px] cursor-pointer"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1]
                }}
              >
                <motion.div
                  className="relative w-full aspect-[4/5] mx-auto max-w-lg"
                  style={{
                    transformStyle: "preserve-3d",
                    rotateY: rotationY,
                  }}
                >
                  {/* Front Side - Your Product Package Front */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="relative w-full h-full group">
                      {/* Product Image with Zoom on Hover */}
                      <div className="absolute inset-0 p-8 flex items-center justify-center">
                        <motion.img
                          src={frontImage}
                          alt="Vatan Masala - Front Package"
                          className="w-full h-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.5)]"
                          draggable={false}
                          animate={{
                            scale: isPaused ? 1.08 : 1,
                            filter: isPaused ? "brightness(1.05) drop-shadow(0 35px 60px rgba(251, 146, 60, 0.4))" : "brightness(1) drop-shadow(0 35px 60px rgba(0, 0, 0, 0.5))"
                          }}
                          transition={{
                            duration: 0.6,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                        />
                      </div>

                      {/* Corner Badge */}
                      <motion.div 
                        className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-full shadow-lg"
                        animate={{
                          scale: isPaused ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <span className="text-white text-sm font-medium">Front</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Back Side - Your Product Package Back */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="relative w-full h-full group">
                      {/* Product Image with Zoom on Hover */}
                      <div className="absolute inset-0 p-8 flex items-center justify-center">
                        <motion.img
                          src={backImage}
                          alt="Vatan Masala - Back Package with Details"
                          className="w-full h-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.5)]"
                          draggable={false}
                          animate={{
                            scale: isPaused ? 1.08 : 1,
                            filter: isPaused ? "brightness(1.05) drop-shadow(0 35px 60px rgba(251, 146, 60, 0.4))" : "brightness(1) drop-shadow(0 35px 60px rgba(0, 0, 0, 0.5))"
                          }}
                          transition={{
                            duration: 0.6,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                        />
                      </div>

                      {/* Corner Badge */}
                      <motion.div 
                        className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-full shadow-lg"
                        animate={{
                          scale: isPaused ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <span className="text-white text-sm font-medium">Back</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Dynamic Shadow */}
                <motion.div 
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-gradient-to-r from-transparent via-black/25 to-transparent rounded-full blur-2xl"
                  animate={{
                    scale: isPaused ? [1.15, 1.18, 1.15] : [1, 1.05, 1],
                    opacity: isPaused ? 0.4 : 0.3,
                  }}
                  transition={{ 
                    scale: { duration: 2, repeat: Infinity, ease: [0.4, 0, 0.6, 1] },
                    opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                  }}
                />
              </motion.div>

              {/* Status Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="text-center mt-8"
              >
                <AnimatePresence mode="wait">
                  {isPaused ? (
                    <motion.div
                      key="paused"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -5 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20"
                    >
                      <motion.div 
                        className="w-2 h-2 bg-orange-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
                      />
                      <p className="text-sm text-white/90">
                        Rotation Paused - <span className="text-orange-400 font-medium">Viewing {showFront ? 'Front' : 'Back'}</span>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="rotating"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -5 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <RotateCw className="w-4 h-4 text-orange-400" />
                      </motion.div>
                      <p className="text-sm text-white/90">
                        Auto-rotating 360° • <span className="text-orange-400">Hover to pause</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Viewing Angles Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="flex justify-center gap-3 mt-6"
              >
                <motion.div 
                  className="w-2 h-2 rounded-full"
                  animate={{
                    backgroundColor: showFront ? "rgb(251, 146, 60)" : "rgba(255, 255, 255, 0.3)",
                    scale: showFront ? 1.3 : 1
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.div 
                  className="w-2 h-2 rounded-full"
                  animate={{
                    backgroundColor: !showFront ? "rgb(251, 146, 60)" : "rgba(255, 255, 255, 0.3)",
                    scale: !showFront ? 1.3 : 1
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}