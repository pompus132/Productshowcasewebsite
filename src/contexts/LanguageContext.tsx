import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    home: 'Home',
    about: 'About',
    products: 'Products',
    recipes: 'Recipes',
    contact: 'Contact',
    contactUs: 'Contact Us',
    cart: 'Cart',
    
    // Hero
    premiumQuality: 'Premium Quality Masala',
    authentic: 'Authentic',
    orderNow: 'Order Now',
    learnMore: 'Learn More',
    natural: 'Natural',
    netWeight: 'Net Weight',
    fresh: 'Fresh',
    dailyMade: 'Daily Made',
    
    // Product
    bestSeller: 'Best Seller',
    valuePack: 'Value Pack',
    familyPack: 'Family Pack',
    reviews: 'Reviews',
    addToCart: 'Add to Cart',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    emptyCart: 'Your cart is empty',
    startShopping: 'Start shopping to add items',
    remove: 'Remove',
    total: 'Total',
    orderViaWhatsApp: 'Order via WhatsApp',
    
    // Bulk Order
    bulkOrders: 'Bulk Orders',
    specialPricing: 'Special Pricing for Bulk Orders',
    fullName: 'Full Name',
    businessName: 'Business Name',
    phoneNumber: 'Phone Number',
    emailAddress: 'Email Address',
    businessType: 'Business Type',
    selectType: 'Select Type',
    restaurant: 'Restaurant',
    retailStore: 'Retail Store',
    distributor: 'Distributor',
    catering: 'Catering Service',
    other: 'Other',
    quantity: 'Quantity Required',
    minPacks: 'Minimum 50 packs',
    location: 'Delivery Location',
    requirements: 'Additional Requirements',
    optional: 'Optional',
    submitInquiry: 'Submit Inquiry',
    sending: 'Sending...',
    
    // Newsletter
    stayUpdated: 'Stay Updated!',
    subscribeText: 'Subscribe to get special offers, free recipes, and updates',
    enterEmail: 'Enter your email',
    subscribe: 'Subscribe',
    
    // Footer
    quickLinks: 'Quick Links',
    ourProducts: 'Our Products',
    contactUsFooter: 'Contact Us',
    allRightsReserved: 'All rights reserved',
    
    // Wishlist
    wishlist: 'Wishlist',
    addToWishlist: 'Add to Wishlist',
    removeFromWishlist: 'Remove from Wishlist',
    emptyWishlist: 'Your wishlist is empty',
    moveToCart: 'Move to Cart',
    
    // Search
    search: 'Search products...',
    searchResults: 'Search Results',
    noResults: 'No products found',
    
    // Reviews
    customerReviews: 'Customer Reviews',
    writeReview: 'Write a Review',
    yourName: 'Your Name',
    yourReview: 'Your Review',
    rating: 'Rating',
    submitReview: 'Submit Review',
    verifiedPurchase: 'Verified Purchase',
    helpful: 'Helpful',
    whatCustomersSay: 'What Our Customers Say',
    joinHappyCustomers: 'Join 50,000+ happy customers who trust Vatan Masala',
    basedOnReviews: 'Based on reviews',
    shareExperience: 'Want to share your experience?',
    
    // Languages
    english: 'English',
    hindi: 'हिन्दी',
    marathi: 'मराठी',
    
    // Features
    ourFeatures: 'Our Features',
    whyChoose: 'Why Choose Vatan Masala?',
    exploreFeatures: 'Explore what makes our masala special',
    
    // Ingredients
    ingredientsNutrition: 'Ingredients & Nutrition',
    premiumIngredients: 'Made with premium quality ingredients',
    keyIngredients: 'Key Ingredients',
    nutritionalInfo: 'Nutritional Information',
    perServing: 'Per 100g serving',
    
    // Quality Assurance
    qualityFirst: 'Quality First',
    qualityProcess: 'Our Quality Assurance Process',
    qualityCommitment: 'Our commitment to delivering the finest quality masala',
    
    // Recipes
    recipeIdeas: 'Recipe Ideas',
    discoverRecipes: 'Discover delicious ways to use Vatan Masala in your everyday cooking',
    cookingTime: 'Cooking Time',
    servings: 'Servings',
    difficulty: 'Difficulty',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    ingredients: 'Ingredients',
    instructions: 'Instructions',
    needCookingTips: 'Need Cooking Tips?',
    expertChefHelp: 'Contact our expert chefs for personalized recipe suggestions and cooking tips using Vatan Masala.',
    getInTouch: 'Get in Touch',
    viewFullRecipe: 'View Full Recipe',
    
    // Bulk Order Additional
    wholesaleProgram: 'Wholesale Program',
    wholesaleDesc: 'Join our wholesale program and enjoy exclusive benefits',
    orderInfo: 'Order Information',
    preferToTalk: 'Prefer to Talk?',
    callUs: 'Call us for immediate assistance',
    emailUs: 'Email us your requirements',
    getQuote: 'Get a Quote',
    quoteDesc: 'Fill out the form and we\'ll get back to you within 24 hours',
    
    // Product Showcase
    chooseYourPack: 'Choose Your Perfect Pack',
    qualityAllSizes: 'Quality you can trust, in every size',
    mrp: 'MRP',
    
    // Hero Section Extended
    vatanMasalaTitle: 'वाटण मसाला',
    vatanMasalaEnglish: 'Vatan Masala',
    patanKaVatan: 'पाटण चे वाटण - खरा एक प्रमाणिक',
    heroDescription: 'Experience the authentic taste of traditional Indian spices. Our premium blend brings the rich flavors of Patan to your kitchen, made with the finest ingredients.',
    hundred: '100%',
    oneTwoFiveG: '125g',
    
    // Status Indicators
    rotationPaused: 'Rotation Paused',
    viewing: 'Viewing',
    front: 'Front',
    back: 'Back',
    autoRotating: 'Auto-rotating 360°',
    hoverToPause: 'Hover to pause',
    
    // Footer Extended
    brandDescription: 'Bringing authentic traditional flavors to your kitchen with premium quality masala since 25+ years.',
    quickLinksSection: 'Quick Links',
    bulkOrdersLink: 'Bulk Orders',
    productsLink: 'Our Products',
    bulkOrderLink: 'Bulk Orders',
    giftPacks: 'Gift Packs',
    customBlends: 'Custom Blends',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    shippingPolicy: 'Shipping Policy',
    refundPolicy: 'Refund Policy',
    fssaiLicense: 'FSSAI License No',
    isoCertified: 'ISO 22000:2018 Certified',
  },
  hi: {
    // Header
    home: 'होम',
    about: 'हमारे बारे में',
    products: 'उत्पाद',
    recipes: 'व्यंजन',
    contact: 'संपर्क',
    contactUs: 'संपर्क करें',
    cart: 'कार्ट',
    
    // Hero
    premiumQuality: 'प्रीमियम गुणवत्ता मसाला',
    authentic: 'प्रामाणिक',
    orderNow: 'अभी ऑर्डर करें',
    learnMore: 'और जानें',
    natural: 'प्राकृतिक',
    netWeight: 'नेट वज़न',
    fresh: 'ताज़ा',
    dailyMade: 'रोज़ बनाया',
    
    // Product
    bestSeller: 'बेस्ट सेलर',
    valuePack: 'वैल्यू पैक',
    familyPack: 'फैमिली पैक',
    reviews: 'समीक्षाएं',
    addToCart: 'कार्ट में जोड़ें',
    
    // Cart
    shoppingCart: 'शॉपिंग कार्ट',
    emptyCart: 'आपका कार्ट खाली है',
    startShopping: 'खरीदारी शुरू करें',
    remove: 'हटाएं',
    total: 'कुल',
    orderViaWhatsApp: 'WhatsApp से ऑर्डर करें',
    
    // Bulk Order
    bulkOrders: 'बल्क ऑर्डर',
    specialPricing: 'बल्क ऑर्डर के लिए विशेष मूल्य',
    fullName: 'पूरा नाम',
    businessName: 'व्यवसाय का नाम',
    phoneNumber: 'फ़ोन नंबर',
    emailAddress: 'ईमेल पता',
    businessType: 'व्यवसाय का प्रकार',
    selectType: 'प्रकार चुनें',
    restaurant: 'रेस्टोरेंट',
    retailStore: 'रिटेल स्टोर',
    distributor: 'वितरक',
    catering: 'कैटरिंग सेवा',
    other: 'अन्य',
    quantity: 'आवश्यक मात्रा',
    minPacks: 'न्यूनतम 50 पैक',
    location: 'डिलीवरी स्थान',
    requirements: 'अतिरिक्त आवश्यकताएं',
    optional: 'वैकल्पिक',
    submitInquiry: 'पूछताछ भेजें',
    sending: 'भेजा जा रहा है...',
    
    // Newsletter
    stayUpdated: 'अपडेट रहें!',
    subscribeText: 'विशेष ऑफर, मुफ्त रेसिपी और अपडेट पाने के लिए सब्सक्राइब करें',
    enterEmail: 'अपना ईमेल दर्ज करें',
    subscribe: 'सब्सक्राइब',
    
    // Footer
    quickLinks: 'त्वरित लिंक',
    ourProducts: 'हमारे उत्पाद',
    contactUsFooter: 'संपर्क करें',
    allRightsReserved: 'सर्वाधिकार सुरक्षित',
    
    // Wishlist
    wishlist: 'विशलिस्ट',
    addToWishlist: 'विशलिस्ट में जोड़ें',
    removeFromWishlist: 'विशलिस्ट से हटाएं',
    emptyWishlist: 'आपकी विशलिस्ट खाली है',
    moveToCart: 'कार्ट में डालें',
    
    // Search
    search: 'उत्पाद खोजें...',
    searchResults: 'खोज परिणाम',
    noResults: 'कोई उत्पाद नहीं मिला',
    
    // Reviews
    customerReviews: 'ग्राहक समीक्षाएं',
    writeReview: 'समीक्षा लिखें',
    yourName: 'आपका नाम',
    yourReview: 'आपकी समीक्षा',
    rating: 'रेटिंग',
    submitReview: 'समीक्षा सबमिट करें',
    verifiedPurchase: 'सत्यापित खरीद',
    helpful: 'मददगार',
    whatCustomersSay: 'हमारे ग्राहक क्या कहते हैं',
    joinHappyCustomers: '50,000+ खुश ग्राहकों में शामिल हों जो वाटण मसाला पर भरोसा करते हैं',
    basedOnReviews: 'समीक्षाओं के आधार पर',
    shareExperience: 'अपना अनुभव साझा करना चाहते हैं?',
    
    // Languages
    english: 'English',
    hindi: 'हिन्दी',
    marathi: 'मराठी',
    
    // Features
    ourFeatures: 'हमारी विशेषताएं',
    whyChoose: 'वाटण मसाला क्यों चुनें?',
    exploreFeatures: 'जानें कि हमारा मसाला क्या खास बनाता है',
    
    // Ingredients
    ingredientsNutrition: 'सामग्री और पोषण',
    premiumIngredients: 'प्रीमियम गुणवत्ता सामग्री के साथ बनाया गया',
    keyIngredients: 'मुख्य सामग्री',
    nutritionalInfo: 'पोषण संबंधी जानकारी',
    perServing: 'प्रति 100 ग्राम सर्विंग',
    
    // Quality Assurance
    qualityFirst: 'गुणवत्ता पहले',
    qualityProcess: 'हमारी गुणवत्ता आश्वासन प्रक्रिया',
    qualityCommitment: 'बेहतरीन गुणवत्ता वाला मसाला देने की हमारी प्रतिबद्धता',
    
    // Recipes
    recipeIdeas: 'रेसिपी आइडियाज',
    discoverRecipes: 'अपनी रोजमर्रा की खाना पकाने में वाटण मसाला का उपयोग करने के स्वादिष्ट तरीके खोजें',
    cookingTime: 'पकाने का समय',
    servings: 'सर्विंग्स',
    difficulty: 'कठिनाई',
    easy: 'आसान',
    medium: 'मध्यम',
    hard: 'कठिन',
    ingredients: 'सामग्री',
    instructions: 'निर्देश',
    needCookingTips: 'खाना पकाने के टिप्स चाहिए?',
    expertChefHelp: 'वाटण मसाला का उपयोग करके व्यक्तिगत रेसिपी सुझाव और खाना पकाने के टिप्स के लिए हमारे विशेषज्ञ शेफ से संपर्क करें।',
    getInTouch: 'संपर्क करें',
    viewFullRecipe: 'पूरी रेसिपी देखें',
    
    // Bulk Order Additional
    wholesaleProgram: 'थोक कार्यक्रम',
    wholesaleDesc: 'हमारे थोक कार्यक्रम में शामिल हों और विशेष लाभों का आनंद लें',
    orderInfo: 'ऑर्डर जानकारी',
    preferToTalk: 'बात करना पसंद करें?',
    callUs: 'तत्काल सहायता के लिए हमें कॉल करें',
    emailUs: 'हमें अपनी आवश्यकताएं ईमेल करें',
    getQuote: 'कोटेशन प्राप्त करें',
    quoteDesc: 'फॉर्म भरें और हम 24 घंटों के भीतर आपसे संपर्क करेंगे',
    
    // Product Showcase
    chooseYourPack: 'अपना सही पैक चुनें',
    qualityAllSizes: 'हर आकार में भरोसेमंद गुणवत्ता',
    mrp: 'एम.आर.पी.',
    
    // Hero Section Extended
    vatanMasalaTitle: 'वाटण मसाला',
    vatanMasalaEnglish: 'Vatan Masala',
    patanKaVatan: 'पाटण चे वाटण - खरा एक प्रमाणिक',
    heroDescription: 'पारंपरिक भारतीय मसालों का प्रामाणिक स्वाद। हमारा प्रीमियम मिश्रण पाटण के समृद्ध स्वाद को आपकी रसोई में लाता है, बेहतरीन सामग्री के साथ बनाया गया।',
    hundred: '100%',
    oneTwoFiveG: '125g',
    
    // Status Indicators
    rotationPaused: 'रोटेशन रुका हुआ',
    viewing: 'देख रहे हैं',
    front: 'आगे',
    back: 'पीछे',
    autoRotating: 'ऑटो-घूर्णन 360°',
    hoverToPause: 'रोकने के लिए होवर करें',
    
    // Footer Extended
    brandDescription: '25+ वर्षों से प्रीमियम गुणवत्ता वाले मसाले के साथ आपकी रसोई में प्रामाणिक पारंपरिक स्वाद ला रहे हैं।',
    quickLinksSection: 'त्वरित लिंक',
    bulkOrdersLink: 'बल्क ऑर्डर',
    productsLink: 'हमारे उत्पाद',
    bulkOrderLink: 'बल्क ऑर्डर',
    giftPacks: 'गिफ्ट पैक',
    customBlends: 'कस्टम मिश्रण',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfService: 'सेवा की शर्तें',
    shippingPolicy: 'शिपिंग नीति',
    refundPolicy: 'रिफंड नीति',
    fssaiLicense: 'FSSAI लाइसेंस नंबर',
    isoCertified: 'ISO 22000:2018 प्रमाणित',
  },
  mr: {
    // Header
    home: 'होम',
    about: 'आमच्याबद्दल',
    products: 'उत्पादने',
    recipes: 'पाककृती',
    contact: 'संपर्क',
    contactUs: 'संपर्क साधा',
    cart: 'कार्ट',
    
    // Hero
    premiumQuality: 'प्रीमियम दर्जाचा मसाला',
    authentic: 'प्रामाणिक',
    orderNow: 'आता ऑर्डर करा',
    learnMore: 'अधिक जाणून घ्या',
    natural: 'नैसर्गिक',
    netWeight: 'निव्वळ वजन',
    fresh: 'ताजे',
    dailyMade: 'रोज बनवलेले',
    
    // Product
    bestSeller: 'बेस्ट सेलर',
    valuePack: 'व्हॅल्यू पॅक',
    familyPack: 'फॅमिली पॅक',
    reviews: 'पुनरावलोकने',
    addToCart: 'कार्टमध्ये घाला',
    
    // Cart
    shoppingCart: 'शॉपिंग कार्ट',
    emptyCart: 'तुमची कार्ट रिकामी आहे',
    startShopping: 'खरेदी सुरू करा',
    remove: 'काढा',
    total: 'एकूण',
    orderViaWhatsApp: 'WhatsApp वर ऑर्डर करा',
    
    // Bulk Order
    bulkOrders: 'मोठ्या प्रमाणात ऑर्डर',
    specialPricing: 'मोठ्या ऑर्डरसाठी विशेष किंमत',
    fullName: 'पूर्ण नाव',
    businessName: 'व्यवसायाचे नाव',
    phoneNumber: 'फोन नंबर',
    emailAddress: 'ईमेल पत्ता',
    businessType: 'व्यवसायाचा प्रकार',
    selectType: 'प्रकार निवडा',
    restaurant: 'रेस्टॉरंट',
    retailStore: 'रिटेल स्टोअर',
    distributor: 'वितरक',
    catering: 'कॅटरिंग सेवा',
    other: 'इतर',
    quantity: 'आवश्यक प्रमाण',
    minPacks: 'किमान 50 पॅक',
    location: 'डिलिव्हरी स्थान',
    requirements: 'अतिरिक्त गरजा',
    optional: 'पर्यायी',
    submitInquiry: 'चौकशी पाठवा',
    sending: 'पाठवत आहे...',
    
    // Newsletter
    stayUpdated: 'अपडेट रहा!',
    subscribeText: 'विशेष ऑफर, मोफत रेसिपी आणि अपडेट मिळवण्यासाठी सब्सक्राइब करा',
    enterEmail: 'तुमचा ईमेल टाका',
    subscribe: 'सब्सक्राइब करा',
    
    // Footer
    quickLinks: 'द्रुत लिंक',
    ourProducts: 'आमची उत्पादने',
    contactUsFooter: 'संपर्क साधा',
    allRightsReserved: 'सर्व हक्क राखीव',
    
    // Wishlist
    wishlist: 'विशलिस्ट',
    addToWishlist: 'विशलिस्टमध्ये घाला',
    removeFromWishlist: 'विशलिस्टमधून काढा',
    emptyWishlist: 'तुमची विशलिस्ट रिकामी आहे',
    moveToCart: 'कार्टमध्ये घाला',
    
    // Search
    search: 'उत्पादने शोधा...',
    searchResults: 'शोध परिणाम',
    noResults: 'कोणतेही उत्पादन आढळले नाही',
    
    // Reviews
    customerReviews: 'ग्राहक पुनरावलोकने',
    writeReview: 'पुनरावलोकन लिहा',
    yourName: 'तुमचे नाव',
    yourReview: 'तुमचे पुनरावलोकन',
    rating: 'रेटिंग',
    submitReview: 'पुनरावलोकन सबमिट करा',
    verifiedPurchase: 'सत्यापित खरेदी',
    helpful: 'उपयुक्त',
    whatCustomersSay: 'आमचे ग्राहक काय म्हणतात',
    joinHappyCustomers: '50,000+ समाधानी ग्राहकांमध्ये सामील व्हा जे वाटण मसाल्यावर विश्वास ठेवतात',
    basedOnReviews: 'पुनरावलोकनांवर आधारित',
    shareExperience: 'तुमचा अनुभव शेअर करू इच्छिता?',
    
    // Languages
    english: 'English',
    hindi: 'हिन्दी',
    marathi: 'मराठी',
    
    // Features
    ourFeatures: 'आमची वैशिष्ट्ये',
    whyChoose: 'वाटण मसाला का निवडावा?',
    exploreFeatures: 'आमचा मसाला काय खास बनवतो ते जाणून घ्या',
    
    // Ingredients
    ingredientsNutrition: 'घटक आणि पोषण',
    premiumIngredients: 'प्रीमियम दर्जाच्या घटकांसह बनवलेले',
    keyIngredients: 'मुख्य घटक',
    nutritionalInfo: 'पौष्टिक माहिती',
    perServing: 'प्रति 100 ग्रॅम सर्व्हिंग',
    
    // Quality Assurance
    qualityFirst: 'गुणवत्ता प्रथम',
    qualityProcess: 'आमची गुणवत्ता आश्वासन प्रक्रिया',
    qualityCommitment: 'उत्कृष्ट दर्जाचा मसाला वितरीत करण्याची आमची वचनबद्धता',
    
    // Recipes
    recipeIdeas: 'रेसिपी आयडिया',
    discoverRecipes: 'तुमच्या रोजच्या स्वयंपाकात वाटण मसाला वापरण्याचे चवदार मार्ग शोधा',
    cookingTime: 'शिजवण्याचा वेळ',
    servings: 'सर्व्हिंग्ज',
    difficulty: 'अवघडपणा',
    easy: 'सोपे',
    medium: 'मध्यम',
    hard: 'कठीण',
    ingredients: 'घटक',
    instructions: 'सूचना',
    needCookingTips: 'स्वयंपाकाच्या टिप्स हव्या आहेत?',
    expertChefHelp: 'वाटण मसाला वापरून वैयक्तिक रेसिपी सूचना आणि स्वयंपाकाच्या टिप्ससाठी आमच्या तज्ञ शेफशी संपर्क साधा.',
    getInTouch: 'संपर्कात या',
    viewFullRecipe: 'संपूर्ण रेसिपी पहा',
    
    // Bulk Order Additional
    wholesaleProgram: 'घाऊक कार्यक्रम',
    wholesaleDesc: 'आमच्या घाऊक कार्यक्रमात सामील व्हा आणि विशेष फायद्यांचा आनंद घ्या',
    orderInfo: 'ऑर्डर माहिती',
    preferToTalk: 'बोलणे पसंत करता?',
    callUs: 'तात्काळ मदतीसाठी आम्हाला कॉल करा',
    emailUs: 'आम्हाला तुमच्या गरजा ईमेल करा',
    getQuote: 'कोटेशन मिळवा',
    quoteDesc: 'फॉर्म भरा आणि आम्ही 24 तासांच्या आत तुमच्याशी संपर्क साधू',
    
    // Product Showcase
    chooseYourPack: 'तुमचे योग्य पॅक निवडा',
    qualityAllSizes: 'प्रत्येक आकारात विश्वासार्ह गुणवत्ता',
    mrp: 'एम.आर.पी.',
    
    // Hero Section Extended
    vatanMasalaTitle: 'वाटण मसाला',
    vatanMasalaEnglish: 'Vatan Masala',
    patanKaVatan: 'पाटण चे वाटण - खरा एक प्रमाणिक',
    heroDescription: 'पारंपारिक भारतीय मसाल्यांची प्रामाणिक चव अनुभवा. आमचे प्रीमियम मिश्रण पाटणचा समृद्ध स्वाद तुमच्या स्वयंपाकघरात आणते, उत्कृष्ट घटकांसह बनवलेले.',
    hundred: '100%',
    oneTwoFiveG: '125g',
    
    // Status Indicators
    rotationPaused: 'रोटेशन थांबले',
    viewing: 'पहात आहे',
    front: 'पुढे',
    back: 'मागे',
    autoRotating: 'ऑटो-रोटेटिंग 360°',
    hoverToPause: 'थांबवण्यासाठी होवर करा',
    
    // Footer Extended
    brandDescription: '25+ वर्षांपासून प्रीमियम दर्जाच्या मसाल्यासह तुमच्या स्वयंपाकघरात प्रामाणिक पारंपारिक चव आणत आहोत.',
    quickLinksSection: 'द्रुत लिंक',
    bulkOrdersLink: 'मोठ्या प्रमाणात ऑर्डर',
    productsLink: 'आमची उत्पादने',
    bulkOrderLink: 'मोठ्या प्रमाणात ऑर्डर',
    giftPacks: 'गिफ्ट पॅक',
    customBlends: 'कस्टम मिश्रण',
    privacyPolicy: 'गोपनीयता धोरण',
    termsOfService: 'सेवा अटी',
    shippingPolicy: 'शिपिंग धोरण',
    refundPolicy: 'परतावा धोरण',
    fssaiLicense: 'FSSAI लायसन्स क्रमांक',
    isoCertified: 'ISO 22000:2018 प्रमाणित',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('vatanMasalaLanguage');
    return (saved as Language) || 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('vatanMasalaLanguage', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}