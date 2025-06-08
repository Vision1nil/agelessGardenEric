import { Leaf, User, Phone, Mail } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-deep-forest text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Leaf className="sage-green" size={32} />
              <h3 className="text-xl font-bold">Ageless Gardens Landscape LLC</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Bringing nature closer to your home with professional landscaping services throughout the Pacific Northwest.
            </p>
            <p className="text-sm text-gray-400">Licensed, Bonded and Insured</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="hover:sage-green transition-colors text-left"
                >
                  Garden Design
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="hover:sage-green transition-colors text-left"
                >
                  Lawn Care
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="hover:sage-green transition-colors text-left"
                >
                  Tree Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="hover:sage-green transition-colors text-left"
                >
                  Hardscaping
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="hover:sage-green transition-colors text-left"
                >
                  Irrigation
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <User className="sage-green" size={16} />
                <span>Eric Hawthorne, Owner</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="sage-green" size={16} />
                <a 
                  href="tel:253-766-7619" 
                  className="hover:sage-green transition-colors"
                >
                  (253) 766-7619
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="sage-green" size={16} />
                <a 
                  href="mailto:AGLLCALLRIGHTSRESERVED@GMAIL.COM" 
                  className="hover:sage-green transition-colors text-sm break-all"
                >
                  AGLLCALLRIGHTSRESERVED@GMAIL.COM
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Ageless Gardens Landscape LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
