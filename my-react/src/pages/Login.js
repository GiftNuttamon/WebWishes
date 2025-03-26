import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password
      });

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/space');
      } else {
        setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    }
  };

  return (
    <Container 
      fluid 
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'url(/img/regis_login_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '10px' }}>
        <Button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFE5F9',
            fontSize: '24px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(248, 228, 255, 0.1)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s, background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          ←
        </Button>
        <Button
          onClick={() => navigate('/register')}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFE5F9',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(248, 228, 255, 0.1)',
            borderRadius: '25px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s, background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          ลงทะเบียน
        </Button>
      </div>
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow" style={{ 
            backgroundColor: 'rgba(13, 17, 23, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(99, 179, 237, 0.3)',
            borderRadius: '15px'
          }}>
            <Card.Body className="p-4">
              <Card.Title className="text-center mb-4" style={{ color: '#fff' }}>เข้าสู่ระบบ</Card.Title>
              {error && (
                <div className="alert alert-danger" role="alert" style={{
                  backgroundColor: 'rgba(229, 62, 62, 0.1)',
                  color: '#FEB2B2',
                  border: '1px solid #FC8181',
                  marginBottom: '1rem'
                }}>
                  {error}
                </div>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#fff' }}>ชื่อผู้ใช้</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{
                      backgroundColor: 'rgba(45, 55, 72, 0.5)',
                      color: '#fff',
                      border: '1px solid rgba(99, 179, 237, 0.3)'
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label style={{ color: '#fff' }}>รหัสผ่าน</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        backgroundColor: 'rgba(45, 55, 72, 0.5)',
                        color: '#fff',
                        border: '1px solid rgba(99, 179, 237, 0.3)'
                      }}
                    />
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        padding: '0',
                        height: 'auto'
                      }}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </Button>
                  </div>
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100"
                  style={{
                    background: 'linear-gradient(45deg, #4299E1, #667EEA)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(66, 153, 225, 0.3)'
                  }}
                >
                  เข้าสู่ระบบ
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
