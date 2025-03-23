import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container 
      fluid 
      className="min-vh-100 d-flex flex-column"
      style={{
        backgroundImage: "url('/img/homebg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      <Row className="text-center" style={{ marginTop: '15vh' }}>
        <Col>
          <h1 
            className="text-white mb-2"
            style={{
              fontSize: '3.5rem',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              color: '#FFE5F9'
            }}
          >
            คำอธิษฐานแห่งดวงดาว
          </h1>
          <h2 
            className="mb-4"
            style={{
              fontSize: '1.8rem',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              color: '#FFE5F9'
            }}
          >
            บินไปขอพรที่ดวงดาวกัน
          </h2>
        </Col>
      </Row>
      <Row style={{ marginTop: '35vh' }}>
        <Col className="d-flex flex-column align-items-start" style={{ paddingLeft: '15vw' }}>
          <Button 
            variant="light"
            size="lg"
            className="mb-3 rounded-pill"
            style={{
              width: '200px',
              padding: '15px 0',
              fontSize: '1.2rem',
              background: 'linear-gradient(to right, #F8E4FF, #E7C6FF)',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              color: '#4A4A4A'
            }}
            onClick={() => navigate('/register')}
          >
            ลงทะเบียน
          </Button>
          <Button 
            variant="light"
            size="lg"
            className="rounded-pill"
            style={{
              width: '200px',
              padding: '15px 0',
              fontSize: '1.2rem',
              background: 'linear-gradient(to right, #F8E4FF, #E7C6FF)',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              color: '#4A4A4A'
            }}
            onClick={() => navigate('/login')}
          >
            ล็อคอิน
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home; 