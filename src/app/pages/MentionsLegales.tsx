import React from 'react';

export default function MentionsLegales() {
  return (
    <div className="max-w-4xl mx-auto py-24 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight">
        Mentions <span className="text-gray-500">Légales</span>
      </h1>
      
      <div className="space-y-8">
        <section className="p-8 rounded-2xl bg-white/5 border border-gray-200/20 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200/20 pb-2">1. Éditeur du site</h2>
          <ul className="space-y-3 text-lg opacity-80">
            <li><strong>Propriétaire :</strong> Mathis Reynard</li>
            <li><strong>Statut :</strong> Designer Web Freelance</li>
            <li><strong>Email :</strong> contact.rmwebdesign@gmail.com</li>
            <li><strong>Téléphone :</strong> +33 6 43 36 78 37</li>
          </ul>
        </section>

        <section className="p-8 rounded-2xl bg-white/5 border border-gray-200/20 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200/20 pb-2">2. Hébergement</h2>
          <ul className="space-y-3 text-lg opacity-80">
            <li><strong>Hébergeur :</strong> Vercel Inc.</li>
            <li><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
            <li><strong>Site web :</strong> https://vercel.com</li>
          </ul>
        </section>

        <section className="p-8 rounded-2xl bg-white/5 border border-gray-200/20 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200/20 pb-2">3. Propriété intellectuelle</h2>
          <p className="text-lg opacity-80 leading-relaxed">
            L'ensemble de ce site (textes, images, logos, design) relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans accord préalable.
          </p>
        </section>
      </div>
    </div>
  );
}