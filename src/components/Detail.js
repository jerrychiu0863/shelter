import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const [data, setData] = useState('');
  let params = useParams();

  useEffect(() => {
    fetch(
      `https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=10&animal_id=${params.id}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const animal = data[0] || [];
  const { animal_id } = animal || '';
  console.log(animal);
  return (
    <>
      {data && (
        <div>
          Detail<p>id:{animal_id}</p>{' '}
        </div>
      )}
    </>
  );
};

export default Detail;
