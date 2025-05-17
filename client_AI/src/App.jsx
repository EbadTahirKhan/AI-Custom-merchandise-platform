import Canvas from './canvas';
import Home from './pages/Home';
import Customizer from './pages/Customizer';

function App() {

  return (
    <main className='app transition-all ease-in'> 
    <Home />
    <Canvas /> 
    <Customizer nextStage="Add Product" />//next stage is "Add Product"(for businesses) or "Order Now"(for buyers) only
    </main>
  )
}

export default App
