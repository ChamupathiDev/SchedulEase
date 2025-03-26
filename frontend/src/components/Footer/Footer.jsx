import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-semibold text-white">EduTime</h2>
            <p className="mt-2 text-sm">
              A smart learning management and scheduling platform for students.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-white">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="hover:text-red-400 transition">Home</a></li>
              <li><a href="/about" className="hover:text-red-400 transition">About</a></li>
              <li><a href="/courses" className="hover:text-red-400 transition">Courses</a></li>
              <li><a href="/contact" className="hover:text-red-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-lg font-semibold text-white">Follow Us</h2>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h2 className="text-lg font-semibold text-white">Newsletter</h2>
            <p className="mt-2 text-sm">Subscribe for updates & resources.</p>
            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-white outline-none"
              />
              <button className="bg-red-500 px-4 py-2 rounded-r-md hover:bg-red-600 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-sm">
          © {new Date().getFullYear()} EduTime. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
