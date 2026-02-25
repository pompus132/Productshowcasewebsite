import { motion } from "motion/react";
import { Clock, Users, ChefHat, Flame, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";

const recipes = [
  {
    id: 1,
    title: {
      en: "Chicken Masala",
      hi: "चिकन मसाला",
      mr: "चिकन मसाला"
    },
    description: {
      en: "Tender chicken pieces cooked in aromatic Vatan Masala gravy, perfect with rice or roti.",
      hi: "सुगंधित वाटण मसाला ग्रेवी में पकाए गए नरम चिकन के टुकड़े, चावल या रोटी के साथ बिलकुल सही।",
      mr: "सुगंधी वाटण मसाला ग्रेव्हीमध्ये शिजवलेले कोमल चिकनचे तुकडे, भात किंवा रोटीसोबत उत्तम।"
    },
    time: "45",
    servings: "4",
    difficulty: "medium",
    image: "https://images.unsplash.com/photo-1728542575492-47e02eb3305c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBjaGlja2VuJTIwbWFzYWxhJTIwY3VycnklMjBzcGljeXxlbnwxfHx8fDE3NzIwMDgyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ingredients: {
      en: [
        "500g chicken, cut into pieces",
        "3 tbsp Vatan Masala",
        "2 large onions, finely chopped",
        "3 tomatoes, pureed",
        "1.5 tbsp ginger-garlic paste",
        "2 green chilies, slit",
        "1/2 cup yogurt",
        "3 tbsp oil or ghee",
        "Fresh coriander leaves",
        "Salt to taste"
      ],
      hi: [
        "500 ग्राम चिकन, टुकड़ों में कटा हुआ",
        "3 बड़े चम्मच वाटण मसाला",
        "2 बड़े प्याज, बारीक कटे हुए",
        "3 टमाटर, प्यूरी",
        "1.5 बड़ा चम्मच अदरक-लहसुन का पेस्ट",
        "2 हरी मिर्च, चीरी हुई",
        "1/2 कप दही",
        "3 बड़े चम्मच तेल या घी",
        "ताज़ा धनिया पत्ती",
        "स्वादानुसार नमक"
      ],
      mr: [
        "500 ग्रॅम चिकन, तुकड्यांमध्ये कापलेले",
        "3 टेबलस्पून वाटण मसाला",
        "2 मोठे कांदे, बारीक चिरलेले",
        "3 टोमॅटो, पाणी काढलेले",
        "1.5 टेबलस्पून आले-लसूण पेस्ट",
        "2 हिरव्या मिरच्या, चिरलेल्या",
        "1/2 कप दही",
        "3 टेबलस्पून तेल किंवा तूप",
        "ताजी कोथिंबीर पाने",
        "चवीनुसार मीठ"
      ]
    },
    instructions: {
      en: [
        "Heat oil in a heavy-bottomed pan, add onions and sauté until golden brown",
        "Add ginger-garlic paste and green chilies, cook for 2 minutes",
        "Add tomato puree and cook until oil separates (8-10 minutes)",
        "Add 3 tbsp Vatan Masala and yogurt, mix well",
        "Add chicken pieces and salt, coat well with masala",
        "Cook on medium heat for 5 minutes, stirring occasionally",
        "Add 1.5 cups water, bring to boil, then simmer covered for 25-30 minutes",
        "Cook until chicken is tender and gravy thickens",
        "Garnish with fresh coriander and serve hot with rice or roti"
      ],
      hi: [
        "एक भारी तले वाले पैन में तेल गर्म करें, प्याज डालें और सुनहरा भूरा होने तक भूनें",
        "अदरक-लहसुन का पेस्ट और हरी मिर्च डालें, 2 मिनट पकाएं",
        "टमाटर प्यूरी डालें और तेल अलग होने तक पकाएं (8-10 मिनट)",
        "3 बड़े चम्मच वाटण मसाला और दही डालें, अच्छी तरह मिलाएं",
        "चिकन के टुकड़े और नमक डालें, मसाले के साथ अच्छी तरह कोट करें",
        "मध्यम आंच पर 5 मिनट पकाएं, बीच-बीच में हिलाते रहें",
        "1.5 कप पानी डालें, उबाल लाएं, फिर ढककर 25-30 मिनट उबालें",
        "तब तक पकाएं जब तक चिकन नरम न हो जाए और ग्रेवी गाढ़ी न हो जाए",
        "ताज़ा धनिया से गार्निश करें और चावल या रोटी के साथ गर्म परोसें"
      ],
      mr: [
        "जाड तळाच्या पॅनमध्ये तेल गरम करा, कांदे घाला आणि सोनेरी तपकिरी होईपर्यंत परतून घ्या",
        "आले-लसूण पेस्ट आणि हिरव्या मिरच्या घाला, 2 मिनिटे शिजवा",
        "टोमॅटोचे पाणी घाला आणि तेल वेगळे होईपर्यंत शिजवा (8-10 मिनिटे)",
        "3 टेबलस्पून वाटण मसाला आणि दही घाला, चांगले मिक्स करा",
        "चिकनचे तुकडे आणि मीठ घाला, मसाल्यात चांगले मिसळा",
        "मध्यम आचेवर 5 मिनिटे शिजवा, मधूनमधून ढवळत रहा",
        "1.5 कप पाणी घाला, उकळी आणा, नंतर झाकण ठेवून 25-30 मिनिटे उकळा",
        "चिकन कोमल होईपर्यंत आणि ग्रेव्ही घट्ट होईपर्यंत शिजवा",
        "ताज्या कोथिंबिरीने सजवा आणि भात किंवा रोटीसोबत गरम सर्व्ह करा"
      ]
    }
  },
  {
    id: 2,
    title: {
      en: "Mutton Masala",
      hi: "मटन मसाला",
      mr: "मटण मसाला"
    },
    description: {
      en: "Rich and flavorful mutton curry with authentic Vatan Masala spices, a true delicacy.",
      hi: "प्रामाणिक वाटण मसाला मसालों के साथ समृद्ध और स्वादिष्ट मटन करी, एक सच्ची विनम्रता।",
      mr: "प्रामाणिक वाटण मसाला मसाल्यांसह समृद्ध आणि चवदार मटण करी, एक खरी विशेषता।"
    },
    time: "90",
    servings: "4",
    difficulty: "medium",
    image: "https://images.unsplash.com/photo-1659716307017-dc91342ec2b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBtdXR0b24lMjBsYW1iJTIwY3VycnklMjBtYXNhbGF8ZW58MXx8fHwxNzcyMDA4MjE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ingredients: {
      en: [
        "750g mutton, cut into pieces",
        "4 tbsp Vatan Masala",
        "2 large onions, finely chopped",
        "4 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "3-4 green chilies, slit",
        "1/2 cup thick yogurt",
        "4 tbsp oil or ghee",
        "1/2 tsp turmeric powder",
        "Fresh coriander and mint leaves",
        "Salt to taste"
      ],
      hi: [
        "750 ग्राम मटन, टुकड़ों में कटा हुआ",
        "4 बड़े चम्मच वाटण मसाला",
        "2 बड़े प्याज, बारीक कटे हुए",
        "4 टमाटर, प्यूरी",
        "2 बड़े चम्मच अदरक-लहसुन का पेस्ट",
        "3-4 हरी मिर्च, चीरी हुई",
        "1/2 कप गाढ़ा दही",
        "4 बड़े चम्मच तेल या घी",
        "1/2 चम्मच हल्दी पाउडर",
        "ताज़ा धनिया और पुदीना पत्तियां",
        "स्वादानुसार नमक"
      ],
      mr: [
        "750 ग्रॅम मटण, तुकड्यांमध्ये कापलेले",
        "4 टेबलस्पून वाटण मसाला",
        "2 मोठे कांदे, बारीक चिरलेले",
        "4 टोमॅटो, पाणी काढलेले",
        "2 टेबलस्पून आले-लसूण पेस्ट",
        "3-4 हिरव्या मिरच्या, चिरलेल्या",
        "1/2 कप जाड दही",
        "4 टेबलस्पून तेल किंवा तूप",
        "1/2 चमचा हळद पावडर",
        "ताजी कोथिंबीर आणि पुदिन्याची पाने",
        "चवीनुसार मीठ"
      ]
    },
    instructions: {
      en: [
        "Marinate mutton with yogurt, turmeric, and 1 tbsp Vatan Masala for 30 minutes",
        "Heat oil in pressure cooker, add onions and fry until deep golden",
        "Add ginger-garlic paste and green chilies, sauté for 3 minutes",
        "Add tomato puree and cook until oil separates (10-12 minutes)",
        "Add remaining 3 tbsp Vatan Masala, mix well and cook for 2 minutes",
        "Add marinated mutton and salt, cook on high heat for 5 minutes",
        "Add 2 cups water, pressure cook for 6-7 whistles or until tender",
        "Once pressure releases, simmer uncovered for 10 minutes to thicken gravy",
        "Garnish with fresh coriander and mint, serve hot with naan or rice"
      ],
      hi: [
        "मटन को दही, हल्दी और 1 बड़ा चम्मच वाटण मसाला के साथ 30 मिनट के लिए मैरिनेट करें",
        "प्रेशर कुकर में तेल गर्म करें, प्याज डालें और गहरा सुनहरा होने तक भूनें",
        "अदरक-लहसुन का पेस्ट और हरी मिर्च डालें, 3 मिनट भूनें",
        "टमाटर प्यूरी डालें और तेल अलग होने तक पकाएं (10-12 मिनट)",
        "शेष 3 बड़े चम्मच वाटण मसाला डालें, अच्छी तरह मिलाएं और 2 मिनट पकाएं",
        "मैरिनेट किया हुआ मटन और नमक डालें, तेज आंच पर 5 मिनट पकाएं",
        "2 कप पानी डालें, 6-7 सीटी के लिए या नरम होने तक प्रेशर कुक करें",
        "एक बार दबाव छोड़ने के बाद, ग्रेवी को गाढ़ा करने के लिए बिना ढके 10 मिनट उबालें",
        "ताज़ा धनिया और पुदीना से गार्निश करें, नान या चावल के साथ गर्म परोसें"
      ],
      mr: [
        "मटण दही, हळद आणि 1 टेबलस्पून वाटण मसाल्यासह 30 मिनिटे मॅरिनेट करा",
        "प्रेशर कुकरमध्ये तेल गरम करा, कांदे घाला आणि गडद सोनेरी होईपर्यंत तळा",
        "आले-लसूण पेस्ट आणि हिरव्या मिरच्या घाला, 3 मिनिटे परतून घ्या",
        "टोमॅटोचे पाणी घाला आणि तेल वेगळे होईपर्यंत शिजवा (10-12 मिनिटे)",
        "उरलेले 3 टेबलस्पून वाटण मसाला घाला, चांगले मिक्स करा आणि 2 मिनिटे शिजवा",
        "मॅरिनेट केलेले मटण आणि मीठ घाला, जास्त आचेवर 5 मिनिटे शिजवा",
        "2 कप पाणी घाला, 6-7 शिट्ट्यांसाठी किंवा कोमल होईपर्यंत प्रेशर कुक करा",
        "दाब सुटल्यानंतर, ग्रेव्ही घट्ट करण्यासाठी झाकण काढून 10 मिनिटे उकळा",
        "ताज्या कोथिंबीर आणि पुदिन्याने सजवा, नान किंवा भातासोबत गरम सर्व्ह करा"
      ]
    }
  },
  {
    id: 3,
    title: {
      en: "Egg Masala",
      hi: "अंडा मसाला",
      mr: "अंडे मसाला"
    },
    description: {
      en: "Delicious boiled eggs in spicy Vatan Masala gravy, quick and satisfying meal.",
      hi: "मसालेदार वाटण मसाला ग्रेवी में स्वादिष्ट उबले अंडे, त्वरित और संतोषजनक भोजन।",
      mr: "मसालेदार वाटण मसाला ग्रेव्हीमध्ये स्वादिष्ट उकडलेली अंडी, त्वरित आणि समाधानकारक जेवण।"
    },
    time: "30",
    servings: "4",
    difficulty: "easy",
    image: "https://images.unsplash.com/photo-1764315197254-94385571df22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBlZ2clMjBjdXJyeSUyMG1hc2FsYXxlbnwxfHx8fDE3NzIwMDgyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ingredients: {
      en: [
        "6 eggs, hard boiled and peeled",
        "2.5 tbsp Vatan Masala",
        "2 large onions, finely chopped",
        "3 tomatoes, pureed",
        "1 tbsp ginger-garlic paste",
        "2 green chilies, slit",
        "1/2 tsp turmeric powder",
        "3 tbsp oil",
        "Fresh coriander leaves",
        "Salt to taste"
      ],
      hi: [
        "6 अंडे, कठोर उबले और छिले हुए",
        "2.5 बड़े चम्मच वाटण मसाला",
        "2 बड़े प्याज, बारीक कटे हुए",
        "3 टमाटर, प्यूरी",
        "1 बड़ा चम्मच अदरक-लहसुन का पेस्ट",
        "2 हरी मिर्च, चीरी हुई",
        "1/2 चम्मच हल्दी पाउडर",
        "3 बड़े चम्मच तेल",
        "ताज़ा धनिया पत्ती",
        "स्वादानुसार नमक"
      ],
      mr: [
        "6 अंडी, घट्ट उकडलेली आणि सोललेली",
        "2.5 टेबलस्पून वाटण मसाला",
        "2 मोठे कांदे, बारीक चिरलेले",
        "3 टोमॅटो, पाणी काढलेले",
        "1 टेबलस्पून आले-लसूण पेस्ट",
        "2 हिरव्या मिरच्या, चिरलेल्या",
        "1/2 चमचा हळद पावडर",
        "3 टेबलस्पून तेल",
        "ताजी कोथिंबीर पाने",
        "चवीनुसार मीठ"
      ]
    },
    instructions: {
      en: [
        "Make small slits on boiled eggs and lightly shallow fry them, set aside",
        "In the same pan, add more oil if needed, sauté onions until golden",
        "Add ginger-garlic paste and green chilies, cook for 1 minute",
        "Add tomato puree, turmeric and cook until oil separates (6-8 minutes)",
        "Add 2.5 tbsp Vatan Masala and salt, mix well and cook for 2 minutes",
        "Add 1.5 cups water and bring to boil",
        "Gently add fried eggs to the gravy",
        "Simmer for 8-10 minutes until gravy thickens",
        "Garnish with fresh coriander and serve hot with roti or paratha"
      ],
      hi: [
        "उबले अंडों पर छोटे-छोटे चीरे लगाएं और हल्का उथला तलें, अलग रखें",
        "उसी पैन में, यदि आवश्यक हो तो और तेल डालें, प्याज को सुनहरा होने तक भूनें",
        "अदरक-लहसुन का पेस्ट और हरी मिर्च डालें, 1 मिनट पकाएं",
        "टमाटर प्यूरी, हल्दी डालें और तेल अलग होने तक पकाएं (6-8 मिनट)",
        "2.5 बड़े चम्मच वाटण मसाला और नमक डालें, अच्छी तरह मिलाएं और 2 मिनट पकाएं",
        "1.5 कप पानी डालें और उबाल लाएं",
        "तले हुए अंडों को धीरे से ग्रेवी में डालें",
        "ग्रेवी गाढ़ी होने तक 8-10 मिनट उबालें",
        "ताज़ा धनिया से गार्निश करें और रोटी या पराठे के साथ गर्म परोसें"
      ],
      mr: [
        "उकडलेल्या अंड्यांवर लहान चीरे करा आणि हलके उथळ तळून घ्या, बाजूला ठेवा",
        "त्याच पॅनमध्ये, आवश्यक असल्यास अधिक तेल घाला, कांदे सोनेरी होईपर्यंत परतून घ्या",
        "आले-लसूण पेस्ट आणि हिरव्या मिरच्या घाला, 1 मिनिट शिजवा",
        "टोमॅटोचे पाणी, हळद घाला आणि तेल वेगळे होईपर्यंत शिजवा (6-8 मिनिटे)",
        "2.5 टेबलस्पून वाटण मसाला आणि मीठ घाला, चांगले मिक्स करा आणि 2 मिनिटे शिजवा",
        "1.5 कप पाणी घाला आणि उकळी आणा",
        "तळलेली अंडी हळूवारपणे ग्रेव्हीमध्ये घाला",
        "ग्रेव्ही घट्ट होईपर्यंत 8-10 मिनिटे उकळा",
        "ताज्या कोथिंबिरीने सजवा आणि रोटी किंवा पराठ्यासोबत गरम सर्व्ह करा"
      ]
    }
  },
  {
    id: 4,
    title: {
      en: "Paneer Masala",
      hi: "पनीर मसाला",
      mr: "पनीर मसाला"
    },
    description: {
      en: "Creamy paneer cubes in rich Vatan Masala gravy, a vegetarian favorite.",
      hi: "समृद्ध वाटण मसाला ग्रेवी में मलाईदार पनीर क्यूब्स, एक शाकाहारी पसंदीदा।",
      mr: "समृद्ध वाटण मसाला ग्रेव्हीमध्ये मलईदार पनीर क्यूब्स, शाकाहारी लोकप्रिय पदार्थ।"
    },
    time: "35",
    servings: "4",
    difficulty: "easy",
    image: "https://images.unsplash.com/photo-1708793873401-e8c6c153b76a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBwYW5lZXIlMjBidXR0ZXIlMjBtYXNhbGElMjBjdXJyeXxlbnwxfHx8fDE3NzIwMDgyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ingredients: {
      en: [
        "400g paneer, cut into cubes",
        "3 tbsp Vatan Masala",
        "2 large onions, finely chopped",
        "3 tomatoes, pureed",
        "1 tbsp ginger-garlic paste",
        "1/2 cup fresh cream",
        "1/4 cup cashew paste (optional)",
        "1 tsp kasuri methi (dried fenugreek)",
        "3 tbsp butter or ghee",
        "Fresh coriander leaves",
        "Salt to taste"
      ],
      hi: [
        "400 ग्राम पनीर, क्यूब्स में कटा हुआ",
        "3 बड़े चम्मच वाटण मसाला",
        "2 बड़े प्याज, बारीक कटे हुए",
        "3 टमाटर, प्यूरी",
        "1 बड़ा चम्मच अदरक-लहसुन का पेस्ट",
        "1/2 कप ताज़ा क्रीम",
        "1/4 कप काजू पेस्ट (वैकल्पिक)",
        "1 चम्मच कसूरी मेथी",
        "3 बड़े चम्मच मक्खन या घी",
        "ताज़ा धनिया पत्ती",
        "स्वादानुसार नमक"
      ],
      mr: [
        "400 ग्रॅम पनीर, चौकोनी तुकडे",
        "3 टेबलस्पून वाटण मसाला",
        "2 मोठे कांदे, बारीक चिरलेले",
        "3 टोमॅटो, पाणी काढलेले",
        "1 टेबलस्पून आले-लसूण पेस्ट",
        "1/2 कप ताजी मलई",
        "1/4 कप काजू पेस्ट (पर्यायी)",
        "1 चमचा कसुरी मेथी",
        "3 टेबलस्पून लोणी किंवा तूप",
        "ताजी कोथिंबीर पाने",
        "चवीनुसार मीठ"
      ]
    },
    instructions: {
      en: [
        "Heat butter in a pan, lightly fry paneer cubes until golden, set aside",
        "In the same pan, add onions and sauté until golden brown",
        "Add ginger-garlic paste, cook for 1 minute",
        "Add tomato puree and cook until oil separates (7-8 minutes)",
        "Add 3 tbsp Vatan Masala, cashew paste (if using), mix well",
        "Add 1 cup water and salt, bring to boil and simmer for 5 minutes",
        "Add fresh cream and kasuri methi, mix gently",
        "Add fried paneer cubes and simmer for 3-4 minutes",
        "Garnish with fresh coriander and serve hot with naan or rice"
      ],
      hi: [
        "एक पैन में मक्खन गर्म करें, पनीर के क्यूब्स को सुनहरा होने तक हल्का तलें, अलग रखें",
        "उसी पैन में प्याज डालें और सुनहरा भूरा होने तक भूनें",
        "अदरक-लहसुन का पेस्ट डालें, 1 मिनट पकाएं",
        "टमाटर प्यूरी डालें और तेल अलग होने तक पकाएं (7-8 मिनट)",
        "3 बड़े चम्मच वाटण मसाला, काजू पेस्ट (यदि उपयोग कर रहे हैं) डालें, अच्छी तरह मिलाएं",
        "1 कप पानी और नमक डालें, उबाल लाएं और 5 मिनट उबालें",
        "ताज़ा क्रीम और कसूरी मेथी डालें, धीरे से मिलाएं",
        "तले हुए पनीर क्यूब्स डालें और 3-4 मिनट उबालें",
        "ताज़ा धनिया से गार्निश करें और नान या चावल के साथ गर्म परोसें"
      ],
      mr: [
        "पॅनमध्ये लोणी गरम करा, पनीरचे तुकडे सोनेरी होईपर्यंत हलके तळून घ्या, बाजूला ठेवा",
        "त्याच पॅनमध्ये कांदे घाला आणि सोनेरी तपकिरी होईपर्यंत परतून घ्या",
        "आले-लसूण पेस्ट घाला, 1 मिनिट शिजवा",
        "टोमॅटोचे पाणी घाला आणि तेल वेगळे होईपर्यंत शिजवा (7-8 मिनिटे)",
        "3 टेबलस्पून वाटण मसाला, काजू पेस्ट (वापरत असल्यास) घाला, चांगले मिक्स करा",
        "1 कप पाणी आणि मीठ घाला, उकळी आणा आणि 5 मिनिटे उकळा",
        "ताजी मलई आणि कसुरी मेथी घाला, हळूवारपणे मिसळा",
        "तळलेले पनीर तुकडे घाला आणि 3-4 मिनिटे उकळा",
        "ताज्या कोथिंबिरीने सजवा आणि नान किंवा भातासोबत गरम सर्व्ह करा"
      ]
    }
  },
  {
    id: 5,
    title: {
      en: "Kolhapuri Masala",
      hi: "कोल्हापुरी मसाला",
      mr: "कोल्हापुरी मसाला"
    },
    description: {
      en: "Fiery hot and authentic Kolhapuri style curry made with Vatan Masala, a Maharashtra specialty.",
      hi: "वाटण मसाला से बना तीखा और प्रामाणिक कोल्हापुरी स्टाइल करी, महाराष्ट्र की विशेषता।",
      mr: "वाटण मसाल्याने बनवलेली तिखट आणि प्रामाणिक कोल्हापुरी शैलीची करी, महाराष्ट्राची खासियत।"
    },
    time: "50",
    servings: "4",
    difficulty: "medium",
    image: "https://images.unsplash.com/photo-1769030471026-2053279edaa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLb2xoYXB1cmklMjBzcGljeSUyMGN1cnJ5JTIwTWFoYXJhc2h0cmF8ZW58MXx8fHwxNzcyMDA4MjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ingredients: {
      en: [
        "500g chicken or mutton pieces",
        "4 tbsp Vatan Masala",
        "2 large onions, sliced",
        "3 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "4-5 dry red chilies",
        "1 cup grated coconut",
        "1/2 cup yogurt",
        "1 tsp goda masala (optional)",
        "4 tbsp oil",
        "Fresh coriander leaves",
        "Salt to taste"
      ],
      hi: [
        "500 ग्राम चिकन या मटन के टुकड़े",
        "4 बड़े चम्मच वाटण मसाला",
        "2 बड़े प्याज, कटे हुए",
        "3 टमाटर, कटे हुए",
        "2 बड़े चम्मच अदरक-लहसुन का पेस्ट",
        "4-5 सूखी लाल मिर्च",
        "1 कप कद्दूकस किया नारियल",
        "1/2 कप दही",
        "1 चम्मच गोडा मसाला (वैकल्पिक)",
        "4 बड़े चम्मच तेल",
        "ताज़ा धनिया पत्ती",
        "स्वादानुसार नमक"
      ],
      mr: [
        "500 ग्रॅम चिकन किंवा मटणाचे तुकडे",
        "4 टेबलस्पून वाटण मसाला",
        "2 मोठे कांदे, चिरलेले",
        "3 टोमॅटो, चिरलेले",
        "2 टेबलस्पून आले-लसूण पेस्ट",
        "4-5 सुकी लाल मिरची",
        "1 कप किसलेले खोबरे",
        "1/2 कप दही",
        "1 चमचा गोडा मसाला (पर्यायी)",
        "4 टेबलस्पून तेल",
        "ताजी कोथिंबीर पाने",
        "चवीनुसार मीठ"
      ]
    },
    instructions: {
      en: [
        "Dry roast grated coconut and red chilies, grind to smooth paste with water",
        "Heat oil in pan, add sliced onions and fry until golden brown",
        "Add ginger-garlic paste, cook for 2 minutes",
        "Add tomatoes and cook until soft and mushy (5-6 minutes)",
        "Add 4 tbsp Vatan Masala and goda masala, mix well",
        "Add coconut-chili paste, cook for 3-4 minutes",
        "Add meat pieces, yogurt and salt, mix to coat well",
        "Add 2 cups water, bring to boil, cover and cook until meat is tender (30-35 mins)",
        "Simmer uncovered for final 5 minutes to thicken",
        "Garnish with fresh coriander and serve with bhakri or rice"
      ],
      hi: [
        "कद्दूकस किया नारियल और लाल मिर्च को सूखा भूनें, पानी के साथ चिकना पेस्ट बनाएं",
        "पैन में तेल गर्म करें, कटे हुए प्याज डालें और सुनहरा भूरा होने तक तलें",
        "अदरक-लहसुन का पेस्ट डालें, 2 मिनट पकाएं",
        "टमाटर डालें और नरम और गूदेदार होने तक पकाएं (5-6 मिनट)",
        "4 बड़े चम्मच वाटण मसाला और गोडा मसाला डालें, अच्छी तरह मिलाएं",
        "नारियल-मिर्च का पेस्ट डालें, 3-4 मिनट पकाएं",
        "मांस के टुकड़े, दही और नमक डालें, अच्छी तरह कोट करने के लिए मिलाएं",
        "2 कप पानी डालें, उबाल लाएं, ढककर मांस नरम होने तक पकाएं (30-35 मिनट)",
        "गाढ़ा करने के लिए अंतिम 5 मिनट बिना ढके उबालें",
        "ताज़ा धनिया से गार्निश करें और भाकरी या चावल के साथ परोसें"
      ],
      mr: [
        "किसलेले खोबरे आणि लाल मिरची कोरडी भाजून घ्या, पाण्यासह गुळगुळीत पेस्ट करा",
        "पॅनमध्ये तेल गरम करा, चिरलेले कांदे घाला आणि सोनेरी तपकिरी होईपर्यंत तळा",
        "आले-लसूण पेस्ट घाला, 2 मिनिटे शिजवा",
        "टोमॅटो घाला आणि मऊ आणि गळगळीत होईपर्यंत शिजवा (5-6 मिनिटे)",
        "4 टेबलस्पून वाटण मसाला आणि गोडा मसाला घाला, चांगले मिक्स करा",
        "खोबरे-मिरची पेस्ट घाला, 3-4 मिनिटे शिजवा",
        "मांसाचे तुकडे, दही आणि मीठ घाला, चांगले मिसळा",
        "2 कप पाणी घाला, उकळी आणा, झाकण ठेवून मांस कोमल होईपर्यंत शिजवा (30-35 मिनिटे)",
        "घट्ट करण्यासाठी शेवटच्या 5 मिनिटे झाकण काढून उकळा",
        "ताज्या कोथिंबिरीने सजवा आणि भाकरी किंवा भातासोबत सर्व्ह करा"
      ]
    }
  },
];

