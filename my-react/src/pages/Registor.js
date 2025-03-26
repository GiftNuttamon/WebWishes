import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert, Navbar } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const Registor = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mail: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationStatus, setValidationStatus] = useState({
    username: { isChecking: false, isValid: true, message: '' },
    mail: { isChecking: false, isValid: true, message: '' },
    password: { isValid: true, message: '' }
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const checkUsername = async (username) => {
    if (!username) return;
    
    setValidationStatus(prev => ({
      ...prev,
      username: { ...prev.username, isChecking: true }
    }));

    try {
      const response = await axios.post(`${API_URL}/check-username`, { username });
      setValidationStatus(prev => ({
        ...prev,
        username: {
          isChecking: false,
          isValid: response.data.available,
          message: response.data.available ? 'สามารถใช้ชื่อผู้ใช้นี้ได้' : 'ชื่อผู้ใช้นี้ถูกใช้งานแล้ว'
        }
      }));
    } catch (err) {
      setValidationStatus(prev => ({
        ...prev,
        username: {
          isChecking: false,
          isValid: true,
          message: ''
        }
      }));
    }
  };

  const checkEmail = async (email) => {
    if (!email) return;
    
    setValidationStatus(prev => ({
      ...prev,
      mail: { ...prev.mail, isChecking: true }
    }));

    try {
      const response = await axios.post(`${API_URL}/check-email`, { mail: email });
      setValidationStatus(prev => ({
        ...prev,
        mail: {
          isChecking: false,
          isValid: response.data.available,
          message: response.data.available ? 'สามารถใช้อีเมลนี้ได้' : 'อีเมลนี้ถูกใช้งานแล้ว'
        }
      }));
    } catch (err) {
      setValidationStatus(prev => ({
        ...prev,
        mail: {
          isChecking: false,
          isValid: true,
          message: ''
        }
      }));
    }
  };

  const debouncedCheckUsername = debounce(checkUsername, 500);
  const debouncedCheckEmail = debounce(checkEmail, 500);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'username') debouncedCheckUsername(value);
    if (name === 'mail') debouncedCheckEmail(value);
    if (name === 'password') {
      setValidationStatus(prev => ({
        ...prev,
        password: {
          isValid: value.length >= 6,
          message: value.length >= 6 ? 'รหัสผ่านถูกต้อง' : 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร'
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.password || !formData.mail) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    if (!validationStatus.username.isValid || !validationStatus.mail.isValid || !validationStatus.password.isValid) {
      setError('กรุณาตรวจสอบข้อมูลให้ถูกต้อง');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/register`, formData);
      if (response.data.success) {
        setSuccess(true);
      } else {
        setError('เกิดข้อผิดพลาดในการลงทะเบียน');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    }
  };

  return (
    <>
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
            onClick={() => navigate('/login')}
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
            เข้าสู่ระบบ
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
                <Card.Title className="text-center mb-4" style={{ color: '#fff' }}>ลงทะเบียน</Card.Title>
                {error && <Alert variant="danger" style={{ backgroundColor: 'rgba(229, 62, 62, 0.1)', color: '#FEB2B2', border: '1px solid #FC8181' }}>{error}</Alert>}
                {success ? (
                  <div className="text-center">
                    <Alert variant="success" style={{ backgroundColor: 'rgba(72, 187, 120, 0.1)', color: '#9AE6B4', border: '1px solid #68D391' }}>ลงทะเบียนเสร็จสิ้น</Alert>
                    <Button 
                      variant="primary" 
                      onClick={() => navigate('/login')}
                      className="w-100"
                      style={{
                        background: 'linear-gradient(45deg, #4299E1, #667EEA)',
                        border: 'none',
                        boxShadow: '0 4px 15px rgba(66, 153, 225, 0.3)'
                      }}
                    >
                      ไปยังหน้าเข้าสู่ระบบ
                    </Button>
                  </div>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#fff' }}>ชื่อผู้ใช้</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{
                          backgroundColor: 'rgba(45, 55, 72, 0.5)',
                          color: '#fff',
                          border: validationStatus.username.isChecking ? '1px solid #FCD34D' :
                                 validationStatus.username.isValid ? '1px solid rgba(99, 179, 237, 0.3)' :
                                 '1px solid #FC8181'
                        }}
                      />
                      {validationStatus.username.message && (
                        <Form.Text style={{ 
                          color: validationStatus.username.isValid ? '#9AE6B4' : '#FEB2B2'
                        }}>
                          {validationStatus.username.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#fff' }}>รหัสผ่าน</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          style={{
                            backgroundColor: 'rgba(45, 55, 72, 0.5)',
                            color: '#fff',
                            border: validationStatus.password.isValid ? '1px solid rgba(99, 179, 237, 0.3)' : '1px solid #FC8181'
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
                      {validationStatus.password.message && (
                        <Form.Text style={{ 
                          color: validationStatus.password.isValid ? '#9AE6B4' : '#FEB2B2'
                        }}>
                          {validationStatus.password.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label style={{ color: '#fff' }}>อีเมล</Form.Label>
                      <Form.Control
                        type="email"
                        name="mail"
                        value={formData.mail}
                        onChange={handleChange}
                        required
                        style={{
                          backgroundColor: 'rgba(45, 55, 72, 0.5)',
                          color: '#fff',
                          border: validationStatus.mail.isChecking ? '1px solid #FCD34D' :
                                 validationStatus.mail.isValid ? '1px solid rgba(99, 179, 237, 0.3)' :
                                 '1px solid #FC8181'
                        }}
                      />
                      {validationStatus.mail.message && (
                        <Form.Text style={{ 
                          color: validationStatus.mail.isValid ? '#9AE6B4' : '#FEB2B2'
                        }}>
                          {validationStatus.mail.message}
                        </Form.Text>
                      )}
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
                      ลงทะเบียน
                    </Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Registor; 