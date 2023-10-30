import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/pages/Login";
import Resetpassword from "./components/pages/Resetpassword";
import Otp from "./components/pages/Otp";
import Notfound from "./components/pages/Notfound";
import Stafflist from "./components/pages/staff/Stafflist";
import VerifyHah from "./components/pages/Verifyhash";
import UserCreateForm from "./components/forms/UserCreateForm";
import ProductCategoryForm from "./components/forms/ProductCategoryForm";
import ProductForm from "./components/forms/ProductCreateForm";
import ProductsList from "./components/tables/ProductsList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserListTable from "./components/tables/UserListTable";
import CategoryList from "./components/tables/CategoryList";
import Calculator from "./components/Calculator";
import ProductView_EditForm from "./components/forms/ProductView_EditForm";
import Mails from "./components/pages/apps/Mails";
import Product from "./components/Product";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light" />
      <Router>
        <>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
              <Route
    path="/*"
    element={
      <Layout>
        <Home />
      </Layout>
    }
  />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<Resetpassword />} />
            <Route path="/forgotpassword/verify/:hash" element={<VerifyHah />} />
            <Route path="/forgotpassword/verify/otp" element={<Otp />} />
            <Route path="*" element={<Notfound />} />
            {/* Enuiry routes */}
            <Route path="/dashboard/user/list" element={<Layout><UserListTable/></Layout>} />
            <Route path="/dashboard/user/create" element={<Layout><UserCreateForm/></Layout>} />
            <Route path="/dashboard/product/create" element={<Layout><ProductForm/></Layout>} />
            <Route path="/dashboard/product/list" element={<Layout><ProductsList/></Layout>} />
            <Route path="/dashboard/product/view/:id" element={<Layout><ProductForm/></Layout>} />
         

            <Route path="/dashboard/category/create" element={<Layout><ProductCategoryForm/></Layout>} />
            <Route path="/dashboard/category/list" element={<Layout><CategoryList/></Layout>} />

            <Route path="/dashboard/apps/mail" element={<Layout><Mails/></Layout>} />
            <Route path="/dashboard/product/:id" element={<Layout><Product/></Layout>} />
        
          

            {/* staff routes */}
            <Route path="/dashboard/staff/create" element={<Layout><Stafflist/> </Layout>} />
            <Route path="/dashboard/staff/list" element={<Layout><Stafflist/> </Layout>} />
            <Route path="/dashboard/staff/active" element={<Layout><Stafflist/> </Layout>} />
            <Route path="/dashboard/staff/inactive" element={<Layout><Calculator/> </Layout>} />
                 
               

            {/* finance routes */}
            <Route path="/dashboard/finance/create" element={<Otp />} />
            <Route path="/dashboard/finance/inactive" element={<Otp />} />
            <Route path="/dashboard/finance/list" element={<Otp />} />

             {/* Call record routes */}
             <Route path="/dashboard/call/all" element={<Otp />} />
             <Route path="/dashboard/call/outgoing" element={<Otp />} />
             <Route path="/dashboard/call/missed" element={<Otp />} />
             <Route path="/dashboard/call/incoming" element={<Otp />} />

              {/* otp routes */}
            <Route path="/dashboard/otp/hp" element={<Otp />} />
            <Route path="/dashboard/otp/bdo" element={<Otp />} />
            <Route path="/dashboard/otp/finance" element={<Otp />} />
            
              {/* payments routes */}
              <Route path="/dashboard/payments/bank" element={<Otp />} />
              <Route path="/dashboard/payments/upi" element={<Otp />} />
              <Route path="/dashboard/payments/gateway" element={<Otp />} />
              <Route path="/dashboard/payments/deposite" element={<Otp />} />

          </Routes>
        </>
      </Router>
    </>
  );
}

export default App;
