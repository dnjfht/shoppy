import React, { useState } from "react";
import ChangePassword from "../../components/MyPage/UserAccount/ChangePassword";
import ChangeNickname from "../../components/MyPage/UserAccount/ChangeNickname";
import {
  MyPageWrapper,
  LeftBox,
  StyledImage,
  RightBox,
  UserNicknameDiv,
  UserText,
  UserContentDiv,
  ContentDiv,
  UserAccountDiv,
  UserHistoryDiv,
  RightWrapper,
  LogOutBtn,
  StyledIcons,
  HistoryCategory,
  CategoryImg,
  SaveBtn,
  ProductTypesBtn,
  RightSecondWrapper,
  ResponsiveMypage,
  ResUserAccount,
  ResUserHistory,
  ResUserTips,
  DeleteUser,
  ResCategoryTab,
} from "./style";
import { updatePassword, updateProfile, deleteUser } from "firebase/auth";
import { firebaseConfig } from "../../api/firebase";
import { RiLogoutBoxLine } from "react-icons/ri";
// import BookmarkPrdtList from "../../components/Mypage/BookmarkPrdtList";
import { authService } from "../../api/firebase";
import { useNavigate } from "react-router-dom";
//import UserWriteList from "../../components/Mypage/UserHistory/UserWriteList";
//import UserLikeList from "../../components/Mypage/UserHistory/UserLikeList";
import { CiLock } from "react-icons/ci";
import { GiCutDiamond } from "react-icons/gi";
import { MdTipsAndUpdates } from "react-icons/md";

