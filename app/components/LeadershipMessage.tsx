import React from 'react';

interface LeadershipMessageProps {
  content?: Record<string, string>;
}

const LeadershipMessage = ({ content }: LeadershipMessageProps) => {
  const title = content?.leadership_title || "A Vision for Excellence";
  const message = content?.leadership_message || "For over two decades, Trans Emirates has been committed to bridging global markets with Saudi Arabia's growing economy. Our success is built on unwavering integrity, quality without compromise, and a deep understanding of our partners' needs.";
  const name = content?.leadership_name || "Mohammed Al-Ghamdi";
  const role = content?.leadership_role || "Chairman of the Board";
  const image = content?.leadership_image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 md:p-16 shadow-xl border border-secondary/10 relative">
          
          {/* Quote Icon */}
          <div className="absolute top-8 left-8 text-6xl text-accent opacity-20 font-serif">"</div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Image Placeholder */}
            <div className="shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden relative">
                 {/* Using a professional business portrait placeholder */}
                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }}></div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
              <div 
                className="text-primary/70 text-lg leading-relaxed italic mb-6"
                dangerouslySetInnerHTML={{ __html: message }}
              />
              <div>
                <h4 className="text-xl font-bold text-primary">{name}</h4>
                <span className="text-accent font-medium uppercase text-sm tracking-wider">{role}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LeadershipMessage;
