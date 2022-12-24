import Index from './pages/Index'
 
import logo from './media/logo.png'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} style={{width:'150px' ,zIndex:'10'}}/>
        <Index/>
      </header>
    </div>
  );
}

export default App;
