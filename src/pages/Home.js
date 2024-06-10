import React, { useState, useContext, useEffect } from "react";
import '../App.css';
import {Container, Image, Table, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
// import Context from "../context";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaVoteYea } from 'react-icons/fa';
import {BsFillPersonLinesFill, BsReverseLayoutTextWindowReverse, BsCalendarWeek, BsXCircle, BsAward, BsCalendar2Check, BsFillBarChartLineFill} from 'react-icons/bs';
// import { participants, participantsChart } from "../data/participantsData";
import { fetchData } from '../componentes/DataService';
import items from "../data/data";
import { IoEye } from "react-icons/io5";


function Home() {

// /*inicio llamado de datos automaticos*/
const [builds, setBuilds] = useState([]);
const [filteredBuilds, setFilteredBuilds] = useState([]);
const [selectedClass, setSelectedClass] = useState('All');
// const [participantsChart, setParticipantsChart] = useState([]);

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
        setFilteredBuilds(sortedBuilds);
      } else {
      console.error('Invalid data format:', builds);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchDataFromAPI();
}, []);

const [hiddenColumns, setHiddenColumns] = useState([]);

const toggleColumn = (key) => {
  if (hiddenColumns.includes(key)) {
    setHiddenColumns(hiddenColumns.filter(col => col !== key));
  } else {
    setHiddenColumns([...hiddenColumns, key]);
  }
};

const handleHeaderClick = (buildName) => {
  if (selectedClass !== "All") {
    const columnsToHide = filteredBuilds
      .filter(build => build.class === selectedClass && build.name !== buildName)
      .map(build => build.name);
    setHiddenColumns([...new Set([...hiddenColumns, ...columnsToHide])]);
  }
};

const handleClassFilter = (className) => {
  setHiddenColumns([])  
  if (className === 'All') {
      setFilteredBuilds(builds);
    } else {
      const filtered = builds.filter(build => build.class === className);
      setFilteredBuilds(filtered);
    }
    setSelectedClass(className);
  };

  const getPropertyValue = (propName) => {
    const prop = items.props.find(p => p.name === propName);
    return prop ? prop.value : '';
  };

   const getBuildProperties = (build) => {
    const buildProps = {};
    Object.keys(build).forEach(key => {
      if (key.includes("_prop1") || key.includes("_prop2")) {
        const propName = build[key];
        const propValue = getPropertyValue(propName);
        if (propName) {
          buildProps[propName] = propValue;
        }
      }
    });
    return buildProps;
  };
  

  const selectedBuild = filteredBuilds.find(build => selectedClass !== 'All' && !hiddenColumns.includes(build.name) && hiddenColumns.length >= 1);
  const buildProps = selectedBuild ? getBuildProperties(selectedBuild) : {};

 // Define header mapping
 const headerMapping = {
    name: "BUILD",
    class: "CLASS",
    ultimate: "ULTIMATE",
    ability: "ABILITY",
    perk1: "PERK 1",
    perk2: "PERK 2",
    perk3: "PERK 3",
    katana: "KATANA",
    katana_prop1: "PROP 1",
    katana_prop2: "PROP 2",
    katana_perk1: "PERK 1",
    katana_perk2: "PERK 2",
    ranged: "RANGED",
    ranged_prop1: "PROP 1",
    ranged_prop2: "PROP 2",
    ranged_perk1: "PERK 1",
    ranged_perk2: "PERK 2",
    charm: "CHARM",
    charm_prop1: "PROP 1",
    charm_prop2: "PROP 2",
    charm_perk1: "PERK 1",
    charm_perk2: "PERK 2",
    gw1: "GHOST WEAPON 1",
    gw1_prop1: "PROPERTY 1",
    gw1_prop2: "PROPERTY 2",
    gw1_perk1: "PERK 1",
    gw1_perk2: "PERK 2",
    gw2: "GHOST WEAPON 2",
    gw2_prop1: "PROP 1",
    gw2_prop2: "PROP 2",
    gw2_perk1: "PERK 1",
    gw2_perk2: "PERK 2"
  };

  // Check if builds has data before proceeding
  if (builds.length === 0) {
    return <p>Loading...</p>;
  }

