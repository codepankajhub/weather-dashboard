import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { Delete as DeleteIcon, WbSunny, Cloud,  Thunderstorm, BeachAccess } from '@mui/icons-material';

interface WeatherWidgetProps {
  location: string;
  temperature: number; // Raw temperature in Celsius
  condition: string;
  isCelsius: boolean;
  onRemove: () => void;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ location, temperature, condition, isCelsius, onRemove }) => {
  const displayedTemperature = isCelsius 
    ? temperature 
    : Math.round((temperature * 9/5) + 32);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <WbSunny sx={{ fontSize: 40, color: '#FFA000' }} />;
      case 'cloudy':
        return <Cloud sx={{ fontSize: 40, color: '#B0BEC5' }} />;
      case 'rainy':
        return <BeachAccess sx={{ fontSize: 40, color: '#2196F3' }} />;
      case 'stormy':
        return <Thunderstorm sx={{ fontSize: 40, color: '#F44336' }} />;
      default:
        return null; // Fallback icon or null
    }
  };

  const getBackgroundColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return '#FFF9C4'; 
      case 'cloudy':
        return '#CFD8DC'; 
      case 'rainy':
        return '#BBDEFB'; 
      case 'stormy':
        return '#F8BBD0'; 
      default:
        return '#ffffff'; 
    }
  };

  return (
    <Card sx={{
      padding: 2,
      textAlign: 'center',
      margin: '16px 0',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
      },
      backgroundColor: getBackgroundColor(condition),
      borderRadius: 2,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="clouds-animation" />
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>{location}</Typography>
        <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>{displayedTemperature}°{isCelsius ? 'C' : 'F'}</Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          {getWeatherIcon(condition)} {condition.charAt(0).toUpperCase() + condition.slice(1)}
        </Typography>
        <IconButton aria-label="remove widget" onClick={onRemove} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
