export interface Plan {
  id: string;
  name: string;
  price: string;
  priceYearly?: string; // New field for annual pricing
  features: string[];
  recommended?: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
  color: 'cyan' | 'pink';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}