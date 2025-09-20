export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string; // For future icon support
}

export const features: Feature[] = [
  {
    id: 'share-recipes',
    title: 'Share Recipes',
    description: 'Upload your favorite family recipes and share them with the community',
    icon: '📝'
  },
  {
    id: 'discover-dishes',
    title: 'Discover New Dishes',
    description: 'Explore recipes from different cuisines and cooking styles',
    icon: '🔍'
  },
  {
    id: 'save-favorites',
    title: 'Save Favorites',
    description: 'Build your personal cookbook with recipes you love',
    icon: '❤️'
  },
  {
    id: 'community-reviews',
    title: 'Community Reviews',
    description: 'Read reviews and tips from other home cooks',
    icon: '⭐'
  }
];

export const heroContent = {
  title: 'RecipeShare',
  tagline: 'Discover, Share, and Cook Amazing Recipes'
};

export const waitlistContent = {
  heading: 'Join Our Waitlist',
  description: 'Be the first to experience our recipe sharing community. Get early access to thousands of recipes from home cooks around the world.',
  successMessage: {
    title: 'Thank you for joining!',
    body: "We'll notify you when we launch."
  }
};