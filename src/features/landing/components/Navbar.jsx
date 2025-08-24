import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Shield,
  Menu,
  X
} from "lucide-react";

const Navbar = ({ activeTab, setActiveTab }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const smoothScrollTo = (elementId) => {
    if (elementId === 'home') {
      // Scroll to top for home
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  // Handle service item click
  const handleServiceClick = (serviceType) => {
    setActiveTab(serviceType);
    smoothScrollTo('services-section');
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { title: "Home", id: "home" },
    {
      title: "Services",
      id: "services-section",
      dropdown: [
        {
          title: "Loans",
          description: "Home, Gold, Mortgage, Personal & Business loans",
          icon: <CreditCard className="w-5 h-5" />,
          serviceType: "loans"
        },
        {
          title: "Insurance",
          description: "Health, Term, Life, Vehicle & Travel insurance",
          icon: <Shield className="w-5 h-5" />,
          serviceType: "insurance"
        }
      ]
    },
    { title: "How It Works", id: "how-it-works-section" },
    { title: "About Us", id: "about-section" },
    { title: "Contact", id: "contact-section" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
        : 'bg-white/80 backdrop-blur-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => smoothScrollTo('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Flexi Choice
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div key={item.title} className="relative">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => setShowDropdown(false)}
                      onClick={() => smoothScrollTo(item.id)}
                    >
                      {item.title}
                      <svg className="ml-1 w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-200 ${showDropdown
                          ? 'opacity-100 visible transform translate-y-0'
                          : 'opacity-0 invisible transform translate-y-2'
                        }`}
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => setShowDropdown(false)}
                    >
                      <div className="p-4">
                        {item.dropdown.map((subItem, index) => (
                          <button
                            key={index}
                            onClick={() => handleServiceClick(subItem.serviceType)}
                            className={`w-full flex items-start gap-4 p-3 rounded-lg transition-colors text-left ${activeTab === subItem.serviceType
                                ? 'bg-blue-50 border border-blue-200'
                                : 'hover:bg-gray-50'
                              }`}
                          >
                            <div className={`mt-0.5 ${activeTab === subItem.serviceType ? 'text-blue-600' : 'text-blue-500'
                              }`}>
                              {subItem.icon}
                            </div>
                            <div>
                              <div className={`font-semibold ${activeTab === subItem.serviceType ? 'text-blue-900' : 'text-gray-900'
                                }`}>
                                {subItem.title}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">{subItem.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => smoothScrollTo(item.id)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    {item.title}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Login
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
              Sign Up
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">
              Admin
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${isMobileMenuOpen
          ? 'max-h-screen opacity-100'
          : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
        <div className="bg-white border-t border-gray-200 px-4 py-6">
          {navigationItems.map((item) => (
            <div key={item.title}>
              {item.dropdown ? (
                <div className="mb-6">
                  <button
                    onClick={() => smoothScrollTo('home')}
                    className="font-semibold text-gray-900 mb-3 block w-full text-left"
                  >
                    {item.title}
                  </button>
                  <div className="space-y-2 ml-4">
                    {item.dropdown.map((subItem, index) => (
                      <button
                        key={index}
                        onClick={() => handleServiceClick(subItem.serviceType)}
                        className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${activeTab === subItem.serviceType
                            ? 'bg-blue-50 border border-blue-200'
                            : 'hover:bg-gray-50'
                          }`}
                      >
                        <div className={`${activeTab === subItem.serviceType ? 'text-blue-600' : 'text-blue-500'
                          }`}>
                          {subItem.icon}
                        </div>
                        <div>
                          <div className={`font-medium ${activeTab === subItem.serviceType ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                            {subItem.title}
                          </div>
                          <div className="text-sm text-gray-500">{subItem.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => smoothScrollTo(item.id)}
                  className="block w-full text-left py-3 px-2 rounded-lg text-lg font-medium transition-colors text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  {item.title}
                </button>
              )}
            </div>
          ))}

          <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
            <button className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Login
            </button>
            <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;