
import MenuNavigate from './../../components/Common/MenuNavigate';
import Body from './../../components/Alert/NoAlert/Body';

const NoAlertPage = () => {
    return (
        <main className="flex flex-col items-center pt-5 pb-2 mx-auto w-full max-w-[342px]">
            <MenuNavigate option={"알림"} alertPath="/addinfo/habit" profilePath="/addinfo/habit"/>
            <Body/>
        </main>
    );
};

export default NoAlertPage;