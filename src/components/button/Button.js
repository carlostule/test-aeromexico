import React, { useState } from "react";

import "./Button.scss";

const Button = ({ filterName = 'Sin nombre', applyFilter = () => {} }) => {
  const [activeButton, setActiveButton] = useState(false);

  const normalButton = () => {
    setActiveButton(false);
  };

  const handleClick = () => {
    setActiveButton(true);

    setTimeout(normalButton, 500);

    applyFilter();
  };

  return (
    <div className="button-component">
      <button type="button" className="button" style={activeButton ? { backgroundColor: '#6B63B5'} : {}} onClick={handleClick}>
        {filterName.toUpperCase()}
      </button>
    </div>
  );
}

export default Button;
