// import React, { useState, useEffect, useContext } from "react";
// import '../App.css';
// import {Container, Row, Col, Button} from 'react-bootstrap'
// // import gh from '../logo.png';
// // import ghFooter from '../logoFooter.png';
// import { Link } from 'react-router-dom';
// // import { navlist } from "./navMenu";
// import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai';
// import { BsChevronRight } from "react-icons/bs";
// import { TfiClose } from "react-icons/tfi";
// // import Context from "../context";
// import Logo from "./TitleLogo";


// const Header = () => {
//     const [sticky, setSticky] = useState(false);

//     // const context= useContext(Context)

//     useEffect(() => {
//       const header = document.getElementById("header");
//       const handleScroll = () => {
//         if (window.pageYOffset > header.offsetTop) {
//           setSticky(true);
//         } else {
//           setSticky(false);
//         }
//       };
//       window.addEventListener("scroll", handleScroll);
  
//       return () => {
//         window.removeEventListener("scroll", handleScroll);
//       };
//     }, []);
  
//   const SidebarItem = ({ item, activeSubmenus, toggleSubmenu, closeSidebar, collapseAllSubmenus }) => {
//     const isActive = activeSubmenus.includes(item);
//     const hasSubmenu = item.submenu && item.submenu.length > 0;
//     const hasComponent = item.component;
  
//     if (hasComponent) { // If item has a component, render a Link
//       return (
//         <li>
//           <Link
//             to={item.link}
//             className="submenu-arrow"
//             onClick={() => {
//               closeSidebar();
//               collapseAllSubmenus();
//             }}
//           >
//             {item.desc}
//           </Link>
//         </li>
//       );
//     }
//     return (
//       <li>
//         <div className={`submenu-arrow ${isActive ? 'open' : ''}`} onClick={() => toggleSubmenu(item)}>
//     {item.desc}
//     {hasSubmenu && isActive && (<AiOutlineDown/>)}
//     {hasSubmenu && !isActive && <AiOutlineRight/>}
//   </div>
//         {hasSubmenu && isActive && (
//           <ul className="nested-submenu">
//             {item.submenu.map((subItem, subIndex) => (
//               <li key={subIndex}>
//                 {subItem.link || subItem.component ? (
//                   <Link
//                     to={subItem.link}
//                     className="navLink"
//                     onClick={() => {
//                       closeSidebar();
//                       collapseAllSubmenus();
//                     }}
//                   >
//                     {subItem.desc}
//                   </Link>
//                 ) : (
//                   <SidebarItem
//                     item={subItem}
//                     activeSubmenus={activeSubmenus}
//                     toggleSubmenu={toggleSubmenu}
//                     closeSidebar={closeSidebar}
//                     collapseAllSubmenus={collapseAllSubmenus}
//                   />
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </li>
//     );
//   };


//   const [sidebarOpen, setSidebarOpen] = useState(false);
    
//     // const [navlistState, setNavlistState] = useState(navlist);
//   const [activeSubmenus, setActiveSubmenus] = useState([]);


//     // const toggleSidebar = () => {
//     //     setSidebarOpen(!sidebarOpen);
//     //       // cierra todos los submenús:
//     //       const updatedNavlist = [...navlistState];
//     //       updatedNavlist[0].submenuOpen = false;
//     //       updatedNavlist[1].submenuOpen = false;
//     //       updatedNavlist[2].submenuOpen = false;
//     //       updatedNavlist[3].submenuOpen = false;
//     //       setNavlistState(updatedNavlist);
//     //       document.body.classList.toggle('sidebar-open', !sidebarOpen);
//     //       context.setSidebarOpen(!context.sidebarOpen)
//     //   }
    


//     const collapseAllSubmenus = () => {
//       setActiveSubmenus([]);
//       // Collapse all submenus logic
//     };

