import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

const Registor = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mail: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form data
    if (!formData.username || !formData.password || !formData.mail) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    try {
      // Send registration data to backend
      const response = await axios.post('http://localhost:4000/register', formData);
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
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <Card.Title className="text-center mb-4">ลงทะเบียน</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              {success ? (
                <div className="text-center">
                  <Alert variant="success">ลงทะเบียนเสร็จสิ้น</Alert>
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/login')}
                    className="w-100"
                  >
                    ไปยังหน้าเข้าสู่ระบบ
                  </Button>
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>ชื่อผู้ใช้</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>รหัสผ่าน</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>อีเมล</Form.Label>
                    <Form.Control
                      type="email"
                      name="mail"
                      value={formData.mail}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    ลงทะเบียน
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Registor; 