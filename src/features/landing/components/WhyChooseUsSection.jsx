import { Clock, Users, Shield, FileCheck, Headphones, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Get your loan approved in as little as 24 hours with our streamlined digital process.",
      color: "text-financial-trust"
    },
    {
      icon: Users,
      title: "Trusted Partners",
      description: "We work with top banks and financial institutions to get you the best deals and rates.",
      color: "text-financial-security"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our dedicated customer support team is available round the clock to assist you.",
      color: "text-financial-support"
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Your data is protected with bank-level security and encryption protocols.",
      color: "text-financial-trust"
    },
    {
      icon: FileCheck,
      title: "Easy Documentation",
      description: "Minimal paperwork required. Upload documents online and track your application status.",
      color: "text-financial-growth"
    },
    {
      icon: TrendingUp,
      title: "Best Rates",
      description: "Get competitive interest rates and flexible repayment options tailored to your needs.",
      color: "text-financial-security"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Flexi Choice?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're committed to providing exceptional financial services with transparency, reliability, and customer-first approach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-border bg-gradient-card hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-background shadow-soft group-hover:shadow-medium transition-all duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-primary rounded-2xl p-8 md:p-12 text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-primary-foreground">
              <div className="text-4xl font-bold text-secondary mb-2">10L+</div>
              <div className="text-primary-foreground/90">Loans Disbursed</div>
            </div>
            <div className="text-primary-foreground">
              <div className="text-4xl font-bold text-secondary mb-2">50K+</div>
              <div className="text-primary-foreground/90">Happy Customers</div>
            </div>
            <div className="text-primary-foreground">
              <div className="text-4xl font-bold text-secondary mb-2">15+</div>
              <div className="text-primary-foreground/90">Partner Banks</div>
            </div>
            <div className="text-primary-foreground">
              <div className="text-4xl font-bold text-secondary mb-2">99%</div>
              <div className="text-primary-foreground/90">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;