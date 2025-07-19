import React from "react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const ContactInfoItem = ({ icon, text, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group"
  >
    <div className="bg-[#1e1f22] p-3 rounded-full group-hover:bg-cyan-500/10">
      {icon}
    </div>
    <span>{text}</span>
  </a>
);

const ContactPage = () => {
  return (
    <div className="bg-black text-white min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Let's Build Together
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Have a project in mind or just want to say hello? I'd love to hear
            from you.
          </p>
        </div>

        {/* Main Content: Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left Side: Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-cyan-400">
              Contact Information
            </h2>
            <div className="space-y-6">
              <ContactInfoItem
                icon={<Mail className="h-6 w-6 text-cyan-400" />}
                text="adnanshaikh1652000@gmail.com"
                link="mailto:adnanshaikh1652000@gmail.com"
              />
              <ContactInfoItem
                icon={<MapPin className="h-6 w-6 text-cyan-400" />}
                text="Maharashtra, India"
                link="#"
              />
            </div>
            <div className="pt-6 border-t border-gray-800">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">
                Find Me Online
              </h2>
              <div className="flex items-center gap-6">
                <a
                  href="https://github.com/SOLOxLEVELING"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Github size={32} />
                </a>
                <a
                  href="https://www.linkedin.com/in/solo-leveling-793681263/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Linkedin size={32} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-[#0a0a0a] p-8 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
            {/* --- FORM ACTION: Replace with your Web3Forms Access Key --- */}
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="space-y-6"
            >
              <input
                type="hidden"
                name="access_key"
                value="00910637-7406-49b9-a048-9f0f0936fb13"
              />

              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Email Address"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-cyan-600 text-white font-bold px-6 py-3 rounded-md transition-colors hover:bg-cyan-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
