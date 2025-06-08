import { IdCard, Shield, Umbrella } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-deep-forest text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
              alt="Eric Hawthorne - Professional Landscaper" 
              className="rounded-xl shadow-2xl w-full"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">About Ageless Gardens</h2>
            <p className="text-lg mb-6 leading-relaxed">
              Welcome to Ageless Gardens Landscape LLC, where we transform outdoor spaces into beautiful, functional environments that bring nature closer to your home. Under the expert guidance of owner Eric Hawthorne, our team is dedicated to creating landscapes that not only enhance your property's beauty but also provide lasting value.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              With years of experience in the Pacific Northwest, we understand the unique challenges and opportunities that our climate presents. From design to installation to ongoing maintenance, we provide comprehensive landscaping services that keep your outdoor space looking its best year-round.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <IdCard className="soft-yellow mx-auto mb-2" size={48} />
                <h4 className="font-semibold">Licensed</h4>
              </div>
              <div className="text-center">
                <Shield className="soft-yellow mx-auto mb-2" size={48} />
                <h4 className="font-semibold">Bonded</h4>
              </div>
              <div className="text-center">
                <Umbrella className="soft-yellow mx-auto mb-2" size={48} />
                <h4 className="font-semibold">Insured</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
