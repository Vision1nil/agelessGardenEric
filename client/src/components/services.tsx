import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Scissors, TreePine, Hammer, Droplets, Fan } from "lucide-react";

const services = [
  {
    icon: Sprout,
    title: "Garden Design",
    description: "Custom garden designs tailored to your space and preferences, creating beautiful outdoor environments.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Scissors,
    title: "Lawn Care",
    description: "Complete lawn maintenance including mowing, edging, fertilization, and seasonal cleanup services.",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: TreePine,
    title: "Tree Services",
    description: "Professional tree trimming, removal, and maintenance to keep your trees healthy and beautiful.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Hammer,
    title: "Hardscaping",
    description: "Stone work, retaining walls, pathways, and patios to create functional outdoor living spaces.",
    image: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Droplets,
    title: "Irrigation",
    description: "Efficient irrigation system installation and maintenance to keep your landscape thriving year-round.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    icon: Fan,
    title: "Seasonal Cleanup",
    description: "Spring and fall cleanup services to prepare your landscape for the changing seasons.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold forest-green mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional landscaping services to enhance your outdoor living space
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-cream hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <img 
                  src={service.image} 
                  alt={`${service.title} Services`} 
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <div className="text-center">
                  <service.icon className="sage-green mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-semibold forest-green mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
