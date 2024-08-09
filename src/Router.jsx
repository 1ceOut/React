import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import HomePage from './Pages/HomePage.jsx';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import HabitPage from './Pages/AddInfo/HabitPage';
import FavoritePage from './Pages/AddInfo/FavoritePage';
import AllergicPage from './Pages/AddInfo/AllergicPage';
import SignUpCompletePage from './Pages/SignUpCompletePage';
import FridgeManagePage from './Pages/Refrigerator/FridgeManagePage.jsx';
import AlertPage from './Pages/Alert/AlertPage';
import NoAlertPage from './Pages/Alert/NoAlertPage';
import KakaoLoginAccess from './components/Login/KakaoLoginAccess.jsx';
import NaverLoginAccess from "./components/Login/NaverLoginAccess.jsx";
import GoogleLoginAccess from "./components/Login/GoogleLoginAccess.jsx";
import ProfilePage from './Pages/MyPage/ProfilePage';
import FridgeDelete from './Pages/MyPage/FridgeDelete';
import UserDelete from './Pages/MyPage/UserDelete';
import UserInvite from './Pages/MyPage/UserInvite';
import FridgeUpdate from './Pages/MyPage/FridgeUpdate';
import QRCode from './Pages/MyPage/QRCode';

const queryClient = new QueryClient();

const Router = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/* 로그인  */}
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/login/oauth2/code/kakao" element={<KakaoLoginAccess/>} />
                    <Route path="/login/oauth2/code/naver" element={<NaverLoginAccess/>}/>
                    <Route path="/login/oauth2/code/google" element={<GoogleLoginAccess/>}/>
                    <Route path="/addinfo/habit" element={<HabitPage/>}/>
                    <Route path="/addinfo/favorite" element={<FavoritePage/>}/>
                    <Route path="/addinfo/allergic" element={<AllergicPage/>}/>
                    <Route path="/login/signupcomplete" element={<SignUpCompletePage/>}/>

                    {/* 메인 페이지 */}
                    <Route path='/' element={<HomePage/>}/>

                    {/* 냉장고 관리 */}
                    <Route path="/fridge/fridgemanage" element={<FridgeManagePage/>}/>

                    {/* 알림 */}
                    <Route path="/alert/alert" element={<AlertPage/>}/>
                    <Route path="/alert/noalert" element={<NoAlertPage/>}/>

                    {/* 마이페이지 */}
                    <Route path="/mypage/profile" element={<ProfilePage/>}/>
                    <Route path="/mypage/fridgedelete" element={<FridgeDelete/>}/> 
                    <Route path="/mypage/fridgeupdate" element={<FridgeUpdate/>}/>
                    <Route path="/mypage/userinvite" element={<UserInvite/>}/>
                    <Route path="/mypage/userdelete" element={<UserDelete/>}/>
                    <Route path="/mypage/qrcode" element={<QRCode/>}/>

                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default Router;
