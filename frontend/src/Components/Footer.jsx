import { Link } from "react-router-dom";

import {
  MapPin,
  Phone,
  Mail,
  Camera,
  Users,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-emerald-950 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo and Description */}
        <div>
          <h2 className="text-3xl font-bold text-emerald-300">
            Helpora
          </h2>

          <p className="text-emerald-100/80 mt-4 leading-7">
            Find trusted local service providers near you.
            Book electricians, plumbers, tutors and more
            with Helpora.
          </p>

          <div className="flex gap-4 mt-5">

            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-emerald-300 transition"
            >
              <Camera size={22} />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-emerald-300 transition"
            >
              <Users size={22} />
            </a>

          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-emerald-300">
            Quick Links
          </h3>

          <ul className="space-y-3 text-emerald-100/80">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>

            <li>
              <Link to="/search" className="hover:text-white">Services</Link>
            </li>

            <li>
              <Link to="/login" className="hover:text-white">Login</Link>
            </li>

            <li>
              <Link to="/register" className="hover:text-white">Register</Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-emerald-300">
            Our Services
          </h3>

          <ul className="space-y-3 text-emerald-100/80">
            <li>Electrician</li>
            <li>Plumbing</li>
            <li>Cleaning</li>
            <li>Painting</li>
            <li>Home Tutor</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-emerald-300">
            Contact Us
          </h3>

          <div className="space-y-4 text-emerald-100/80">

            <p className="flex items-center gap-3">
              <MapPin size={20} className="text-emerald-300" />
              Junagadh, Gujarat, India
            </p>

            <p className="flex items-center gap-3">
              <Phone size={20} className="text-emerald-300" />
              Contact details coming soon
            </p>

            <p className="flex items-center gap-3">
              <Mail size={20} className="text-emerald-300" />
              Email details coming soon
            </p>

          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-emerald-700/30 text-center py-5 px-4 text-emerald-100/80">

        <p>
          © {new Date().getFullYear()} Helpora. All Rights Reserved.
        </p>

        <p className="text-sm mt-2">
          Connecting You With Trusted Local Services.
        </p>

      </div>

    </footer>
  );
}

export default Footer;