//     // Define the toggleSubmenu and toggleSubmenu2 functions
//     const toggleSubmenu = (item) => {
//       if (activeSubmenus.includes(item)) {
//         setActiveSubmenus(activeSubmenus.filter(submenu => submenu !== item));
//       } else {
//         setActiveSubmenus([...activeSubmenus, item]);
//       }
//     };

//     // const closeSidebar = () => {
//     //   setSidebarOpen(false);
//     //   context.setSidebarOpen(false)
//     //   document.body.classList.toggle('sidebar-open', !sidebarOpen);
//     // };

// return (  
// <div>

// <header id="header" className={`header ${sticky ? "header--sticky" : ""}`}>
//   <div className="d-justify-content-between align-items-center header-padding">
//     <div className="d-flex align-items-center">
//       <h3 className="title-word-class">
//         {/* <span className="title-word">GOT</span>
//         <span> </span>
//         <span className="title-word second-word">LEGENDS</span> */}
//         <Logo/>
//       </h3>
//     </div>
//   </div>
// </header>

// </div>
// );
// };

// export default Header;

import React, { useState, useEffect, useContext } from "react";
import '../App.css';
import {Container, Row, Col, Button} from 'react-bootstrap'
// import gh from '../logo.png';
// import ghFooter from '../logoFooter.png';
import { Link } from 'react-router-dom';
import { navlist } from "./navMenu";
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai';
import { BsChevronRight } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import Context from "../context";
import Logo from "./TitleLogo";
import buttonLogo from '../images/buttonLogo.png'
import { techniquesToImage } from "../images/techniquesToImage";



