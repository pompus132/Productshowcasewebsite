import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as const, name: 'English', nativeName: 'English' },
    { code: 'hi' as const, name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'mr' as const, name: 'Marathi', nativeName: 'मराठी' },
  ];

  const currentLang = languages.find((l) => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
      >
        <Globe className="w-4 h-4 text-neutral-700" />
        <span className="text-sm font-medium hidden sm:inline">
          {currentLang?.nativeName}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden z-50 min-w-[160px]"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors flex items-center justify-between ${
                    language === lang.code ? 'bg-orange-50 text-orange-600' : 'text-neutral-700'
                  }`}
                >
                  <span className="font-medium">{lang.nativeName}</span>
                  {language === lang.code && (
                    <div className="w-2 h-2 bg-orange-600 rounded-full" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
