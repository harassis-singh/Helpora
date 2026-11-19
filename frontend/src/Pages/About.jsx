import { Target, Eye, ShieldCheck, Clock, Users, Award, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  const features = [
    {
      icon: <ShieldCheck size={30} />,
      title: "Trusted Professionals",
      description: "Connect with reliable and skilled local service providers."
    },
    {
      icon: <Clock size={30} />,
      title: "Easy Booking",
      description: "Request services quickly without any complicated process."
    },
    {
      icon: <Users size={30} />,
      title: "Customer First",
      description: "We focus on customer satisfaction and a smooth experience."
    },
    {
      icon: <Award size={30} />,
      title: "Quality Services",
      description: "Find professionals for your everyday home service needs."
    }
  ];

  return (
    <div className="bg-[#f5faf7] text-[#173b30] min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#064e3b] to-[#009966] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#fbbf24] font-semibold mb-3">
            ABOUT HEL​PORA
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Making Local Services <br />
            <span className="text-[#fbbf24]">Simple and Reliable</span>
          </h1>

          <p className="text-[#e5f4ed] max-w-2xl mx-auto text-lg">
            Helpora connects customers with trusted local professionals.
            Find the right person for your everyday service needs.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-[#007a55] font-semibold mb-3">
              WHO WE ARE
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#173b30] mb-6">
              Your Trusted Local Service Partner
            </h2>

            <p className="text-[#526b61] leading-7 mb-5">
              Helpora is a local service provider marketplace designed
              to make finding professionals easier for everyone.
            </p>

            <p className="text-[#526b61] leading-7 mb-6">
              Whether you need an electrician, plumber, cleaner, painter,
              carpenter or home tutor, Helpora helps you explore service
              providers in your area.
            </p>

            <Link
              to="/search"
              className="inline-block bg-[#009966] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#007a55] transition"
            >
              Explore Services
            </Link>
          </div>

          <div className="bg-white border border-[#d6ebe1] rounded-2xl shadow-lg p-10">
            <div className="bg-[#e2f4eb] w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <Users size={40} className="text-[#007a55]" />
            </div>

            <h3 className="text-2xl font-bold text-[#173b30] mb-4">
              Welcome to Helpora
            </h3>

            <p className="text-[#526b61] leading-7">
              Our goal is to bring customers and local professionals
              together through a simple and user-friendly platform.
            </p>
          </div>

        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-[#eaf5ef] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="bg-[#064e3b] text-white p-10 rounded-2xl">
            <Target size={40} className="text-[#fbbf24] mb-5" />

            <h3 className="text-2xl font-bold mb-4">
              Our Mission
            </h3>

            <p className="text-[#e5f4ed] leading-7">
              To make local services accessible, convenient and reliable
              by connecting customers with suitable professionals.
            </p>
          </div>

          <div className="bg-[#009966] text-white p-10 rounded-2xl">
            <Eye size={40} className="mb-5" />

            <h3 className="text-2xl font-bold mb-4">
              Our Vision
            </h3>

            <p className="text-[#e5f4ed] leading-7">
              To become a trusted platform where people can easily
              discover and request local services.
            </p>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-[#007a55] font-semibold mb-3">
              WHY CHOOSE US
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#173b30]">
              Why Choose Helpora?
            </h2>

            <p className="text-[#526b61] mt-4">
              We make finding local professionals easier and more convenient.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-[#d6ebe1] p-7 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <div className="text-[#007a55] mb-5">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-[#173b30] mb-3">
                  {feature.title}
                </h3>

                <p className="text-[#526b61] leading-6">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Our Services */}
      <section className="bg-[#eaf5ef] py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl font-bold text-[#173b30] mb-8">
            Services Available on Helpora
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              "Electrician",
              "Plumber",
              "Cleaning",
              "Painting",
              "Carpenter",
              "Home Tutor",
              "Repairing",
              "Salon"
            ].map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2 bg-white border border-[#d6ebe1] p-4 rounded-lg text-[#173b30] font-semibold"
              >
                <CheckCircle size={18} className="text-[#009966]" />
                {service}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#064e3b] to-[#009966] py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Ready to Find Your Local Professional?
          </h2>

          <p className="text-[#e5f4ed] mb-8">
            Explore trusted local services with Helpora today.
          </p>

          <Link
            to="/search"
            className="inline-block bg-[#fbbf24] text-[#173b30] px-8 py-3 rounded-lg font-bold hover:bg-[#f59e0b] transition"
          >
            Explore Services
          </Link>

        </div>
      </section>

    </div>
  );
}

export default About;