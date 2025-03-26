import React, { useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

// คอมโพเนนต์หน้าแสดงระบบสุริยะ
const Space = () => {
  // กำหนด state สำหรับควบคุม Modal และดาวที่เลือก
  const [showModal, setShowModal] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const navigate = useNavigate();

  // ข้อมูลของดาวเคราะห์ทั้งหมด
  const planets = [
    {
      id: 'sun',
      name: 'Sun',
      image: '/img/5.png',
      info: 'ดวงอาทิตย์เป็นดาวฤกษ์ที่เป็นศูนย์กลางของระบบสุริยะ',
      belief: 'เชื่อว่าการขอพรจากดวงอาทิตย์จะช่วยเสริมพลังชีวิต อำนาจบารมี และความสำเร็จในหน้าที่การงาน',
      size: 200
    },
    {
      id: 'mercury',
      name: 'Mercury',
      image: '/img/6.png',
      info: 'ดาวพุธเป็นดาวเคราะห์ที่เล็กที่สุดและอยู่ใกล้ดวงอาทิตย์ที่สุด',
      belief: 'เชื่อว่าช่วยในเรื่องการสื่อสาร การเจรจาต่อรอง การค้าขาย และสติปัญญาไหวพริบ'
    },
    {
      id: 'venus',
      name: 'Venus',
      image: '/img/7.png',
      info: 'ดาวศุกร์เป็นดาวเคราะห์ที่มีขนาดใกล้เคียงกับโลกมากที่สุด',
      belief: 'เชื่อว่าช่วยในเรื่องความรัก ความสัมพันธ์ ความสวยงาม และการเงิน'
    },
    {
      id: 'earth',
      name: 'Earth',
      image: '/img/8.png',
      info: 'โลกเป็นดาวเคราะห์ดวงเดียวที่ทราบว่ามีสิ่งมีชีวิตอาศัยอยู่',
      belief: 'เชื่อว่าช่วยในเรื่องความอุดมสมบูรณ์ ความมั่นคง และการเริ่มต้นใหม่'
    },
    {
      id: 'mars',
      name: 'Mars',
      image: '/img/9.png',
      info: 'ดาวอังคารเป็นดาวเคราะห์สีแดง ได้ชื่อว่าเป็นดาวแห่งสงคราม',
      belief: 'เชื่อว่าช่วยเสริมพลังความกล้าหาญ ความมุ่งมั่น และชัยชนะ'
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      image: '/img/10.png',
      info: 'ดาวพฤหัสบดีเป็นดาวเคราะห์ที่ใหญ่ที่สุดในระบบสุริยะ',
      belief: 'เชื่อว่าช่วยในเรื่องโชคลาภ ความเจริญรุ่งเรือง การศึกษา และความยุติธรรม'
    },
    {
      id: 'saturn',
      name: 'Saturn',
      image: '/img/11.png',
      info: 'ดาวเสาร์มีวงแหวนที่สวยงามล้อมรอบ เป็นเอกลักษณ์เฉพาะตัว',
      belief: 'เชื่อว่าช่วยในเรื่องความอดทน ความรับผิดชอบ และการเอาชนะอุปสรรค'
    },
    {
      id: 'uranus',
      name: 'Uranus',
      image: '/img/12.png',
      info: 'ดาวยูเรนัสเป็นดาวเคราะห์ที่หมุนรอบตัวเองในแนวนอน',
      belief: 'เชื่อว่าช่วยในเรื่องการเปลี่ยนแปลง ความคิดสร้างสรรค์ และนวัตกรรมใหม่ๆ'
    },
    {
      id: 'neptune',
      name: 'Neptune',
      image: '/img/13.png',
      info: 'ดาวเนปจูนเป็นดาวเคราะห์ที่อยู่ไกลที่สุดในระบบสุริยะ',
      belief: 'เชื่อว่าช่วยในเรื่องจินตนาการ ความฝัน และพลังจิต'
    }
  ];

  // ฟังก์ชันจัดการการคลิกที่ดาว
  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
    setShowModal(true);
  };

  // ฟังก์ชันจัดการการคลิกปุ่มขอพร
  const handleWishClick = () => {
    if (selectedPlanet) {
      navigate(`/wish/${selectedPlanet.id}`);
    }
  };

  return (
    <>
      {/* กำหนด CSS animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-10px); }
          }

          @keyframes glow {
            0% { filter: drop-shadow(0 0 10px #ff6b00); }
            100% { filter: drop-shadow(0 0 20px #ff6b00); }
          }

          .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
            animation: twinkle 5s infinite;
            z-index: 0;
          }

          @keyframes twinkle {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 0.9; }
          }

          .planet-image {
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .planet-image:hover {
            transform: scale(1.1);
            filter: drop-shadow(0 0 15px rgba(255,255,255,0.5)) !important;
          }

          .navbar {
            position: relative;
            z-index: 1000;
            background-color: #212529 !important;
          }
        `}
      </style>

      {/* แสดงแถบนำทาง */}
      <NavBar />
      {/* คอนเทนเนอร์หลัก */}
      <Container
        fluid
        className="space-container vh-100 position-relative"
        style={{
          backgroundColor: '#0a0a2e',
          overflow: 'hidden',
          background: `url('/img/moonbg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* เอฟเฟกต์พื้นหลังดาว */}
        <div className="stars" style={{ zIndex: 1 }}></div>

        {/* ระบบสุริยะ */}
        <div className="solar-system"
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '50px 0'
          }}
        >
          {/* ดวงอาทิตย์ */}
          <div
            style={{
              marginBottom: '50px',
              animation: 'glow 2s infinite alternate'
            }}
          >
            <img
              src={planets[0].image}
              alt={planets[0].name}
              onClick={() => handlePlanetClick(planets[0])}
              className="planet-image"
              style={{
                width: '150px',
                filter: 'drop-shadow(0 0 10px #ff6b00)',
              }}
            />
          </div>

          {/* ดาวเคราะห์ */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
            padding: '20px'
          }}>
            {planets.slice(1).map((planet, index) => {
              // กำหนดขนาดดาวตามประเภท
              let planetSize;
              switch (planet.id) {
                case 'jupiter': planetSize = 100; break;
                case 'saturn': planetSize = 90; break;
                case 'uranus': planetSize = 70; break;
                case 'neptune': planetSize = 68; break;
                case 'earth': planetSize = 60; break;
                case 'venus': planetSize = 58; break;
                case 'mars': planetSize = 55; break;
                case 'mercury': planetSize = 50; break;
                default: planetSize = 60;
              }

              return (
                <div
                  key={planet.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    animation: `float ${3 + index * 0.5}s infinite alternate ease-in-out`
                  }}
                >
                  <img
                    src={planet.image}
                    alt={planet.name}
                    onClick={() => handlePlanetClick(planet)}
                    className="planet-image"
                    style={{
                      width: `${planetSize}px`,
                      filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))'
                    }}
                  />
                  <span style={{
                    color: '#fff',
                    marginTop: '10px',
                    fontSize: '0.9rem',
                    textShadow: '0 0 5px rgba(255,255,255,0.5)'
                  }}>
                    {planet.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal แสดงข้อมูลดาว */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          className="space-modal"
        >
          <Modal.Header closeButton style={{
            background: 'linear-gradient(to right, #1a1a4a, #0a0a2e)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Modal.Title>{selectedPlanet?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{
            background: '#0a0a2e',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '20px'
          }}>
            <img
              src={selectedPlanet?.image}
              alt={selectedPlanet?.name}
              style={{
                width: '120px',
                display: 'block',
                margin: '0 auto 20px',
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
              }}
            />
            <h5 style={{ color: '#4a9eff' }}>ข้อมูล</h5>
            <p>{selectedPlanet?.info}</p>
            <h5 style={{ color: '#4a9eff' }}>ความเชื่อ</h5>
            <p>{selectedPlanet?.belief}</p>
          </Modal.Body>
          <Modal.Footer style={{
            background: '#0a0a2e',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Button variant="outline-light" onClick={() => setShowModal(false)}>
              ปิด
            </Button>
            <Button
              variant="primary"
              onClick={handleWishClick}
              style={{
                background: 'linear-gradient(to right, #4a9eff, #2d5cfe)',
                border: 'none'
              }}
            >
              ขอพร
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

// ส่งออกคอมโพเนนต์ Space
export default Space; 