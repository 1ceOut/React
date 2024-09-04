import CompleteButton from "../components/SignUpComplete/CompleteButton";
import Header from "../components/SignUpComplete/Header";

const SignUpCompletePage = () => {
  return (
    // 공통 기본 틀
    <main className="flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen">
      {/* 회원가입 완료 주요 내용 */}
      <Header />
      {/* 회원가입 완료 버튼 */}
      <CompleteButton />
    </main>
  );
};

export default SignUpCompletePage;
