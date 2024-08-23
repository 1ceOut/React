   import Header from "../components/Login/Header.jsx";
import SocialLoginButton from "../components/Login/SocialLoginButton.jsx";

const LoginPage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full bg-white max-w-[390px] max-h-[500px]">
            <Header/>
            <img loading="lazy" src="/assets/untitled-2@2x.png" alt="" className="mt-8 max-w-full aspect-square w-[200px]" />
            <SocialLoginButton/>
            <button className="px-5 py-3.5 mt-32 text-sm font-medium tracking-tight text-center bg-white rounded-3xl border border-solid border-zinc-300 text-neutral-500 focus:outline-none focus:ring-2 foucus:ring-blue-500">
                로그인에 어려움이 있나요?
            </button>
        </main>
    );
};

export default LoginPage;
