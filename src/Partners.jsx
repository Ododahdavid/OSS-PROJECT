import React from 'react';

function Partners() {
  const partners = ["shopify.svg", "broadcom.svg", "blackberry.svg"];

  return (
    <section className="partners-section">
      {partners.map((logo, index) => (
        <img key={index} src={`/src/assets/${logo}`} alt={`${logo} logo`} className="partner-logo" />
      ))}
    </section>
  );
}

export default Partners;
