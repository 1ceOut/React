import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { AiOutlinePlus } from 'react-icons/ai';
import useFeedStore from '../../../store/useFeedStore'; // 게시물 관련 Zustand store
import useUserStore from '../../../store/useUserStore'; // 유저 관련 Zustand store

const CreateFeed = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [isEnabled, setIsEnabled] = useState(false); // 버튼 활성화 상태
    const navigate = useNavigate();

    // Zustand 스토어에서 함수 가져오기
    const { addPosting } = useFeedStore(); 
    const { userId } = useUserStore(); 

    useEffect(() => {
        // 모든 필드가 채워졌는지 확인
        if (title && content && tag) {
            setIsEnabled(true);
        } else {
            setIsEnabled(false);
        }
    }, [title, content, tag]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // 이미지 base64 저장
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (isEnabled && userId) {
            // 게시물 데이터 생성
            const postingData = {
                title,
                contents: content,
                tags: tag,
                image: selectedImage, 
                user_id: userId, // 유저 ID 추가
                writeday: new Date(), // 작성일자 추가
            };

            try {
                // Zustand에서 정의된 addPosting 함수 호출
                await addPosting(postingData);

                // 게시물 추가 후 페이지 이동
                navigate('/community/feed');
            } catch (err) {
                console.error("Error adding posting:", err);
            }
        }
    };

    return (
        <div className="self-stretch">
            <div className="flex justify-center items-center mb-8">
                <label
                    htmlFor="image-upload"
                    className="relative cursor-pointer w-[180px] h-[180px] bg-gray-200 flex justify-center items-center rounded-full overflow-hidden"
                >
                    {selectedImage ? (
                        <img
                            src={selectedImage}
                            alt="Uploaded"
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <AiOutlinePlus size={40} className="text-gray-500" />
                            <span className="text-gray-500 mt-2">Add Photo</span>
                        </div>
                    )}
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </label>
            </div>
            <div className="self-stretch border rounded-[12px] w-[342px] flex justify-center items-center mt-4">
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="30글자 이내로 제목을 입력해 주세요"
                    className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="self-stretch border rounded-[12px] w-[342px] h-[300px] flex justify-center my-8">
                <input
                    id="content"
                    name="content"
                    type="text"
                    placeholder="장우님의 얘기를 들려주세요"
                    className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="self-stretch border rounded-[12px] w-[342px] flex justify-center items-center mt-4">
                <input
                    id="tag"
                    name="tag"
                    type="text"
                    placeholder="# 주제어를 입력해주세요"
                    className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
            </div>
            <div
                className={`flex text-[#868686] rounded-xl self-stretch justify-center items-center w-[342px] mt-5 h-14 cursor-pointer ${
                    isEnabled ? 'bg-blue-500 text-white' : 'bg-[#D1D1D1]'
                }`}
                onClick={isEnabled ? handleSubmit : undefined}
            >
                게시하기
            </div>
        </div>
    );
};

CreateFeed.propTypes = {
    isEnabled: PropTypes.bool, // 이 prop은 더 이상 필요 없으므로 제거 가능
};

export default CreateFeed;
