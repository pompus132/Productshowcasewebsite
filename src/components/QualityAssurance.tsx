import { motion } from "motion/react";
import { Shield, ClipboardCheck, Package2, Users, Thermometer } from "lucide-react";

const qualitySteps = [
  {
    icon: Users,
    title: "Premium Sourcing",
    description: "Hand-picked ingredients from trusted suppliers",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Testing",
    description: "Rigorous testing for purity and freshness",
  },
  {
    icon: Thermometer,
    title: "Hygienic Processing",
    description: "Temperature-controlled environment",
  },
  {
    icon: Package2,
    title: "Safe Packaging",
    description: "Food-grade airtight packaging",
  },
];

export function QualityAssurance() {
  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-orange-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
            <Shield className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-orange-700">Quality First</span>
          </div>
          <h2 className="text-4xl lg:text-5xl text-neutral-900 mb-4">
            Our Quality Assurance Process
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            From farm to your kitchen - ensuring the highest standards at every step
          </p>
        </motion.div>

        {/* Quality Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualitySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 overflow-hidden group"
            >
              {/* Number Badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                <span>{index + 1}</span>
              </div>

              <div className={`w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl text-neutral-900 mb-2">{step.title}</h3>
              <p className="text-neutral-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}