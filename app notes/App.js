import React, { useState } from 'react';
import ColorPicker from './ColorPicker';

const App = () => {

  const colorOptions = ['red', 'blue', 'green', 'yellow'];


  const [selectedColor, setSelectedColor] = useState('');

  return (
    <div>
      <h1>Color Picker App</h1>
      <ColorPicker
        colorOptions={colorOptions}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
};




