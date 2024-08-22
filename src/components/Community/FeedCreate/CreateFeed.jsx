import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { AiOutlinePlus } from 'react-icons/ai'; // 사진 추가 아이콘

const CreateFeed = ({ isEnabled, nextPath }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (isEnabled) {
            navigate(nextPath);
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
                />
            </div>
            <div className="self-stretch border rounded-[12px] w-[342px] h-[300px] flex justify-center my-8">
                <input
                    id="content"
                    name="content"
                    type="text"
                    placeholder="장우님의 얘기를 들려주세요"
                    className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
                />
            </div>
            <div className="self-stretch border rounded-[12px] w-[342px] flex justify-center items-center mt-4">
                <input
                    id="tag"
                    name="tag"
                    type="text"
                    placeholder="# 주제어를 입력해주세요"
                    className="block outline-none w-[302px] h-14 text-gray-900 placeholder:text-[#A8A8A8]"
                />
            </div>
            <div
                className={`flex text-[#868686] rounded-xl self-stretch justify-center items-center w-[342px] mt-5 h-14 cursor-pointer bottom-[54px] ${
                    isEnabled ? 'bg-blue-500 text-white' : 'bg-[#D1D1D1]'
                }`}
                onClick={isEnabled ? handleSubmit : null}
            >
                게시하기
            </div>
        </div>
    );
};

CreateFeed.propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    nextPath: PropTypes.string.isRequired,
};

export default CreateFeed;
