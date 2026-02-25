import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const ingredients = [
  { name: "Onion", percentage: "Main Ingredient" },
  { name: "Coconut", percentage: "Premium Quality" },
  { name: "Refined Oil", percentage: "Pure & Fresh" },
  { name: "Garlic", percentage: "Aromatic" },
  { name: "Ginger", percentage: "Spicy Essence" },
  { name: "Salt", percentage: "5% Balanced" },
];

const nutritionalInfo = [
  { label: "Energy", value: "Approx Value" },
  { label: "Protein", value: "4 Kp" },
  { label: "Fat", value: "55%" },
  { label: "Carbohydrates", value: "25%" },
  { label: "Sugar", value: "14%" },
  { label: "Fiber", value: "2%" },
  { label: "Sodium", value: "80%" },
];

export function Ingredients() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl text-neutral-900 mb-4">
            Ingredients & Nutrition
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Carefully selected premium ingredients for authentic taste and maximum nutrition.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Ingredients */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 border border-orange-100">
              <h3 className="text-2xl text-neutral-900 mb-6">Key Ingredients</h3>
              <div className="space-y-4">
                {ingredients.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl"
                  >
                    <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-lg text-neutral-900">{ingredient.name}</div>
                      <div className="text-sm text-neutral-600">{ingredient.percentage}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Nutritional Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 border border-orange-100">
              <h3 className="text-2xl text-neutral-900 mb-6">Nutritional Information</h3>
              <div className="space-y-3">
                {nutritionalInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-white rounded-xl"
                  >
                    <span className="text-neutral-900">{info.label}</span>
                    <span className="text-orange-600">{info.value}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-orange-100 rounded-xl">
                <p className="text-sm text-orange-900">
                  <strong>Storage Instructions:</strong> Store in refrigerator only. Keep away from sunlight. Once opened, transfer the content to an airtight container.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
