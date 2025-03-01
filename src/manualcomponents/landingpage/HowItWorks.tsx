import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const StepCard = ({ number, icon, title, description, delay }) => {
    
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative"
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <motion.div
          className="absolute -top-3 -left-3 z-10"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Badge variant="default" className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 text-white text-lg p-0">
            {number}
          </Badge>
        </motion.div>
        
        <CardContent className="p-6 pt-8">
          <div className="flex items-start gap-4">
            <motion.div
              className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-1"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "#3B82F6", 
                color: "#FFFFFF" 
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {icon}
            </motion.div>
            
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const HowItWorksSection = ({ imageSrc = "/api/placeholder/600/400" }) => {
  const steps = [
    {
      number: 1,
      icon: <UserPlus size={28} />,
      title: "Register",
      description: "Sign up with your phone number or email to create your account.",
      delay: 0.1,
    },
    {
      number: 2,
      icon: <Search size={28} />,
      title: "Find What You Need",
      description: "Search for pharmacies or medications based on your requirements.",
      delay: 0.2,
    },
    {
      number: 3,
      icon: <Clock size={28} />,
      title: "Get Instant Results",
      description: "See live updates, stock availability, and user reviews immediately.",
      delay: 0.3,
    },
  ];

  return (
    <section className="py-20 bg-#bfdbfe -50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-blue-600 font-semibold text-sm uppercase tracking-wider"
            >
              Simple Process
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4"
            >
              How It Works
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Get started with Medi Finder in just three simple steps and find the medications you need in minutes.
            </motion.p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-2xl lg:mt-12"
          >
            <img 
              src="findfamaci.jpg"
              alt="" 
              className="w-full h-auto object-cover"
            />
          </motion.div>
          {/* Steps Column */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                number={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
                delay={step.delay}
              />
            ))}
          </div>
          
        
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;