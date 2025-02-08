import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Order.uk</h3>
            <p className="mb-4">Your favorite restaurants and takeaways, delivered to your door.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-500"><Facebook size={20} /></a>
              <a href="#" className="hover:text-orange-500"><Twitter size={20} /></a>
              <a href="#" className="hover:text-orange-500"><Instagram size={20} /></a>
              <a href="#" className="hover:text-orange-500"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-orange-500">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500">Contact Us</Link></li>
              <li><Link to="/restaurants" className="hover:text-orange-500">All Restaurants</Link></li>
              <li><Link to="/offers" className="hover:text-orange-500">Latest Offers</Link></li>
              <li><Link to="/track-order" className="hover:text-orange-500">Track Order</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-orange-500">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-orange-500">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-500">Privacy Policy</Link></li>
              <li><Link to="/restaurant/create&&immegrate" className="hover:text-orange-500">Restaurant Owner</Link></li>
              <li><Link to="/delivery/migrate" className="hover:text-orange-500">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-orange-500" />
                <span>123 Restaurant Street, London, UK</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-orange-500" />
                <span>+44 (0) 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-orange-500" />
                <span>support@order.uk</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2024 Order.uk. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <img src="/payment/visa.png" alt="Visa" className="h-8" />
              <img src="/payment/mastercard.png" alt="Mastercard" className="h-8" />
              <img src="/payment/amex.png" alt="American Express" className="h-8" />
              <img src="/payment/paypal.png" alt="PayPal" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 