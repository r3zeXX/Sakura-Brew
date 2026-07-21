import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Coffee', 'Tea', 'Desserts'];

  const menuItems = [
    { name: 'Matcha Latte', category: 'Tea', price: 120, desc: 'Ceremonial grade Uji matcha with steamed milk.', sweetness: 'Medium', pairing: 'Dorayaki', image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { name: 'Hojicha Latte', category: 'Tea', price: 110, desc: 'Roasted green tea with a rich, nutty flavor profile.', sweetness: 'Low', pairing: 'Matcha Cheesecake', image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { name: 'Sakura Cappuccino', category: 'Coffee', price: 130, desc: 'Espresso with cherry blossom infused milk foam.', sweetness: 'Medium', pairing: 'Sakura Roll Cake', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { name: 'Cold Brew Kyoto Style', category: 'Coffee', price: 140, desc: 'Slow-dripped for 12 hours for an incredibly smooth finish.', sweetness: 'None', pairing: 'Mochi Ice Cream', image: 'https://images.unsplash.com/photo-1461023058943-0708e5215093?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { name: 'Sencha', category: 'Tea', price: 90, desc: 'Classic steamed green tea, refreshing and grassy.', sweetness: 'None', pairing: 'Dorayaki', image: 'https://images.unsplash.com/photo-1627492275562-b2d2454644a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { name: 'Genmaicha', category: 'Tea', price: 95, desc: 'Green tea blended with roasted brown rice.', sweetness: 'None', pairing: 'Matcha Cheesecake', image: 'https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { name: 'Yuzu Green Tea', category: 'Tea', price: 115, desc: 'Iced green tea with refreshing Japanese citrus.', sweetness: 'Medium', pairing: 'Sakura Roll Cake', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { name: 'Matcha Cheesecake', category: 'Desserts', price: 150, desc: 'Rich, creamy cheesecake infused with premium matcha.', sweetness: 'Medium', pairing: 'Hojicha Latte', image: 'https://images.unsplash.com/photo-1571115177098-24edf3db377b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { name: 'Dorayaki', category: 'Desserts', price: 80, desc: 'Sweet red bean paste sandwiched between two fluffy pancakes.', sweetness: 'High', pairing: 'Sencha', image: 'https://images.unsplash.com/photo-1588665805561-9d51ccfc413e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { name: 'Mochi Ice Cream', category: 'Desserts', price: 90, desc: 'Soft mochi filled with seasonal ice cream flavors.', sweetness: 'High', pairing: 'Cold Brew Kyoto Style', image: 'https://images.unsplash.com/photo-1589134731302-6016a4f738fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
    { name: 'Sakura Roll Cake', category: 'Desserts', price: 120, desc: 'Light sponge cake rolled with cherry blossom cream.', sweetness: 'Medium', pairing: 'Yuzu Green Tea', image: 'https://images.unsplash.com/photo-1596707328902-650849206d4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
  ];

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Carefully crafted beverages and sweets, blending Japanese tradition with modern tastes.</p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-matcha text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-gray-900">
                    ฿{item.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 h-10">{item.desc}</p>
                  
                  <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Sweetness:</span>
                      <span>{item.sweetness}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Recommended Pairing:</span>
                      <span className="text-sakura font-medium">{item.pairing}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default Menu;
