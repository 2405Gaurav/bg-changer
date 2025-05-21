import { useState } from 'react';

function App() {
  const [bgColor, setBgColor] = useState('bg-white');

  const colors = [
    { name: 'Red', value: 'bg-red-500' },
    { name: 'Blue', value: 'bg-blue-500' },
    { name: 'Green', value: 'bg-green-500' },
    { name: 'Yellow', value: 'bg-yellow-500' },
    { name: 'Purple', value: 'bg-purple-500' },
    { name: 'Gray', value: 'bg-gray-500' },
    { name: 'Black', value: 'bg-black' },
  ];

  return (
   <>  
   <body className={bgColor}>
    
   </body>
        {colors.map((color) => (
          <button
            key={color.value}
            className={`px-4 py-2 rounded text-white m-24  font-semibold shadow-md ${color.value} hover:opacity-80`}
            onClick={() => setBgColor(color.value)}
          >
            {color.name}
          </button>
        ))}
      </>
    
  );
}

export default App;
