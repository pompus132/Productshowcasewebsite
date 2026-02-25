import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export function SEOHead({
  title = "Vatan Masala - Premium Quality Masala | पाटण चे वाटण",
  description = "Experience authentic Indian spices with Vatan Masala. Premium blend of traditional spices from Patan, Maharashtra. FSSAI certified. Order now for ₹40/-. वाटण मसाला - खरा एक प्रमाणिक मसाला।",
  keywords = "vatan masala, masala, spices, indian spices, patan masala, maharashtra masala, garam masala, chicken masala, mutton masala, authentic masala, FSSAI certified masala, वाटण मसाला, मसाला",
  ogImage = "https://images.unsplash.com/photo-1596040033229-a0b8d57a3b13?w=1200&h=630&fit=crop",
  canonicalUrl = typeof window !== 'undefined' ? window.location.href : ''
}: SEOHeadProps) {
  
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Set or update link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      
      element.href = href;
    };

    // Basic Meta Tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('author', 'Vatan Masala - Patan, Maharashtra');
    setMetaTag('robots', 'index, follow');
    setMetaTag('language', 'English, Hindi, Marathi');
    setMetaTag('revisit-after', '7 days');

    // Open Graph Meta Tags (Facebook, LinkedIn)
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:site_name', 'Vatan Masala', true);
    setMetaTag('og:locale', 'en_IN', true);

    // Twitter Card Meta Tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // Mobile Meta Tags
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    setMetaTag('theme-color', '#FF6B1A');
    setMetaTag('mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    setMetaTag('apple-mobile-web-app-title', 'Vatan Masala');

    // Business Information (Schema.org compatible)
    setMetaTag('business:contact_data:street_address', 'At Post – Bhaji Mandai, Patan');
    setMetaTag('business:contact_data:locality', 'Patan');
    setMetaTag('business:contact_data:region', 'Maharashtra');
    setMetaTag('business:contact_data:postal_code', '415206');
    setMetaTag('business:contact_data:country_name', 'India');
    setMetaTag('business:contact_data:email', 'pompuswatanmasala@gmail.com');
    setMetaTag('business:contact_data:phone_number', '+918600317822');

    // Canonical URL
    if (canonicalUrl) {
      setLinkTag('canonical', canonicalUrl);
    }

    // Alternate links for multi-language
    setLinkTag('alternate', `${canonicalUrl}?lang=en`);
    
    // Structured Data (JSON-LD) for Rich Snippets
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": `${canonicalUrl}#business`,
          "name": "Vatan Masala",
          "alternateName": "वाटण मसाला",
          "description": description,
          "url": canonicalUrl,
          "telephone": "+91-8600317822",
          "email": "pompuswatanmasala@gmail.com",
          "priceRange": "₹40 - ₹160",
          "image": ogImage,
          "logo": ogImage,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "At Post – Bhaji Mandai, Patan",
            "addressLocality": "Patan",
            "addressRegion": "Maharashtra",
            "postalCode": "415206",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "17.3398",
            "longitude": "74.1008"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "09:00",
            "closes": "20:00"
          },
          "sameAs": [
            `https://wa.me/918600317822`,
            `https://www.facebook.com/profile.php?id=61588384425751`,
            `https://www.instagram.com/pompus_watan_masala`,
            `mailto:pompuswatanmasala@gmail.com`
          ]
        },
        {
          "@type": "Product",
          "@id": `${canonicalUrl}#product`,
          "name": "Vatan Masala",
          "description": "Premium blend of traditional Indian spices",
          "image": ogImage,
          "brand": {
            "@type": "Brand",
            "name": "Vatan Masala"
          },
          "offers": [
            {
              "@type": "Offer",
              "name": "125g Pack",
              "price": "40",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Vatan Masala"
              }
            },
            {
              "@type": "Offer",
              "name": "250g Pack",
              "price": "80",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Vatan Masala"
              }
            },
            {
              "@type": "Offer",
              "name": "500g Pack",
              "price": "160",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Vatan Masala"
              }
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "2847",
            "bestRating": "5",
            "worstRating": "1"
          }
        },
        {
          "@type": "WebSite",
          "@id": `${canonicalUrl}#website`,
          "url": canonicalUrl,
          "name": "Vatan Masala",
          "description": description,
          "inLanguage": ["en-IN", "hi-IN", "mr-IN"]
        },
        {
          "@type": "Organization",
          "@id": `${canonicalUrl}#organization`,
          "name": "Vatan Masala",
          "url": canonicalUrl,
          "logo": ogImage,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-8600317822",
            "contactType": "Customer Service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi", "Marathi"]
          }
        }
      ]
    };

    // Add or update JSON-LD script
    let scriptElement = document.querySelector('script[type="application/ld+json"]');
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null;
}