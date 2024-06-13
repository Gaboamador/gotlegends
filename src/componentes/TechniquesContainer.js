// TechniquesContainer.js
import React, { useState } from 'react';
import { techniquesToImage } from '../images/techniquesToImage';
import {Container, Image, Table, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

const TechniquesContainer = ({ techniques }) => {

  const [selectedTechnique, setSelectedTechnique] = useState(null);

  const handleIconClick = (techniqueName) => {
    setSelectedTechnique(techniqueName);
  };



    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: 5 }}>
        {techniques.map((technique, index) => {
          const isRound = technique.slot === "Ultimate" || technique.slot === "Ability";
          const tecContainerClass = isRound ? "tec-container-round" : "tec-container";
          const iconContainerClass = isRound ? "icon-container-round" : "icon-container";
          const iconClass = isRound ? "icon-round" : "icon";
          const selectedClass = isRound ? "selected-round" : "selected";
  
          return (
            <div key={index} style={{ padding: 5 }}>
              <div className={tecContainerClass}>
                {selectedTechnique === technique.name && <span></span>}
                <div
                  onClick={() => handleIconClick(technique.name)}
                  className={iconContainerClass}
                >
                  <img
                    src={techniquesToImage[technique.name]}
                    alt={technique.name}
                    className={`${iconClass} ${selectedTechnique === technique.name ? selectedClass : ''}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
  );
};

export default TechniquesContainer;
