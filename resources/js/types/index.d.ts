import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  [key: string]: unknown;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

export interface Author {
  id: number;
  name: string;
  nationality: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Book {
  id: number;
  title: string;
  publication_year: number;
  price_per_day: number;
  author: {
    name: string;
  };
  category: {
    name: string;
  };
}

interface Loan {
  id: number;
  start_date: string;
  end_date: string;
  days: number;
  total_price: number;
  book: {
    title: string;
    author: {
      name: string;
    };
  };
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}
