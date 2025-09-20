import { heroContent } from '../content/features';

interface HeroProps {
  title?: string;
  tagline?: string;
}

export function Hero({
  title = heroContent.title,
  tagline = heroContent.tagline
}: HeroProps) {
  return (
    <header className="hero">
      <h1>{title}</h1>
      <p className="tagline">{tagline}</p>
    </header>
  );
}