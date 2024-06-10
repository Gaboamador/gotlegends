import React, { useState, useEffect } from 'react';
import { fetchData, pushDataDeleteBuilds } from '../componentes/DataService';
import { Link } from 'react-router-dom';
import {Container, Image, Table, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

const BuildList = () => {
    const [builds, setBuilds] = useState([]);
    const [selectedBuilds, setSelectedBuilds] = useState([]);

    // Fetch existing builds
    useEffect(() => {
        const fetchBuilds = async () => {
            try {
                const { builds } = await fetchData();
                setBuilds(builds);
            } catch (error) {
                console.error('Error fetching builds:', error);
            }
        };
        fetchBuilds();
    }, []);

// // Delete selected builds
// const handleDelete = () => {
//     const updatedBuilds = builds.filter(build => !selectedBuilds.includes(build));
//     setSelectedBuilds([]);

//     // If updatedBuilds is empty, don't push it, just return
//     if (updatedBuilds.length === 0) {
//         return;
//     }

//     // Push edited builds
//     pushDataDeleteBuilds(updatedBuilds)
//         .then(() => {
//             alert('Selected builds deleted successfully');
//         })
//         .catch(error => {
//             console.error('Error deleting builds:', error);
//         });
// };
 // Delete selected builds
 const handleDelete = () => {
    const buildsToDelete = builds.filter(build => selectedBuilds.includes(build));
    const buildNames = buildsToDelete.map(build => build.name).join(', ');

    const confirmDelete = window.confirm(`Are you sure you want to delete the following builds: ${buildNames}?`);

    if (confirmDelete) {
      const updatedBuilds = builds.filter(build => !selectedBuilds.includes(build));
      setSelectedBuilds([]);

      // Push edited builds
      pushDataDeleteBuilds(updatedBuilds)
        .then(() => {
          alert('Selected builds deleted successfully');
          setBuilds(updatedBuilds);
        })
        .catch(error => {
          console.error('Error deleting builds:', error);
        });
    }
  };

    // Sort builds by class and then by name
    const sortedBuilds = builds.sort((a, b) => {
        if (a.class < b.class) return -1;
        if (a.class > b.class) return 1;
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });


    return (
        <div className="content">

<Container className="toggle-button-group">
<Link to="/">                
<Button className="custom-button">
Browse Builds
</Button>
</Link>
<Link to="/BuildCreator">                
<Button className="custom-button">
Add Build
</Button>
</Link>
</Container>

<Container>
<h1 className="build-creator-title">EXISTING BUILDS</h1>


<Table striped bordered hover className="delete-builds-table">
          <thead>
            <tr>
              <th>BUILD NAME</th>
              <th>CLASS</th>
              <th>MARK</th>
            </tr>
          </thead>
          <tbody>
  {sortedBuilds.map((build, index) => (
    <tr key={build.id || index} className={selectedBuilds.includes(build) ? 'marked-for-deletion' : ''}>
    <td>{build.name}</td>
    <td>{build.class}</td>
    <td>
      <input
        type="checkbox"
        checked={selectedBuilds.includes(build)}
        onChange={() => {
          if (selectedBuilds.includes(build)) {
            setSelectedBuilds(selectedBuilds.filter(selectedBuild => selectedBuild !== build));
          } else {
            setSelectedBuilds([...selectedBuilds, build]);
          }
        }}
      />
    </td>
  </tr>
  ))}
   </tbody>
   </Table>

   {/* <Container>
    <span>Marked for deletion</span>
    <Table striped bordered hover className="delete-builds-table">
    <thead>
            <tr>
              <th>BUILD NAME</th>
              <th>CLASS</th>
            </tr>
          </thead>
          <tbody>
   {selectedBuilds.map((build, index) => (
    <tr key={build.id || index} className={selectedBuilds.includes(build) ? 'marked-for-deletion' : ''}>
    <td>{build.name}</td>
    <td>{build.class}</td>
  </tr>
  ))}
    </tbody>
    </Table>
   </Container> */}


<Container className="d-flex justify-content-center toggle-button-group">
<Button className="custom-button" onClick={handleDelete}>Delete Selected Builds</Button>
</Container>

</Container>


        </div>
    );
};

export default BuildList;
