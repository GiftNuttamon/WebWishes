import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';

const WishPage = () => {
  const { planetId } = useParams();
  const [wish, setWish] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // ตรงนี้สามารถเพิ่มการบันทึกคำอธิษฐานลงฐานข้อมูลได้
    alert('คำอธิษฐานของคุณได้ถูกส่งไปยัง' + planetInfo[planetId].name + 'แล้ว');
    navigate('/space');
  };

  return (
    <Container 
      fluid 
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(to bottom, #000033, #000066)',
        position: 'relative',
        overflow: 'hidden'
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
          width: '90%'
        }}
      >
        <Card.Body className="text-center">
          <img 
            src={planetInfo[planetId]?.image} 
            alt={planetInfo[planetId]?.name}
            style={{ width: '100px', marginBottom: '20px' }}
          />
          <Card.Title className="text-white mb-4">
            อธิษฐานต่อ{planetInfo[planetId]?.name}
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Control
                as="textarea"
                rows={4}
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="เขียนคำอธิษฐานของคุณที่นี่..."
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
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
                border: 'none'
              }}
            >
              ส่งคำอธิษฐาน
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WishPage; 