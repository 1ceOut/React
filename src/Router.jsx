import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import HomePage from "./Pages/Main/HomePage.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import HabitPage from "./Pages/AddInfo/HabitPage";
import FavoritePage from "./Pages/AddInfo/FavoritePage";
import AllergicPage from "./Pages/AddInfo/AllergicPage";
import SignUpCompletePage from "./Pages/SignUpCompletePage";
import FridgeManagePage from "./Pages/Refrigerator/FridgeManagePage.jsx";
import AlertPage from "./Pages/Alert/AlertPage";
import NoAlertPage from "./Pages/Alert/NoAlertPage";
import KakaoLoginAccess from "./components/Login/KakaoLoginAccess.jsx";
import NaverLoginAccess from "./components/Login/NaverLoginAccess.jsx";
import GoogleLoginAccess from "./components/Login/GoogleLoginAccess.jsx";
import ProfilePage from "./Pages/MyPage/ProfilePage";
import FridgeDeletePage from "./Pages/MyPage/FridgeDeletePage.jsx";
import UserDeletePage from "./Pages/MyPage/UserDeletePage.jsx";
import UserInvitePage from "./Pages/MyPage/UserInvitePage.jsx";
import FridgeUpdatePage from "./Pages/MyPage/FridgeUpdatePage.jsx";
import FeedPage from "./Pages/Community/FeedPage.jsx";
import FeedDetailPage from "./Pages/Community/FeedDetailPage";
import FeedCreatePage from "./Pages/Community/FeedCreatePage";
import MyFeedPage from "./Pages/Community/MyFeedPage";
import AddFood from "./Pages/Refrigerator/food/AddFood.jsx";
import AddInput from "./Pages/Refrigerator/food/AddInput.jsx";
import FoodDetail from "./Pages/Refrigerator/food/FoodDetail.jsx";
import FoodList from "./Pages/Refrigerator/food/FoodList.jsx";
import MyFridge from "./Pages/Refrigerator/food/MyFridge.jsx";
import TalkList from "./Pages/Talk/TalkList.jsx";
import TalkDetail from "./Pages/Talk/TalkDetail.jsx";
import ShoppingHome from "./Pages/Shopping/ShoppingHome.jsx";
import ShoppingDetail from "./Pages/Shopping/ShoppingDetail.jsx";
import AddFridge from "./Pages/Refrigerator/food/AddFridge.jsx";
import Barcode from "./Pages/Refrigerator/food/Barocde.jsx";
import AddInput2 from "./Pages/Refrigerator/food/AddInput2.jsx";
import SearchPage from "./Pages/Main/SearchPage.jsx";

import UpdateFeed from "./Pages/Community/FeedUpdatePage.jsx";
import FeedUpdatePage from "./Pages/Community/FeedUpdatePage.jsx";
import {createAsyncStoragePersister} from "@tanstack/query-async-storage-persister";
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import {createSyncStoragePersister} from "@tanstack/query-sync-storage-persister";


const queryClient = new QueryClient();

const syncStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
})

const Router = () => {
    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{
            persister: syncStoragePersister,
            dehydrateOptions: {
                shouldDehydrateQuery: (query) => query.options.meta?.persist === true,
            },
        }}>
            <BrowserRouter>
                <Routes>
                    {/* 로그인  */}
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route
                        path="/login/oauth2/code/kakao"
                        element={<KakaoLoginAccess/>}
                    />
                    <Route
                        path="/login/oauth2/code/naver"
                        element={<NaverLoginAccess/>}
                    />
                    <Route
                        path="/login/oauth2/code/google"
                        element={<GoogleLoginAccess/>}
                    />
                    <Route path="/addinfo/habit" element={<HabitPage/>}/>
                    <Route path="/addinfo/favorite" element={<FavoritePage/>}/>
                    <Route path="/addinfo/bodyinfo" element={<AllergicPage/>}/>
                    <Route
                        path="/login/signupcomplete"
                        element={<SignUpCompletePage/>}
                    />

                    {/* 메인 페이지 */}
                    <Route path="/" element={<HomePage/>}/>

                    {/* 냉장고 관리 */}
                    <Route path="/fridge/fridgemanage" element={<FridgeManagePage/>}/>
                    <Route path="/Refrigerator/food/AddFood" element={<AddFood/>}/>
                    <Route path="/Refrigerator/food/AddBarcode" element={<Barcode/>}/>
                    <Route path="/Refrigerator/food/AddInput" element={<AddInput/>}/>
                    <Route path="/Refrigerator/food/AddInput2" element={<AddInput2/>}/>
                    <Route
                        path="/Refrigerator/food/FoodDetail"
                        element={<FoodDetail/>}
                    />
                    <Route path="/Refrigerator/food/FoodList" element={<FoodList/>}/>
                    <Route path="/Refrigerator/food/MyFridge" element={<MyFridge/>}/>
                    <Route path="/Refrigerator/food/AddFridge" element={<AddFridge/>}/>

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

                    <Route path="/community/feed" element={<FeedPage />} />
                    <Route path="/community/feeddetail/:postingId" element={<FeedDetailPage />} />
                    <Route path="/community/feedcreate" element={<FeedCreatePage />} />
                    <Route path="/community/feedupdate" element={<FeedUpdatePage/>}/>
                    {/* <Route path="community/myfeed" element={<MyFeedPage />} /> */}
                    <Route path="/community/myfeed/:userId" element={<MyFeedPage />} />


                    {/* 채팅방 */}
                    <Route path="Talk/TalkList" element={<TalkList/>}/>
                    <Route path="Talk/TalkDetail" element={<TalkDetail/>}/>

                    {/* 쇼핑 */}
                    <Route path="Shop/home" element={<ShoppingHome/>}/>
                    <Route path="Shop/detail" element={<ShoppingDetail/>}/>
                    {/* 검색 */}
                    <Route path="search/search" element={<SearchPage/>}/>
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools buttonPosition={"relative"}/>
        </PersistQueryClientProvider>
    );
};

export default Router;
