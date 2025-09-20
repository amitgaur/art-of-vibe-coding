import { useState } from 'react';

interface MobileHeaderProps {
  showMenu?: boolean;
}

export function MobileHeader({ showMenu = false }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!showMenu) return null;

  return (
    <nav className="mobile-header">
      <div className="mobile-header-content">
        <div className="logo">RecipeShare</div>

        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="menu-icon">
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
          <a href="#waitlist" onClick={() => setIsMenuOpen(false)}>Join Waitlist</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
}