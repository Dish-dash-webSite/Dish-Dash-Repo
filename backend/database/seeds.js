const bcrypt = require('bcrypt')
const saltRounds = 10;
const { User,
  Customer,
  Restaurant,
  Driver,
  MenuItem,
  Order,
  OrderItem,
  RestaurantOwner,
  Category,
  GeoLocation,
  Media, } = require('./associations');
const restaurantOwner = require('./models/restaurantOwner');

const seedUser = async () => {
  try {
    const users = [
      {
        email: 'customer@example.com',
        passwordHash: await bcrypt.hash('password123', saltRounds),
        role: 'customer',
        phoneNumber: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'restaurant@example.com',
        passwordHash: await bcrypt.hash('password456', saltRounds),
        role: 'restaurantOwner',
        phoneNumber: '0987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'driver@example.com',
        passwordHash: await bcrypt.hash('password789', saltRounds),
        role: 'driver',
        phoneNumber: '1122334455',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await User.bulkCreate(users);
    console.log('seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}
const seedCustomer = async () => {
  try {
    const customers = [
      {
        firstName: 'John',
        lastName: 'Doe',
        deliveryAddress: '123 Main St, New York, NY',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        deliveryAddress: '456 Elm St, Los Angeles, CA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        deliveryAddress: '789 Oak St, Chicago, IL',
        createdAt: new Date(),
        updatedAt: new Date()
      }];
    await Customer.bulkCreate(customers);
    console.log('seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}

const seedDriver = async () => {
  try {
    const drivers = [
      {
        userId: 3, // Reference
        firstName: 'Michael',
        lastName: 'Scott',
        vehicleType: 'Sedan',
        licenseNumber: 'ABC1234',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];
    await Driver.bulkCreate(drivers);
    console.log('seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}
const seedCategory = async () => {
  try {
    const Categorys = [
      { name: 'Italian', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chinese', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mexican', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Indian', createdAt: new Date(), updatedAt: new Date() },
      { name: 'French', createdAt: new Date(), updatedAt: new Date() }
    ];
    await Category.bulkCreate(Categorys);
    console.log('seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}
const seedGeolocation = async () => {
  try {
    const geolocations = [
      { latitude: 36.8065, longitude: 10.1815, createdAt: new Date(), updatedAt: new Date() }, // Tunis
      { latitude: 35.8254, longitude: 10.636, createdAt: new Date(), updatedAt: new Date() }, // Sousse
      { latitude: 33.8869, longitude: 10.0982, createdAt: new Date(), updatedAt: new Date() }, // Medenine
      { latitude: 37.2744, longitude: 9.8739, createdAt: new Date(), updatedAt: new Date() }, // Bizerte
      { latitude: 34.7306, longitude: 10.7214, createdAt: new Date(), updatedAt: new Date() }  // Sfax
    ]
    await GeoLocation.bulkCreate(geolocations);
    console.log('seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}

const seedMenuItem = async () => {
  try {
    const menuItems = [
      {
        restaurantId: 1, // Reference to a restaurant's id (Assuming restaurant with id 1 exists)
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with creamy sauce, pancetta, and parmesan.',
        price: 12.99,
        imageUrl: 'https://example.com/images/spaghetti-carbonara.jpg',
        isAvailable: true,
      },
      {
        restaurantId: 1, // Reference to a restaurant's id (Assuming restaurant with id 2 exists)
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomatoes, and basil, on a crispy crust.',
        price: 10.49,
        imageUrl: 'https://example.com/images/margherita-pizza.jpg',
        isAvailable: true,
      },
      {
        restaurantId: 1, // Reference to a restaurant's id (Assuming restaurant with id 3 exists)
        name: 'Caesar Salad',
        description: 'Crisp lettuce, parmesan, croutons, and Caesar dressing.',
        price: 8.99,
        imageUrl: 'https://example.com/images/caesar-salad.jpg',
        isAvailable: false, // Example of an unavailable item
      },
      {
        restaurantId: 1, // Reference to a restaurant's id
        name: 'Lasagna',
        description: 'Layers of pasta, beef, cheese, and marinara sauce baked to perfection.',
        price: 14.49,
        imageUrl: 'https://example.com/images/lasagna.jpg',
        isAvailable: true,
      },
      {
        restaurantId: 1, // Reference to a restaurant's id
        name: 'Garlic Bread',
        description: 'Warm bread with a garlic butter spread, toasted to perfection.',
        price: 4.99,
        imageUrl: 'https://example.com/images/garlic-bread.jpg',
        isAvailable: true,
      }
    ]
    await MenuItem.bulkCreate(menuItems);
    console.log('seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}


const seedsRestaurant = async () => {
  try {
    const restaurants = [
      {
        restaurantOwner: 1,
        name: 'Pasta Paradise',
        address: '123 Noodle St, Pasta Town, PT 12345',
        cuisineType: 'Italian',
        contactNumber: '123-456-7890',
        openingH: '11:00:00',
        closingH: '22:00:00',
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        restaurantOwner: 1,
        name: 'Sushi Sensation',
        address: '456 Sushi Ave, Sushi City, SC 23456',
        cuisineType: 'Japanese',
        contactNumber: '234-567-8901',
        openingH: '10:00:00',
        closingH: '21:00:00',
        rating: 4.8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        restaurantOwner: 1,
        name: 'Burger Haven',
        address: '789 Burger Blvd, Grilltown, GT 34567',
        cuisineType: 'American',
        contactNumber: '345-678-9012',
        openingH: '09:00:00',
        closingH: '23:00:00',
        rating: 3.9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        restaurantOwner: 1,
        name: 'Taco Fiesta',
        address: '101 Taco Rd, Spiceville, SV 45678',
        cuisineType: 'Mexican',
        contactNumber: '456-789-0123',
        openingH: '10:30:00',
        closingH: '22:30:00',
        rating: 4.2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    await Restaurant.bulkCreate(restaurants);
    console.log('seeded successfully!');
  }
  catch (error) {
    console.error('Error seeding products:', error);
  }
}
const seedsRestaurantOwner = async () => {
  try {
    const owners = [
      {
        firstName: 'John',
        lastName: 'Doe',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    await RestaurantOwner.bulkCreate(owners);
    console.log('seeded successfully!');
  }
  catch (error) {
    console.error('Error seeding products:', error);
  }
}

// seedUser()
// seedCustomer()
seedsRestaurantOwner()
// seedsRestaurant()
// seedDriver()
// seedCategory()
// seedGeolocation()
// seedMenuItem()
