import { FileText, Search, CheckCircle, ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: FileText,
      title: "Apply Online",
      description: "Fill out our simple online application form with your basic details and requirements.",
      step: "01"
    },
    {
      icon: Search,
      title: "Document Verification",
      description: "Our team will verify your documents and assess your eligibility for the best rates.",
      step: "02"
    },
    {
      icon: CheckCircle,
      title: "Get Approved",
      description: "Receive instant approval and get your loan disbursed or insurance policy activated.",
      step: "03"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get your financial solutions in just 3 simple steps. Our streamlined process ensures quick and hassle-free experience.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:block">
            <div className="grid lg:grid-cols-3 gap-8 relative">
              {/* Connecting Lines */}
              <div className="absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-financial-trust via-financial-growth to-financial-security hidden lg:block" />

              {steps.map((step, index) => (
                <div key={index} className="relative text-center group">
                  {/* Step Number */}
                  <div className="relative mb-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-primary group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <step.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs font-bold text-secondary-foreground">
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 relative">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-primary">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs font-bold text-secondary-foreground">
                    {step.step}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-financial-trust to-financial-security" />
                  )}
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-card rounded-2xl p-8 shadow-medium">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of satisfied customers who have trusted us with their financial needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground hover:scale-105 shadow-primary font-semibold h-12 rounded-lg px-8 text-base transition-all duration-200">
                Start Your Application
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 rounded-lg px-8 text-base transition-all duration-200">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;