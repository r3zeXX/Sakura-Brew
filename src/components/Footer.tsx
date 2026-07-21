import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-sakura">❀</span> Sakura Brew Cafe
            </h3>
            <p className="text-sm text-gray-400 max-w-xs">
              A premium Japanese cafe experience bringing Kyoto aesthetics to your daily cup.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/menu" className="hover:text-sakura transition-colors">Menu (メニュー)</Link></li>
              <li><Link to="/about" className="hover:text-sakura transition-colors">About Us (私たちについて)</Link></li>
              <li><Link to="/privacy" className="hover:text-sakura transition-colors">Privacy & Security (プライバシー)</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Visit Us</h3>
            <address className="not-italic text-sm text-gray-400 space-y-1">
              <p>123 Matcha Avenue</p>
              <p>Kyoto District, Neo City</p>
              <p className="mt-4">Hours: Mon-Sun, 8am - 8pm</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Sakura Brew Cafe. Powered by AI and React.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
