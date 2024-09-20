import React, { useState, useEffect } from 'react';
import { Grid, Button, Container, Typography, AppBar, Toolbar, Box } from '@mui/material';
import WeatherWidget from './WeatherWidget';
import { useTemperatureContext } from '../context/TemperatureContext';
import { getFromStorage, saveToStorage } from '../utils/storageUtils';

interface WeatherWidgetData {
  id: number;
  location: string;
  temperature: number;
  condition: string;
}

const initialWidgets: WeatherWidgetData[] = [
  { id: 1, location: 'New York', temperature: 22, condition: 'Sunny' },
];

const Dashboard: React.FC = () => {
  const { toggleTemperatureUnit, isCelsius } = useTemperatureContext();
  const [widgets, setWidgets] = useState<WeatherWidgetData[]>(() => getFromStorage('widgets') || initialWidgets);

  useEffect(() => {
    saveToStorage('widgets', widgets);
  }, [widgets]);

  const addWidget = () => {
    const newWidget: WeatherWidgetData = {
      id: widgets.length + 1,
      location: 'Los Angeles',
      temperature: 25,
      condition: 'Cloudy',
    };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id: number) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4, backgroundColor: '#eaeff1', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ marginBottom: 4, backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, color: '#fff' }}>Weather Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={addWidget}>
          Add Widget
        </Button>
        <Button variant="contained" color="secondary" onClick={toggleTemperatureUnit}>
          Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
        </Button>
      </Box>
      <Grid container spacing={2}>
        {widgets.map(widget => (
          <Grid item xs={12} sm={6} md={4} key={widget.id}>
            <WeatherWidget
              location={widget.location}
              temperature={widget.temperature}
              condition={widget.condition}
              isCelsius={isCelsius}
              onRemove={() => removeWidget(widget.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
