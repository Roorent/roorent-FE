// Step3.jsx
import React from 'react';

const Step3 = ({ onFinish }: any) => {
  return (
    <div>
      <h2>Langkah 3: Selesai</h2>
      <button onClick={onFinish}>Selesai</button>
    </div>
  );
};

export default Step3;
