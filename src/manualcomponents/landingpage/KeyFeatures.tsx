import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Pill, Star, Phone } from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay, color }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        backgroundColor: color.light,
        borderTop: `4px solid ${color.dark}`
      }}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 border-t-4 border-transparent"
    >
      <motion.div
        whileHover={{ 
          scale: 1.2, 
          rotate: 5,
          backgroundColor: color.dark,
          color: "white"
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 text-${color.name}-600 bg-${color.name}-100`}
      >
        {icon}
      </motion.div>
      <motion.h3 
        className="text-xl font-bold mb-2 text-gray-800"
        whileHover={{ scale: 1.05 }}
      >
        {title}
      </motion.h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
};

const KeyFeaturesSection = () => {
  const features = [
    {
      icon: <MapPin size={32} />,
      title: "Pharmacy Locator",
      description: "Find open pharmacies near you on a live map.",
      delay: 0.1,
      color: { name: "blue", light: "#EBF5FF", dark: "#3B82F6" }
    },
    {
      icon: <Pill size={32} />,
      title: "Medication Search",
      description: "Check stock availability & prices instantly.",
      delay: 0.2,
      color: { name: "green", light: "#ECFDF5", dark: "#10B981" }
    },
    {
      icon: <Star size={32} />,
      title: "User Reviews",
      description: "See ratings before visiting a pharmacy.",
      delay: 0.3,
      color: { name: "yellow", light: "#FFFBEB", dark: "#F59E0B" }
    },
    {
      icon: <Phone size={32} />,
      title: "Emergency Contacts",
      description: "One-click access to ambulance & hospitals.",
      delay: 0.4,
      color: { name: "red", light: "#FEF2F2", dark: "#EF4444" }
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Why Choose Medi Finder?
          </motion.h2>
          <motion.div 
            className="h-1 w-24 bg-blue-600 mx-auto rounded"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;