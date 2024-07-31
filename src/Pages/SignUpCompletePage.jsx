
import CompleteButton from '../components/SignUpComplete/CompleteButton';
import Header from '../components/SignUpComplete/Header';

const SignUpCompletePage = () => {
    return (
        <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full bg-white max-w-[480px] max-h-[500px]">
            <Header/>
            <CompleteButton/>
        </main>
    );
};

export default SignUpCompletePage;