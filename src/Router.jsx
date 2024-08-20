import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import HomePage from './Pages/Main/HomePage.jsx';
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
import FridgeDeletePage from './Pages/MyPage/FridgeDeletePage.jsx';
import UserDeletePage from './Pages/MyPage/UserDeletePage.jsx';
import UserInvitePage from './Pages/MyPage/UserInvitePage.jsx';
import FridgeUpdatePage from './Pages/MyPage/FridgeUpdatePage.jsx';
import FeedPage from "./Pages/Community/FeedPage.jsx";
import FeedDetailPage from './Pages/Community/FeedDetailPage';
import FeedCreatePage from './Pages/Community/FeedCreatePage';
import MyFeedPage from './Pages/Community/MyFeedPage';
import AddFood from './Pages/Refrigerator/food/AddFood.jsx';
import AddInput from './Pages/Refrigerator/food/AddInput.jsx';
import FoodDetail from './Pages/Refrigerator/food/FoodDetail.jsx'; 
import FoodList from "./Pages/Refrigerator/food/FoodList.jsx";

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
                    <Route path="/Refrigerator/food/AddFood" element={<AddFood/>}/>
                    <Route path="/Refrigerator/food/AddInput" element={<AddInput/>}/> 
                    <Route path="/Refrigerator/food/FoodDetail" element={<FoodDetail/>}/>
                    <Route path="/Refrigerator/food/FoodList" element={<FoodList/>}/>


                    {/* 알림 */}
                    <Route path="/alert/alert" element={<AlertPage/>}/>
                    <Route path="/alert/noalert" element={<NoAlertPage/>}/>

                    {/* 마이페이지 */}
                    <Route path="/mypage/profile" element={<ProfilePage/>}/>
                    <Route path="/mypage/fridgedelete" element={<FridgeDeletePage/>}/> 
                    <Route path="/mypage/fridgeupdate" element={<FridgeUpdatePage/>}/>
                    <Route path="/mypage/userinvite" element={<UserInvitePage/>}/>
                    <Route path="/mypage/userdelete" element={<UserDeletePage/>}/>

                    {/* 커뮤니티 */}
                    <Route path="community/feed" element={<FeedPage/>}/>
                    <Route path="community/feeddetail" element={<FeedDetailPage/>}/>
                    <Route path="community/feedcreate" element={<FeedCreatePage/>}/>
                    <Route path="community/myfeed" element={<MyFeedPage/>}/>

                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default Router;
