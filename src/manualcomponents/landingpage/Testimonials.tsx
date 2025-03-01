import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TestimonialCard = ({ name, location, rating, text, image, profession }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-full"
    >
      <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white">
        <CardContent className="p-10 text-center">
          <div className="flex flex-col items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Avatar className="h-24 w-24 border-4 border-blue-100 shadow-md">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>

            <div className="relative mb-4">
              <Quote size={36} className="absolute text-blue-100 -top-2 left-0 opacity-60" />
              <motion.p
                className="text-gray-700 italic relative text-lg px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {text}
              </motion.p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
              <p className="text-sm text-gray-500">{profession}, {location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, NY',
      profession: 'Teacher',
      rating: 5,
      text: 'Medi Finder saved me so much time! I needed an antibiotic late at night and found an open pharmacy within minutes.',
      image: 'https://i.pravatar.cc/150?img=45',
    },
    {
      name: 'Michael Chen',
      location: 'San Francisco, CA',
      profession: 'Software Engineer',
      rating: 5,
      text: 'The price comparison feature helped me save over 30% on my monthly prescription.',
      image: 'https://i.pravatar.cc/150?img=22',
    },
    {
      name: 'Emma Rodriguez',
      location: 'Chicago, IL',
      profession: 'Healthcare Worker',
      rating: 4,
      text: 'I love how easy it is to find pharmacies with specific medications in stock.',
      image: 'https://i.pravatar.cc/150?img=12',
    },
  ];

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
      }
    }, 6000);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    clearInterval(intervalRef.current);
    startInterval();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    clearInterval(intervalRef.current);
    startInterval();
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What Our Users Say</h2>
        <div className="max-w-3xl mx-auto relative px-4">
          <motion.button
            onClick={handlePrev}
            className="absolute top-1/2 -left-10 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100"
          >
            <ChevronLeft size={20} className="text-blue-600" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="absolute top-1/2 -right-10 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100"
          >
            <ChevronRight size={20} className="text-blue-600" />
          </motion.button>

          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <TestimonialCard {...testimonials[currentIndex]} key={currentIndex} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
