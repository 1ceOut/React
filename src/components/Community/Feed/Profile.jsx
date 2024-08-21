import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import HorizontalLine from "../../Common/HorizontalLine";

const Profile = () => {

    const navigate = useNavigate();

    const myfeedNavigation = () => {
        navigate("/community/feedcreate");
    };

    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    const profiles = [
        { src: "/assets/cha.png", name: "Cha" },
        { src: "/assets/cha.png", name: "Cha" },
        { src: "/assets/cha.png", name: "Cha" },
        { src: "/assets/cha.png", name: "Cha" },
        { src: "/assets/cha.png", name: "Cha" },
        { src: "/assets/cha.png", name: "Cha" },
        { src: "/assets/cha.png", name: "Cha" },
        { src: "/assets/cha.png", name: "Cha" },
        { src: "/assets/cha.png", name: "Cha" },
        { src: "/assets/cha.png", name: "Cha" },
    ];

    return (
        <div>
            <div className="self-stretch max-w-[342px] mt-6 relative">
            <div className="flex items-center">
                <button 
                    onClick={scrollLeft} 
                    className="absolute left-2 z-10 p-1 bg-white rounded-full shadow-md"
                >
                    &#8249;
                </button>

                <div 
                    ref={scrollContainerRef} 
                    className="flex overflow-x-auto space-x-5 scrollbar-hide"
                    style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
                >
                    {profiles.map((profile, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <img
                                src={profile.src}
                                alt={`Profile ${index + 1}`}
                                className="w-[80px] h-[80px] rounded-full object-cover cursor-pointer"
                                onClick={myfeedNavigation}
                            />
                            <span className="text-sm font-semibold mt-2 w-[80px] flex justify-center items-center">{profile.name}</span>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={scrollRight} 
                    className="absolute right-2 z-10 p-1 bg-white rounded-full shadow-md"
                >
                    &#8250;
                </button>
            </div>
        </div>
            <div className="mt-[14px] mb-8">
                <HorizontalLine/>
            </div>
        </div>
    );
};

export default Profile;
