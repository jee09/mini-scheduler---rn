import react, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components/native";
import Header from "../components/Header";
import { Calendar } from "react-native-calendars";
import { StyleSheet, View } from "react-native";
import colors from "../utils/Colors";
import { userInfoState } from "../utils/recoilState/userState";
import { useRecoilState } from "recoil";
import TextStyled from "../components/TextStyled";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type TSchedule = {
  scheduleNm: string;
  scheduleDt: string;
};
type TNotice = {
  notice: string;
  noticeDt: string;
};

const _scheduleData = [
  {
    scheduleNm: "자격증 시험",
    scheduleDt: "2024-02-09",
  },
  {
    scheduleNm: "자격증 시험",
    scheduleDt: "2024-02-11",
  },
  {
    scheduleNm: "자격증 시험",
    scheduleDt: "2024-02-14",
  },
  {
    scheduleNm: "자격증 시험",
    scheduleDt: "2024-02-15",
  },
];
const _noticeData = [
  {
    notice:
      "공지사항 내용1공지사항내용공지사항내용공지사항내용공지사항내용공지사항내용",
    noticeDt: "2024-02-09",
  },
  {
    notice: "공지사항 내용2공지사항내용공지사항내용",
    noticeDt: "2024-02-11",
  },
  {
    notice:
      "공지사항 내용1공지사항내용공지사항내용공지사항내용공지사항내용공지사항내용",
    noticeDt: "2024-02-09",
  },
  {
    notice: "공지사항 내용2공지사항내용공지사항내용",
    noticeDt: "2024-02-11",
  },
  {
    notice:
      "공지사항 내용1공지사항내용공지사항내용공지사항내용공지사항내용공지사항내용",
    noticeDt: "2024-02-09",
  },
  {
    notice: "공지사항 내용2공지사항내용공지사항내용",
    noticeDt: "2024-02-11",
  },
];

const customCalendarTheme = {
  textDayFontSize: 16,
  textMonthFontSize: 22,
  textDayHeaderFontSize: 16,
  textSectionTitleColor: "black",
  monthTextColor: colors.GREEN,
  arrowColor: colors.GREEN,
  textDayFontFamily: "Cafe24OhsquareAir",
  textMonthFontFamily: "Cafe24Ohsquare",
  textDayHeaderFontFamily: "Cafe24Ohsquare",
  "stylesheet.calendar.header": {
    dayTextAtIndex0: {
      fontFamily: "Cafe24Ohsquare",
      color: colors.GREEN,
    },
    dayTextAtIndex6: {
      fontFamily: "Cafe24Ohsquare",
      color: colors.GREEN,
    },
  },
};

