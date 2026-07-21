import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const About = () => {
  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h1>
          <div className="w-16 h-1 bg-sakura mx-auto rounded-full"></div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 mb-16">
          <p>
            Sakura Brew Cafe was born from a simple desire: to bring the serene, meticulous coffee and tea culture of Kyoto to our bustling city. Founded in 2023, we sought to create a space where time slows down, and every cup is prepared with intention and care.
          </p>
          <p>
            Our beans are ethically sourced and locally roasted, while our matcha comes directly from multi-generational tea farmers in Uji, Japan. We believe that a truly great cafe experience is a harmony of flavors, atmosphere, and hospitality (Omotenashi).
          </p>
          <p>
            Whether you are looking for a quiet corner to read, a comfortable space to work, or simply the perfect cup of coffee, Sakura Brew welcomes you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-background p-8 rounded-3xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="text-matcha" /> Opening Hours
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span>Monday - Friday</span>
                <span className="font-medium">7:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span>Saturday</span>
                <span className="font-medium">8:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Sunday</span>
                <span className="font-medium">8:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="text-matcha" /> Visit Us
            </h2>
            <address className="not-italic text-gray-700 space-y-4">
              <p>
                <strong>Sakura Brew Cafe</strong><br />
                123 Matcha Avenue<br />
                Kyoto District, Neo City 10110
              </p>
              
              <div className="pt-4 space-y-2">
                <p className="flex items-center gap-2">
                  <Phone size={18} className="text-gray-500" /> 
                  <a href="tel:+1234567890" className="hover:text-matcha">+1 (234) 567-890</a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={18} className="text-gray-500" /> 
                  <a href="mailto:hello@sakurabrew.com" className="hover:text-matcha">hello@sakurabrew.com</a>
                </p>
              </div>
            </address>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
