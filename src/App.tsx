'use client';
import axios from "axios";
import { useEffect, useState } from "react";

const fetchPosts = async () => {
  try {
    const response = await axios.get('https://jsonfakery.com/jobs/paginated');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

const App = () => {


  return (
    <div className='text-lg text-black p-4'>
      heelo
    </div>
  );
};

export default App;
