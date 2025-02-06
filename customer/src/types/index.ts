export interface User {
    id: string;
    email: string;
    name: string;
    role: 'customer' | 'restaurant' | 'driver';
  }
  
  export interface Restaurant {
    id: string;
    name: string;
    description: string;
    image: string;
    rating: number;
    cuisine: string;
    deliveryTime: string;
    minimumOrder: number;
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