import React from 'react';
import { FileText, Search, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: FileText,
      title: "Apply Online",
      description: "Fill out our simple online application form with your basic details and requirements.",
      step: "01",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Search,
      title: "Document Verification",
      description: "Our team will verify your documents and assess your eligibility for the best rates.",
      step: "02",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: CheckCircle,
      title: "Get Approved",
      description: "Receive instant approval and get your loan disbursed or insurance policy activated.",
      step: "03",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Simple Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get your financial solutions in just 3 simple steps with our streamlined, hassle-free process.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mb-20">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid lg:grid-cols-3 gap-12 relative">
              {/* Animated connecting line */}
              <div className="absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-green-300 opacity-60"></div>

              {steps.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="text-center">
                    {/* Icon container with floating animation */}
                    <div className="relative mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative z-10`}>
                        <step.icon className="w-9 h-9 text-white" />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-800 shadow-lg border-2 border-gray-100 group-hover:scale-125 transition-transform duration-300">
                        {step.step}
                      </div>
                      {/* Glow effect */}
                      <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl mx-auto opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile & Tablet Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-6 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
                  <div className="flex-shrink-0 relative">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-800 shadow border border-gray-100">
                      {step.step}
                    </div>
                  </div>

                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting line for mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-start ml-8 my-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-100"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/50 max-w-4xl mx-auto">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl"></div>

            <div className="relative">
              <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                Ready to Get Started?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of satisfied customers who have trusted us with their financial needs and achieved their goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg">
                  Start Your Application
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="inline-flex items-center justify-center gap-2 bg-white/70 backdrop-blur-sm border-2 border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:bg-white hover:border-gray-300 hover:scale-105 transition-all duration-300 text-lg">
                  Contact Us
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 pt-6 border-t border-gray-200/50">
                <p className="text-sm text-gray-500 mb-2">Trusted by 10,000+ customers</p>
                <div className="flex justify-center items-center gap-6 text-xs text-gray-400">
                  <span>✓ 24/7 Support</span>
                  <span>✓ Secure Process</span>
                  <span>✓ Quick Approval</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;