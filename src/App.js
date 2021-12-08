import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Test from './components/Test';

function App() {
  const [data, setData] = useState([]);
  const [shelter, setShelter] = useState('');
  const [kind, setKind] = useState('');
  // const onBtnClick = () => {
  //   setCount(count + 1);
  // };
  useEffect(() => {
    // const id = 234482;
    // fetch(
    //   'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=10&animal_id=&animal_kind=%E8%B2%93'
    // )
    //   .then((res) => {
    //     // console.log(res.json());
    //     // console.log(res.json());
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setData(data);
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

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
  console.log(shelter);
  return (
    <>
      <select onChange={onKindChange}>
        <option value="">Type</option>
        <option value="%E8%B2%93">Cat</option>
      </select>
      <select onChange={onShelterChange}>
        <option value="">All</option>
        <option value="48">基隆市寵物銀行</option>
      </select>
      <div>
        <ul>
          {data.map((pet) => {
            return (
              <li key={pet.animal_id}>
                <p>Kind:{pet.animal_kind}</p>
                <p>Shelter:{pet.shelter_name}</p>
                {/* <div
                  style={{
                    width: '200px',
                    height: ' 150px',
                    overflow: 'hidden',
                  }}
                >
                  <img src={pet.album_file} width="100%" height="auto" />
                </div> */}
                <img
                  src={pet.album_file}
                  width="200px"
                  height="200px"
                  style={{ objectFit: 'scale-down' }}
                />
                <div
                  style={{
                    backgroundImage: `url(${pet.album_file})`,
                    width: '300px',
                    height: '300px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                  }}
                ></div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
