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
      <Container>
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
                    {/* <tr onClick={() => handleHeaderClick(build.name, build.class)}> */}
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
      </Container>
    </div>
  );
};

export default Home;