const Header = () => {
    const [sticky, setSticky] = useState(false);

    const context= useContext(Context)

    useEffect(() => {
      const header = document.getElementById("header");
      const handleScroll = () => {
        if (window.pageYOffset > header.offsetTop) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
  const SidebarItem = ({ item, activeSubmenus, toggleSubmenu, closeSidebar, collapseAllSubmenus }) => {
    
    const isActive = activeSubmenus.includes(item);
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const hasComponent = item.component;
  
    if (hasComponent) { // If item has a component, render a Link
      return (
        <li>
          <Link
            to={item.link}
            className="submenu-arrow"
            onClick={() => {
              closeSidebar();
              collapseAllSubmenus();
            }}
          >
            {item.desc}
          </Link>
        </li>
      );
    }
    return (
      <li>
        <div className={`submenu-arrow ${isActive ? 'open' : ''}`} onClick={() => toggleSubmenu(item)}>
    {item.desc}
    {hasSubmenu && isActive && (<AiOutlineDown/>)}
    {hasSubmenu && !isActive && <AiOutlineRight/>}
  </div>
        {hasSubmenu && isActive && (
          <ul className="nested-submenu">
            {item.submenu.map((subItem, subIndex) => (
              <li key={subIndex}>
                {subItem.link || subItem.component ? (
                  <Link
                    to={subItem.link}
                    className="navLink"
                    onClick={() => {
                      if (item.desc === 'Classes') {
                        context.setMarker(true);
                        context.setSelectedClass(subItem.desc); // Set selected class if item is 'Classes'
                      }
                      closeSidebar();
                      collapseAllSubmenus();
                    }}
                  >
                     {item.desc === 'Classes' && techniquesToImage[subItem.desc] && (
                    <img
                      src={techniquesToImage[subItem.desc]}
                      alt={subItem.desc}
                      style={{ width: '20px', height: '20px', marginRight: '10px' }}
                    />
                  )}
                    {subItem.desc}
                  </Link>
                ) : (
                  <SidebarItem
                    item={subItem}
                    activeSubmenus={activeSubmenus}
                    toggleSubmenu={toggleSubmenu}
                    closeSidebar={closeSidebar}
                    collapseAllSubmenus={collapseAllSubmenus}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };


  const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const [navlistState, setNavlistState] = useState(navlist);
  const [activeSubmenus, setActiveSubmenus] = useState([]);


    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
          // cierra todos los submenús:
          const updatedNavlist = [...navlistState];
          updatedNavlist[0].submenuOpen = false;
          updatedNavlist[1].submenuOpen = false;
          updatedNavlist[2].submenuOpen = false;
          updatedNavlist[3].submenuOpen = false;
          setNavlistState(updatedNavlist);
          document.body.classList.toggle('sidebar-open', !sidebarOpen);
          context.setSidebarOpen(!context.sidebarOpen)
      }
    


    const collapseAllSubmenus = () => {
      setActiveSubmenus([]);
      // Collapse all submenus logic
    };

    // Define the toggleSubmenu and toggleSubmenu2 functions
    const toggleSubmenu = (item) => {
      if (activeSubmenus.includes(item)) {
        setActiveSubmenus(activeSubmenus.filter(submenu => submenu !== item));
      } else {
        setActiveSubmenus([...activeSubmenus, item]);
      }
    };

    const closeSidebar = () => {
      setSidebarOpen(false);
      context.setSidebarOpen(false)
      document.body.classList.toggle('sidebar-open', !sidebarOpen);
    };

return (
  
  <div className={`${sidebarOpen ? 'sidebar-open' : ''}`} >
    
    <div className="sidebar-overlay" onClick={toggleSidebar}></div>

<header id="header" className={`header ${sticky ? "header--sticky" : ""} ${sidebarOpen ? "header-sidebarOpen" : ""}`}>
  
  <div className={`navMenu ${sidebarOpen ? 'active' : ''}`}>
          {/* <div className={`navMenuHeaderTop ${sidebarOpen ? 'active' : ''}`}></div> */}
    {/* <div className="navMenuHeader"> */}
    <div className={`navMenuHeader ${sidebarOpen ? 'active' : ''}`}>
    <div className="ml-auto">
      {/* <img src={gh} alt={""} width="40px" height="40px" style={{marginRight: '1rem'}}/> */}
    </div>
    <div className="d-flex align-items-center">
      <h3 className="title-word-class">
        {/* <span className="title-word-nav">GRAN</span>
        <span> </span>
        <span className="title-word-nav second-word-nav">HERMANO</span> */}
        <Logo/>
      </h3>
    </div>
    </div>
    <ul className="sidebar">
      {navlist.map((item, index) => (
        <SidebarItem
          key={index}
          item={item}
          activeSubmenus={activeSubmenus}
          toggleSubmenu={toggleSubmenu}
          closeSidebar={closeSidebar}
          collapseAllSubmenus={collapseAllSubmenus}
        />
      ))}
      
    </ul>
    
    {/* <footer className="navMenuFooter"> */}
    
    {/* <footer className={`navMenuFooter ${sidebarOpen ? 'active' : ''}`}>
    <div className="logoFooter">
      <img src={ghFooter} alt={""} className="footerImgSize"/>
    </div>
    </footer> */}
  </div>
    
  <div className="d-flex justify-content-between align-items-center w-100 header-padding">
    <button className={`openbtn ${sidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}>
    {sidebarOpen ? <img src={buttonLogo} alt={""} className={`iconNavMenu ${sidebarOpen ? 'active' : ''} close`} /> : <img src={buttonLogo} alt={""} className={`iconNavMenu ${sidebarOpen ? 'active' : ''} open`} />}
    </button>

    {/* {`d-flex align-items-center ${sidebarOpen ? 'hideHeader' : ''}`} */}
    {/* <div className="d-flex align-items-center"> */}
    <div className={`d-flex align-items-center ${sidebarOpen ? 'hideHeader' : 'showHeader'}`}>
      <h3 className="title-word-class">
        {/* <span className="title-word">GRAN</span>
        <span> </span>
        <span className="title-word second-word">HERMANO</span> */}
        <Logo/>
      </h3>
    </div>
    
{/* {!sidebarOpen && ( */}
    <div className={`ml-auto ${sidebarOpen ? 'hideHeader' : 'showHeader'}`}>
      {/* <img src={gh} alt={""} width="40px" height="40px"/> */}
    </div>
{/* )} */}
</div>

</header>

    </div>
    );
  };

export default Header;