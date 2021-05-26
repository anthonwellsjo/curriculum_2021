import React from 'react';



const useGetColor = (color: "activeLink" | "duurrrp") => {
  if (color === "activeLink") return "orange";
  if (color === "duurrrp") return "black";
  
}

export default useGetColor;