export function Recipes() {
  const { t, language } = useLanguage();
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

  const toggleRecipe = (id: number) => {
    setExpandedRecipe(expandedRecipe === id ? null : id);
  };

  const getDifficultyTranslation = (difficulty: string) => {
    return t(difficulty);
  };

  return (
    <section id="recipes" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
            <ChefHat className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-orange-700">{t('recipes')}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl text-neutral-900 mb-4">
            {t('recipeIdeas')}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('discoverRecipes')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Recipe Image */}
              <div className="relative h-56 bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <ImageWithFallback
                  src={recipe.image}
                  alt={recipe.title[language as 'en' | 'hi' | 'mr']}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                  <span className="text-sm text-orange-600">{getDifficultyTranslation(recipe.difficulty)}</span>
                </div>
              </div>

              {/* Recipe Info */}
              <div className="p-6">
                <h3 className="text-xl text-neutral-900 mb-2">
                  {recipe.title[language as 'en' | 'hi' | 'mr']}
                </h3>
                <p className="text-neutral-600 mb-4 text-sm">
                  {recipe.description[language as 'en' | 'hi' | 'mr']}
                </p>

                <div className="grid grid-cols-2 gap-3 pb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-neutral-600">{recipe.time} {t('cookingTime')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-neutral-600">{recipe.servings} {t('servings')}</span>
                  </div>
                </div>

                {/* Expandable Recipe Details */}
                <button
                  onClick={() => toggleRecipe(recipe.id)}
                  className="w-full mt-4 flex items-center justify-between text-orange-600 hover:text-orange-700 transition-colors"
                >
                  <span className="font-medium">{t('viewFullRecipe')}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      expandedRecipe === recipe.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expanded Content */}
                {expandedRecipe === recipe.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-neutral-100"
                  >
                    {/* Ingredients */}
                    <div className="mb-4">
                      <h4 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-600" />
                        {t('ingredients')}
                      </h4>
                      <ul className="space-y-1 text-sm text-neutral-700">
                        {recipe.ingredients[language as 'en' | 'hi' | 'mr'].map((ingredient, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-orange-600 mt-1.5">•</span>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
                        <ChefHat className="w-4 h-4 text-orange-600" />
                        {t('instructions')}
                      </h4>
                      <ol className="space-y-2 text-sm text-neutral-700">
                        {recipe.instructions[language as 'en' | 'hi' | 'mr'].map((instruction, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-medium">
                              {idx + 1}
                            </span>
                            <span className="flex-1 pt-0.5">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl text-neutral-900 mb-2">
                {t('needCookingTips')}
              </h3>
              <p className="text-lg text-neutral-600">
                {t('expertChefHelp')}
              </p>
            </div>
            <a
              href="https://wa.me/918600317822"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:shadow-lg transition-shadow"
            >
              {t('getInTouch')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
