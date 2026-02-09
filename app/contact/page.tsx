'use client';

import { useState, useEffect } from 'react';
import Map from '../components/Map';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    country: '',
    inquiryType: 'bulk_inquiry',
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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/content`, { 
          signal: controller.signal 
        }).catch(() => null);
        
        clearTimeout(timeoutId);

        if (res && res.ok) {
          const data = await res.json();
          setContactInfo({
            email: data.contact_email || 'info@transemirates.com',
            phone: data.contact_phone || '+966 12 345 6789',
            address: data.address || 'Main Commercial District,\nJeddah, Saudi Arabia'
          });
        }
      } catch (e) {
        // Silently fail to fallback data
        console.warn("Using fallback contact info");
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
        message: `Company: ${formData.company}\nCountry: ${formData.country}\n\n${formData.message}`
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
        company: '',
        phone: '',
        country: '',
        inquiryType: 'bulk_inquiry',
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
        {/* Background Image - Global Connectivity */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">Global Trade Inquiries</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed text-gray-200">
            Partner with us for reliable bulk food supply and logistics solutions.
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
            </div>

            {/* Contact Form */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold text-primary mb-2">Trade Inquiry Form</h2>
                <p className="text-gray-500 mb-8">Please provide your business details for a formal quotation.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Business Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Company Name</label>
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
                        placeholder="Your Company Ltd."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
                        placeholder="+966 55 ..."
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Country</label>
                      <input 
                        type="text" 
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
                        placeholder="Saudi Arabia"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Inquiry Type</label>
                      <select 
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
                      >
                        <option value="bulk_inquiry">Bulk Purchase Inquiry</option>
                        <option value="logistics">Logistics & Distribution</option>
                        <option value="supplier">Become a Supplier</option>
                        <option value="other">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Message / Requirements</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
                      placeholder="Please specify your requirements (Product, Quantity, Destination)..."
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className={`w-full bg-accent text-primary font-bold py-4 rounded-md transition-all transform hover:-translate-y-1 shadow-md uppercase tracking-widest ${
                      status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent-light'
                    }`}
                  >
                    {status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full relative z-0 border-t border-gray-200">
        <Map 
          center={[21.5433, 39.1728]} 
          zoom={13} 
          markers={[
            { position: [21.5433, 39.1728], title: "Head Office", description: "Main Commercial District, Jeddah" },
            { position: [18.3000, 42.7333], title: "Khamis Mushait Branch", description: "Logistics Center" },
            { position: [28.3833, 36.5667], title: "Tabuk Branch", description: "Northern Trade Hub" }
          ]} 
        />
      </section>
    </div>
  );
};

export default ContactPage;
