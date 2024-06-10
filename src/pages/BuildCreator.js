import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Container, Image, Table, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import BuildForm from './BuildForm';

const BuildCreator = () => {

  return (
    <div className="content">

<Container className="toggle-button-group">
<Link to="/">                
<Button className="custom-button">
        Browse Builds
</Button>
</Link>
<Link to="/BuildList">                
<Button className="custom-button">
        Build List (Delete)
</Button>
</Link>
</Container>

<Container>
    <h1 className="build-creator-title">CREATE NEW BUILD</h1>
    <BuildForm />
</Container>  
  
  
  
  </div>
  );
};

export default BuildCreator;
