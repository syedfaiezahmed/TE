'use client';

import { useState, useEffect } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    inquiryType: 'general',
    message: ''
  });

  const [contactInfo, setContactInfo] = useState({
    email: 'info@transemirates.com',
    phone: '+966 12 345 6789',
    address: 'Main Commercial District,\nJeddah, Saudi Arabia'
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/content`);
        if (res.ok) {
          const data = await res.json();
          setContactInfo({
            email: data.contact_email || 'info@transemirates.com',
            phone: data.contact_phone || '+966 12 345 6789',
            address: data.address || 'Main Commercial District,\nJeddah, Saudi Arabia'
          });
        }
      } catch (e) {
        console.error("Failed to fetch contact info");
      }
    };
    fetchContent();
  }, []);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        inquiry_type: formData.inquiryType,
        message: formData.subject ? `Subject: ${formData.subject}\n\n${formData.message}` : formData.message
      };

      const res = await fetch(`${apiUrl}/inquiries/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to submit inquiry');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        inquiryType: 'general',
        message: ''
      });
      alert('Thank you for your message. We will get back to you shortly.');
    } catch (error) {
      console.error(error);
      setStatus('error');
      alert('Failed to send message. Please try again.');
    } finally {
      if (status !== 'success') setStatus('idle');
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">Contact Us</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed text-gray-200">
            Get in touch with our team for trading inquiries, consulting services, or partnership opportunities.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Contact Info */}
            <div className="w-full lg:w-1/3 space-y-8">
              {/* Head Office */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-primary">
                <h3 className="text-2xl font-bold text-primary mb-4">Head Office</h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start">
                    <span className="text-2xl mr-4">📍</span>
                    <p className="whitespace-pre-line">{contactInfo.address}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">📞</span>
                    <p>{contactInfo.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">✉️</span>
                    <p>{contactInfo.email}</p>
                  </div>
                </div>
              </div>

              {/* Regional Branches */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-secondary">
                <h3 className="text-2xl font-bold text-primary mb-4">Regional Branches</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-secondary mb-2">Khamis Mushait</h4>
                    <p className="text-gray-600 text-sm">Logistics Center, Industrial Area</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary mb-2">Tabuk</h4>
                    <p className="text-gray-600 text-sm">Northern Trade Hub, King Abdulaziz Road</p>
                  </div>
                </div>
              </div>

              {/* Prospera Consulting */}
              <div className="bg-primary text-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Prospera Consulting</h3>
                <p className="text-white/80 mb-6 text-sm">For financial & business advisory inquiries</p>
                <div className="space-y-3">
                   <div className="flex items-center">
                    <span className="mr-3">📧</span>
                    <p>consulting@transemirates.com</p>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3">📱</span>
                    <p>+966 50 123 4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-bold text-primary mb-8">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="+966 5..."
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Inquiry Type</label>
                      <select 
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="trading">Product Supply / Trading</option>
                        <option value="consulting">Prospera Consulting Services</option>
                        <option value="supplier">Become a Supplier</option>
                        <option value="career">Careers</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Tell us more about your requirements..."
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary-light transition-all shadow-lg transform hover:-translate-y-1"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
