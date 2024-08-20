import Button from "../../button/Button";
import MyBodySizeModalInput from "./MyBodySizeModalInput";

import { GoX } from "react-icons/go";

export default function MyBodySizeModal({
  setMyBodySizeModalOpen,
  myBodySizeModalOpen,
  setMyHeight,
  myHeight,
  setMyWeight,
  myWeight,
  setMySize,
  mySize,
  setMyFootSize,
  myFootSize,
  myBodyInfo,
  handleStoreBodySizeInfo,
}) {
  return (
    <div
      className={`${
        myBodySizeModalOpen ? "block" : "hidden"
      } w-[100vw] h-[100vh] bg-black bg-opacity-60 fixed top-0 left-0 z-[999999999] flex justify-center items-center`}
    >
      <div className="w-[28%] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="box-border flex items-center w-full p-4">
          <button
            className="mr-20 text-[1.6rem]"
            onClick={() => setMyBodySizeModalOpen(false)}
          >
            <GoX />
          </button>
        </div>

        <div className="box-border w-full px-4">
          <div className="text-center mt-[15px] mb-[25px] pb-[25px] border-b-[2px] border-solid border-[#282828]">
            <h1 className="text-[1.25rem] font-semibold">
              나의 체형 정보 입력
            </h1>
          </div>

          <div className="box-border px-2 py-3">
            <MyBodySizeModalInput
              labelName="myHeight"
              title="키"
              onChange={(e) => {
                setMyHeight(e.target.value);
              }}
              value={myHeight}
              sizeData={myBodyInfo?.myHeight}
            />
            <MyBodySizeModalInput
              labelName="myWeight"
              title="몸무게"
              onChange={(e) => {
                setMyWeight(e.target.value);
              }}
              value={myWeight}
              sizeData={myBodyInfo?.myWeight}
            />
            <MyBodySizeModalInput
              labelName="mySize"
              title="사이즈"
              onChange={(e) => {
                setMySize(e.target.value);
              }}
              value={mySize}
              sizeData={myBodyInfo?.mySize}
            />
            <MyBodySizeModalInput
              labelName="myFoot"
              title="발사이즈"
              onChange={(e) => {
                setMyFootSize(e.target.value);
              }}
              value={myFootSize}
              sizeData={myBodyInfo?.myFootSize}
            />

            <div className="flex justify-center w-full mb-3">
              <Button
                onClick={(e) => handleStoreBodySizeInfo(e)}
                value="등록"
                styleType="blackHover"
                styles="w-full mt-6 py-3 text-[0.875rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
