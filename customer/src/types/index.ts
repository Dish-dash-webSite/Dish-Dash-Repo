export type UserRole = 'customer' | 'restaurantOwner' | 'meta' | 'driver' | 'admin';

// Represents a fully registered user
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VerifyDriverResponse {
  data: string;
}
// Used for signing up a new user
export interface UserSignup {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  phoneNumber?: string;
}

// Used for logging in an existing user
export interface UserSignin {
  email: string;
  password: string;
}

// Auth state interface for Redux
export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Response interfaces for API calls
export interface AuthResponse {
  user: User;
  token: string;
}

export interface ErrorResponse {
  message: string;
  statusCode?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  discount?: number;
  type: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered';
  total: number;
  createdAt: string;
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  restaurantCount: number;
}
export const ADD_RESTAURANT = 'ADD_RESTAURANT';

export type ActionTypes =
  | { type: typeof ADD_RESTAURANT; payload: Restaurant }

// export interface Restaurant {
//   idy: number;
//   name: string;
//   cuisine: string;
//   address: string;
//   rating: number;
//   contactNumber: string;
//   openingTime: string;
//   closingTime: string;
// }
