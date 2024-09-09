   import Header from "../components/Login/Header.jsx";
import SocialLoginButton from "../components/Login/SocialLoginButton.jsx";
   import BarNavigate from "../components/Common/BarNavigate.jsx";

const LoginPage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full bg-white max-w-[390px] max-h-[500px]">
            <Header/>
            <img loading="lazy" src="/assets/untitled-2@2x.png" alt="" className="mt-8 max-w-full aspect-square w-[200px]" />
            <SocialLoginButton/>
            <BarNavigate
                shoppingsrc="/assets/shopping.png"
                homesrc="/assets/homeselect.png"
                searchsrc="/assets/search.png"
            />
        </main>
    );
};

export default LoginPage;
