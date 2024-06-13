import React, { useState, useContext, useEffect } from "react";
import '../App.css';
import {Container, Image, Table, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import Context from "../context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
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

  const handleHeaderClick = (buildName, buildClass) => {
    
    // context.setSelectedBuild(buildName)
    // context.setSelectedClass(buildClass)
    // context.setMarker(true)
  };
  
  const [isSelected, setIsSelected] = useState(false);

  const handleIconClick = () => {
    setIsSelected(!isSelected);
  };
  const getItemImage = (type, item) => {
    switch (type) {
      case 'katana':
        // Return image for katana item
        break;
      case 'ranged':
        // Return image for ranged item
        break;
      case 'charm':
        // Return image for charm item
        break;
      case 'gw1':
        // Return image for gw1 item
        break;
      case 'gw2':
        // Return image for gw2 item
        break;
      default:
        return null;
    }
  };

  const getTechniquesImages = (techniques) => {
    return techniques.map((technique, index) => (
      <img
        key={index}
        src={techniquesToImage[technique.name]}
        alt={technique.name}
        className="technique-icon"
      />
    ));
  };

  return (
    <div className="content">
      {/* <Container className="toggle-button-group">
        <Link to="/BuildBrowser">
          <Button className="custom-button">
            Browse Builds
          </Button>
        </Link>
        <Link to="/BuildCreator">
          <Button className="custom-button">
            Add Build
          </Button>
        </Link>
      </Container> */}


{/* <h1>prueba de imagenes</h1>
<img src={BnBS} alt={""}></img>
<img src={BnBU} alt={""} className="selected"></img> */}

    {/* <div className="tec-container">
      {isSelected && <span></span>}
    <div onClick={handleIconClick} className="icon-container">
      <Image src={BnB} alt="Icon" className={`icon ${isSelected ? 'selected' : ''}`} />
    </div>
    </div> */}

    {/* <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', padding: 5, marginBottom: 10 }}>
        {techniques.map((technique) => (
          <div style={{ alignItems: 'flex-end', padding: 5 }}>
            <Image className="fotoJugador" src={techniquesToImage[technique]}/>
          </div>
        ))}
      </Container> */}
       
       {/* <div>
      <h1>Assassin Techniques</h1>
      <TechniquesContainer techniques={items.hunterTec} />
    </div> */}

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
                      <td colSpan="2">
                        <TechniquesContainer techniques={items[`${build.class.toLowerCase()}Tec`]} />
                      </td>
                    </tr>
                    <tr>
                      <td className={getItemTypeClassName('katana', build.katana)}>
                        {build.katana ? <img src={getItemImage('katana', build.katana)} alt={build.katana} /> : 'No Katana'}
                      </td>
                      <td className={getItemTypeClassName('ranged', build.ranged)}>
                        {build.ranged ? <img src={getItemImage('ranged', build.ranged)} alt={build.ranged} /> : 'No Ranged'}
                      </td>
                      <td className={getItemTypeClassName('charm', build.charm)}>
                        {build.charm ? <img src={getItemImage('charm', build.charm)} alt={build.charm} /> : 'No Charm'}
                      </td>
                      <td className={getItemTypeClassName('gw1', build.gw1)}>
                        {build.gw1 ? <img src={getItemImage('gw1', build.gw1)} alt={build.gw1} /> : 'No GW1'}
                      </td>
                      <td className={getItemTypeClassName('gw2', build.gw2)}>
                        {build.gw2 ? <img src={getItemImage('gw2', build.gw2)} alt={build.gw2} /> : 'No GW2'}
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

<Container>
      <h1 className="build-summary-title">Builds Summary</h1>
      {Object.keys(groupedBuilds).map((className, classIndex) => (
        <div key={classIndex}>
          <div className="summary-class-container">
            <img src={techniquesToImage[className]} alt={className} className="build-image"/>
            <h2>{className}</h2>
            <h6 className="number">Number of Builds: {groupedBuilds[className].length}</h6>
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
                    <tr>
                      <td colSpan="5" className="build-name">{build.name}</td>
                    </tr>
                    <tr>
                    <td>
                    <img
                          src={techniquesToImage[build.ultimate]}
                          alt={build.ability}
                          className="build-image"
                        />
                        </td>
                      <td>
                        <img
                          src={techniquesToImage[build.ability]}
                          alt={build.ability}
                          className="build-image"
                        />
                      </td>
                      <td>
                        <img
                          src={techniquesToImage[build.perk1]}
                          alt={build.perk1}
                          className="build-image"
                        />
                      </td>
                      <td>
                        <img
                          src={techniquesToImage[build.perk2]}
                          alt={build.perk2}
                          className="build-image"
                        />
                      </td>
                      <td>
                        <img
                          src={techniquesToImage[build.perk3]}
                          alt={build.perk3}
                          className="build-image"
                        />
                      </td>
                    </tr>
                    <tr>
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
