import logo from './logo.svg';
import './App.css';
import Login from './auth/Login';
import Header from './Global/Header'
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './shared/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Meeting from './pages/Meeting';
import OrganizeMeeting from './pages/OrganizeMeeting';
import CreateMetting from './pages/OrganizeMeeting/CreateMetting';
import EditMeeting from './pages/OrganizeMeeting/EditMeeting';
import AddMom from './pages/OrganizeMeeting/AddMom';

function App() {
  return (
    <div className="App">
      {/* <Header />   */}
      <Routes>
        <Route index element={<Login />} />
        <Route element={<PrivateRoutes/>} >
           <Route path='/dashboard' element={<Header component={<Dashboard/>}/>} />
           <Route path='/meetings' element={<Header component={<Meeting />}/>} />
           <Route path='/organize_meeting' element={<Header component={<OrganizeMeeting />}/>} />
           <Route path='/createMeeting' element={<Header component={<CreateMetting />}/>} />
           <Route path='/editMeeting/:id' element={<Header component={<EditMeeting />}/>} />
           <Route path='/addMom/:id' element={<Header component={<AddMom />}/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
