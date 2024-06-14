import React, { useState, useEffect } from 'react';
import { pushData } from './DataService';
import {Container, Image, Table, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import items from '../data/data';
import { techniquesToImage } from '../images/techniquesToImage';

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

    const [formState, setFormState] = useState(initialFormState);
    const [currentClass, setCurrentClass] = useState('');
  
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

    const getPropertyOptions = (gearType) => {
        return items.props?.filter(prop => {
          const gearList = prop.gear.split(', ');
          const match = gearList.some(gear => {
            const normalizedGearType = gearType.charAt(0).toUpperCase() + gearType.slice(1);
            const result = gear === gearType ||
              gear === `All ${normalizedGearType}s` ||
              gear === normalizedGearType ||
              (items[gearType] && items[gearType].some(item => item.name === gear));
            return result;
          });
          return match;
        }) || [];
      };
      
      const getPerkOptions = (gearType) => {
        return items.perks?.filter(perk => {
          const gearList = perk.gear.split(', ');
          const match = gearList.some(gear => {
            const normalizedGearType = gearType.charAt(0).toUpperCase() + gearType.slice(1);
            const result = gear === gearType ||
              gear === `All ${normalizedGearType}s` ||
              gear === normalizedGearType ||
              (items[gearType] && items[gearType].some(item => item.name === gear));
            return result;
          });
          return match;
        }) || [];
      };
      
      const getItemTypeClassName = (property, itemName) => {
        const item = items[property]?.find(item => item.name === itemName);
        const itemType = item ? item.type : '';
        return itemType ? itemType.toLowerCase() : '';
      };
  
    // const renderFormSelect = (label, name, options) => (
    //   <div className="form-group">
    //     <label htmlFor={name} className="form-label">{label}</label>
    //     <select
    //       id={name}
    //       name={name}
    //       value={formState[name]}
    //       onChange={handleChange}
    //       className="form-control"
    //     >
    //       <option value=""></option>
    //       {renderSelectOptions(options)}
    //     </select>
    //     {formState[name] && options.find(option => option.name === formState[name])?.description && (
    //   <p className="form-description">{options.find(option => option.name === formState[name]).description}</p>
    // )}
    //   </div>
    // );

    // const getGearDescription = (itemName, itemType) => {
    //     const item = items[itemType].find(item => item.name === itemName);
    //     return item ? item.description : '';
    //   };

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


    const renderFormSelect = (label, name, options, itemType, imgType) => {
    
    const selectedItem = options.find(option => option.name === formState[name]);
    const description = selectedItem ? getGearDescription(formState[name], itemType) : '';
      
        return (
          <div className="form-group">
            
            <div className={`${techniquesToImage[formState[name]] ? "form-gear" : ""}`}>
              <div
              className={`${imgType === 'square' ? "icon-container" : imgType === 'round' ? "icon-container-round" : ""}`}
              >
              {techniquesToImage[formState[name]] &&
              <img src={techniquesToImage[formState[name]]} alt={formState[name]}
              className={`${imgType === 'gear' ? "build-image" : "build-image-selected"} ${getItemTypeClassName(itemType, formState[name])} creator`}
              />
              }
              </div>
              <label htmlFor={name} className={`form-label ${techniquesToImage[formState[name]] ? 'image' : ''}`}>
              {/* {techniquesToImage[formState[name]] ? label.toUpperCase() : label} */}
              {label.toUpperCase()}
                </label>
            </div>

            <select
              id={name}
              name={name}
              value={formState[name]}
              onChange={handleChange}
              // className={`form-control ${techniquesToImage[formState[name]] ? '' : 'not-image'}`}
              className={`form-control
                ${
                  itemType === 'katana' || itemType === 'ranged' || itemType === 'charm' || itemType === 'gw1' || itemType === 'gw2'
                  ? 'gear' :
                  itemType === 'props' ? 'props' :
                  itemType === 'perks' ? 'perks' : ''
                }`}
            >
              <option value=""></option>
              {/* {itemType === 'perks' ? renderSelectOptions(options).toUpperCase() : renderSelectOptions(options)} */}
              {/* {itemType === 'perks' ? renderSelectOptions(options).toUpperCase() : renderSelectOptions(options)} */}
              {/* {renderSelectOptions(options)} */}
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
            {description && (
              <p className="form-description">{description}</p>
            )}
          </div>
        );
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
    const katanaPropertyOptions = getPropertyOptions('katana');
    const rangedPropertyOptions = getPropertyOptions('ranged');
    const charmPropertyOptions = getPropertyOptions('charm');
    const gw1PropertyOptions = getPropertyOptions('gw1');
    const gw2PropertyOptions = getPropertyOptions('gw2');
    const katanaPerkOptions = getPerkOptions('katana');
    const rangedPerkOptions = getPerkOptions('ranged');
    const charmPerkOptions = getPerkOptions('charm');
    const gw1PerkOptions = getPerkOptions('gw1');
    const gw2PerkOptions = getPerkOptions('gw2');
    const classTechOptions = {
        samurai: 'samuraiTec',
        ronin: 'roninTec',
        hunter: 'hunterTec',
        assassin: 'assassinTec'
    };
    
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">BUILD NAME</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {renderFormSelect('Class', 'class', classes, '', 'gear')}
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
          <label htmlFor="ultimate" className={`form-label ${techniquesToImage[formState.ultimate] ? 'image' : ''}`}>ULTIMATE</label>
          <input
            type="text"
            id="ultimate"
            name="ultimate"
            value={formState.ultimate}
            onChange={handleChange}
            className="form-control"
            readOnly
          />
          {formState.ultimate && (
    <p className="form-description">{getUltimateDescription(formState.ultimate)}</p>
  )}
        </div>
        {renderFormSelect('Ability', 'ability', abilityOptions, classTechOptions[formState.class.toLowerCase()], 'round')}
        {renderFormSelect('Perk 1', 'perk1', perk1Options, classTechOptions[formState.class.toLowerCase()], 'square')}
        {renderFormSelect('Perk 2', 'perk2', perk2Options, classTechOptions[formState.class.toLowerCase()], 'square')}
        {renderFormSelect('Perk 3', 'perk3', perk3Options, classTechOptions[formState.class.toLowerCase()], 'square')}
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
        
        <Container className="d-flex justify-content-center toggle-button-group">
            <Button type="submit" className="custom-button">
            Add Build
            </Button>
        </Container>
      </form>
    );
  };
  
  export default BuildForm;