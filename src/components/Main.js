import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Paw from '../assets/paw.png';

const Main = () => {
  const [data, setData] = useState([]);
  const [shelter, setShelter] = useState('');
  const [kind, setKind] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [selectedAni, setSelectedAni] = useState('');

  const fetchData = (shelter = '', kind = '') => {
    fetch(
      `https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=10&animal_id=&animal_shelter_pkid=${shelter}&animal_kind=${kind}`
    )
      .then((res) => {
        // console.log(res.json());
        // console.log(res.json());
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onShelterChange = (e) => {
    setShelter(e.target.value);
    fetchData(e.target.value, kind);
  };

  const onKindChange = (e) => {
    setKind(e.target.value);
    fetchData(shelter, e.target.value);
  };

  const renderBodyType = (type) => {
    switch (type) {
      case 'SMALL':
        return '小';
      case 'MEDIUM':
        return '中';
      case 'BIG':
        return '大';
    }
  };

  console.log(selectedAni);
  return (
    <>
      <div style={{ background: '#FFBB4D', paddingBottom: '48px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div
            style={{
              border: '1px solid rgba(0,0,0,.2)',
              padding: '24px',
              background: 'lightblue',
            }}
          >
            <select onChange={onKindChange}>
              <option value="">Type</option>
              <option value="%E8%B2%93">Cat</option>
            </select>
            <select onChange={onShelterChange}>
              <option value="">All</option>
              <option value="48">基隆市寵物銀行</option>
            </select>
          </div>
          <div>
            <ul
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                listStyle: 'none',
                marginTop: '24px',
                flexWrap: 'wrap',
              }}
            >
              {/* <li
                style={{
                  width: '380px',
                  background: '#FFF5E1',
                  padding: '16px',
                  borderRadius: '16px',
                  boxShadow: '0 2px 16px rgba(211,149,60,.6)',
                  position: 'relative',
                  marginBottom: '16px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={Paw}
                  style={{
                    position: 'absolute',
                    width: ' 150px',
                    height: 'auto',
                    right: ' 10px',
                    bottom: '-20px',
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      // backgroundImage: `url(${pet.album_file})`,
                      width: '80px',
                      height: '80px',
                      backgroundSize: 'cover',
                      backgroundPosition: 'top center',
                      borderRadius: '10px',
                      background: 'lightgrey',
                      marginRight: '16px',
                    }}
                  ></div>
                  <div
                    style={{
                      fontSize: '15px',
                      letterSpacing: '1px',
                      position: 'relative',
                      zIndex: '999',
                    }}
                  >
                    <p>
                      <span style={{ color: '#666' }}>種類 : </span>狗
                    </p>
                    <p style={{ margin: '6px 0' }}>體型 :狗</p>
                    <p>收容所 :新北市中和區公立動物之家</p>
                  </div>
                </div>
                <Link
                  to="/"
                  style={{
                    background: '#FFBB4D',
                    padding: '4px 16px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    position: 'absolute',
                    right: '20px',
                    top: '16px',
                    color: '#fff',
                    textDecoration: 'none',
                  }}
                >
                  詳細資料
                </Link>
              </li>
              <li
                style={{
                  width: '380px',
                  background: 'lightgrey',
                  marginBottom: '16px',
                }}
              >
                21
              </li>
              <li style={{ width: '380px', background: 'lightgrey' }}>21</li>
              <li style={{ width: '380px', background: 'lightgrey' }}>21</li> */}
              {data.map((pet) => {
                return (
                  <li
                    key={pet.animal_id}
                    style={{
                      width: '380px',
                      background: '#FFF5E1',
                      padding: '16px',
                      borderRadius: '16px',
                      boxShadow: '0 2px 16px rgba(211,149,60,.6)',
                      position: 'relative',
                      marginBottom: '16px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={Paw}
                      style={{
                        position: 'absolute',
                        width: ' 150px',
                        height: 'auto',
                        right: ' 10px',
                        bottom: '-20px',
                      }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div
                        style={{
                          background: 'lightgrey',
                          backgroundImage: `url(${pet.album_file})`,
                          width: '80px',
                          height: '80px',
                          backgroundSize: 'cover',
                          backgroundPosition: 'top center',
                          borderRadius: '10px',

                          marginRight: '16px',
                        }}
                      ></div>
                      <div
                        style={{
                          fontSize: '15px',
                          letterSpacing: '1px',
                          position: 'relative',
                          zIndex: '999',
                        }}
                      >
                        <p>
                          <span style={{ color: '#666' }}>種類 : </span>
                          {pet.animal_id}
                        </p>
                        <p style={{ margin: '6px 0' }}>體型 :狗</p>
                        <p onClick={() => setShowModal((prev) => !prev)}>
                          收容所 :新北市中和區公立動物之家
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowModal((prev) => !prev);
                        setSelectedAni(pet);
                      }}
                      style={{
                        background: '#FFBB4D',
                        padding: '4px 16px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        position: 'absolute',
                        right: '20px',
                        top: '16px',
                        color: '#fff',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        zIndex: '999',
                        border: 'none',
                      }}
                    >
                      詳細資料
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          {showModal && (
            <div
              style={{
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,.8)',
                position: 'fixed',
                top: '0',
                left: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '9999',
              }}
            >
              <div
                style={{
                  width: '315px',
                  height: 'auto',
                  background: '#FFF5E1',
                  padding: '16px 32px 32px 32px',
                  borderRadius: '16px',
                }}
              >
                <div style={{ textAlign: 'right' }}>
                  <button onClick={() => setShowModal((prev) => !prev)}>
                    clock
                  </button>
                </div>
                <div style={{}}>
                  <div
                    style={{
                      background: 'lightgrey',
                      backgroundImage: `url(${selectedAni.album_file})`,
                      width: '250px',
                      height: '250px',
                      backgroundSize: 'cover',
                      backgroundPosition: 'top center',
                      borderRadius: '10px',

                      marginBottom: '8px',
                    }}
                  ></div>
                  <div style={{ lineHeight: '1.5' }}>
                    <p style={{ fontSize: '15px', letterSpacing: '.5px' }}>
                      id: {selectedAni.animal_id}
                    </p>
                    <p>體型: {renderBodyType(selectedAni.animal_bodytype)}</p>
                    <p>性別: {selectedAni.animal_sex}</p>
                    <p>毛色: {selectedAni.animal_colour}</p>
                    <p>收容所: {selectedAni.shelter_name}</p>
                    <p>收容所電話: {selectedAni.shelter_tel}</p>
                    <p>
                      收容所地址: <br />
                      {selectedAni.shelter_address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