const HomeScreen = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [subTitleTxt, setSubTitleTxt] = useState<string>("");
  const [scheduleList, setScheduleList] = useState<TSchedule[]>();
  const [noticeList, setNoticeList] = useState<TNotice[]>();
  const [loginModalStatus, setLoginModalStatus] = useState<number>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const today = new Date().toISOString().split("T")[0];

  let markedDates = {
    [today]: {
      customStyles: {
        container: {
          backgroundColor: colors.LIGHTGREEN,
          borderRadius: 20,
        },
        text: {
          color: "black",
        },
      },
    },
  };

  scheduleList?.forEach((schedule) => {
    markedDates[schedule.scheduleDt] = {
      customStyles: {
        text: {
          color: colors.GREEN,
          fontFamily: "Cafe24Ohsquare",
        },
      },
    };
  });

  useEffect(() => {
    if (!userInfo) {
      setSubTitleTxt("회원가입 후 일정을 등록해보세요");
    } else {
      if (scheduleList) {
        setSubTitleTxt("님께서 등록하신 일정입니다.");
      } else {
        setSubTitleTxt("회원님, 일정을 등록해보세요!");
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) {
      const _userInfo = {
        userId: "wonji",
        userNm: "원지",
      };
      setUserInfo(_userInfo);
    }

    console.log("🚀 ~ :");

    setScheduleList(_scheduleData);
    setNoticeList(_noticeData);
  }, []);

  const onLoginBtnEvent = () => {
    if (!userInfo) {
      console.log("press");
      bottomSheetModalRef.current?.expand();
    }
  };
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    setLoginModalStatus(index);
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ HomeScreen ~ loginModalStatus:", loginModalStatus);
  }, [loginModalStatus]);

  return (
    <>
      <Container>
        <Header />
        <Calendar
          style={styles.calendar}
          hideExtraDays={true}
          markedDates={markedDates}
          markingType={"custom"}
          monthFormat={"MMM"}
          theme={customCalendarTheme}
        />
        <SubTitleContainer>
          <RowContainer>
            <TextStyled isBold fontSize={17} marginRight={5}>
              {userInfo?.userId}
            </TextStyled>
            <TextStyled>{subTitleTxt}</TextStyled>
          </RowContainer>
          {userInfo && (
            <AllViewBtn>
              <TextStyled>일정전체보기</TextStyled>
            </AllViewBtn>
          )}
          {!userInfo && (
            <AllViewBtn onPress={handlePresentModalPress}>
              <TextStyled>로그인</TextStyled>
            </AllViewBtn>
          )}
        </SubTitleContainer>
        {userInfo && (
          <ScheduleListContainer>
            {scheduleList?.slice(0, 3).map((item, idx) => {
              return (
                <ScheduleCard key={`${idx}${item.scheduleDt}`} {...item} />
              );
            })}
          </ScheduleListContainer>
        )}
        <AdBox></AdBox>
        <NoticeContainer>
          <TextStyled
            isBold
            fontSize={20}
            marginVertical={20}
            textAlign="center"
          >
            공지사항
          </TextStyled>
          {noticeList?.slice(0, 4).map((item, idx) => {
            return <NoticeCard key={`${idx}${item.noticeDt}`} {...item} />;
          })}
        </NoticeContainer>
      </Container>
      {loginModalStatus === 0 && <Overlay onPress={handleCloseModalPress} />}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={["40%"]}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <ModalContainer>
          <TextStyled fontSize={13} marginVertical={20} textAlign="center">
            SNS로 편하게 로그인 & 회원가입 하기~!
          </TextStyled>
          <LoginBtn>
            <TextStyled fontSize={20} marginVertical={20} textAlign="center">
              로그인
            </TextStyled>
          </LoginBtn>
        </ModalContainer>
      </BottomSheetModal>
    </>
  );
};

export default HomeScreen;

const ScheduleCard = (item: TSchedule) => {
  return (
    <ScheduleContainer>
      <TextStyled>{item?.scheduleNm}</TextStyled>
      <TextStyled>{item?.scheduleDt}</TextStyled>
    </ScheduleContainer>
  );
};

const NoticeCard = (item: TNotice) => {
  return (
    <NoticeCardContainer>
      <TextStyled
        numberOfLines={1}
        ellipsizeMode="tail"
        maxWidth={"85%"}
        marginBottom={20}
      >
        {item?.notice}
      </TextStyled>
      <TextStyled textAlign="right">{item?.noticeDt}</TextStyled>
    </NoticeCardContainer>
  );
};

const styles = StyleSheet.create({
  calendar: {
    paddingBottom: 30,
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderColor: colors.GREEN,
    marginVertical: 20,
  },
});
const Overlay = styled.Pressable`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.5;
`;
const NoticeCardContainer = styled.View`
  padding: 10px;
  border: 1px solid ${colors.GREEN};
  border-left-width: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const ModalContainer = styled.View``;
const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;
const SubTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const AllViewBtn = styled.Pressable`
  padding: 5px;
  border: 1px solid ${colors.GREEN};
  border-radius: 5px;
`;
const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 20px 0 10px 0;
`;
const ScheduleContainer = styled.View`
  border: 1px solid ${colors.GREEN};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;
const ScheduleListContainer = styled.View`
  padding: 0 10px;
  margin-bottom: 30px;
`;
const AdBox = styled.View`
  height: 200px;
  margin-bottom: 10px;
  background-color: beige;
`;
const NoticeContainer = styled.View`
  padding: 0 10px;
  margin-bottom: 20px;
`;
const LoginBtn = styled.Pressable``;
