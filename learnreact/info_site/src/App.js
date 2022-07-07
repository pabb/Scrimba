import logo from './react-logo.png';
import './App.css';

function Header() {
  return (
    <header>
      <nav className="nav">
        <img src={logo} alt="Logo icon." className="nav-logo" />
        <ul className="nav-items">
          <li>Pricing</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <small>© 2022 Boop Industries Ltd. All rights reserved.</small>
    </footer>
  );
}

function MainContent() {
  return (
    <div>
      <marquee scrollamount="20">
        <h1 className="header">Reasons I'm excited to learn React!</h1>
      </marquee>
      <ol className="list">
        <li>
          It's a popular library, so I'll be able to fit in with the cool kids!
        </li>
        <li>I'm more likely to get a job as a developer if I know React</li>
      </ol>
      <div className="blink">
        <span>OMG it's so COOL.</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;