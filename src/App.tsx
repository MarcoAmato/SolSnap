import { Route, Routes} from 'react-router-dom';
import Navbar from './Frontend/component/nav';
import Home from './Frontend/component/Home';
import Gallery from './Frontend/component/Gallery';


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