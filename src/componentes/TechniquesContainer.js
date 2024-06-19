// // TechniquesContainer.js
// import React, { useState, useEffect} from 'react';
// import { techniquesToImage } from '../images/techniquesToImage';
// import {Container, Image, Table, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

// const TechniquesContainer = ({ techniques, onTechniquesChange, formState }) => {

//   // const [selectedTechnique, setSelectedTechnique] = useState(null);
//   // const [selectedUltimate, setSelectedUltimate] = useState(null);
//   // const [selectedAbility, setSelectedAbility] = useState(null);
//   // const [selectedPerk1, setSelectedPerk1] = useState(null);
//   // const [selectedPerk2, setSelectedPerk2] = useState(null);
//   // const [selectedPerk3, setSelectedPerk3] = useState(null);
//   const [selectedUltimate, setSelectedUltimate] = useState(formState.ultimate);
//   const [selectedAbility, setSelectedAbility] = useState(formState.ability);
//   const [selectedPerk1, setSelectedPerk1] = useState(formState.perk1);
//   const [selectedPerk2, setSelectedPerk2] = useState(formState.perk2);
//   const [selectedPerk3, setSelectedPerk3] = useState(formState.perk3);
  
  
//   useEffect(() => {
//     setSelectedUltimate(formState.ultimate);
//     setSelectedAbility(formState.ability);
//     setSelectedPerk1(formState.perk1);
//     setSelectedPerk2(formState.perk2);
//     setSelectedPerk3(formState.perk3);
//   }, [formState])

//   if (!techniques || techniques.length === 0) {
//     // return (
//     //   <div className="techniques-container">
//     //     <p>Loading techniques...</p>
//     //   </div>
//     // );
//     return null
//   }
//   const ultimateTechnique = techniques.find(technique => technique.slot === "Ultimate");
//   const abilityTechniques = techniques.filter(technique => technique.slot === "Ability");
//   const perkTier1Techniques = techniques.filter(technique => technique.slot === "Perk 1");
//   const perkTier2Techniques = techniques.filter(technique => technique.slot === "Perk 2");
//   const perkTier3Techniques = techniques.filter(technique => technique.slot === "Perk 3");

//   // const handleIconClick = (techniqueName) => {
//   //   setSelectedTechnique(techniqueName);
//   // };
//   const handleIconClick = (techniqueName, slot) => {
//     switch (slot) {
//       case 'Ultimate':
//         setSelectedUltimate(techniqueName);
//         break;
//       case 'Ability':
//         setSelectedAbility(techniqueName);
//         break;
//       case 'Perk 1':
//         setSelectedPerk1(techniqueName);
//         break;
//       case 'Perk 2':
//         setSelectedPerk2(techniqueName);
//         break;
//       case 'Perk 3':
//         setSelectedPerk3(techniqueName);
//         break;
//       default:
//         break;
//     }
//     onTechniquesChange(slot.toLowerCase(), techniqueName);
//   };
    



//     return (
//       <div className="techniques-container">
//       {/* Render Ultimate Technique */}
//       <div className="row">
//         {ultimateTechnique && (
//           <div className="col-12">
//             <div className="tec-container-round">
//               {selectedUltimate  === ultimateTechnique.name && <span></span>}
//               <div
//               onClick={() => handleIconClick(ultimateTechnique.name, 'Ultimate')}
//               className="icon-container-round">
//                 <img
//                   src={techniquesToImage[ultimateTechnique.name]}
//                   alt={ultimateTechnique.name}
//                   className={`icon-round ${selectedUltimate  === ultimateTechnique.name ? 'selected-round' : ''}`}
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Render Ability Techniques */}
//       <div className="row">
//         {abilityTechniques.map((technique, index) => (
//           <div key={index} className="col-4">
//             <div className="tec-container-round">
//               {selectedAbility === technique.name && <span></span>}
//               <div
//                onClick={() => handleIconClick(technique.name, 'Ability')}
//                 className="icon-container-round">
//                 <img
//                   src={techniquesToImage[technique.name]}
//                   alt={technique.name}
//                   className={`icon-round ${selectedAbility === technique.name ? 'selected-round' : ''}`}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Render Perk Tier 1 Techniques */}
//       <div className="row">
//         {perkTier1Techniques.map((technique, index) => (
//           <div key={index} className="col-3">
//             <div className="tec-container">
//               {selectedPerk1 === technique.name && <span></span>}
//               <div
//                 onClick={() => handleIconClick(technique.name, 'Perk 1')}
//               className="icon-container">
//                 <img
//                   src={techniquesToImage[technique.name]}
//                   alt={technique.name}
//                   className={`icon ${selectedPerk1  === technique.name ? 'selected' : ''}`}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Render Perk Tier 2 Techniques */}
//       <div className="row">
//         {perkTier2Techniques.map((technique, index) => (
//           <div key={index} className="col-3">
//             <div className="tec-container">
//               {selectedPerk2 === technique.name && <span></span>}
//               <div
//               onClick={() => handleIconClick(technique.name, 'Perk 2')}
//               className="icon-container">
//                 <img
//                   src={techniquesToImage[technique.name]}
//                   alt={technique.name}
//                   className={`icon ${selectedPerk2 === technique.name ? 'selected' : ''}`}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Render Perk Tier 3 Techniques */}
//       <div className="row">
//         {perkTier3Techniques.map((technique, index) => (
//           <div key={index} className="col-3">
//             <div className="tec-container">
//               {selectedPerk3 === technique.name && <span></span>}
//               <div
//               onClick={() => handleIconClick(technique.name, 'Perk 3')}
//               className="icon-container">
//                 <img
//                   src={techniquesToImage[technique.name]}
//                   alt={technique.name}
//                   className={`icon ${selectedPerk3 === technique.name ? 'selected' : ''}`}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TechniquesContainer;
import React, { useState, useEffect } from 'react';
import { techniquesToImage } from '../images/techniquesToImage';
import { Container, Row, Col, Image } from 'react-bootstrap';

