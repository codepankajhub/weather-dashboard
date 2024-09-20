import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import WeatherWidget from './WeatherWidget';

describe('WeatherWidget Component', () => {
  const defaultProps = {
    temperature: 25,
    condition: 'Sunny',
    location: 'Los Angeles',       // Hardcoded location
    isCelsius: true,            // Assuming default is Celsius
    onRemove: jest.fn(),        // Mock function for the remove button
  };

  test('renders temperature and condition', () => {
    // Act
    render(<WeatherWidget {...defaultProps} />);

    // Assert
    expect(screen.getByText(`${defaultProps.temperature}°`)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.condition)).toBeInTheDocument();
  });

  test('renders temperature with correct format', () => {
    // Act
    render(<WeatherWidget {...defaultProps} />);

    // Assert
    const tempElement = screen.getByText(/25°/);
    expect(tempElement).toHaveTextContent('25°');
  });

  test('displays the correct weather condition', () => {
    // Arrange
    const condition = 'Rainy';
    const updatedProps = { ...defaultProps, condition };

    // Act
    render(<WeatherWidget {...updatedProps} />);

    // Assert
    const conditionElement = screen.getByText('Rainy');
    expect(conditionElement).toBeInTheDocument();
  });

  test('removes the widget when the remove button is clicked', () => {
    // Act
    render(<WeatherWidget {...defaultProps} />);
    
    // Find the remove button and simulate a click event
    const removeButton = screen.getByLabelText('remove-widget'); // Assuming the button has aria-label
    removeButton.click();

    // Assert that the remove function was called
    expect(defaultProps.onRemove).toHaveBeenCalled();
  });
});


export {};
