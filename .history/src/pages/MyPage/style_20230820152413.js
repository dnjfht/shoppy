import styled from "styled-components";

export const MyPageWrapper = styled.div`
  background-color: #f4f5f6;
  width: 100%;
  display: flex;
  gap: 100px;
  min-height: calc(100vh - 102px);
  /* align-items: center; */
  /* justify-content: center; */
  @media screen and (max-width: 1200px) {
    gap: 100px;
    font-size: 15px;
  }
  @media screen and (max-width: 900px) {
    gap: 10px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    gap: 0px;
    flex-direction: column;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
    flex-direction: column;
  }
`;
//여기는 왼쪽 박스 스타일구역
export const LeftBox = styled.div`
  /* width: 400px; */
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 120px 20px 20px 20px;
  box-sizing: content-box;
  background-color: #fff;
  @media screen and (max-width: 1200px) {
    width: 250px;
  }
  @media screen and (max-width: 900px) {
    width: 190px;
    gap: 40px;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
  }
  @media screen and (max-width: 400px) {
    width: 340px;
  }
`;
export const UserNicknameDiv = styled.div`
  width: 380px;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  margin: 0 auto;
  gap: 20px;
  /* background-color: yellow; */
  @media screen and (max-width: 1200px) {
    width: 250px;
  }
  @media screen and (max-width: 900px) {
    width: 190px;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
    align-items: center;
    border-bottom: 1px solid #f7f7f8;
    padding-bottom: 10px;
  }
  @media screen and (max-width: 400px) {
    width: 340px;
    margin: 0;
    height: 60px;
  }
`;

export const UserText = styled.h3`
  font-size: 23px;
`;
export const UserContentDiv = styled.div`
  width: 380px;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1200px) {
    width: 250px;
  }
  @media screen and (max-width: 900px) {
    width: 190px;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
    border-bottom: none;
  }
  @media screen and (max-width: 400px) {
    width: 375px;
    border-bottom: none;
  }
`;
export const ResponsiveMypage = styled.div`
  width: 375px;
  display: none;
  @media screen and (max-width: 600px) {
    display: block;
  }
`;
export const ResCategoryTab = styled.div`
  width: 540px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 20px;
  border-top: 1px solid #f7f7f8;
  @media screen and (max-width: 400px) {
    width: 390px;
  }
`;
export const ContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    width: 250px;
  }
  @media screen and (max-width: 900px) {
    width: 190px;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
    align-items: center;
  }
  @media screen and (max-width: 400px) {
    width: 360px;
  }
`;
export const LogOutBtn = styled.button`
  width: 84px;
  height: 32px;
  border: 1px solid #aaa;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: #888;
  font-size: 1rem;
  @media screen and (max-width: 1200px) {
    width: 70px;
    font-size: 11px;
  }
  @media screen and (max-width: 600px) {
    width: 80px;
  }
  @media screen and (max-width: 400px) {
    width: 70px;
    font-size: 10px;
  }
`;

export const UserAccountDiv = styled.div`
  display: flex;
  width: 380px;
  height: 72px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  @media screen and (max-width: 1200px) {
    width: 250px;
    height: 65px;
  }
  @media screen and (max-width: 900px) {
    width: 190px;
    gap: 20px;
  }
  @media screen and (max-width: 600px) {
    width: 190px;
    display: none;
  }
`;

export const UserHistoryDiv = styled.div`
  display: flex;
  width: 380px;
  margin: 0 auto;
  flex-direction: column;
  gap: 20px;
  @media screen and (max-width: 1200px) {
    width: 250px;
    height: 65px;
  }
  @media screen and (max-width: 900px) {
    width: 190px;
  }
  @media screen and (max-width: 600px) {
    width: 190px;
    display: none;
  }
`;

export const HistoryCategory = styled.div`
  width: 380px;
  height: 72px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  @media screen and (max-width: 1200px) {
    width: 250px;
    height: 65px;
  }
  @media screen and (max-width: 900px) {
    width: 190px;
  }
