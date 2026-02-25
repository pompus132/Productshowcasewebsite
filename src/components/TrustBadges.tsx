import { motion } from "motion/react";
import { ShieldCheck, Award } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    title: "FSSAI Certified",
    subtitle: "Lic. No: 21517194000113",
  },
  {
    icon: Award,
    title: "ISO Certified",
    subtitle: "Quality Assured",
  },
];

export function TrustBadges() {
  return (
    <section className="py-12 bg-white border-y border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center text-center gap-3 p-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <badge.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-neutral-900 mb-1">{badge.title}</div>
                <div className="text-sm text-neutral-600">{badge.subtitle}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
