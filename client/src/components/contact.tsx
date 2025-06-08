import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { Phone, Mail, User, CheckCircle } from "lucide-react";
import { z } from "zod";

const contactFormSchema = insertContactMessageSchema.extend({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      reset();
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We will contact you soon.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const selectedService = watch("service");

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold forest-green mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your outdoor space? Contact us today for a free consultation and quote.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-sage-green text-white p-3 rounded-lg">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold forest-green mb-2">Phone</h3>
                <a 
                  href="tel:253-766-7619" 
                  className="text-lg text-gray-600 hover:sage-green transition-colors"
                >
                  (253) 766-7619
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-sage-green text-white p-3 rounded-lg">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold forest-green mb-2">Email</h3>
                <a 
                  href="mailto:AGLLCALLRIGHTSRESERVED@GMAIL.COM" 
                  className="text-lg text-gray-600 hover:sage-green transition-colors break-all"
                >
                  AGLLCALLRIGHTSRESERVED@GMAIL.COM
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-sage-green text-white p-3 rounded-lg">
                <User size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold forest-green mb-2">Owner</h3>
                <p className="text-lg text-gray-600">Eric Hawthorne</p>
              </div>
            </div>
            
            <Card className="bg-cream">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold forest-green mb-2">Why Choose Us?</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="sage-green" size={16} />
                    <span>Licensed, Bonded & Insured</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="sage-green" size={16} />
                    <span>Free Consultations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="sage-green" size={16} />
                    <span>Quality Workmanship</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="sage-green" size={16} />
                    <span>Competitive Pricing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="sage-green mx-auto mb-4" size={64} />
                  <h3 className="text-2xl font-semibold forest-green mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">Thank you for your message. We will contact you soon.</p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-sage-green hover:bg-forest-green"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="forest-green">Full Name *</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      className="mt-2"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="forest-green">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-2"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="forest-green">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className="mt-2"
                        placeholder="(253) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="service" className="forest-green">Service Interested In</Label>
                    <Select value={selectedService} onValueChange={(value) => setValue("service", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a service..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="garden-design">Garden Design</SelectItem>
                        <SelectItem value="lawn-care">Lawn Care</SelectItem>
                        <SelectItem value="tree-services">Tree Services</SelectItem>
                        <SelectItem value="hardscaping">Hardscaping</SelectItem>
                        <SelectItem value="irrigation">Irrigation</SelectItem>
                        <SelectItem value="seasonal-cleanup">Seasonal Cleanup</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="forest-green">Message *</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      rows={5}
                      className="mt-2 resize-vertical"
                      placeholder="Tell us about your landscaping project..."
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-sage-green hover:bg-forest-green font-semibold py-3"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
