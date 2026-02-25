import { useEffect } from 'react';

interface AnalyticsProps {
  trackingId?: string;
}

export function Analytics({ trackingId = 'G-XXXXXXXXXX' }: AnalyticsProps) {
  
  useEffect(() => {
    // Only initialize if tracking ID is provided and not the placeholder
    if (!trackingId || trackingId === 'G-XXXXXXXXXX') {
      console.info('📊 Analytics: Tracking ID not configured. Replace "G-XXXXXXXXXX" with your actual Google Analytics ID.');
      return;
    }

    // Check if gtag is already loaded
    if (typeof window !== 'undefined' && !(window as any).gtag) {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize gtag
      script.onload = () => {
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]) {
          (window as any).dataLayer.push(args);
        }
        (window as any).gtag = gtag;

        gtag('js', new Date());
        gtag('config', trackingId, {
          page_path: window.location.pathname,
          send_page_view: true,
        });

        console.info('✅ Analytics: Google Analytics initialized successfully');
      };
    }

    // Track page view on mount
    trackPageView(window.location.pathname);

  }, [trackingId]);

  // Track page views
  const trackPageView = (path: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', trackingId, {
        page_path: path,
      });
    }
  };

  return null;
}

// Custom event tracking functions for e-commerce
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
    console.info(`📊 Event tracked: ${eventName}`, eventParams);
  }
};

// E-commerce specific tracking
export const trackAddToCart = (product: { id: number; name: string; price: number; weight: string }) => {
  trackEvent('add_to_cart', {
    currency: 'INR',
    value: product.price,
    items: [{
      item_id: product.id.toString(),
      item_name: product.name,
      item_variant: product.weight,
      price: product.price,
      quantity: 1,
    }]
  });
};

export const trackRemoveFromCart = (product: { id: number; name: string; price: number; weight: string }) => {
  trackEvent('remove_from_cart', {
    currency: 'INR',
    value: product.price,
    items: [{
      item_id: product.id.toString(),
      item_name: product.name,
      item_variant: product.weight,
      price: product.price,
      quantity: 1,
    }]
  });
};

export const trackViewItem = (product: { id: number; name: string; price: number; weight: string }) => {
  trackEvent('view_item', {
    currency: 'INR',
    value: product.price,
    items: [{
      item_id: product.id.toString(),
      item_name: product.name,
      item_variant: product.weight,
      price: product.price,
    }]
  });
};

export const trackBeginCheckout = (items: any[], totalValue: number) => {
  trackEvent('begin_checkout', {
    currency: 'INR',
    value: totalValue,
    items: items.map(item => ({
      item_id: item.id.toString(),
      item_name: item.name,
      item_variant: item.weight,
      price: item.mrp,
      quantity: item.quantity,
    }))
  });
};

export const trackPurchase = (orderId: string, items: any[], totalValue: number) => {
  trackEvent('purchase', {
    transaction_id: orderId,
    currency: 'INR',
    value: totalValue,
    items: items.map(item => ({
      item_id: item.id.toString(),
      item_name: item.name,
      item_variant: item.weight,
      price: item.mrp,
      quantity: item.quantity,
    }))
  });
};

export const trackAddToWishlist = (product: { id: number; name: string; price: number; weight: string }) => {
  trackEvent('add_to_wishlist', {
    currency: 'INR',
    value: product.price,
    items: [{
      item_id: product.id.toString(),
      item_name: product.name,
      item_variant: product.weight,
      price: product.price,
    }]
  });
};

export const trackSearch = (searchTerm: string) => {
  trackEvent('search', {
    search_term: searchTerm,
  });
};

export const trackViewRecipe = (recipeName: string) => {
  trackEvent('view_recipe', {
    recipe_name: recipeName,
  });
};

export const trackLanguageChange = (language: string) => {
  trackEvent('language_change', {
    language: language,
  });
};

export const trackWhatsAppClick = (action: string) => {
  trackEvent('whatsapp_interaction', {
    action: action,
  });
};

export const trackReviewSubmit = (productId: number, rating: number) => {
  trackEvent('review_submit', {
    product_id: productId,
    rating: rating,
  });
};

// Facebook Pixel (Optional)
export const initFacebookPixel = (pixelId: string) => {
  if (!pixelId || pixelId === 'YOUR_PIXEL_ID') {
    console.info('📊 Facebook Pixel: Pixel ID not configured.');
    return;
  }

  if (typeof window !== 'undefined' && !(window as any).fbq) {
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    console.info('✅ Facebook Pixel initialized successfully');
  }
};

// Setup guide component
export function AnalyticsSetupGuide() {
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      background: '#fff', 
      padding: '20px', 
      borderRadius: '10px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      maxWidth: '400px',
      zIndex: 9999,
      display: process.env.NODE_ENV === 'development' ? 'block' : 'none'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#FF6B1A' }}>📊 Analytics Setup</h3>
      <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
        To enable analytics tracking:
      </p>
      <ol style={{ margin: '0', paddingLeft: '20px', fontSize: '13px' }}>
        <li>Create a Google Analytics 4 property</li>
        <li>Get your Measurement ID (G-XXXXXXXXXX)</li>
        <li>Replace the placeholder in Analytics component</li>
        <li>Deploy your website</li>
      </ol>
      <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#666' }}>
        This message only shows in development mode.
      </p>
    </div>
  );
}
