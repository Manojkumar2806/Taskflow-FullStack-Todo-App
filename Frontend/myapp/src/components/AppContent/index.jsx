import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import  TodosPage  from "../TodosPage/TodosPage";
import DashboardPage from '../DashboardPage';
// import './index.css'

function AppContent() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [darkMode, setDarkMode] = useState(true);
    const location = useLocation();
  
  
    useEffect(() => {
      if (darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);
  
  
    useEffect(() => {
      const handleResize = () => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        
  
        if (mobile) {
          setSidebarCollapsed(true);
        } else {
          setSidebarCollapsed(false);
        }
      };
  
      window.addEventListener('resize', handleResize);
      handleResize(); 
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
  
    const toggleSidebar = () => {
      setSidebarCollapsed(!sidebarCollapsed);
    };
  
  
    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    };
  
    const handleNavClick = () => {
      if (isMobile) {
        setSidebarCollapsed(true);
      }
    };
  
  
    const getPageTitle = () => {
      if (location.pathname === '/dashboard') return 'Dashboard';
      return 'Todos';
    };
  
    return (
      <div className={`wrapper ${darkMode ? 'bg-dark' : 'bg-light'}`}>
  
        <nav id="sidebar" className={sidebarCollapsed ? 'collapsed' : ''}>
          <div className="sidebar-header">
            <h3>Sidebar</h3>
            {isMobile && (
              <button className="close-sidebar-btn" onClick={toggleSidebar}>
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
  
          <ul className="list-unstyled components">
            <li className={location.pathname === '/todos' || location.pathname === '/' ? 'active' : ''}>
              <Link to="/todos" onClick={handleNavClick}>
                <i className="bi bi-list-check"></i>
                <span>Todos</span>
              </Link>
            </li>
            <li className={location.pathname === '/dashboard' ? 'active' : ''}>
              <Link to="/dashboard" onClick={handleNavClick}>
                <i className="bi bi-speedometer2"></i>
                <span>Dashboard</span>
              </Link>
            </li>
          </ul>
  
          <div className="sidebar-footer">
            <button onClick={toggleDarkMode}>
              <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`}></i>
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </nav>
  
  
        <div id="content">
          <nav className="navbar">
            <div className="container-fluid">
              <button type="button" id="sidebarCollapse" className="btn" onClick={toggleSidebar}>
                <i className={`bi ${sidebarCollapsed ? 'bi-list' : 'bi-x'}`}></i>
              </button>
              <h4 className="navbar-title">{getPageTitle()}</h4>
              <div></div> 
            </div>
          </nav>
  
          <div className="container-fluid content-wrapper">
            <Routes>
              <Route path="/" element={<TodosPage darkMode={darkMode} />} />
              <Route path="/todos" element={<TodosPage darkMode={darkMode} />} />
              <Route path="/dashboard" element={<DashboardPage darkMode={darkMode}/>} />
            </Routes>
          </div>
        </div>
  
  
        {isMobile && !sidebarCollapsed && (
          <div className="overlay" onClick={toggleSidebar}></div>
        )}
      </div>
    );
  }
  export default AppContent;