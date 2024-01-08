

import { Routes, Route} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";

import MainPage from '../pages/MainPage';
import ComicsPage from '../pages/ComicsPage';


const App = () => {

    return (

        <div className="app">
            <AppHeader />

            <main>
                <Routes>
                    <Route path="/" element={<MainPage/>} />
                    <Route path="/comics" element={<ComicsPage/>} />
                </Routes>
            </main>
        </div>




    )

}






export default App;