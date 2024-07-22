// components/BMI.js
import React from 'react';

function BMI({ height, weight }:{height:number, weight:number}) {
  const bmi = (weight / (height / 100) ** 2).toFixed(2);
  let bmiCategory = '';

  if (Number(bmi) < 18.6) {
    bmiCategory = 'Underweight';
  } else if (Number(bmi) >= 18.6 && Number(bmi) < 24.9) {
    bmiCategory = 'Normal weight';
  } else {
    bmiCategory = 'Overweight';
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">BMI Calculator</h1>
      <p className="text-gray-600">Height: <span className="font-medium">{height} cm</span></p>
      <p className="text-gray-600">Weight: <span className="font-medium">{weight} kg</span></p>
      <p className="text-gray-600">BMI: <span className="font-medium">{bmi}</span></p>
      <p className="text-gray-600">Category: <span className="font-medium">{bmiCategory}</span></p>
    </div>
  );
}

export default BMI;
