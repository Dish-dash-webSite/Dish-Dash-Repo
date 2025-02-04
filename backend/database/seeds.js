const bcrypt=require('bcrypt')
const saltRounds=10;
const {  User,
  Customer,
  Restaurant,
  Driver,
  MenuItem,
  Order,
  OrderItem,
  Category,
  GeoLocation,
  Media,}=require('./associations')

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
            role: 'restaurant',
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
  const seedCustomer=async()=>{
    try{
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

  const seedDriver=async()=>{
    try{
        const drivers = [
            {
                userId: 1,
                firstName: 'Michael',
                lastName: 'Scott',
                vehicleType: 'Sedan',
                licenseNumber: 'ABC1234',
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                userId: 2,
                firstName: 'Dwight',
                lastName: 'Schrute',
                vehicleType: 'Truck',
                licenseNumber: 'XYZ5678',
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                userId: 3,
                firstName: 'Jim',
                lastName: 'Halpert',
                vehicleType: 'SUV',
                licenseNumber: 'LMN9101',
                createdAt: new Date(),
                updatedAt: new Date()
              }];
          await Driver.bulkCreate(drivers);
          console.log('seeded successfully!');
        } catch (error) {        
          console.error('Error seeding products:', error);
        }
  }
  const seedCategory=async()=>{
    try{
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
  const seedGeolocation=async()=>{
    try{
const geolocations=[
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

  const seedMenuItem=async()=>{
    try{
const menuItems=[
    {
        restaurantId: 1, // Reference to a restaurant's id (Assuming restaurant with id 1 exists)
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with creamy sauce, pancetta, and parmesan.',
        price: 12.99,
        imageUrl: 'https://example.com/images/spaghetti-carbonara.jpg',
        isAvailable: true,
    },
    {
        restaurantId: 2, // Reference to a restaurant's id (Assuming restaurant with id 2 exists)
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomatoes, and basil, on a crispy crust.',
        price: 10.49,
        imageUrl: 'https://example.com/images/margherita-pizza.jpg',
        isAvailable: true,
    },
    {
        restaurantId: 3, // Reference to a restaurant's id (Assuming restaurant with id 3 exists)
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
        restaurantId: 2, // Reference to a restaurant's id
        name: 'Garlic Bread',
        description: 'Warm bread with a garlic butter spread, toasted to perfection.',
        price: 4.99,
        imageUrl: 'https://example.com/images/garlic-bread.jpg',
        isAvailable: true,
    }
  ]
  await  MenuItem.bulkCreate(menuItems);
  console.log('seeded successfully!');
} catch (error) {        
  console.error('Error seeding products:', error);
}
  }

  const seedsRestaurant=async()=>{
    try{
        const restaurants=[
            {
                name: 'Pasta Paradise',
                address: '123 Pasta St, Foodville, FV 12345',
                cuisineType: 'Italian',
                contactNumber: '123-456-7890',
                operatingHours: 'Mon-Sun: 10am - 10pm',
                rating: 4.5,
            },
            {
                name: 'Sushi Sensation',
                address: '456 Sushi Ave, Sushitown, ST 54321',
                cuisineType: 'Japanese',
                contactNumber: '987-654-3210',
                operatingHours: 'Mon-Sun: 12pm - 11pm',
                rating: 4.7,
            },
            {
                name: 'Burgers & Fries',
                address: '789 Burger Blvd, Burgerville, BV 67890',
                cuisineType: 'American',
                contactNumber: '555-123-9876',
                operatingHours: 'Mon-Sun: 11am - 9pm',
                rating: 4.2,
            },
            {
                name: 'Taco Temptation',
                address: '321 Taco Rd, Texmex City, TC 13579',
                cuisineType: 'Mexican',
                contactNumber: '444-222-6666',
                operatingHours: 'Mon-Sun: 9am - 8pm',
                rating: 4.8,
            },
            {
                name: 'Curry House',
                address: '654 Curry Way, Spiceville, SV 24680',
                cuisineType: 'Indian',
                contactNumber: '333-444-5555',
                operatingHours: 'Mon-Sun: 10am - 10pm',
                rating: 4.3,
            }
        ]
        await  Restaurant.bulkCreate(restaurants);
        console.log('seeded successfully!');
    }
    catch (error) {        
        console.error('Error seeding products:', error);
      }
  } 
  

// seedUser()
// seedCustomer()
// seedDriver()
// seedCategory()
// seedGeolocation()
// seedMenuItem()
// seedsRestaurant()