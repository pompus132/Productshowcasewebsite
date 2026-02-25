import { motion } from "motion/react";
import { Leaf, Award, Clock, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Made from carefully selected natural ingredients without any artificial additives or preservatives.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Crafted with the finest spices to ensure authentic taste and aroma in every pack.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock,
    title: "Fresh Daily",
    description: "Ground fresh daily to maintain the natural oils and flavors of the spices.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Heart,
    title: "Healthy Choice",
    description: "Rich in antioxidants and natural nutrients, perfect for a healthy lifestyle.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Sparkles,
    title: "Authentic Taste",
    description: "Traditional recipe passed down through generations for genuine Maharashtrian flavor.",
    gradient: "from-amber-500 to-yellow-500",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-orange-700">Our Features</span>
          </div>
          <h2 className="text-4xl lg:text-5xl text-neutral-900 mb-4">
            Why Choose Vatan Masala?
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Experience the difference with our premium quality masala, crafted with tradition and care.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 hover:shadow-2xl transition-all duration-300 border-2 border-orange-100 hover:border-orange-300 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/5 rounded-full blur-2xl group-hover:bg-orange-600/10 transition-all duration-300" />
              
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl text-neutral-900 mb-2">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}