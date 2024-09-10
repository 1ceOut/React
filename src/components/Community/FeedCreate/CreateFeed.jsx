import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useAddPost, uploadImage } from "../../../query/FeedQuery"; // React Query 훅 import
import useUserStore from "../../../store/useUserStore"; // Zustand store import
import axios from "axios";

const CreateFeed = () => {
  const [selectedImage, setSelectedImage] = useState(null); // 썸네일 이미지 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [stepDescription, setStepDescription] = useState("");
  const [stepImage, setStepImage] = useState(null);
  const [steps, setSteps] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const navigate = useNavigate();

  const { mutate: addPost } = useAddPost();
  const { userId } = useUserStore();

  useEffect(() => {
    if (title && content && tag && selectedImage) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [title, content, tag, selectedImage]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        setSelectedImage(imageUrl);
      } catch (error) {
        // 이미지 업로드 실패 처리
      }
    }
  };

  const handleStepImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        setStepImage(imageUrl);
      } catch (error) {
        // 스텝 이미지 업로드 실패 처리
      }
    }
  };

  const handleAddStep = () => {
    if (stepDescription) {
      const newStep = {
        description: stepDescription,
        image: stepImage || null,
      };
      setSteps([...steps, newStep]);
      setStepDescription("");
      setStepImage(null);
    }
  };

  const handleRemoveStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (isEnabled && userId) {
      const postingData = {
        title,
        contents: content,
        tags: tag,
        thumbnail: selectedImage || null,
        userId: userId,
        writeday: new Date().toISOString(),
        steps,
      };

      try {
        await addPost(postingData);

        navigate("/community/feed");
      } catch (err) {
        // 포스트 작성 실패 처리
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
      <div className="mb-4 mt-8 font-bold text-xl">제목</div>
      <div className="self-stretch border bg-white rounded-[12px] w-[342px] flex justify-center items-center mt-4">
        <textarea
          id="title"
          name="title"
          type="text"
          placeholder="30글자 이내로 제목을 입력해 주세요"
          className="block outline-none w-[302px] h-14 text-gray-900 p-4 placeholder:text-[#A8A8A8] bg-[]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4 mt-8 font-bold text-xl">내용</div>
      <div className="self-stretch border bg-white rounded-[12px] w-[342px] h-[300px] flex justify-center">
        <textarea
          id="content"
          name="content"
          placeholder="컨텐츠를 적어주세요."
          className="block outline-none w-[302px] h-[298px] p-4 text-gray-900 placeholder:text-[#A8A8A8] resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="mb-4 mt-8 font-bold text-xl">태그</div>
      <div className="self-stretch border bg-white rounded-[12px] w-[342px] flex justify-center items-center mt-4">
        <textarea
          id="tag"
          name="tag"
          type="text"
          placeholder="# 해시태그"
          className="block outline-none w-[302px] h-14 p-4 text-gray-900 placeholder:text-[#A8A8A8]"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>
      <div className="mb-4 mt-8 font-bold text-xl">조리 순서</div>
      <div className="self-stretch border bg-white rounded-[12px] w-[342px] p-4 mb-8">
        <textarea
          id="step-description"
          name="step-description"
          type="text"
          placeholder="단계 설명을 입력해 주세요."
          className="block outline-none w-full h-12 text-gray-900 placeholder:text-[#A8A8A8] mb-4"
          value={stepDescription}
          onChange={(e) => setStepDescription(e.target.value)}
        />
        <div className="flex items-center justify-between mb-4">
          <input
            id="step-image"
            name="step-image"
            type="file"
            accept="image/*"
            onChange={handleStepImageChange}
            className="mr-4 max-w-[200px]"
          />
          {stepImage && (
            <img
              src={stepImage}
              alt="Step Preview"
              className="w-16 h-16 object-cover"
            />
          )}
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white w-full rounded px-4 py-2"
          onClick={handleAddStep}
        >
          Add Step
        </button>
        <div className="mt-4">
          {steps.map((s, index) => (
            <div key={index} className="border rounded p-2 mb-2">
              <div className="flex justify-center items-end mb-2">
                <span className="flex-1 text-xl font-bold max-w-5">{`${
                  index + 1
                }.`}</span>
                <span className="flex-1 items-center justify-center">
                  {s.description}
                </span>
                {s.image && (
                  <img
                    src={s.image}
                    alt={`Step ${index + 1}`}
                    className="w-16 h-16 object-cover ml-2"
                  />
                )}
              </div>
              <button
                type="button"
                className="text-red-500 w-full mt-2"
                onClick={() => handleRemoveStep(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex text-[#868686] rounded-xl self-stretch justify-center items-center w-[342px] mt-5 h-14 cursor-pointer ${isEnabled ? "bg-blue-500 text-white" : "bg-[#D1D1D1]"
          }`}
        onClick={isEnabled ? handleSubmit : undefined}
      >
        게시하기
      </div>
    </div>
  );
};

export default CreateFeed;
