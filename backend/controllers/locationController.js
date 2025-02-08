class LocationController {
    constructor() {
      this.driverLocations = new Map();
      this.restaurantLocations = [
        { id: 1, name: "Pizza Place", lat: 36.822048, lng: 10.148082 },
        { id: 2, name: "Burger Spot", lat: 36.832048, lng: 10.148082 }
      ];
    }
  
    updateDriverLocation(driverId, location, socketId) {
      this.driverLocations.set(driverId, { ...location, socketId });
    }
  
    getDriverLocations() {
      return Array.from(this.driverLocations, ([driverId, loc]) => ({ driverId, ...loc }));
    }
  
    getRestaurantLocations() {
      return this.restaurantLocations;
    }
  
    removeDriver(driverId) {
      this.driverLocations.delete(driverId);
    }
  }
  
  module.exports = new LocationController();
  