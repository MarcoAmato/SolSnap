import { Route, Routes} from 'react-router-dom';
import Navbar from './component/nav';
import Home from './component/Home';
import Gallery from './component/Gallery';


function App() {


    return (
        <>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/Gallery' element={<Gallery />}></Route>
        </Routes>
        </>
     )
    }

export default App;