const properties = Object.keys(builds[0]).filter(prop => prop !== 'name');

 return (
<div className="content">
{/* <div className="paddingContent"></div> */}
{/* <Container className="navigation">
  {icons.map((item, index) => (
    <Link to={item.to} key={index} className='icon'>
      <div className="icon-wrapper">
        <div className="icon">
          <item.icon />
        </div>
      </div>
      <div className="label">{item.label}</div>
    </Link>
  ))}
</Container> */}
<Container className="toggle-button-group">
<Link to="/BuildCreator">                
<Button className="custom-button">
Add Build
</Button>
</Link>
<Link to="/BuildList">                
<Button className="custom-button">
        Build List (Delete)
</Button>
</Link>
</Container>

  
    <Container className="d-flex justify-content-center toggle-button-group">
        <ButtonToolbar>
            <ButtonGroup>
                <Button onClick={() => handleClassFilter('All')} className={selectedClass === 'All' ? 'active' : ''}>All Builds</Button>
                <Button onClick={() => handleClassFilter('Hunter')} className={selectedClass === 'Hunter' ? 'active' : ''}>Hunter</Button>
                <Button onClick={() => handleClassFilter('Assassin')} className={selectedClass === 'Assassin' ? 'active' : ''}>Assassin</Button>
                <Button onClick={() => handleClassFilter('Ronin')} className={selectedClass === 'Ronin' ? 'active' : ''}>Ronin</Button>
                <Button onClick={() => handleClassFilter('Samurai')} className={selectedClass === 'Samurai' ? 'active' : ''}>Samurai</Button>
            </ButtonGroup>
        </ButtonToolbar>
      </Container>
      
      <Container className="builds-container align-items-center">
      {/* <h1>Builds Table</h1> */}

      {hiddenColumns.length > 0 && (
        <div className="columnToggleButtons">
          {/* <span className="toggleButtonTitulo">COLUMNAS OCULTAS</span> */}
          {hiddenColumns.map(key => (
            <button key={key} onClick={() => toggleColumn(key)} className="toggleButton">
              {key}
            </button>
          ))}
          {/* <button onClick={toggleAllColumns} className="toggleButton MostrarTodo">Mostrar todo</button> */}
        </div>
      )}

      <Table className={`builds-table ${selectedClass !== 'All' && hiddenColumns.length >= 1 ? 'selectedBuild' : ''}`}>
        <thead>
          <tr>
            <th className="builds-header">BUILD</th>
            {filteredBuilds.map((build, index) => (
              !hiddenColumns.includes(build.name) && (
                <th key={index} className="builds-header">{build.name}
                <IoEye
                    className={`icon-eye ${selectedClass === 'All' || hiddenColumns.length >= 1 ? 'hidden' : ''}`}
                    onClick={() => handleHeaderClick(build.name)}
                  />
                </th>
              )
            ))}
            {selectedClass !== 'All' && hiddenColumns.length >= 1 && (
                <th className="builds-header"></th>
              )}
          </tr>
        </thead>
        <tbody>
            {properties.map((property, index) => {
      const shouldAddBreak = ["ability", "perk3", "katana_perk2", "ranged_perk2", "charm_perk2", "gw1_perk2"].includes(property);
      const isPerk = property.includes("_perk1") || property.includes("_perk2");
      return (
        <tr key={index} className={shouldAddBreak ? "table-break" : ""}>
          <th>{headerMapping[property]}</th>
          {filteredBuilds.map((build, idx) => {
              if (hiddenColumns.includes(build.name)) return null;
            const item = items[property]?.find(
              (item) => item.name === build[property]
            );
            const itemType = item ? item.type : "";
            const cellClass = itemType ? itemType.toLowerCase() : "";
            const perkClass = isPerk ? "perk" : "not-perk";
            const content = isPerk ? build[property].toUpperCase() : build[property];
            const propertyValue = buildProps[build[property]] || '';

            return (
              <React.Fragment key={idx}>
              <td className={`${cellClass} ${perkClass}`}>
                {content}
              </td>
              {selectedClass !== 'All' && hiddenColumns.length >= 1 && (
                <td className={`${cellClass} ${perkClass}`}>{propertyValue}</td>
              )}
            </React.Fragment>
            );
          })}
        </tr>
      );
    })}
        </tbody>
      </Table>
      </Container>


</div>
);
}  
export default Home;