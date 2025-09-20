import { memo } from 'react';
import { features } from '../content/features';

export const FeatureGrid = memo(function FeatureGrid() {
  return (
    <section className="features">
      <h2>What's Coming</h2>
      <div className="feature-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
});
