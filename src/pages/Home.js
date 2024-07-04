import React, { useState, useContext, useEffect, useRef } from "react";
import '../App.css';
import {Container, Image, Table, Button, ButtonGroup, ButtonToolbar, Overlay, OverlayTrigger, Popover, Collapse } from 'react-bootstrap';
import Context from "../context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaVoteYea } from 'react-icons/fa';
import { FaAngleDown, FaAnglesDown, FaAngleUp, FaAnglesUp } from "react-icons/fa6";
// import { participants, participantsChart } from "../data/participantsData";
import { fetchData } from '../componentes/DataService';
import items from "../data/data";
import { IoEye } from "react-icons/io5";
// import BnBS from "../images/techniques/bow-and-blade-selected.svg"
import BnB from "../images/techniques/bow-and-blade.svg"
import { techniquesToImage } from "../images/techniquesToImage";
// import { assassinTec } from '../data/data';
import TechniquesContainer from '../componentes/TechniquesContainer';

const Home = () => {
  
  const context = useContext(Context)
  const navigate=useNavigate()
  const refs = useRef({});

  const [builds, setBuilds] = useState([]);
  
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const { builds } = await fetchData();
        if (builds && Array.isArray(builds)) {
          // Sort builds by class and then by name
          const sortedBuilds = builds.sort((a, b) => {
            if (a.class < b.class) return -1;
            if (a.class > b.class) return 1;
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          setBuilds(sortedBuilds);
        } else {
          console.error('Invalid data format:', builds);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromAPI();
  }, []);

  useEffect(() => {
    context.setMarker(false)
  }, []);

  // Group builds by class
  const groupedBuilds = builds.reduce((acc, build) => {
    if (!acc[build.class]) {
      acc[build.class] = [];
    }
    acc[build.class].push(build);
    return acc;
  }, {});

  // Function to get item type and corresponding className
  const getItemTypeClassName = (property, itemName) => {
    const item = items[property]?.find(item => item.name === itemName);
    const itemType = item ? item.type : '';
    return itemType ? itemType.toLowerCase() : '';
  };

  const getTechniquesArray = (className) => {
    switch (className) {
      case 'Assassin':
        return items.assassinTec;
      case 'Hunter':
        return items.hunterTec;
      case 'Ronin':
        return items.roninTec;
      case 'Samurai':
        return items.samuraiTec;
      default:
        return [];
    }
  };
  
  // Helper function to find the position of a perk in its tier
  const getPerkPosition = (className, perkName, tier) => {
    const techniques = getTechniquesArray(className);
    const tierTechniques = techniques.filter(technique => technique.slot === tier);
    const position = tierTechniques.findIndex(technique => technique.name === perkName) + 1;
    return position;
  };
  

  const handleHeaderClick = (buildClass, buildName) => {
    context.setSelectedBuild(buildName)
    context.setSelectedClass(buildClass)
    context.setMarker(true)
    navigate('/BuildBrowser') 
  };

  const handleScrollToClass = (className) => {
    if (refs.current[className]) {
      refs.current[className].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getPopoverContent = (className, build, gearType) => {
    const gear = groupedBuilds[className]?.find(b => b.name === build.name);
    if (!gear) return null;
  
    const gearProps = {
      name: gear[gearType],
      prop1: gear[`${gearType}_prop1`],
      prop2: gear[`${gearType}_prop2`],
      perk1: gear[`${gearType}_perk1`],
      perk2: gear[`${gearType}_perk2`],
    };

    const getPerkDescription = (perk) => {
      const perkItem = getTechniquesArray(className)?.find(item => item.name === perk);
      return perkItem ? perkItem.description : perk;
    };
    
  
    return (
      <Popover id="popover-basic" className={`${getItemTypeClassName(gearType, gear[gearType])}`}>
        {(gearType === "katana" || gearType === "ranged" || gearType === "charm" || gearType === "gw1" || gearType === "gw2") ? (
        <>
        <Popover.Header className={`${getItemTypeClassName(gearType, gear[gearType])} popover-build-header`}>{gearProps.name}</Popover.Header>
        <Popover.Body className="popover-build-details">
          {gearProps.prop1 && <div className="not-perk">{`${gearProps.prop1}`}</div>}
          {gearProps.prop2 && <div className="not-perk">{`${gearProps.prop2}`}</div>}
          {gearProps.perk1 && <div className="perk">{`${gearProps.perk1.toUpperCase()}`}</div>}
          {gearProps.perk2 && <div className="perk">{`${gearProps.perk2.toUpperCase()}`}</div>}
        </Popover.Body>
        </>
        ):(
        <>
          <Popover.Header className="popover-build-header techniques">{gearProps.name}</Popover.Header>
          <Popover.Body className="popover-build-details">
          {gearType && <div className="not-perk">{`${getPerkDescription(build[gearType])}`}</div>}
          </Popover.Body>
        </>
          )}
      </Popover>
    );
  };
  
  const determinePlacement = (element) => {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
  
    if (rect.bottom + 200 > viewportHeight) {
      // If there's not enough space below, place it above
      return 'top';
    }
    // Otherwise, place it below
    return 'bottom';
  };

  const DynamicOverlayTrigger = ({ children, className, build, gearType, getPopoverContent }) => {
    const [placement, setPlacement] = useState('bottom');
    const triggerRef = useRef(null);
  
    const ultimateORability = ["ultimate", "ability"];
    const perk = ["perk1", "perk2", "perk3"];
    const gear = ["katana", "ranged", "charm", "gw1", "gw2"]

    useEffect(() => {
      if (triggerRef.current) {
        const newPlacement = determinePlacement(triggerRef.current);
        setPlacement(newPlacement);
      }
    }, []);
  
    return (
      <OverlayTrigger
        trigger="click"
        placement={placement}
        overlay={getPopoverContent(className, build, gearType)}
        rootClose
      >
        <td ref={triggerRef} className={getItemTypeClassName(gearType, build[gearType])}>
        <div className={ultimateORability.includes(gearType) ? "icon-container-round" : perk.includes(gearType) ? "icon-container" : ""}>
          <img
            src={techniquesToImage[build[gearType]]}
            alt={build[gearType] || `No ${gearType}`}
            className={ultimateORability.includes(gearType) || perk.includes(gearType) ? "build-image-selected" : "build-image"}
          />
        </div>
        </td>
      </OverlayTrigger>
    );
  };

  const [openBuilds, setOpenBuilds] = useState({});
  const [allClassOpen, setAllClassOpen] = useState({});
  const [allOpen, setAllOpen] = useState(false);
  // const [allOpen, setAllOpen] = useState({});
  
  const toggleBuild = (className, buildIndex) => {
    const key = `${className}-${buildIndex}`;
    setOpenBuilds((prevOpenBuilds) => ({
      ...prevOpenBuilds,
      [key]: !prevOpenBuilds[key],
    }));
  };

  const toggleAllClassBuilds = (className) => {
    const areAllClassOpen = allClassOpen[className];
    const newOpenBuilds = {};

    groupedBuilds[className].forEach((_, buildIndex) => {
      const key = `${className}-${buildIndex}`;
      newOpenBuilds[key] = !areAllClassOpen;
    });

    setOpenBuilds((prevOpenBuilds) => ({
      ...prevOpenBuilds,
      ...newOpenBuilds,
    }));

    setAllClassOpen((prevAllClassOpen) => ({
      ...prevAllClassOpen,
      [className]: !areAllClassOpen,
    }));
  };

  const toggleAllBuilds = () => {
    const newOpenBuilds = {};
    Object.keys(groupedBuilds).forEach((classKey) => {
      groupedBuilds[classKey].forEach((_, buildIndex) => {
        const key = `${classKey}-${buildIndex}`;
        newOpenBuilds[key] = !allOpen;
      });
    });

    setOpenBuilds(newOpenBuilds);
    setAllOpen(!allOpen);
  };

  
  

  return (
    <div className="content">

<h1 className="build-summary-title">Builds Summary</h1>

      <Container className="d-flex justify-content-center toggle-button-group summary">
        <div className="toolbar-wrapper">
        <ButtonToolbar>
          <ButtonGroup className="me-2">
            {Object.keys(groupedBuilds).map((className, index) => (
              <Button key={index} onClick={() => handleScrollToClass(className)}>
                {className}
              </Button>
            ))}
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar>
        <ButtonGroup>
        <Button onClick={toggleAllBuilds}>{allOpen ? <FaAnglesUp/> : <FaAnglesDown/>}</Button>  
        </ButtonGroup>
        </ButtonToolbar>
        </div>
      </Container>

<Container>
      {Object.keys(groupedBuilds).map((className, classIndex) => (
         <div key={classIndex} ref={(el) => (refs.current[className] = el)}>
          <div className="summary-class-container">
          <div className="clickable-header" onClick={() => handleHeaderClick(className, null)}>
            <img src={techniquesToImage[className]} alt={className} className="build-image"/>
          </div>
          <div className="clickable-header" onClick={() => handleHeaderClick(className, null)}>
            <h2>{className}</h2>
          </div>
          <div>
            <h6 className="number"># Builds: {groupedBuilds[className].length}</h6>
            <p></p>
            <h6 className="number">
              {allClassOpen[className] ? (
                <FaAngleUp onClick={() => toggleAllClassBuilds(className)} />
              ) : (
                <FaAngleDown onClick={() => toggleAllClassBuilds(className)} />
              )}
            </h6>
          </div>
          </div>
          
          
          <div className="responsive-table">
            <Table striped bordered hover className="summary-table">
              <tbody>
                {groupedBuilds[className].map((build, buildIndex) => {
                  const key = `${className}-${buildIndex}`;
                  return (
                  <React.Fragment key={buildIndex}>
                    {buildIndex !== 0 && (
                      <tr className="separator-row">
                        <td colSpan="5" className="separator">-----</td>
                      </tr>
                    )}
                    <tr className="clickable-header-buildName"
                    onClick={() => toggleBuild(className, buildIndex)}
                    >
                      <td colSpan="5" className="build-name">{build.name.toUpperCase()}</td>
                    </tr>
                    <Collapse in={openBuilds[key]}>
                    <tr className="subheader-buildName">
                      <td colSpan="2" className="build-name-sub left">{build.ability}</td>
                      <td className="build-name-sub">
                        {getPerkPosition(className, build.perk1, 'Perk 1')}
                      </td>
                      <td className="build-name-sub">
                        {getPerkPosition(className, build.perk2, 'Perk 2')}
                      </td>
                      <td className="build-name-sub rigth">
                        {getPerkPosition(className, build.perk3, 'Perk 3')}
                      </td>
                    </tr>
                    </Collapse>
                    <Collapse in={openBuilds[key]}>
                    <tr className="build-tec-row">
                    <td colSpan="5">
                      <div className="build-tec-row-container">
                        <DynamicOverlayTrigger className={className} build={build} gearType="ultimate" getPopoverContent={getPopoverContent} />
                        <DynamicOverlayTrigger className={className} build={build} gearType="ability" getPopoverContent={getPopoverContent} />
                        <DynamicOverlayTrigger className={className} build={build} gearType="perk1" getPopoverContent={getPopoverContent} />
                        <DynamicOverlayTrigger className={className} build={build} gearType="perk2" getPopoverContent={getPopoverContent} />
                        <DynamicOverlayTrigger className={className} build={build} gearType="perk3" getPopoverContent={getPopoverContent} />
                          </div>
                      </td>
                    </tr>
                    </Collapse>
                    <Collapse in={openBuilds[key]}>
                    <tr className="build-gear-row">
                    <DynamicOverlayTrigger className={className} build={build} gearType="katana" getPopoverContent={getPopoverContent} />
                    <DynamicOverlayTrigger className={className} build={build} gearType="ranged" getPopoverContent={getPopoverContent} />
                    <DynamicOverlayTrigger className={className} build={build} gearType="charm" getPopoverContent={getPopoverContent} />
                    <DynamicOverlayTrigger className={className} build={build} gearType="gw1" getPopoverContent={getPopoverContent} />
                    <DynamicOverlayTrigger className={className} build={build} gearType="gw2" getPopoverContent={getPopoverContent} />
                    </tr>
                    </Collapse>
                  </React.Fragment>
                  );
              })}
              </tbody>
            </Table>
          </div>
        </div>
      ))}
    </Container>
    </div>
  );
};

export default Home;
