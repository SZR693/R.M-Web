import React from 'react';

export default function PolitiqueConfidentialite() {
  return (
    <div className="max-w-4xl mx-auto py-24 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
        Politique de <span className="text-gray-500">Confidentialité</span>
      </h1>
      <p className="mb-12 opacity-60">Dernière mise à jour : 1 Avril 2026</p>
      
      <div className="space-y-8">
        <section className="p-8 rounded-2xl bg-white/5 border border-gray-200/20 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200/20 pb-2">1. Données collectées</h2>
          <p className="text-lg opacity-80 leading-relaxed">
            Dans le cadre de nos services de création web, nous collectons les données suivantes via nos formulaires : Nom, prénom, adresse email, numéro de téléphone, et informations liées à votre projet.
          </p>
        </section>

        <section className="p-8 rounded-2xl bg-white/5 border border-gray-200/20 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200/20 pb-2">2. Finalité de la collecte</h2>
          <ul className="list-disc ml-6 space-y-2 text-lg opacity-80">
            <li>Répondre à vos demandes de contact et de devis.</li>
            <li>Gérer l'authentification et les espaces clients (via notre partenaire Supabase).</li>
            <li>Améliorer l'expérience utilisateur sur notre site.</li>
          </ul>
        </section>

        <section className="p-8 rounded-2xl bg-white/5 border border-gray-200/20 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200/20 pb-2">3. Hébergement des données</h2>
          <p className="text-lg opacity-80 leading-relaxed">
            Vos données sont stockées de manière hautement sécurisée par notre prestataire technique <strong>Supabase</strong>. Nous nous engageons à ne jamais vendre ou céder vos données personnelles à des tiers.
          </p>
        </section>

        <section className="p-8 rounded-2xl bg-white/5 border border-gray-200/20 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-200/20 pb-2">4. Vos droits (RGPD)</h2>
          <p className="text-lg opacity-80 leading-relaxed">
            Conformément à la réglementation européenne (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Pour exercer ce droit, contactez-nous à : <strong>contact.rmwebdesign@gmail.com</strong>
          </p>
        </section>
      </div>
    </div>
  );
}