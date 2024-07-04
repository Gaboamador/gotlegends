import React, { useState, useEffect } from 'react';
import { pushData } from './DataService';
import {Container, Image, Table, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import items from '../data/data';
import { techniquesToImage } from '../images/techniquesToImage';
import TechniquesContainer from './TechniquesContainer';


const BuildForm = () => {
    const initialFormState = {
      name: '',
      class: '',
      ultimate: '',
      ability: '',
      perk1: '',
      perk2: '',
      perk3: '',
      katana: '',
      katana_prop1: '',
      katana_prop2: '',
      katana_perk1: '',
      katana_perk2: '',
      ranged: '',
      ranged_prop1: '',
      ranged_prop2: '',
      ranged_perk1: '',
      ranged_perk2: '',
      charm: '',
      charm_prop1: '',
      charm_prop2: '',
      charm_perk1: '',
      charm_perk2: '',
      gw1: '',
      gw1_prop1: '',
      gw1_prop2: '',
      gw1_perk1: '',
      gw1_perk2: '',
      gw2: '',
      gw2_prop1: '',
      gw2_prop2: '',
      gw2_perk1: '',
      gw2_perk2: ''
    };

    // const [formState, setFormState] = useState(initialFormState);
    const [formState, setFormState] = useState(() => {
      const savedFormState = sessionStorage.getItem('formState');
      return savedFormState ? JSON.parse(savedFormState) : initialFormState;
    });
  
    useEffect(() => {
      sessionStorage.setItem('formState', JSON.stringify(formState));
    }, [formState]);
  
    const handleReset = () => {
      const confirmReset = window.confirm('Are you sure you want to reset the build?');
      if (!confirmReset) {
        return;
      }
      setFormState(initialFormState);
      sessionStorage.removeItem('formState');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [currentClass, setCurrentClass] = useState('');
    const [lastClicked, setLastClicked] = useState(null);

    useEffect(() => {
      if (currentClass) {
        const classKey = `${currentClass.toLowerCase()}Tec`;
        const ultimate = items[classKey]?.find(item => item.slot === 'Ultimate');
        setFormState((prevState) => ({
          ...prevState,
          ultimate: ultimate ? ultimate.name : ''
        }));
      }
    }, [currentClass]);
  
    const handleTechniquesChange = (slot, techniqueName) => {
      setFormState(prevState => ({
        ...prevState,
        [slot]: techniqueName
      }));
    };

    const handleLastClickedChange = (techniqueName) => {
      setLastClicked(techniqueName);
    };  

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormState((prevState) => ({
        ...prevState,
        [name]: value
      }));
  
      if (name === 'class') {
        setCurrentClass(value);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await pushData(formState);
        setFormState(initialFormState);
        setCurrentClass('');
        alert('Build added successfully');
      } catch (error) {
        console.error('Error adding build:', error);
      }
    };
  
    const renderSelectOptions = (options) => {
      return options.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ));
    };
  
    const getOptionsForClass = (slot) => {
      if (currentClass) {
        const classKey = `${currentClass.toLowerCase()}Tec`;
        return items[classKey]?.filter(item => item.slot === slot) || [];
      }
      return [];
    };
  
    const getGearOptions = (gearType) => {
      return items[gearType]?.map(item => ({
        name: item.name
      })) || [];
    };

    // const getPropertyOptions = (gearType) => {
    //     return items.props?.filter(prop => {
    //       const gearList = prop.gear.split(', ');
    //       const match = gearList.some(gear => {
    //         const normalizedGearType = gearType.charAt(0).toUpperCase() + gearType.slice(1);
    //         const result = gear === gearType ||
    //           gear === `All ${normalizedGearType}s` ||
    //           gear === normalizedGearType ||
    //           (items[gearType] && items[gearType].some(item => item.name === gear));
    //         return result;
    //       });
    //       return match;
    //     }) || [];
    //   };

    const getPropertyOptions = (selectedGearName, gearType) => {
      const normalizedGearType = gearType.charAt(0).toUpperCase() + gearType.slice(1);
      return items.props?.filter(prop => {
        const gearList = prop.gear.split(', ');
        return gearList.some(gear => 
          gear === selectedGearName || 
          gear === `All ${normalizedGearType}s`
        );
      }) || [];
    };
      
      // const getPerkOptions = (gearType) => {
      //   return items.perks?.filter(perk => {
      //     const gearList = perk.gear.split(', ');
      //     const match = gearList.some(gear => {
      //       const normalizedGearType = gearType.charAt(0).toUpperCase() + gearType.slice(1);
      //       const result = gear === gearType ||
      //         gear === `All ${normalizedGearType}s` ||
      //         gear === normalizedGearType ||
      //         (items[gearType] && items[gearType].some(item => item.name === gear));
      //       return result;
      //     });
      //     return match;
      //   }) || [];
      // };

      const getPerkOptions = (selectedGearName, gearType) => {
        const normalizedGearType = gearType.charAt(0).toUpperCase() + gearType.slice(1);
        return items.perks?.filter(perk => {
          const gearList = perk.gear.split(', ');
          return gearList.some(gear => 
            gear === selectedGearName || 
            gear === `All ${normalizedGearType}s`
          );
        }) || [];
      };
      
      
      const getItemTypeClassName = (property, itemName) => {
        const item = items[property]?.find(item => item.name === itemName);
        const itemType = item ? item.type : '';
        return itemType ? itemType.toLowerCase() : '';
      };

    const getUltimateDescription = (ultimateName) => {
        for (const key in items) {
          const ultimate = items[key].find(item => item.name === ultimateName && item.slot === 'Ultimate');
          if (ultimate) return ultimate.description;
        }
        return 'Description not found';
      };
      
      

    const getGearDescription = (itemName, itemType) => {
        let mappedType = '';
        switch (itemType) {
          case 'class':
            mappedType = 'classes';
            break;
          case 'ultimate':
          case 'ability':
            mappedType = itemType + 'Tec';
            break;
          case 'perk1':
          case 'perk2':
          case 'perk3':
            mappedType = itemType + 'Tec';
            break;
          default:
            mappedType = itemType;
        }
      
        if (items[mappedType]) {
          const item = items[mappedType].find(item => item.name === itemName);
          if (item) {
            return item.description || '';
          }
        }
      
        return '';
      };


      const ToggleButtonGroup = ({ options, selectedValue, onChange }) => {
        return (
          <ButtonGroup toggle className="d-flex justify-content-center toggle-button-group-creator build-title">
          {options.map((option, index) => (
            <Button
              key={index}
              active={selectedValue === option}
              onClick={() => onChange(option)}
              className="toggle-button"
            >
              <img
                src={techniquesToImage[option]}
                alt={option}
                className="toggle-button-image"
              />
              {/* {option} */}
              {selectedValue === option && <div className="toggle-button-text">{option}</div>}
            </Button>
          ))}
        </ButtonGroup>
        );
      };

    const renderFormSelect = (label, name, options, itemType, imgType) => {
      const selectedItem = options.find(option => option.name === formState[name]);
      const description = selectedItem ? getGearDescription(formState[name], itemType) : '';
      
      const handleToggleChange = (value) => {
        handleChange({ target: { name, value } });
      };
      
      return (
        <div className="form-group">

          {/* ITEM LABEL */}
          <label htmlFor={name} className={`form-label ${techniquesToImage[formState[name]] && label !== 'Class' && itemType !== 'perks' ? '' : ''} ${imgType === 'gear' ? 'gear-label' : ''}`}>
              {label.toUpperCase()}
            </label>

<div className="form-container">
          {/* ITEM IMAGE */}
            {techniquesToImage[formState[name]] &&
          <div className={`${techniquesToImage[formState[name]] ? "form-gear" : ""}`}>
            <div className={`${imgType === 'square' ? "icon-container" : imgType === 'round' ? "icon-container-round" : ""}`}>
              {techniquesToImage[formState[name]] && label!== 'Class' && itemType !== 'perks' &&
                <img src={techniquesToImage[formState[name]]} alt={formState[name]}
                  className={`${imgType === 'gear' ? "build-image" : "build-image-selected"} ${getItemTypeClassName(itemType, formState[name])} creator`}
                />
              }
            </div>
            {/* {label !== 'Class' &&
            <label htmlFor={name} className={`form-label ${techniquesToImage[formState[name]] && label !== 'Class' && itemType !== 'perks' ? 'image' : ''}`}>
              {[formState[name]]}
            </label>
            } */}
                </div>
          }
            
            {label !== 'Class' &&
            <select
            id={name}
            name={name}
            value={formState[name]}
            onChange={handleChange}
            className={`form-control
              ${itemType === 'katana' || itemType === 'ranged' || itemType === 'charm' || itemType === 'gw1' || itemType === 'gw2' ? 'gear' :
                itemType === 'props' ? 'props' :
                  itemType === 'perks' ? 'perks' : ''}`}
          >
            <option value="">-</option>
            {itemType === 'perks' ?
              renderSelectOptions(options).map((option, index) => (
                <option key={index} value={option.props.value}>
                  {option.props.children.toUpperCase()}
                </option>
              ))
              :
              renderSelectOptions(options)
            }
          </select>
          }
</div>           
          {/* </div>
          } */}

          {/* FORM SELECT (EXCEPT TOGGLE BUTTON FOR CLASS) */}
          {label === 'Class' &&
          //  ? (
            <ToggleButtonGroup
              options={options.map(option => option.name)}
              selectedValue={formState[name]}
              onChange={handleToggleChange}
            />
          // ) : (
            // <select
            //   id={name}
            //   name={name}
            //   value={formState[name]}
            //   onChange={handleChange}
            //   className={`form-control
            //     ${itemType === 'katana' || itemType === 'ranged' || itemType === 'charm' || itemType === 'gw1' || itemType === 'gw2' ? 'gear' :
            //       itemType === 'props' ? 'props' :
            //         itemType === 'perks' ? 'perks' : ''}`}
            // >
            //   <option value=""></option>
            //   {itemType === 'perks' ?
            //     renderSelectOptions(options).map((option, index) => (
            //       <option key={index} value={option.props.value}>
            //         {option.props.children.toUpperCase()}
            //       </option>
            //     ))
            //     :
            //     renderSelectOptions(options)
            //   }
            // </select>
          //   null
          // )
          }
    
          {description && (
            <p className="form-description">{description}</p>
          )}
        </div>
      );
    };


    const renderFormSelectInfo = (label, name, options, itemType, imgType) => {
      const selectedItem = options.find(option => option.name === formState[name]);
      const description = selectedItem ? getGearDescription(formState[name], itemType) : '';
      
      const handleToggleChange = (value) => {
        handleChange({ target: { name, value } });
      };
      
      return (
        <div className="form-group">
          <label htmlFor={name} className={`form-label ${techniquesToImage[formState[name]] && label !== 'Class' && itemType !== 'perks' ? '' : ''}`}>
              {label.toUpperCase()}
            </label>
          <div className={`${techniquesToImage[formState[name]] ? "form-gear" : ""}`}>
            <div className={`${imgType === 'square' ? "icon-container" : imgType === 'round' ? "icon-container-round" : ""}`}>
              {techniquesToImage[formState[name]] && label!== 'Class' && itemType !== 'perks' &&
                <img src={techniquesToImage[formState[name]]} alt={formState[name]}
                  className={`${imgType === 'gear' ? "build-image" : "build-image-selected"} ${getItemTypeClassName(itemType, formState[name])} creator`}
                />
              }
            </div>
            <label htmlFor={name} className={`form-label ${techniquesToImage[formState[name]] && label !== 'Class' && itemType !== 'perks' ? 'image' : ''}`}>
              {[formState[name]]}
            </label>
          </div>
    
          {/* {label === 'Class' ? (
            <ToggleButtonGroup
              options={options.map(option => option.name)}
              selectedValue={formState[name]}
              onChange={handleToggleChange}
            />
          ) : (
            <select
              id={name}
              name={name}
              value={formState[name]}
              onChange={handleChange}
              className={`form-control
                ${itemType === 'katana' || itemType === 'ranged' || itemType === 'charm' || itemType === 'gw1' || itemType === 'gw2' ? 'gear' :
                  itemType === 'props' ? 'props' :
                    itemType === 'perks' ? 'perks' : ''}`}
            >
              <option value=""></option>
              {itemType === 'perks' ?
                renderSelectOptions(options).map((option, index) => (
                  <option key={index} value={option.props.value}>
                    {option.props.children.toUpperCase()}
                  </option>
                ))
                :
                renderSelectOptions(options)
              }
            </select>
          )} */}
    
          {description && (
            <p className="form-description">{description}</p>
          )}
        </div>
      );
    };

    const getImgType = (techniqueName) => {
      if (formState.ultimate === techniqueName || formState.ability === techniqueName) return 'round';
      if (formState.perk1 === techniqueName || formState.perk2 === techniqueName || formState.perk3 === techniqueName) return 'square';
      return 'unknown';
    };
    
    const classes = items.classes;
    const abilityOptions = getOptionsForClass('Ability');
    const perk1Options = getOptionsForClass('Perk 1');
    const perk2Options = getOptionsForClass('Perk 2');
    const perk3Options = getOptionsForClass('Perk 3');
    const katanaOptions = getGearOptions('katana');
    const rangedOptions = getGearOptions('ranged');
    const charmOptions = getGearOptions('charm');
    const gw1Options = getGearOptions('gw1');
    const gw2Options = getGearOptions('gw2');
    // const katanaPropertyOptions = getPropertyOptions('katana');
    // const rangedPropertyOptions = getPropertyOptions('ranged');
    // const charmPropertyOptions = getPropertyOptions('charm');
    // const gw1PropertyOptions = getPropertyOptions('gw1');
    // const gw2PropertyOptions = getPropertyOptions('gw2');
    const katanaPropertyOptions = getPropertyOptions(formState.katana, 'katana');
    const rangedPropertyOptions = getPropertyOptions(formState.ranged, 'ranged');
    const charmPropertyOptions = getPropertyOptions(formState.charm, 'charm');
    const gw1PropertyOptions = getPropertyOptions(formState.gw1, 'gw1');
    const gw2PropertyOptions = getPropertyOptions(formState.gw2, 'gw2');
    // const katanaPerkOptions = getPerkOptions('katana');
    // const rangedPerkOptions = getPerkOptions('ranged');
    // const charmPerkOptions = getPerkOptions('charm');
    // const gw1PerkOptions = getPerkOptions('gw1');
    // const gw2PerkOptions = getPerkOptions('gw2');
    const katanaPerkOptions = getPerkOptions(formState.katana, 'katana');
    const rangedPerkOptions = getPerkOptions(formState.ranged, 'ranged');
    const charmPerkOptions = getPerkOptions(formState.charm, 'charm');
    const gw1PerkOptions = getPerkOptions(formState.gw1, 'gw1');
    const gw2PerkOptions = getPerkOptions(formState.gw2, 'gw2');
    const classTechOptions = {
        samurai: 'samuraiTec',
        ronin: 'roninTec',
        hunter: 'hunterTec',
        assassin: 'assassinTec'
    };

    const classToTechniques = {
      Samurai: items.samuraiTec,
      Hunter: items.hunterTec,
      Assassin: items.assassinTec,
      Ronin: items.roninTec,
    };
    const selectedClass = formState.class;
    const selectedTechniques = classToTechniques[selectedClass] || [];

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">BUILD NAME</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="build name"
            value={formState.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* CLASS SELECTOR */}
        {renderFormSelect('Class', 'class', classes, '', 'gear')}
        
        {/* <TechniquesContainer techniques={selectedTechniques} /> */}
        <TechniquesContainer 
        techniques={selectedTechniques} 
        onTechniquesChange={handleTechniquesChange} 
        onLastClickedChange={handleLastClickedChange}
        formState={formState}
      />

       {/* Render the last clicked technique and its description */}
      {lastClicked && (
        <div className="form-group-description">
          {/* <label className="form-label">Last Clicked</label> */}
          <div className="form-gear description">
            {/* <div className="icon-container"> */}
            <div className={`icon-container${getImgType(lastClicked) === 'round' ? '-round' : ''}`}>
              <img
                src={techniquesToImage[lastClicked]}
                alt={lastClicked}
                className="build-image-selected"
              />
            </div>
            <label className="form-description label">
              {lastClicked.toUpperCase()}
            </label>
          </div>
          <p className="form-description">{getGearDescription(lastClicked, classTechOptions[formState.class.toLowerCase()])}</p>
        </div>
      )}

        {/* DISPLAY ULTIMATE */}
        {/* {techniquesToImage[formState.ultimate] && 
        <div className="form-label">ULTIMATE</div>
        }
{techniquesToImage[formState.ultimate] && 
        <div className="form-group">
        {techniquesToImage[formState.ultimate] && 
          <div className="icon-container-round">
            <img
              src={techniquesToImage[formState.ultimate]}
              alt={formState.ultimate}
              className="build-image-selected"
            />
          </div>
        }
          <label htmlFor="ultimate" className={`form-label ${techniquesToImage[formState.ultimate] ? 'image' : ''}`}>{formState.ultimate}</label>
          {formState.ultimate && (
          <p className="form-description">{getUltimateDescription(formState.ultimate)}</p>
          )}
        </div>
} */}

        {/* ABILIY SELECTOR */}
        {/* {renderFormSelectInfo('Ability', 'ability', abilityOptions, classTechOptions[formState.class.toLowerCase()], 'round')} */}

        {/* TECHNIQUES SELECTOR */}
        {/* {renderFormSelectInfo('Perk 1', 'perk1', perk1Options, classTechOptions[formState.class.toLowerCase()], 'square')}
        {renderFormSelectInfo('Perk 2', 'perk2', perk2Options, classTechOptions[formState.class.toLowerCase()], 'square')}
        {renderFormSelectInfo('Perk 3', 'perk3', perk3Options, classTechOptions[formState.class.toLowerCase()], 'square')} */}

        {/* GEAR SELECTOR */}
        {renderFormSelect('KATANA', 'katana', katanaOptions, 'katana', 'gear')}
        {renderFormSelect('Prop I', 'katana_prop1', katanaPropertyOptions, 'props')}
        {renderFormSelect('Prop II', 'katana_prop2', katanaPropertyOptions, 'props')}
        {renderFormSelect('Perk I', 'katana_perk1', katanaPerkOptions, 'perks')}
        {renderFormSelect('Perk II', 'katana_perk2', katanaPerkOptions, 'perks')}
        {renderFormSelect('RANGED', 'ranged', rangedOptions, 'ranged', 'gear')}
        {renderFormSelect('Prop I', 'ranged_prop1', rangedPropertyOptions, 'props')}
        {renderFormSelect('Prop II', 'ranged_prop2', rangedPropertyOptions, 'props')}
        {renderFormSelect('Perk I', 'ranged_perk1', rangedPerkOptions, 'perks')}
        {renderFormSelect('Perk II', 'ranged_perk2', rangedPerkOptions, 'perks')}
        {renderFormSelect('CHARM', 'charm', charmOptions, 'charm', 'gear')}
        {renderFormSelect('Prop I', 'charm_prop1', charmPropertyOptions, 'props')}
        {renderFormSelect('Prop II', 'charm_prop2', charmPropertyOptions, 'props')}
        {renderFormSelect('Perk I', 'charm_perk1', charmPerkOptions, 'perks')}
        {renderFormSelect('Perk II', 'charm_perk2', charmPerkOptions, 'perks')}
        {renderFormSelect('GHOST WEAPON 1', 'gw1', gw1Options, 'gw1', 'gear')}
        {renderFormSelect('Prop I', 'gw1_prop1', gw1PropertyOptions, 'props')}
        {renderFormSelect('Prop II', 'gw1_prop2', gw1PropertyOptions, 'props')}
        {renderFormSelect('Perk I', 'gw1_perk1', gw1PerkOptions, 'perks')}
        {renderFormSelect('Perk II', 'gw1_perk2', gw1PerkOptions, 'perks')}
        {renderFormSelect('GHOST WEAPON 2', 'gw2', gw2Options, 'gw2', 'gear')}
        {renderFormSelect('Prop I', 'gw2_prop1', gw2PropertyOptions, 'props')}
        {renderFormSelect('Prop II', 'gw2_prop2', gw2PropertyOptions, 'props')}
        {renderFormSelect('Perk I', 'gw2_perk1', gw2PerkOptions, 'perks')}
        {renderFormSelect('Perk II', 'gw2_perk2', gw2PerkOptions, 'perks')}
        
        <Container className="d-flex justify-content-space-between toggle-button-group">
            <Button type="submit" className="custom-button">
            Add Build
            </Button>
            <Button className="custom-button erase" onClick={handleReset}>Reset Build</Button>
        </Container>
      </form>
    );
  };
  
  export default BuildForm;