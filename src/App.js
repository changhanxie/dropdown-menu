import Dropdown from './components/dropdown/Dropdown'
import options from './components/options/Options';

function App() {
  console.log(options,'APP')
  return (
    <div >
      <Dropdown options={options} />
    </div>
  );
}

export default App;
