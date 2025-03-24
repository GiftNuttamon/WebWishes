import React, { useState, useEffect } from 'react';
import { Container, Table, Image } from 'react-bootstrap';
import NavBar from '../components/NavBar';

const Allwish = () => {
  const [wishes, setWishes] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const planets = [
    { id: 'sun', name: 'SUN', thaiName: 'ดวงอาทิตย์', image: '/img/5.png' },
    { id: 'mercury', name: 'MERCURY', thaiName: 'ดาวพุธ', image: '/img/6.png' },
    { id: 'venus', name: 'VENUS', thaiName: 'ดาวศุกร์', image: '/img/7.png' },
    { id: 'earth', name: 'EARTH', thaiName: 'โลก', image: '/img/8.png' },
    { id: 'mars', name: 'MARS', thaiName: 'ดาวอังคาร', image: '/img/9.png' },
    { id: 'jupiter', name: 'JUPITER', thaiName: 'ดาวพฤหัสบดี', image: '/img/10.png' },
    { id: 'saturn', name: 'SATURN', thaiName: 'ดาวเสาร์', image: '/img/11.png' },
    { id: 'uranus', name: 'URANUS', thaiName: 'ดาวยูเรนัส', image: '/img/12.png' },
    { id: 'neptune', name: 'NEPTUNE', thaiName: 'ดาวเนปจูน', image: '/img/13.png' }
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

  // เพิ่มฟังก์ชันสำหรับกำหนดสีตามดาว
  const getPlanetHeaderStyle = (planetId) => {
    const colors = {
      sun: 'rgba(255, 165, 0, 0.3)',      // สีส้ม
      mercury: 'rgba(169, 169, 169, 0.3)', // สีเทา
      venus: 'rgba(255, 198, 89, 0.3)',    // สีเหลืองอมส้ม
      earth: 'rgba(100, 149, 237, 0.3)',   // สีฟ้า
      mars: 'rgba(255, 69, 0, 0.3)',       // สีแดง
      jupiter: 'rgba(255, 140, 0, 0.3)',   // สีส้มเข้ม
      saturn: 'rgba(218, 165, 32, 0.3)',   // สีทอง
      uranus: 'rgba(173, 216, 230, 0.3)',  // สีฟ้าอ่อน
      neptune: 'rgba(0, 0, 128, 0.3)',     // สีน้ำเงินเข้ม
    };
    return {
      background: selectedPlanet ? colors[selectedPlanet] : 'rgba(0, 255, 153, 0.2)',
      borderBottom: `2px solid ${selectedPlanet ? colors[selectedPlanet].replace('0.3', '0.8') : 'rgba(0, 255, 153, 0.5)'}`,
      color: '#fff',
      textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
    };
  };

  // เพิ่มฟังก์ชันสำหรับกรองข้อมูล
  const filteredWishes = wishes
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // เรียงจากเก่าไปใหม่
    .filter(wish => 
      wish.wisher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wish.wish_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      planets.find(p => p.id === wish.planet_id)?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div style={{
      backgroundImage: 'url("/img/Allwishbg.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      paddingBottom: '2rem',
      position: 'relative'
    }}>
      {/* ลบ div overlay ออกทั้งหมด */}

      {/* ปรับ z-index ของ content div ให้เป็น 1 แทน */}
      <div style={{ position: 'relative', zIndex: 1 }}>
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
              ✨ กดดวงดาวเพื่อดูคำอธิษฐาน ✨
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

          {/* แก้ไขส่วน Search และเพิ่มปุ่ม All Wishes */}
          <div className="d-flex justify-content-between mb-3 gap-3 align-items-center">
            <div style={{
              color: '#fff',
              textShadow: '0 0 10px rgba(0, 255, 153, 0.5)',
              fontSize: '1.1rem',
              padding: '8px 16px',
              background: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '20px',
              border: '2px solid rgba(0, 255, 153, 0.3)',
            }}>
              {selectedPlanet 
                ? `${planets.find(p => p.id === selectedPlanet)?.name}: ${filteredWishes.length} wishes`
                : `Total Wishes: ${filteredWishes.length}`
              }
            </div>
            <div className="d-flex gap-3 align-items-center">
              <button
                onClick={() => {
                  setSelectedPlanet(null);
                  setSearchTerm('');
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '2px solid rgba(0, 255, 153, 0.3)',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textShadow: '0 0 10px rgba(0, 255, 153, 0.5)',
                  boxShadow: '0 0 15px rgba(0, 255, 153, 0.2)',
                  ':hover': {
                    background: 'rgba(0, 255, 153, 0.2)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                All Wishes
              </button>
              <input
                type="text"
                placeholder="ค้นหา..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '20px',
                  border: '2px solid rgba(0, 255, 153, 0.3)',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: '#fff',
                  width: '250px',
                  outline: 'none'
                }}
              />
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
                <tr style={getPlanetHeaderStyle(selectedPlanet)}>
                  <th>Wishes No.</th>
                  <th>ดวงดาว</th>
                  <th>ชื่อผู้อธิษฐาน</th>
                  <th>คำอธิษฐาน</th>
                  <th>วันที่</th>
                </tr>
              </thead>
              <tbody>
                {filteredWishes.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">ไม่พบข้อมูลคำอธิษฐาน</td>
                  </tr>
                ) : (
                  filteredWishes.map((wish, index) => (
                    <tr key={wish.id} style={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(0, 255, 153, 0.1)',
                      }
                    }}>
                      <td>{index + 1}</td>
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
      </div>

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