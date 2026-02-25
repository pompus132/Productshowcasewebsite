import { motion } from "motion/react";
import { Package, Users, TrendingDown, Headphones, CheckCircle2, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState, FormEvent } from "react";

const benefits = [
  {
    icon: TrendingDown,
    title: "Special Pricing",
    description: "Exclusive wholesale rates for bulk orders",
  },
  {
    icon: Package,
    title: "Custom Packaging",
    description: "Branding options available for restaurants",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Personal account manager for bulk clients",
  },
  {
    icon: CheckCircle2,
    title: "Quality Guarantee",
    description: "Same premium quality in all quantities",
  },
];

export function BulkOrder() {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    businessType: '',
    quantity: '',
    location: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create WhatsApp message with proper formatting
    let message = '🏢 *BULK ORDER INQUIRY*\n';
    message += '━━━━━━━━━━━━━━━━━━━━\n\n';
    
    message += '📋 *CUSTOMER DETAILS*\n';
    message += `👤 Name: ${formData.fullName}\n`;
    message += `🏪 Business: ${formData.businessName}\n`;
    message += `📱 Phone: ${formData.phone}\n`;
    message += `📧 Email: ${formData.email}\n\n`;
    
    message += '📦 *ORDER DETAILS*\n';
    message += `🏢 Business Type: ${formData.businessType}\n`;
    message += `📦 Quantity Required: ${formData.quantity} packs\n`;
    message += `📍 Delivery Location: ${formData.location}\n`;
    
    if (formData.requirements) {
      message += `\n📝 *SPECIAL REQUIREMENTS*\n`;
      message += `${formData.requirements}\n`;
    }
    
    message += '\n━━━━━━━━━━━━━━━━━━━━\n';
    message += '✅ Please provide a quote for this bulk order.\n';
    message += '⏰ Looking forward to your response within 24 hours.';
    
    // Properly encode the message for WhatsApp
    const phoneNumber = '918600317822';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    // Show success message
    setSuccessMessage('Thank you! Your inquiry has been sent successfully. We will contact you within 24 hours.');
    
    // Reset form
    setFormData({
      fullName: '',
      businessName: '',
      phone: '',
      email: '',
      businessType: '',
      quantity: '',
      location: '',
      requirements: ''
    });
    
    setIsSubmitting(false);
    
    // Clear success message after 5 seconds
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <section id="bulk-order" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
            <Users className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-orange-700">Bulk Orders</span>
          </div>
          <h2 className="text-4xl lg:text-5xl text-neutral-900 mb-4">
            Special Pricing for Bulk Orders
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Perfect for restaurants, hotels, caterers, and retail stores
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-3xl p-8">
              <h3 className="text-3xl mb-2">Wholesale Program</h3>
              <p className="text-white/90 text-lg">
                Join our wholesale program and enjoy exclusive benefits
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg border border-orange-100"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl text-neutral-900 mb-1">{benefit.title}</h4>
                    <p className="text-neutral-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Minimum Order Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200">
              <h4 className="text-xl text-neutral-900 mb-4">Order Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
                  <span className="text-neutral-700">Minimum Order Quantity</span>
                  <span className="text-orange-600">50 Packs</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
                  <span className="text-neutral-700">Delivery Time</span>
                  <span className="text-orange-600">2-3 Business Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-700">Payment Terms</span>
                  <span className="text-orange-600">Flexible Options</span>
                </div>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="bg-gradient-to-br from-neutral-900 to-orange-900 text-white rounded-2xl p-6">
              <h4 className="text-xl mb-4">Prefer to Talk?</h4>
              <div className="space-y-3">
                <a href="tel:8600317822" className="flex items-center gap-3 hover:text-orange-300 transition-colors">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Call Us</div>
                    <div className="text-lg">860-031-7822</div>
                  </div>
                </a>
                <a href="mailto:bulk@vatanmasala.com" className="flex items-center gap-3 hover:text-orange-300 transition-colors">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Email Us</div>
                    <div className="text-lg">pompuswatanmasala@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-orange-200"
          >
            <h3 className="text-2xl text-neutral-900 mb-2">Get a Quote</h3>
            <p className="text-neutral-600 mb-6">
              Fill out the form and we'll get back to you within 24 hours
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-neutral-700 mb-2 block">
                    Full Name *
                  </label>
                  <Input 
                    placeholder="Your name" 
                    required 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-700 mb-2 block">
                    Business Name *
                  </label>
                  <Input 
                    placeholder="Company name" 
                    required 
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-neutral-700 mb-2 block">
                    Phone Number *
                  </label>
                  <Input 
                    type="tel" 
                    placeholder="+91 00000 00000" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-700 mb-2 block">
                    Email Address *
                  </label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-neutral-700 mb-2 block">
                  Business Type *
                </label>
                <select 
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  value={formData.businessType}
                  onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                >
                  <option value="">Select business type</option>
                  <option>Restaurant</option>
                  <option>Hotel</option>
                  <option>Catering Service</option>
                  <option>Retail Store</option>
                  <option>Wholesaler</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-neutral-700 mb-2 block">
                    Quantity Required (Packs) *
                  </label>
                  <Input 
                    type="number" 
                    placeholder="Minimum 50 packs" 
                    min="50" 
                    required 
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-700 mb-2 block">
                    Delivery Location *
                  </label>
                  <Input 
                    placeholder="City, State" 
                    required 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-neutral-700 mb-2 block">
                  Additional Requirements
                </label>
                <Textarea 
                  placeholder="Tell us about your specific needs, delivery schedule, or any special requests..."
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full py-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </Button>

              {successMessage && (
                <p className="text-sm text-green-500 text-center mt-2">
                  {successMessage}
                </p>
              )}

              <p className="text-xs text-neutral-500 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}