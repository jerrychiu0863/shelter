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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');

  // Select Input
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
  const [selectedPage, setSelectedPage] = useState(0);

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
        setLoading(false);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onShelterChange = (e) => {
    setShelter(e.target.value);
    setItemOffset(0);
    setSelectedPage(0);
    setLoading(true);
    fetchData(e.target.value, kind);
  };

  const onKindChange = (e) => {
    setKind(e.target.value);
    setItemOffset(0);
    setSelectedPage(0);
    setLoading(true);
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
      default:
        return;
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
    const newOffset = (e.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
    setSelectedPage(e.selected);
  };

  // console.log('render');
  // console.log(pageCount);
  return (
    <>
      <div className="main">
        <div className="main-container">
          <div className="main-select-container">
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
            {loading && (
              <div className="loader">
                <i class="fas fa-spinner"></i>
              </div>
            )}
            {!loading && (
              <ul className="list-container">
                {curItems &&
                  curItems.map((pet) => {
                    return (
                      <li key={pet.animal_id} className="card">
                        <img src={Paw} className="card-paw" alt="paw" />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div
                            onClick={() => {
                              setShowModal((prev) => !prev);
                              setSelectedAni(pet);
                            }}
                            className="card-img"
                            style={{
                              backgroundImage: `url(${pet.album_file})`,
                            }}
                          ></div>
                          <div className="card-info">
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
                          className="card-detail"
                        >
                          詳細資料
                        </button>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
          {!loading && (
            <Paginate
              pageCount={pageCount}
              onPageChange={onPageClick}
              renderOnZeroPageCount={null}
              containerClassName="pagi-container"
              activeClassName="pagi-active-page"
              activeLinkClassName="pagi-active-link"
              nextLabel={null}
              previousLabel={null}
              forcePage={selectedPage}
            />
          )}
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
