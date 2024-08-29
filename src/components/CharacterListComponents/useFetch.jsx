import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Function to generate a unique image URL based on character name
const generateImageUrl = (name) => {
  const sanitizedName = name.replace(/\s+/g, '-').toLowerCase(); 
  return `https://picsum.photos/200/300?random=${sanitizedName}`;
};

const useFetch = (url, page, limit, searchQuery) => {
  const [data, setData] = useState({ results: [], next: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const params = { page, limit };
      if (searchQuery) {
        params.search = searchQuery;
      }
      const response = await axios.get(url, { params });

      // Include image URLs in the results
      const resultsWithImages = response.data.results.map(character => ({
        ...character,
        imageUrl: generateImageUrl(character.name),
      }));

      setData(prevData => ({
        results: [...prevData.results, ...resultsWithImages],
        next: response.data.next,
      }));
    } catch (err) {
      setError(`Failed to fetch data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [url, page, limit, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useFetch;
