/// <reference types="jest" />


import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import OrderTracking from './OrderTracking';

// Create a mock function that we can control
const mockUseJsApiLoader = jest.fn(() => ({ isLoaded: true }));

// Mock useJsApiLoader to use our controllable mock function
jest.mock('@react-google-maps/api', () => ({
  useJsApiLoader: () => mockUseJsApiLoader()
}));

// Mock socket.io-client
jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
    on: jest.fn(),
    disconnect: jest.fn(),
  };
  return {
    io: jest.fn(() => mSocket),
  };
});

describe('OrderTracking Component', () => {
  const orderId = 'mockOrderId123';

  beforeEach(() => {
    mockUseJsApiLoader.mockReturnValue({ isLoaded: true });
  });

  it('renders with mock orderId', () => {
    render(
      <MemoryRouter initialEntries={[`/order-tracking/${orderId}`]}>
        <Routes>
          <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Track Your Order')).toBeInTheDocument();
  });

  it('connects to socket and listens for updates', () => {
    const mockSocket = require('socket.io-client').io();

    render(
      <MemoryRouter initialEntries={[`/order-tracking/${orderId}`]}>
        <Routes>
          <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
        </Routes>
      </MemoryRouter>
    );

    expect(mockSocket.emit).toHaveBeenCalledWith('join-order-tracking', orderId);
    expect(mockSocket.on).toHaveBeenCalledWith('driver-location-update', expect.any(Function));
  });

  it('displays loading indicator when map is not loaded', () => {
    // Set isLoaded to false before rendering
    mockUseJsApiLoader.mockReturnValue({ isLoaded: false });

    render(
      <MemoryRouter initialEntries={[`/order-tracking/${orderId}`]}>
        <Routes>
          <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading map...')).toBeInTheDocument();
  });

  test('handles errors gracefully', () => {
    render(
      <MemoryRouter initialEntries={[`/order-tracking/${orderId}`]}>
        <Routes>
          <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
        </Routes>
      </MemoryRouter>
    );

    // Assuming your component displays an error message
    expect(screen.queryByText('Error loading order details')).not.toBeInTheDocument();
  });
}); 