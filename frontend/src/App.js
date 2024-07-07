import React from 'react';
import axios from 'axios';


function App() {
  const backendUrl = '/api';

  const fetchFromService = async (path) => {
    try {
      console.log('fetching from: ' + backendUrl + path)
      const result = await axios.get(`${backendUrl}${path}`);
      console.log('result.data')
      console.log(result.data)
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Hello World from React! - 5</h1>
      <button onClick={() => fetchFromService('/duncan')}>Fetch from Java</button>
      <button onClick={() => fetchFromService('/favio')}>Fetch from Rust</button>
      <button onClick={() => fetchFromService('/zaib')}>Fetch from Dart</button>
    </div>
  );
}

export default App;
