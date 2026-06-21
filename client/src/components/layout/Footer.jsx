import { Link } from 'react-router-dom';
import { Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: 'Features', path: '/#features' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Documentation', path: '/docs' },
      { name: 'API', path: '/api' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Blog', path: '/blog' },
      { name: 'Contact', path: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
    ],
  };

  const socials = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@zerohungerai.com', label: 'Email' },
  ];

  // Light mode optimized styles
  const footerBg = darkMode ? 'bg-dark-50 border-dark-100' : 'bg-white border-light-border';
  const headingColor = darkMode ? 'text-white' : 'text-gray-800';
  const linkColor = darkMode ? 'text-gray-400 hover:text-primary' : 'text-gray-500 hover:text-primary';
  const socialBg = darkMode ? 'bg-dark-100 text-gray-400' : 'bg-gray-100 text-gray-600';

  return (
    <footer className={`border-t ${footerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                Zero Hunger AI
              </span>
            </Link>
            <p className={`mt-4 max-w-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              AI-powered platform connecting surplus food with those who need it most. 
              Join us in fighting food waste and hunger.
            </p>
            <div className="flex gap-4 mt-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`p-2 rounded-lg transition-colors ${socialBg} hover:bg-primary hover:text-white`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className={`font-semibold mb-4 ${headingColor}`}>
              Product
            </h3>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`transition-colors ${linkColor}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className={`font-semibold mb-4 ${headingColor}`}>
              Company
            </h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`transition-colors ${linkColor}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className={`font-semibold mb-4 ${headingColor}`}>
              Legal
            </h3>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`transition-colors ${linkColor}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${footerBg}`}>
          <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © {currentYear} Zero Hunger AI. All rights reserved.
            Made with ❤️ for a hunger-free world.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
