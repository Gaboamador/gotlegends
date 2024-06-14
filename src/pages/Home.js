import React, { useState, useContext, useEffect, useRef } from "react";
import '../App.css';
import {Container, Image, Table, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import Context from "../context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaVoteYea } from 'react-icons/fa';
import {BsFillPersonLinesFill, BsReverseLayoutTextWindowReverse, BsCalendarWeek, BsXCircle, BsAward, BsCalendar2Check, BsFillBarChartLineFill} from 'react-icons/bs';
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


  return (
    <div className="content">

<h1 className="build-summary-title">Builds Summary</h1>

      <Container className="d-flex justify-content-center toggle-button-group summary">
        <ButtonToolbar>
          <ButtonGroup>
            {Object.keys(groupedBuilds).map((className, index) => (
              <Button key={index} onClick={() => handleScrollToClass(className)}>
                {className}
              </Button>
            ))}
          </ButtonGroup>
        </ButtonToolbar>
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
            <h6 className="number"># Builds</h6>
            <h6 className="number">{groupedBuilds[className].length}</h6>
          </div>
            
          </div>
          
          
          <div className="responsive-table">
            <Table striped bordered hover className="summary-table">
              <tbody>
                {groupedBuilds[className].map((build, buildIndex) => (
                  <React.Fragment key={buildIndex}>
                    {buildIndex !== 0 && (
                      <tr className="separator-row">
                        <td colSpan="5" className="separator">-----</td>
                      </tr>
                    )}
                    <tr className="clickable-header-buildName" onClick={() => handleHeaderClick(className, build.name)}>
                      <td colSpan="5" className="build-name">{build.name.toUpperCase()}</td>
                    </tr>
                    <tr className="build-tec-row">
                    <td colSpan="5">
                      <div className="build-tec-row-container">
                          <div className="icon-container-round">
                          <img
                                src={techniquesToImage[build.ultimate]}
                                alt={build.ability}
                                className="build-image-selected"
                              />
                              </div>
                              {/* </td>
                            <td> */}
                            <div className="icon-container-round">
                              <img
                                src={techniquesToImage[build.ability]}
                                alt={build.ability}
                                className="build-image-selected"
                              />
                              </div>
                            {/* </td>
                            <td> */}
                              <div className="icon-container">
                              <img
                                src={techniquesToImage[build.perk1]}
                                alt={build.perk1}
                                className="build-image-selected"
                              />
                              </div>
                            {/* </td>
                            <td> */}
                            <div className="icon-container">
                              <img
                                src={techniquesToImage[build.perk2]}
                                alt={build.perk2}
                                className="build-image-selected"
                              />
                              </div>
                            {/* </td>
                            <td> */}
                            <div className="icon-container">
                              <img
                                src={techniquesToImage[build.perk3]}
                                alt={build.perk3}
                                className="build-image-selected"
                              />
                              </div>
                          </div>
                      </td>
                    </tr>
                    <tr className="build-gear-row">
                      <td className={getItemTypeClassName('katana', build.katana)}>
                        <img
                          src={techniquesToImage[build.katana]}
                          alt={build.katana || 'No Katana'}
                          className="build-image"
                        />
                      </td>
                      <td className={getItemTypeClassName('ranged', build.ranged)}>
                        <img
                          src={techniquesToImage[build.ranged]}
                          alt={build.ranged || 'No Ranged'}
                          className="build-image"
                        />
                      </td>
                      <td className={getItemTypeClassName('charm', build.charm)}>
                        <img
                          src={techniquesToImage[build.charm]}
                          alt={build.charm || 'No Charm'}
                          className="build-image"
                        />
                      </td>
                      <td className={getItemTypeClassName('gw1', build.gw1)}>
                        <img
                          src={techniquesToImage[build.gw1]}
                          alt={build.gw1 || 'No GW1'}
                          className="build-image"
                        />
                      </td>
                      <td className={getItemTypeClassName('gw2', build.gw2)}>
                        <img
                          src={techniquesToImage[build.gw2]}
                          alt={build.gw2 || 'No GW2'}
                          className="build-image"
                        />
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      ))}
    </Container>
      
      {/* <Container>
        <h1 className="build-creator-title">Builds Summary</h1>
        {Object.keys(groupedBuilds).map((className, classIndex) => (
          <div key={classIndex}>
            <h2>Class: {className}</h2>
            <p>Number of Builds: {groupedBuilds[className].length}</p>
            <div className="responsive-table">
            <Table striped bordered hover>
              <tbody>
                {groupedBuilds[className].map((build, buildIndex) => (
                  <React.Fragment key={buildIndex}>
                    {buildIndex !== 0 && (
                        <tr className="separator-row">
                          <td colSpan="5" className="separator">-----</td>
                        </tr>
                      )}
                    <tr>
                      <td colSpan="5" className="build-name">{build.name}</td>
                    </tr>
                    <tr>
                      <td colSpan="5">{build.ability}</td>
                    </tr>
                    <tr>
                      <td>{build.perk1}</td>
                      <td>{build.perk2}</td>
                      <td>{build.perk3}</td>
                      <td colSpan="2"></td>
                      </tr>
                    <tr>
                    <td className={getItemTypeClassName('katana', build.katana)}>
                        {build.katana || 'No Katana'}
                      </td>
                      <td className={getItemTypeClassName('ranged', build.ranged)}>
                        {build.ranged || 'No Ranged'}
                      </td>
                      <td className={getItemTypeClassName('charm', build.charm)}>
                        {build.charm || 'No Charm'}
                      </td>
                      <td className={getItemTypeClassName('gw1', build.gw1)}>
                        {build.gw1 || 'No GW1'}
                      </td>
                      <td className={getItemTypeClassName('gw2', build.gw2)}>
                        {build.gw2 || 'No GW2'}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
            </div>
          </div>
        ))}
      </Container> */}
    </div>
  );
};

export default Home;
