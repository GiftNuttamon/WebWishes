import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Navbar 
      className="justify-content-between px-4"
      style={{
        background: 'linear-gradient(to right, rgba(1, 8, 18, 0.95), rgba(11, 11, 47, 0.95))',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Navbar.Brand 
        onClick={() => navigate('/space')} 
        style={{ 
          cursor: 'pointer',
          color: '#fff',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}
      >
        ✨ คำอธิษฐานแห่งดวงดาว
      </Navbar.Brand>
      <div>
        <Button 
          variant="outline-light" 
          className="me-2" 
          onClick={() => navigate('/space')}
          style={{
            borderColor: 'rgba(255, 255, 255, 0.3)',
            background: location.pathname === '/space' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          🕯️ เลือกดวงดาวอธิษฐาน
        </Button>
        <Button 
          variant="outline-light" 
          className="me-2" 
          onClick={() => navigate('/allwish')}
          style={{
            borderColor: 'rgba(255, 255, 255, 0.3)',
            background: location.pathname === '/allwish' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          🌟 ดูคำขอพรทั้งหมด
        </Button>
        <Button 
          variant="danger" 
          onClick={handleLogout}
          style={{
            borderColor: 'rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          👋 ออกจากระบบ
        </Button>
      </div>
    </Navbar>
  );
};

export default NavBar; 