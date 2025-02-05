import RestaurantList from './components/RestaurantList';

const ClientApp = () => {
  return (
    <div className="client-app">
      <h1>Client Dashboard</h1>
      <p>Welcome to the client section!</p>
      <RestaurantList />
    </div>
  );
};

export default ClientApp;
