export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  image: string;
  distance: string;
  isOpen: boolean;
  address: string;
  description: string;
}

export interface SearchRestaurantsParams {
  location?: string;
  date?: string;
  guests?: number;
  cuisine?: string;
  priceRange?: string;
  isOpen?: boolean;
  page?: number;
  limit?: number;
}

export interface SearchRestaurantsResponse {
  restaurants: Restaurant[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
