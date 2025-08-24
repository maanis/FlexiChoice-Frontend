import {
  CreditCard,
  Shield,
  Menu,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar1 = ({
  logo = {
    url: "#home",
    title: "Flexi Choice",
  },
  activeTab, setActiveTab,
  menu = [
    { title: "Home", url: "#home" },
    {
      title: "Services",
      url: "#services",
      items: [
        {
          title: "Loans",
          description: "Home, Gold, Mortgage, Personal & Business loans",
          icon: <CreditCard className="size-5 shrink-0" />,
          url: "#services",
        },
        {
          title: "Insurance",
          description: "Health, Term, Life, Vehicle & Travel insurance",
          icon: <Shield className="size-5 shrink-0" />,
          url: "#services",
        },
      ],
    },
    { title: "How It Works", url: "#how-it-works" },
    { title: "About Us", url: "#about" },
    { title: "Contact", url: "#contact" },
  ],
  mobileExtraLinks = [
    { name: "Support", url: "#contact" },
    { name: "FAQ", url: "#faq" },
  ],
  auth = {
    login: { text: "Login", url: "/login" },
    signup: { text: "Sign Up", url: "/signup" },
    admin: { text: "Admin", url: "/admin-login" },
  },
}) => {
  return (
    <header className="sticky  top-0 z-50 w-full border-b bg-white">
      <div className="container py-3">
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center justify-between">
          {/* Logo + Menu */}
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">{logo.title}</span>
            </a>

            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item, setActiveTab))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={auth.login.url}>{auth.login.text}</a>
            </Button>
            <Button asChild variant="cta" size="sm">
              <a href={auth.signup.url}>{auth.signup.text}</a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a href={auth.admin.url}>{auth.admin.text}</a>
            </Button>
          </div>
        </nav>

        {/* Mobile Nav */}
        <div className="flex lg:hidden items-center justify-between">
          <a href={logo.url} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">{logo.title}</span>
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <a href={logo.url} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-bold text-foreground">{logo.title}</span>
                  </a>
                </SheetTitle>
              </SheetHeader>

              <div className="my-6 flex flex-col gap-6">
                <Accordion type="single" collapsible className="flex flex-col gap-4">
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-2">
                    {mobileExtraLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        className="text-sm font-medium text-muted-foreground hover:text-accent-foreground transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button asChild variant="outline">
                    <a href={auth.login.url}>{auth.login.text}</a>
                  </Button>
                  <Button asChild variant="cta">
                    <a href={auth.signup.url}>{auth.signup.text}</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

const renderMenuItem = (item, setActiveTab) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="text-foreground hover:text-primary  transition-colors">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3 bg-white">
            <NavigationMenuLink className="p-0">
              {item.items.map((subItem, index) => (
                <li key={subItem.title} className="p-0">
                  <a
                    href={subItem.url}
                    onClick={() => {
                      setActiveTab(subItem.title.toLowerCase());
                    }}
                    className="flex gap-4  rounded-md p-3 transition-colors hover:bg-muted hover:text-accent-foreground"
                  >
                    {subItem.icon}
                    <div>
                      <p className="text-sm font-semibold">{subItem.title}</p>
                      {subItem.description && (
                        <p className="text-sm text-muted-foreground">{subItem.description}</p>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="inline-flex h-10 items-center px-4 hover:bg-muted hover:text-accent-foreground rounded-md text-sm font-medium text-foreground transition-colors"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title}>
        <AccordionTrigger className="font-semibold text-foreground">
          {item.title}
        </AccordionTrigger>
        <AccordionContent>
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              href={subItem.url}
              className="flex gap-4 rounded-md p-3 transition-colors hover:bg-muted hover:text-accent-foreground"
            >
              {subItem.icon}
              <div>
                <p className="text-sm font-semibold">{subItem.title}</p>
                {subItem.description && (
                  <p className="text-sm text-muted-foreground">{subItem.description}</p>
                )}
              </div>
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a
      key={item.title}
      href={item.url}
      className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
    >
      {item.title}
    </a>
  );
};

export { Navbar1 };
