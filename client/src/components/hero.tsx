import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(45, 93, 49, 0.4), rgba(45, 93, 49, 0.4)), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Bringing Nature Closer to Your Home
          </h2>
          <p className="text-xl text-white mb-8 leading-relaxed">
            Transform your outdoor space with professional landscaping services. Licensed, bonded, and insured for your peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => scrollToSection('contact')} 
              className="bg-sage-green hover:bg-forest-green text-white px-8 py-4 rounded-lg font-semibold text-center transition-colors h-auto"
            >
              Get Free Quote
            </Button>
            <Button 
              variant="outline"
              asChild
              className="border-2 border-white text-white hover:bg-white hover:text-forest-green px-8 py-4 rounded-lg font-semibold text-center transition-colors h-auto bg-transparent"
            >
              <a href="tel:253-766-7619">
                Call Now: (253) 766-7619
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
