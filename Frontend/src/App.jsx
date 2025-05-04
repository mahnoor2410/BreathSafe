import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './component/pages/UserProfile';
import Signup from './component/pages/SignUp';
import Login from './component/pages/Login';
import RankingTable from './component/pages/RankingTable';
import AirPollutant from './component/AirPollutant/AirPollutant';
import ChatBot from './component/AirPollutant/ChatBot';
import Aboutus from './component/pages/Aboutus';
import LandingPage from './component/AirPollutant/LandinPage';
import AirPollutionData from './component/AirPollutant/AirPollutionData';
import ContactUs from './component/pages/ContactUs';
import PollutantInfo from './component/pages/PollutantInfo';
import ChatHistory from './component/AirPollutant/ChatHistory';
import ChatDetail from './component/AirPollutant/ChatDetail'; // Corrected import
import ChangePassword from './component/pages/ChangePassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Map" element={<AirPollutant />} />
        <Route path="/air_pollution" element={<AirPollutionData />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/RankingTable" element={<RankingTable />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/Info" element={<PollutantInfo />} />
        <Route path="/history" element={<ChatHistory />} />
        <Route path="/history/:id" element={<ChatDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;