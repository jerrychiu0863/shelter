import './App.css';

// Components
import Main from './components/Main';

//image
import Banner from './assets/banner-2.jpg';

function App() {
  return (
    <div>
      <div>
        <img
          src={Banner}
          width="100%"
          height="auto"
          style={{ verticalAlign: 'middle' }}
          alt="bg"
        />
      </div>
      <Main />
      <footer style={{ background: '#666', padding: '24px 0' }}>
        <div
          style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,.6)',
            fontSize: '12px',
            letterSpacing: '.5px',
          }}
        >
          <p style={{ marginBottom: '4px' }}>
            Created by :{' '}
            <a
              href="https://jerrychiu0863.github.io/Jerry__Chiu/"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'rgba(255,255,255,.6)' }}
            >
              Kuan-Jen Chiu
            </a>
          </p>
          <p>資料提供: 行政院農業委員會</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