function MyPage() {
  const navigate = useNavigate();
  // 세션스토리지에서 로그인했을 때 저장된 current user 가져오기
  const userSession = sessionStorage.getItem(
    `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
  );
  const currentUser = userSession ? JSON.parse(userSession) : null;
  const onLogoutClick = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      return authService.signOut().then(() => {
        sessionStorage.clear(); // ?
        alert("로그아웃 되었습니다.");

        if (!sessionStorage) {
          navigate("/", { replace: true });
        }
      });
    } else {
      return;
    }
  };

  const [tab, setTab] = useState(0);

  //마이페이지 기능구현 필요 state
  const user = authService.currentUser;
  console.log(user);

  const [btnValidation, setBtnValidation] = useState(true);

  const [productTypes, setProductTypes] = useState(1); //예금 적금

  //ChangePassword.jsx
  const [userPassword, setUserPassword] = useState(""); //현재 유저 패스워드
  const [editUserPassword, setEditUserPassword] = useState(""); //고치고 싶은 비밀번호
  const [inputValidationConfirm, setInputValidationConfirm] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [corfirmPasswordMessage, setConfirmPasswordMessage] = useState("");
  const [doubleCheckPasswordMessage, setDoubleCheckPasswordMessage] =
    useState("");
  //ChangeNickName.jsx
  //newNickname: 유저의 바꿀 닉네임 ,  name: 왼쪽박스 유저 네임
  const [newNickName, setNewNickName] = useState(currentUser?.displayName);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [name, setName] = useState(newNickName);
  const [isNickName, setIsNickName] = useState(false);

  //닉네임 업데이트 함수
  const clickUserUpdate = async (e) => {
    e.preventDefault();
    if (password !== userPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (window.confirm("개인정보를 수정 하시겠습니까?")) {
      await updateProfile(user, {
        displayName: newNickName,
      });
      await PasswordUpdateHanlder()
        .then(
          alert("개인정보 수정 완료"),
          setName(newNickName),
          setInputValidationConfirm(true),
          setBtnValidation(true),
          setNicknameMessage("")
        )
        .catch((error) => {
          alert(console.log(error));
        });
    } else {
      alert("개인정보 수정 취소");
    }
  };
  //비밀번호 바꾸기 함수
  const PasswordUpdateHanlder = async () => {
    await updatePassword(user, userPassword)
      .then(() => {
        console.log("password변경 성공");
      })
      .catch((error) => {
        console.log(error);
      });

    setPassword("");
    setUserPassword("");
    setEditUserPassword("");
    setPasswordMessage("");
    setConfirmPasswordMessage("");
    setDoubleCheckPasswordMessage("");
  };
  //유저 탈퇴 함수
  const deleteUserHandler = () => {
    if (
      window.confirm("확인 버튼을 누르면 탈퇴됩니다. 회원 탈퇴 하시겠습니까?")
    ) {
      deleteUser(user).then(() => {
        alert("삭제되었습니다");
        return navigate("/");
      });
    } else {
      return;
    }
  };

  return (
    <>
      <MyPageWrapper className="제일 큰 박스">
        {/* ###########  Left    ################# */}
        <LeftBox className="왼쪽 박스">
          {/* 유저 닉네임 확인 */}
          <UserNicknameDiv>
            <StyledImage
              src={
                user && user.photoURL
                  ? user.photoURL
                  : require("../../assets/defaultImage.png")
              }
              alt="유저사진"
            ></StyledImage>
            <h3 style={{ fontSize: "25px" }}>{name}</h3>
          </UserNicknameDiv>
          {/* 유저 이름,id,연락처 부분 */}
          <UserContentDiv>
            {/* 로그인 ID */}
            <ContentDiv>
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <p>로그인 ID</p>
                <p style={{ color: "#aaa" }}>{currentUser?.email}</p>
              </div>
              {/* 로그아웃 버튼 */}
              <LogOutBtn onClick={onLogoutClick}>
                <RiLogoutBoxLine />
                로그아웃
              </LogOutBtn>
            </ContentDiv>
          </UserContentDiv>
          {/* 유저 계정 변경 부분 (디폴트부분) */}
          <UserAccountDiv
            style={tab === 0 ? { backgroundColor: "#e6e8ea" } : null}
          >
            <CategoryImg>
              <CiLock />
              <button
                onClick={() => {
                  setTab(0);
                }}
                style={{ fontSize: "20px" }}
              >
                계정 관리
              </button>
            </CategoryImg>
            <p>〉</p>
          </UserAccountDiv>
          {/* 히스토리 */}
          <UserHistoryDiv>
            <UserText
              style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px" }}
            >
              히스토리
            </UserText>
            <HistoryCategory
              style={tab === 1 ? { backgroundColor: "#E6E8EA" } : null}
            >
              <CategoryImg>
                <GiCutDiamond />
                <button
                  onClick={() => {
                    setTab(1);
                  }}
                  style={{ fontSize: "18px" }}
                >
                  찜한 상품
                </button>
              </CategoryImg>
              <p>〉</p>
            </HistoryCategory>
            <HistoryCategory
              style={tab === 2 ? { backgroundColor: "#E6E8EA" } : null}
            >
              <CategoryImg>
                <MdTipsAndUpdates />
                <button
                  onClick={() => {
                    setTab(2);
                  }}
                  style={{ fontSize: "18px" }}
                >
                  팁 관리
                </button>
              </CategoryImg>
              <p>〉</p>
            </HistoryCategory>
          </UserHistoryDiv>
        </LeftBox>
        {/* 여기는 반응형일때 나타날 구역 */}
        <ResponsiveMypage>
          <ResCategoryTab>
            <UserAccountDiv />
            <ResUserAccount onClick={() => setTab(0)}>
              <p>계정관리</p>
            </ResUserAccount>
            <ResUserHistory onClick={() => setTab(1)}>
              <p>찜한 상품</p>
            </ResUserHistory>
            <ResUserTips onClick={() => setTab(2)}>
              <p>팁 관리</p>
            </ResUserTips>
          </ResCategoryTab>
        </ResponsiveMypage>

        <RightBox className="오른쪽 박스">
          {tab === 0 && (
            <RightWrapper>
              <RightSecondWrapper>
                {/* <button style={{ display: "flex", position: "relative" }}>
                <MdTableRows fontSize="30px" />
              </button> */}
                <form
                  onSubmit={(e) => {
                    clickUserUpdate(e);
                  }}
                >
                  {user && !user.email.includes("gmail.com") && (
                    <ChangePassword
                      currentUser={currentUser} //현재의 유저 값
                      setBtnValidation={setBtnValidation} // 버튼 활성화
                      password={password} //새 비밀번호
                      setPassword={setPassword} //새 비밀번호
                      editUserPassword={editUserPassword} //현재 비밀번호
                      setEditUserPassword={setEditUserPassword} //현재 비밀번호
                      userPassword={userPassword} //새 비밀번호 확인
                      setUserPassword={setUserPassword} //새 비밀번호 확인
                      inputValidationConfirm={inputValidationConfirm} // 3번째 input 활성화
                      setInputValidationConfirm={setInputValidationConfirm} // 3번째 input 활성화
                      passwordMessage={passwordMessage}
                      setPasswordMessage={setPasswordMessage}
                      corfirmPasswordMessage={corfirmPasswordMessage}
                      setConfirmPasswordMessage={setConfirmPasswordMessage}
                      doubleCheckPasswordMessage={doubleCheckPasswordMessage}
                      setDoubleCheckPasswordMessage={
                        setDoubleCheckPasswordMessage
                      }
                    />
                  )}

                  <ChangeNickname
                    name={name}
                    isNickName={isNickName}
                    newNickName={newNickName}
                    setIsNickName={setIsNickName}
                    setNewNickName={setNewNickName}
                    nicknameMessage={nicknameMessage}
                    setNicknameMessage={setNicknameMessage}
                    setBtnValidation={setBtnValidation}
                  />

                  <SaveBtn
                    disabled={btnValidation}
                    style={
                      btnValidation === true
                        ? { backgroundColor: "#aaa" }
                        : null
                    }
                  >
                    변경사항 저장
                  </SaveBtn>
                </form>
              </RightSecondWrapper>
              <DeleteUser
                onClick={() => {
                  deleteUserHandler();
                }}
              >
                <p
                  style={{
                    color: "#888",
                    cursor: "pointer",
                    marginRight: "30px",
                  }}
                >
                  회원 탈퇴하기
                </p>
              </DeleteUser>
            </RightWrapper>
          )}

          {tab === 1 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <ProductTypesBtn
                  style={
                    productTypes === 1
                      ? { backgroundColor: "#6A24FF", color: "white" }
                      : { backgroundColor: "white", color: "black" }
                  }
                  onClick={() => {
                    setProductTypes(1);
                  }}
                >
                  정기예금
                </ProductTypesBtn>
                <ProductTypesBtn
                  style={
                    productTypes === 2
                      ? { backgroundColor: "#6A24FF", color: "white" }
                      : { backgroundColor: "white", color: "black" }
                  }
                  onClick={() => {
                    setProductTypes(2);
                  }}
                >
                  정기적금
                </ProductTypesBtn>
              </div>

              {/*<BookmarkPrdtList
                currentUser={currentUser}
                productTypes={productTypes}
                />*/}
            </div>
          )}
          {tab === 2 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <ProductTypesBtn
                  style={
                    productTypes === 1
                      ? { backgroundColor: "#6A24FF", color: "white" }
                      : { backgroundColor: "white", color: "black" }
                  }
                  onClick={() => {
                    setProductTypes(1);
                  }}
                >
                  좋아한 팁
                </ProductTypesBtn>
                <ProductTypesBtn
                  style={
                    productTypes === 2
                      ? { backgroundColor: "#6A24FF", color: "white" }
                      : { backgroundColor: "white", color: "black" }
                  }
                  onClick={() => {
                    setProductTypes(2);
                  }}
                >
                  작성한 팁
                </ProductTypesBtn>
              </div>
              {/*productTypes === 1 ? (
                <UserLikeList currentUser={user} />
              ) : (
                <UserWriteList currentUser={currentUser} />
              )*/}
            </div>
          )}
        </RightBox>
      </MyPageWrapper>
    </>
  );
}

export default MyPage;
