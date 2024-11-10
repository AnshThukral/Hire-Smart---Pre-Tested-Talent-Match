import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">Hire Smart</h2>
          <p className="text-gray-400">
            Empowering innovation and creating future-forward solutions for businesses worldwide.
          </p>
          <p className="mt-4 text-gray-400">
            123 Main Street, Anytown, India
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-200">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-200">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-200">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <p className="text-gray-400 mb-4">
            Stay connected with us on social media for the latest updates.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white hover:text-gray-300 transition-transform transform hover:scale-110">
              <FaFacebookF className="text-2xl" />
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-transform transform hover:scale-110">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-transform transform hover:scale-110">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-transform transform hover:scale-110">
              <FaLinkedinIn className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
