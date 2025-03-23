import React, { useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Space = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const navigate = useNavigate();

  const planets = [
    {
      id: 'sun',
      name: 'ดวงอาทิตย์',
      image: '/img/5.png',
      info: 'ดวงอาทิตย์เป็นดาวฤกษ์ที่เป็นศูนย์กลางของระบบสุริยะ',
      belief: 'เชื่อว่าการขอพรจากดวงอาทิตย์จะช่วยเสริมพลังชีวิต อำนาจบารมี และความสำเร็จในหน้าที่การงาน',
      size: 200
    },
    {
      id: 'mercury',
      name: 'ดาวพุธ',
      image: '/img/6.png',
      info: 'ดาวพุธเป็นดาวเคราะห์ที่เล็กที่สุดและอยู่ใกล้ดวงอาทิตย์ที่สุด',
      belief: 'เชื่อว่าช่วยในเรื่องการสื่อสาร การเจรจาต่อรอง การค้าขาย และสติปัญญาไหวพริบ'
    },
    {
      id: 'venus',
      name: 'ดาวศุกร์',
      image: '/img/7.png',
      info: 'ดาวศุกร์เป็นดาวเคราะห์ที่มีขนาดใกล้เคียงกับโลกมากที่สุด',
      belief: 'เชื่อว่าช่วยในเรื่องความรัก ความสัมพันธ์ ความสวยงาม และการเงิน'
    },
    {
      id: 'earth',
      name: 'โลก',
      image: '/img/8.png',
      info: 'โลกเป็นดาวเคราะห์ดวงเดียวที่ทราบว่ามีสิ่งมีชีวิตอาศัยอยู่',
      belief: 'เชื่อว่าช่วยในเรื่องความอุดมสมบูรณ์ ความมั่นคง และการเริ่มต้นใหม่'
    },
    {
      id: 'mars',
      name: 'ดาวอังคาร',
      image: '/img/9.png',
      info: 'ดาวอังคารเป็นดาวเคราะห์สีแดง ได้ชื่อว่าเป็นดาวแห่งสงคราม',
      belief: 'เชื่อว่าช่วยเสริมพลังความกล้าหาญ ความมุ่งมั่น และชัยชนะ'
    },
    {
      id: 'jupiter',
      name: 'ดาวพฤหัสบดี',
      image: '/img/10.png',
      info: 'ดาวพฤหัสบดีเป็นดาวเคราะห์ที่ใหญ่ที่สุดในระบบสุริยะ',
      belief: 'เชื่อว่าช่วยในเรื่องโชคลาภ ความเจริญรุ่งเรือง การศึกษา และความยุติธรรม'
    },
    {
      id: 'saturn',
      name: 'ดาวเสาร์',
      image: '/img/11.png',
      info: 'ดาวเสาร์มีวงแหวนที่สวยงามล้อมรอบ เป็นเอกลักษณ์เฉพาะตัว',
      belief: 'เชื่อว่าช่วยในเรื่องความอดทน ความรับผิดชอบ และการเอาชนะอุปสรรค'
    },
    {
      id: 'uranus',
      name: 'ดาวยูเรนัส',
      image: '/img/12.png',
      info: 'ดาวยูเรนัสเป็นดาวเคราะห์ที่หมุนรอบตัวเองในแนวนอน',
      belief: 'เชื่อว่าช่วยในเรื่องการเปลี่ยนแปลง ความคิดสร้างสรรค์ และนวัตกรรมใหม่ๆ'
    },
    {
      id: 'neptune',
      name: 'ดาวเนปจูน',
      image: '/img/13.png',
      info: 'ดาวเนปจูนเป็นดาวเคราะห์ที่อยู่ไกลที่สุดในระบบสุริยะ',
      belief: 'เชื่อว่าช่วยในเรื่องจินตนาการ ความฝัน และพลังจิต'
    }
  ];

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
    setShowModal(true);
  };

  const handleWishClick = () => {
    if (selectedPlanet) {
      navigate(`/wish/${selectedPlanet.id}`);
    }
  };

  return (
    <Container 
      fluid 
      className="space-container vh-100 position-relative"
      style={{
        backgroundColor: '#000',
        overflow: 'hidden'
      }}
    >
      <div className="solar-system"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1
          }}
        >
          <img
            src={planets[0].image}
            alt={planets[0].name}
            onClick={() => handlePlanetClick(planets[0])}
            style={{
              cursor: 'pointer',
              transition: 'transform 0.3s',
              width: '200px',
            }}
          />
        </div>

        {planets.slice(1).map((planet, index) => {
          const angle = (index * (360 / 8)) * (Math.PI / 180);
          const radius = 300;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          let planetSize;
          switch(planet.id) {
            case 'jupiter': planetSize = 100; break;
            case 'saturn': planetSize = 90; break;
            case 'uranus': planetSize = 70; break;
            case 'neptune': planetSize = 68; break;
            case 'earth': planetSize = 40; break;
            case 'venus': planetSize = 38; break;
            case 'mars': planetSize = 35; break;
            case 'mercury': planetSize = 30; break;
            default: planetSize = 40;
          }

          return (
            <div
              key={planet.id}
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                zIndex: 0
              }}
            >
              <img
                src={planet.image}
                alt={planet.name}
                onClick={() => handlePlanetClick(planet)}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  width: `${planetSize}px`,
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
              />
            </div>
          );
        })}
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="space-modal"
      >
        <Modal.Header closeButton style={{ background: '#1a1a1a', color: 'white', border: '1px solid #444' }}>
          <Modal.Title>{selectedPlanet?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1a1a1a', color: 'white', border: '1px solid #444' }}>
          <img 
            src={selectedPlanet?.image} 
            alt={selectedPlanet?.name}
            style={{ width: '100px', display: 'block', margin: '0 auto 20px' }}
          />
          <h5>ข้อมูล</h5>
          <p>{selectedPlanet?.info}</p>
          <h5>ความเชื่อ</h5>
          <p>{selectedPlanet?.belief}</p>
        </Modal.Body>
        <Modal.Footer style={{ background: '#1a1a1a', border: '1px solid #444' }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ปิด
          </Button>
          <Button variant="primary" onClick={handleWishClick}>
            ขอพร
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Space; 