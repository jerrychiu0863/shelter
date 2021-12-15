import { useState, useEffect } from 'react';
import Paginate from 'react-paginate';
import Modal from './Modal';

import Paw from '../assets/paw.png';
import {
  nShelters,
  wShelters,
  sShelters,
  eShelters,
  overseaShelters,
} from '../config/shelter';

const Main = () => {
  // Select Input
  const [data, setData] = useState('');
  const [shelter, setShelter] = useState('');
  const [kind, setKind] = useState('');

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedAni, setSelectedAni] = useState('');

  // Pagination
  const itemsPerPage = 10;
  const [curItems, setCurItems] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const endOffest = itemOffset + itemsPerPage;
      setCurItems(data.slice(itemOffset, endOffest));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [data, itemOffset]);

  const fetchData = (shelter = '', kind = '') => {
    fetch(
      `https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=100&animal_id=&animal_shelter_pkid=${shelter}&animal_kind=${kind}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onShelterChange = (e) => {
    setShelter(e.target.value);
    // setPageCount(0);
    // setCurItems('');
    fetchData(e.target.value, kind);
  };

  const onKindChange = (e) => {
    setKind(e.target.value);
    // setPageCount(0);
    // setCurItems('');
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

  const renderStatus = (status) => {
    switch (status) {
      case 'NONE':
        return '未公告';
      case 'OPEN':
        return '開放認養';
      case 'ADOPTED':
        return '已認養';
      case 'OTHER':
        return '其他';
      case 'DEAD':
        return '死亡';
      default:
        return;
    }
  };

  const onPageClick = (e) => {
    console.log(e.selected);
    const newOffset = (e.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  console.log(nShelters);
  // console.log(pageCount);
  return (
    <>
      <div className="main" style={{}}>
        <div className="main-container">
          <div className="main-select-container" style={{}}>
            <select onChange={onKindChange} style={{ width: '70px' }}>
              <option value="">種類</option>
              <option value="%E7%8B%97">狗</option>
              <option value="%E8%B2%93">貓</option>
            </select>
            <select onChange={onShelterChange} style={{ width: '215px' }}>
              <option value="">收容所</option>
              <optgroup label="北部">
                {nShelters.map(({ id, name }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </optgroup>
              <optgroup label="中部">
                {wShelters.map(({ id, name }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </optgroup>
              <optgroup label="南部">
                {sShelters.map(({ id, name }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </optgroup>
              <optgroup label="東部">
                {eShelters.map(({ id, name }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </optgroup>
              <optgroup label="離島">
                {overseaShelters.map(({ id, name }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </optgroup>
            </select>
          </div>
          <div>
            <ul className="card-box" style={{}}>
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
              {curItems &&
                curItems.map((pet) => {
                  return (
                    <li key={pet.animal_id} className="card">
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
                          onClick={() => {
                            setShowModal((prev) => !prev);
                            setSelectedAni(pet);
                          }}
                          style={{
                            background: 'lightgrey',
                            backgroundImage: `url(${pet.album_file})`,
                            width: '80px',
                            height: '80px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'top center',
                            borderRadius: '10px',
                            cursor: 'pointer',
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
                            <span>狀態 : </span>
                            {renderStatus(pet.animal_status)}
                          </p>
                          <p style={{ margin: '6px 0' }}>
                            體型 : {renderBodyType(pet.animal_bodytype)}
                          </p>
                          <p>收容所 : {pet.shelter_name}</p>
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
          <Paginate
            pageCount={pageCount}
            onPageChange={onPageClick}
            renderOnZeroPageCount={null}
            containerClassName="pagi-container"
            activeClassName="pagi-active-page"
            activeLinkClassName="pagi-active-link"
            nextLabel={null}
            previousLabel={null}
          />
          {showModal && (
            <Modal
              setShowModal={setShowModal}
              selectedAni={selectedAni}
              renderBodyType={renderBodyType}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