`;
//여기서부터는 오른쪽 박스 스타일 구역
export const RightBox = styled.div`
  /* width: 900px; */
  height: 810px;
  /* background-color: #f4f5f6; */
  padding: 20px;
  display: flex;
  // overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1200px) {
    width: 1000px;
  }
  @media screen and (max-width: 1000px) {
    width: 900px;
  }
  @media screen and (max-width: 800px) {
    width: 700px;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;
export const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  @media screen and (max-width: 900px) {
    width: 700px;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;
export const RightSecondWrapper = styled.div`
  width: 530px;
  margin: auto auto 10px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: #fff;
  @media screen and (max-width: 900px) {
    width: 98%;
  }
  @media screen and (max-width: 700px) {
    width: 98%;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
    padding: 10px;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;

export const ChangePasswordDiv = styled.div`
  display: flex;
  height: 400px;
  flex-direction: column;
  gap: 20px;
  h3 {
    font-size: 25px;
  }
  @media screen and (max-width: 900px) {
    width: 90%;
  }
  @media screen and (max-width: 700px) {
    width: 95%;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
    h3 {
      font-size: 16px;
      color: #505050;
    }
    .password {
      font-size: 13px;
    }
    .passwordMessage {
      font-size: 12px;
    }
    .newPassword {
      font-size: 13px;
    }
    .confirmNewPassword {
      font-size: 13px;
    }
  }
  @media screen and (max-width: 400px) {
    width: 375px;
  }
`;
export const UserInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 10px;
  height: 50px;
  padding-left: 10px;
  @media screen and (max-width: 900px) {
    width: 500px;
    border-radius: 5px;
  }
  @media screen and (max-width: 700px) {
    width: 350px;
    border-radius: 5px;
  }
  @media screen and (max-width: 600px) {
    width: 450px;
  }
  @media screen and (max-width: 400px) {
    width: 360px;
  }
`;
export const ChangePwtext = styled.p`
  color: #aaa;
  margin-top: 5px;
  @media screen and (max-width: 600px) {
    font-size: 13px;
  }
`;

export const ChangeNickNameDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 115px;
  gap: 5px;
  margin-top: 10px;
  font-size: 25px;
  @media screen and (max-width: 600px) {
    h3 {
      font-size: 16px;
      color: #505050;
    }
    p {
      font-size: 12px;
    }
  }
`;

export const NicknameMessage = styled.p`
  font-size: 15px;
  color: green;
`;

export const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 50px;
`;
export const StyledIcons = styled.img`
  width: 40px;
  height: 40px;
`;
export const CategoryImg = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SaveBtn = styled.button`
  background-color: #6a24ff;
  width: 240px;
  height: 50px;
  border-radius: 10px;
  color: white;
  margin-top: 10px;

  @media screen and (max-width: 900px) {
    width: 210px;
  }
  @media screen and (max-width: 600px) {
    width: 99px;
    font-weight: bold;
    border-radius: 5px;
  }
`;

//예금적금 버튼
export const ProductTypesBtn = styled.button`
  width: 122px;
  height: 46px;
  border-radius: 15px;
  background-color: white;
`;

//내가 쓴 글 컴포넌트 스타일
export const UseListeWrapper = styled.div`
  width: 900px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media screen and (max-width: 1200px) {
    width: 700px;
  }
  @media screen and (max-width: 950px) {
    width: 90%;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
    justify-content: center;
  }
  @media screen and (max-width: 400px) {
    width: 375px;
    justify-content: center;
  }
`;

// 여기서부터 나의 팁
export const ListCard = styled.div`
  width: 280px;
  height: 550px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #ccc;
`;

export const CategoryLikeContainer = styled.div`
  margin: 10px 10px; //마이페이지에 디자인과 쪼금 다름
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CategoryLike = styled.div`
  display: flex;
  gap: 130px; //카테고리와 북마크 사이 거리
  align-items: center;
  box-sizing: border-box;
`;
export const CardCategory = styled.div`
  border: 1px solid #aaa;
  width: 100px;
  height: 29px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export const SecondTitle = styled.div`
  display: flex;
  gap: 30px;
  color: #999;
  font-size: 14px;
`;
export const Block = styled.div`
  width: 20px;
  height: 25px;
`;
export const CardTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 10px;
`;
export const CardImage = styled.img`
  width: 279px;
  height: 211px;
  object-fit: cover;
  border-radius: 15px;
`;

export const CardContentWrapper = styled.div`
  height: 200px;
  color: #818181;
  font-size: 16px;
  line-height: 25px;
`;

//회원탈퇴
export const DeleteUser = styled.div`
  display: flex;
  flex-direction: row-reverse;
  height: 40px;
  p {
    @media screen and (max-width: 600px) {
      margin-right: 20px;
    }
  }
`;

//반응형시 나올 탭
export const ResUserAccount = styled.div`
  cursor: pointer;
`;
export const ResUserHistory = styled.div`
  cursor: pointer;
`;
export const ResUserTips = styled.div`
  cursor: pointer;
`;
