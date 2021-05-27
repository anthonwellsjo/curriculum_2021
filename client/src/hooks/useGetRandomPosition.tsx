import React from 'react';

const useGetRandomPosition = () => {
  const left = Math.floor(Math.random() * 90) + 5;
  const top = Math.floor(Math.random() * 70) + 25;

  return { left: `${left}%`, top: `${top}%` }
}

export default useGetRandomPosition;