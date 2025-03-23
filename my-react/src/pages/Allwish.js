import React, { useState, useEffect } from 'react';
import { Container, Table, Image } from 'react-bootstrap';
import NavBar from '../components/NavBar';

const Allwish = () => {
  const [wishes, setWishes] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const planets = [
    { id: 'sun', name: 'ดวงอาทิตย์', image: '/img/5.png' },
    { id: 'mercury', name: 'ดาวพุธ', image: '/img/6.png' },
    { id: 'venus', name: 'ดาวศุกร์', image: '/img/7.png' },
    { id: 'earth', name: 'โลก', image: '/img/8.png' },
    { id: 'mars', name: 'ดาวอังคาร', image: '/img/9.png' },
    { id: 'jupiter', name: 'ดาวพฤหัสบดี', image: '/img/10.png' },
    { id: 'saturn', name: 'ดาวเสาร์', image: '/img/11.png' },
    { id: 'uranus', name: 'ดาวยูเรนัส', image: '/img/12.png' },
    { id: 'neptune', name: 'ดาวเนปจูน', image: '/img/13.png' }
  ];

  useEffect(() => {
    fetchWishes();
  }, [selectedPlanet]);

  const fetchWishes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const url = selectedPlanet 
        ? `http://localhost:3001/wishes/${selectedPlanet}`
        : 'http://localhost:3001/wishes';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch wishes');
      }
      const data = await response.json();
      setWishes(data);
    } catch (error) {
      console.error('Error fetching wishes:', error);
      setError('Failed to load wishes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // เพิ่ม CSS animation สำหรับไอคอนดวงดาว
  const planetImageStyle = {
    width: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
    animation: 'pulse 2s infinite',
  };

  return (
    <div style={{
      backgroundColor: '#000033',
      minHeight: '100vh',
      paddingBottom: '2rem'
    }}>
      <NavBar />
      <Container className="mt-4">
        <div className="text-center mb-4">
          <h2 className="mb-4 cosmic-title" 
              style={{
                color: '#fff',
                textShadow: '0 0 10pxrgb(0, 0, 0), 0 0 20px #00ff99, 0 0 30px #00ff99',
                fontFamily: "'Arial', sans-serif",
                fontSize: '2.5rem',
                letterSpacing: '3px'
              }}>
            ✨ คำอธิษฐานทั้งหมด ✨
          </h2>
          <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
            {planets.map((planet) => (
              <Image
                key={planet.id}
                src={planet.image}
                alt={planet.name}
                style={{
                  ...planetImageStyle,
                  opacity: selectedPlanet === planet.id ? 1 : 0.5,
                  transform: selectedPlanet === planet.id ? 'scale(1.2)' : 'scale(1)',
                }}
                onClick={() => setSelectedPlanet(selectedPlanet === planet.id ? null : planet.id)}
                title={planet.name}
              />
            ))}
          </div>
        </div>

        {isLoading && <div className="text-center">กำลังโหลดข้อมูล...</div>}
        {error && <div className="text-center text-danger">{error}</div>}
        {!isLoading && !error && (
          <Table striped bordered hover 
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              color: '#fff',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 0 20px rgba(0, 255, 153, 0.3)'
            }}>
            <thead>
              <tr style={{
                background: 'rgba(0, 255, 153, 0.2)',
                borderBottom: '2px solid rgba(0, 255, 153, 0.5)'
              }}>
                <th>ดวงดาว</th>
                <th>ชื่อผู้อธิษฐาน</th>
                <th>คำอธิษฐาน</th>
                <th>วันที่</th>
              </tr>
            </thead>
            <tbody>
              {wishes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">ไม่พบข้อมูลคำอธิษฐาน</td>
                </tr>
              ) : (
                wishes.map((wish) => (
                  <tr key={wish.id} style={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(0, 255, 153, 0.1)',
                    }
                  }}>
                    <td>{planets.find(p => p.id === wish.planet_id)?.name}</td>
                    <td>{wish.wisher_name}</td>
                    <td>{wish.wish_text}</td>
                    <td>{new Date(wish.created_at).toLocaleDateString('th-TH')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </Container>

      <style>{`
        @keyframes pulse {
          0% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5)); }
          50% { filter: drop-shadow(0 0 15px rgba(0, 255, 153, 0.8)); }
          100% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5)); }
        }
        
        tr:hover {
          background: rgba(0, 255, 153, 0.1) !important;
        }

        body {
          background-color: #000033;
        }
      `}</style>
    </div>
  );
};

export default Allwish; 