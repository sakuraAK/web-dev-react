import './App.css'
import './components/TaskCard/TaskCard.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import StatsPage from './pages/StatsPage';
import HomePage from './pages/HomePage';
import Layout from './pages/Layout';
import TaskDetail from './components/TaskDetail/TaskDetail';
import TaskContextProvider from './components/TaskContextProvider/TaskContextProvider';
import { ThemeContextProvider} from './context/ThemeContextProvider';



function App() {
  //run on rendering
  //useEffect(() => {console.log("use effect running")});

  //run once
  //useEffect(() => { console.log("Run once") }, []);

  return (
    <ThemeContextProvider>
    <TaskContextProvider>
        <BrowserRouter>

        <Routes>
          <Route path='/' element={<Layout />}>
            <Route
              index
              element={<HomePage/>} />
            <Route path="stats" element={<StatsPage/>} />
            <Route path="tasks/:id" element={<TaskDetail/>}/>
            <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
          </Route>
        </Routes>

      </BrowserRouter>
    </TaskContextProvider>
    </ThemeContextProvider>
    
  );


}

export default App;
