import { useState, useEffect } from 'react';

const useInfiniteScroll = (fetchMoreData, hasError) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 500 // Trigger load when nearing the bottom
      ) {
        setIsFetching(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isFetching && !hasError) {
      const fetchData = async () => {
        try {
          await fetchMoreData();
        } catch (error) {
          console.error("Error fetching more data:", error);
        } finally {
          setIsFetching(false);
        }
      };

      fetchData();
    }
  }, [isFetching, fetchMoreData, hasError]);

  return { isFetching };
};

export default useInfiniteScroll;
