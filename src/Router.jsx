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

const queryClient = new QueryClient();

const Router = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/login/oauth2/code/:provider" element={<LoginAccess/>} />

                    <Route path="/addinfo/habit" element={<HabitPage/>}/>
                    <Route path="/addinfo/favorite" element={<FavoritePage/>}/>
                    <Route path="/addinfo/allergic" element={<AllergicPage/>}/>
                    <Route path="/login/signupcomplete" element={<SignUpCompletePage/>}/>

                    <Route path="/fridge/fridgemanage" element={<FridgeManagePage/>}/>

                    <Route path='/' element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default Router;
