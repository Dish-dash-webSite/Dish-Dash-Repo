import React from 'react';

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
  isDriver: boolean
}
// Used for signing up a new user
export interface UserSignup {
  email: string;
  lastName: string;
  firstName: string;
  deliveryAddress: string;
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
  address: string;
  cuisineType: string;
  contactNumber: string;
  openingH: string;
  closingH: string;
  rating: number;
  image?: string;
  discount?: number;
  type?: string;
  restaurantOwnerId?: number;
  location?: string;
  geolocation?: {
    latitude: number;
    longitude: number;
  };
}

export interface MenuItem {
  id: number;
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

interface DriverLocation {
  lat: number;
  lng: number;
  driverId: string;
  orderId: string;
}

export interface RestoRegistartion {
  firstName: string;
  lastName: string;
  role: UserRole;
  name: string;
  contactNumber?: string;
  cuisineType: string;
  address: string;
  openingH: string;
  closingH: string;
}

export interface RestoLogin {
  email: string;
  password: string;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface Items {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}