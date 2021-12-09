import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Paw from '../assets/paw.png';

const Main = () => {
  const [data, setData] = useState([]);
  const [shelter, setShelter] = useState('');
  const [kind, setKind] = useState('');

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
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
