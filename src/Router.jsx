import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import HomePage from './Pages/HomePage.jsx';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import HabitPage from './Pages/AddInfo/HabitPage';
import FavoritePage from './Pages/AddInfo/FavoritePage';
import AllergicPage from './Pages/AddInfo/AllergicPage';
import SignUpCompletePage from './Pages/SignUpCompletePage';
import LoginAccess from './components/Login/LoginAccess';
import FridgeManagePage from './Pages/Refrigerator/FridgeManagePage.jsx';
import AlertPage from './Pages/Alert/AlertPage';
import NoAlertPage from './Pages/Alert/NoAlertPage';

const queryClient = new QueryClient();

const Router = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/* 로그인  */}
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/login/oauth2/code/:provider" element={<LoginAccess/>} />

                    {/* 회원가입 */}
                    <Route path="/addinfo/habit" element={<HabitPage/>}/>
                    <Route path="/addinfo/favorite" element={<FavoritePage/>}/>
                    <Route path="/addinfo/allergic" element={<AllergicPage/>}/>
                    <Route path="/login/signupcomplete" element={<SignUpCompletePage/>}/>

                    {/* 메인 페이지 */}
                    <Route path='/' element={<HomePage/>}/>

                    {/* 냉장고 관리 */}
                    <Route path="/fridge/fridgemanage" element={<FridgeManagePage/>}/>

                    {/* 알림 */}
                    <Route path="alert/alert" element={<AlertPage/>}/>
                    <Route path="alert/noalert" element={<NoAlertPage/>}/>
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default Router;
