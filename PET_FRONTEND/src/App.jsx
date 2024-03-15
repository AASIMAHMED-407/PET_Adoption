import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SLogin from './Staff/SLogin';
import SHome from './Staff/SHome';
import SAddPets from './Staff/SAddPets';
import SViewPets from './Staff/SViewPets';
import AdoptedPets from './Staff/AdoptedPets';
import SPetRequests from './Staff/SPetRequests';
import NoPage from './NoPage';
import VLogin from './Visiter/VLogin';
import VRegister from './Visiter/VRegister';
import VHome from './Visiter/VHome';
import VisiterViewsPets from './Visiter/VisiterViewsPets';
import VisiterPetRequest from './Visiter/VisiterPetRequest';

function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<VLogin />}></Route>
            <Route path="/staff/login" element={<SLogin />}></Route>
            <Route path="/staff/home/:id" element={<SHome />}></Route>
            <Route path="/visiter/home/:id" element={<VHome />}></Route>
            <Route path="/staff/add/pet" element={<SAddPets/>}></Route>
            <Route path="/staff/view/pets" element={<SViewPets/>}></Route>
            <Route path="/visiter/view/pets/:id" element={<VisiterViewsPets/>}></Route>
            <Route path="/staff/view/adopted/pets" element={<AdoptedPets/>}></Route>
            <Route path="/staff/pet/requests" element={<SPetRequests/>}></Route>
            <Route path="/visiter/pet/requests/:id" element={<VisiterPetRequest/>}></Route>
            <Route path="/visiter/register" element={<VRegister/>}></Route>
            <Route path="*" element={<NoPage/>}></Route>
            {/* <Route path="/admin/login" element={<AdminLogin />}> </Route>
            <Route path="/admin/home" element={<AHome />}> </Route>
            <Route path="/employee/home/:id" element={<EHome />}> </Route>
            <Route path="/admin/create/employee" element={<CreateEmployee />}> </Route>
            <Route path="/admin/view/employee" element={<ViewEmployee />}> </Route>
            <Route path="/admin/leave/req" element={<RequsetLeave />}> </Route>
            <Route path="/employee/make/leave/:id" element={<MakeLeave />}> </Route>
            <Route path="/employee/views/leave/:id" element={<ViewLeaves />}> </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