const TechniquesContainer = ({ techniques, onTechniquesChange, onLastClickedChange, formState }) => {
  useEffect(() => {
    // Update local state when formState changes
    setSelectedState({
      ultimate: formState.ultimate,
      ability: formState.ability,
      perk1: formState.perk1,
      perk2: formState.perk2,
      perk3: formState.perk3
    });
  }, [formState]);

  const [selectedState, setSelectedState] = useState({
    ultimate: formState.ultimate,
    ability: formState.ability,
    perk1: formState.perk1,
    perk2: formState.perk2,
    perk3: formState.perk3
  });
  
  if (!techniques || techniques.length === 0) {
    return (
      <div className="techniques-container">
        {/* <p>Loading techniques...</p> */}
      </div>
    );
  }

  const handleIconClick = (techniqueName, slot) => {
    const newState = { ...selectedState, [slot]: techniqueName };
    setSelectedState(newState);
    onTechniquesChange(slot, techniqueName);
    onLastClickedChange(techniqueName);
  };

  const renderTechnique = (technique, slot, colSize, isRound = false) => {
    const selectedClass = isRound ? 'selected-round' : 'selected';
    const iconClass = isRound ? 'icon-round' : 'icon';
    const containerClass = isRound ? 'tec-container-round' : 'tec-container';
    const iconContainerClass = isRound ? 'icon-container-round' : 'icon-container';

    return (
      <Col key={technique.name} className={`col-${colSize}`}>
        <div className={containerClass}>
          <div
            onClick={() => handleIconClick(technique.name, slot)}
            className={iconContainerClass}
          >
            <img
              src={techniquesToImage[technique.name]}
              alt={technique.name}
              className={`${iconClass} ${selectedState[slot] === technique.name ? selectedClass : ''}`}
            />
          </div>
        </div>
      </Col>
    );
  };

  const ultimateTechnique = techniques.find(technique => technique.slot === "Ultimate");
  const abilityTechniques = techniques.filter(technique => technique.slot === "Ability");
  const perkTier1Techniques = techniques.filter(technique => technique.slot === "Perk 1");
  const perkTier2Techniques = techniques.filter(technique => technique.slot === "Perk 2");
  const perkTier3Techniques = techniques.filter(technique => technique.slot === "Perk 3");

  return (
    <Container className="techniques-container">
      {/* Render Ultimate Technique */}
      <Row>
        {ultimateTechnique && renderTechnique(ultimateTechnique, 'ultimate', 12, true)}
      </Row>

      {/* Render Ability Techniques */}
      <Row>
        {abilityTechniques.map((technique) => renderTechnique(technique, 'ability', 4, true))}
      </Row>

      {/* Render Perk Tier 1 Techniques */}
      <div className="divisor"></div>
      <Row>
        {perkTier1Techniques.map((technique) => renderTechnique(technique, 'perk1', 3))}
      </Row>

      {/* Render Perk Tier 2 Techniques */}
      <div className="divisor"></div>
      <Row>
        {perkTier2Techniques.map((technique) => renderTechnique(technique, 'perk2', 3))}
      </Row>

      {/* Render Perk Tier 3 Techniques */}
      <div className="divisor"></div>
      <Row>
        {perkTier3Techniques.map((technique) => renderTechnique(technique, 'perk3', 3))}
      </Row>
    </Container>
  );
};

export default TechniquesContainer;
