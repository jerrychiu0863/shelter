import { useRef } from 'react';
import '../index.css';

const Modal = ({ setShowModal, selectedAni, renderBodyType }) => {
  // Modal
  const modalRef = useRef();

  const onClickModalBg = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <div ref={modalRef} className="modal-bg" onClick={onClickModalBg}>
      <div className="modal-box">
        <div style={{ textAlign: 'right' }}></div>
        <div>
          <div
            className="modal-img"
            style={{
              backgroundImage: `url(${selectedAni.album_file})`,
            }}
          >
            <button
              className="modal-close"
              onClick={() => setShowModal((prev) => !prev)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-info">
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
  );
};

export default Modal;
