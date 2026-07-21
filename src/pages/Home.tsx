import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Leaf, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Matcha preparation" 
            className="w-full h-full object-cover object-center filter brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-5xl md:text-7xl font-bold mb-4 font-sans tracking-tight">
              いらっしゃいませ
            </h1>
            <p className="text-gray-200 text-xl md:text-3xl mb-8 font-light">
              Welcome to Sakura Brew Cafe
            </p>
            <p className="text-gray-100 mb-10 max-w-2xl mx-auto text-lg md:text-xl font-light">
              Experience the tranquility of Kyoto in every cup. We blend traditional Japanese tea rituals with modern coffee culture.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu" className="bg-matcha text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#5a7a1c] transition-colors shadow-lg flex items-center justify-center gap-2">
                Explore Menu <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Philosophy</h2>
            <div className="w-16 h-1 bg-sakura mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Leaf, title: 'Premium Matcha', desc: 'Directly sourced from Uji, Kyoto. Ceremonial grade for the perfect umami balance.' },
              { icon: Coffee, title: 'Artisan Coffee', desc: 'Locally roasted beans, carefully extracted to highlight their unique flavor profiles.' },
              { icon: Award, title: 'Authentic Experience', desc: 'Traditional wagashi (Japanese sweets) made fresh daily by our artisan chefs.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-matcha/10 p-4 rounded-full mb-6 text-matcha">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Try AI Barista Section */}
      <section className="py-24 bg-background border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet Your AI Barista</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Not sure what to order? Our intelligent AI Barista is here to help you discover your perfect drink. Ask for recommendations, learn about our ingredients, or find the best dessert pairing.
              </p>
              <ul className="space-y-4 mb-8">
                {['Personalized recommendations', 'Ingredient details & allergies', 'Perfect dessert pairings'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="text-matcha font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 italic">
                * Just click the chat bubble in the bottom right corner to start!
              </p>
            </div>
            <div className="lg:w-1/2 bg-sakura/10 relative min-h-[400px]">
               <img 
                src="https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Coffee shop interior" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
