import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import NavBar from '../components/NavBar';

const WishPage = () => {
  const { planetId } = useParams();
  const [wish, setWish] = useState('');
  const [wisherName, setWisherName] = useState('');
  const navigate = useNavigate();

  const planetInfo = {
    sun: { name: 'ดวงอาทิตย์', image: '/img/5.png' },
    mercury: { name: 'ดาวพุธ', image: '/img/6.png' },
    venus: { name: 'ดาวศุกร์', image: '/img/7.png' },
    earth: { name: 'โลก', image: '/img/8.png' },
    mars: { name: 'ดาวอังคาร', image: '/img/9.png' },
    jupiter: { name: 'ดาวพฤหัสบดี', image: '/img/10.png' },
    saturn: { name: 'ดาวเสาร์', image: '/img/11.png' },
    uranus: { name: 'ดาวยูเรนัส', image: '/img/12.png' },
    neptune: { name: 'ดาวเนปจูน', image: '/img/13.png' }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending wish:', { planetId, wisherName, wishText: wish });
      const response = await fetch('http://localhost:3001/submit-wish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planetId,
          wisherName,
          wishText: wish
        }),
      });
      
      const data = await response.json();
      console.log('Response:', data);
      if (data.success) {
        alert('คำอธิษฐานของคุณได้ถูกส่งไปยัง' + planetInfo[planetId].name + 'แล้ว');
        navigate('/space');
      } else {
        alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    }
  };

  return (
    <>
      <NavBar />
      <Container 
        fluid 
        className="vh-100 d-flex align-items-center justify-content-center"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: `url('/img/moonbg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="stars"></div>
        <Card 
          className="wish-card"
          style={{
            background: 'rgba(13, 17, 23, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          }}
        >
          <Card.Body className="text-center">
            <img 
              src={planetInfo[planetId]?.image} 
              alt={planetInfo[planetId]?.name}
              style={{ 
                width: '120px',
                marginBottom: '20px',
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
            <Card.Title 
              className="text-white mb-4"
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            >
              อธิษฐานต่อ{planetInfo[planetId]?.name}
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  value={wisherName}
                  onChange={(e) => setWisherName(e.target.value)}
                  placeholder="กรุณาใส่ชื่อของคุณ..."
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    marginBottom: '1rem',
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    '&:focus': {
                      background: 'rgba(255, 255, 255, 0.15)',
                      boxShadow: '0 0 10px rgba(66, 153, 225, 0.5)'
                    }
                  }}
                  required
                />
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder="เขียนคำอธิษฐานของคุณที่นี่..."
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '12px',
                    transition: 'all 0.3s ease',
                    '&:focus': {
                      background: 'rgba(255, 255, 255, 0.15)',
                      boxShadow: '0 0 10px rgba(66, 153, 225, 0.5)'
                    }
                  }}
                  required
                />
              </Form.Group>
              <Button 
                type="submit"
                variant="primary"
                className="w-100"
                style={{
                  background: 'linear-gradient(45deg, #4299E1, #667EEA)',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(66, 153, 225, 0.4)'
                  }
                }}
              >
                ส่งคำอธิษฐาน
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default WishPage; 