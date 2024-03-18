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
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { DateData } from "react-native-calendars";
import SvgIcon from "../components/SvgIcon";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProps } from "../navigation/types";

type TSchedule = {
  scheduleNm: string;
  scheduleDt: string;
  handleGoDetailBtn: () => void;
};
type TNotice = {
  notice: string;
  noticeDt: string;
};

type TCustomDayComponentProps = {
  date?: DateData;
  state?: string;
};

type CustomHeaderProps = {
  date: string;
};

const _scheduleData = [
  {
    scheduleNm: "자격증 시험",
    scheduleDt: "2024-03-09",
  },
  {
    scheduleNm: "자격증 시험",
    scheduleDt: "2024-03-11",
  },
  {
    scheduleNm: "자격증 시험",
    scheduleDt: "2024-03-11",
  },
  {
    scheduleNm: "자격증 시험",
    scheduleDt: "2024-03-14",
  },
  {
    scheduleNm: "자격증 시험",
    scheduleDt: "2024-03-15",
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

const CustomHeader = ({ date }: CustomHeaderProps) => {
  const headerDate = new Date(date);
  const year = headerDate.getFullYear();
  const month = headerDate.toLocaleString("ko-KR", { month: "long" });

  return (
    <CalHeaderContainer>
      <CalYearTxt>{year}</CalYearTxt>
      <CalMonthTxt>{month}</CalMonthTxt>
    </CalHeaderContainer>
  );
};

const HomeScreen = () => {
  //* Hooks 선언 -----------------------------------------------------------------------
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const navi = useNavigation<StackNavigationProps>();
  //* Recoil State ---------------------------------------------------------------------
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  //* State ----------------------------------------------------------------------------
  const [subTitleTxt, setSubTitleTxt] = useState<string>("");
  const [scheduleList, setScheduleList] = useState<TSchedule[] | undefined>();
  const [noticeList, setNoticeList] = useState<TNotice[]>();
  const [loginModalStatus, setLoginModalStatus] = useState<number>();
  const today = new Date().toISOString().split("T")[0];
  //* Functions ------------------------------------------------------------------------
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

  const dateCounts: { [key: string]: number } = (scheduleList ?? []).reduce<{
    [key: string]: number;
  }>((acc, schedule) => {
    const { scheduleDt } = schedule;
    acc[scheduleDt] = (acc[scheduleDt] || 0) + 1;
    return acc;
  }, {});

  const CustomDayComponent = ({ date, state }: TCustomDayComponentProps) => {
    const day = date?.day;
    const isMultiple = date ? dateCounts[date.dateString] > 1 : false;
    const hasSchedule = date ? dateCounts[date.dateString] >= 1 : false;

    return (
      <CalDayContainer isMultiple={isMultiple}>
        <CalDayTxt
          isToday={state === "today"}
          isMultiple={isMultiple}
          hasSchedule={hasSchedule}
        >
          {day}
        </CalDayTxt>
        {isMultiple && <CalScheduleTxt>2+</CalScheduleTxt>}
      </CalDayContainer>
    );
  };

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
  const handleGoDetailBtn = () => {
    navi.navigate("Stack", { screen: "ScheduleDetail" });
  };
  const handleAddScheduleBtn = () => {};
  const handleGoListBtn = () => {
    navi.navigate("Tabs", { screen: "Schedule" });
  };

  //* lifecycle ------------------------------------------------------------------------
  useEffect(() => {
    console.log("🚀 ~ HomeScreen ~ loginModalStatus:", loginModalStatus);
  }, [loginModalStatus]);
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

    setScheduleList(_scheduleData);
    setNoticeList(_noticeData);
  }, []);
  //* render ---------------------------------------------------------------------------
  return (
    <>
      <Container>
        <Header />
        <Calendar
          style={styles.calendar}
          hideExtraDays={true}
          markedDates={markedDates}
          markingType={"custom"}
          monthFormat={"yyyy MMM"}
          theme={customCalendarTheme}
          renderHeader={(date) => <CustomHeader date={date} />}
          dayComponent={({ date, state }: TCustomDayComponentProps) => (
            <CustomDayComponent date={date} state={state} />
          )}
        />
        <SubTitleContainer>
          <RowContainer>
            <TextStyled isBold fontSize={20} marginRight={5}>
              {userInfo?.userId}
            </TextStyled>
            <TextStyled>{subTitleTxt}</TextStyled>
          </RowContainer>
          {userInfo && scheduleList && scheduleList?.length > 0 && (
            <AllViewBtn onPress={handleGoListBtn}>
              <TextStyled>일정 전체보기</TextStyled>
            </AllViewBtn>
          )}
          {userInfo && scheduleList?.length === 0 && (
            <AllViewBtn onPress={handleAddScheduleBtn}>
              <TextStyled>일정 등록하러가기</TextStyled>
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
            {scheduleList ? (
              scheduleList?.slice(0, 3).map((item, idx) => {
                return (
                  <ScheduleCard
                    key={`${idx}${item.scheduleDt}`}
                    {...item}
                    handleGoDetailBtn={handleGoDetailBtn}
                  />
                );
              })
            ) : (
              <NoScheduleContainer>
                <SvgIcon name="LogoGray" />
              </NoScheduleContainer>
            )}
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
    <ScheduleWrap onPress={item.handleGoDetailBtn}>
      <ShadowEffect />
      <ScheduleContainer>
        <TextStyled>{item?.scheduleNm}</TextStyled>
        <TextStyled>{item?.scheduleDt}</TextStyled>
      </ScheduleContainer>
    </ScheduleWrap>
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
  margin: 20px 0;
`;

const AllViewBtn = styled.Pressable`
  padding: 5px;
  border: 1px solid ${colors.GREEN};
  border-radius: 5px;
`;
const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ScheduleWrap = styled.Pressable`
  position: relative;
  flex: 1;
  margin-bottom: 20px;
`;

const ScheduleContainer = styled.View`
  border: 1px solid ${colors.GREEN};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 10px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: white;
  z-index: 20;
`;

const ShadowEffect = styled.View`
  position: absolute;
  bottom: -5px;
  right: -5px;
  padding: 30px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 15px;
  background-color: ${colors.GREEN};
  width: 100%;
  z-index: 1;
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
const CalHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  text-align: center;
`;
const CalYearTxt = styled.Text`
  font-size: 22px;
  background-color: ${colors.GREEN};
  padding: 0 3px 3px 3px;
  border-radius: 5px;
  color: white;
  font-weight: 300;
  margin-right: 10px;
  font-family: "Cafe24OhsquareAir";
  text-align: center;
  min-height: 30px;
`;
const CalMonthTxt = styled.Text`
  font-size: 22px;
  color: ${colors.GREEN};
  font-family: "Cafe24Ohsquare";
  text-align: center;
  padding: 0 3px 6px 3px;
  min-height: 30px;
`;
const CalDayContainer = styled.View<{
  isMultiple?: boolean;
}>`
  margin-bottom: ${(props) => `${props.isMultiple ? 0 : "15px"}`};
  min-height: 30px;
`;
const CalDayTxt = styled.Text<{
  isToday?: boolean;
  isMultiple?: boolean;
  hasSchedule: boolean;
}>`
  font-size: 16px;
  color: ${(props) => `${props.hasSchedule ? colors.GREEN : "black"}`};
  font-family: ${(props) =>
    `${props.hasSchedule ? "Cafe24Ohsquare" : "Cafe24OhsquareAir"}`};
  text-align: center;
  background-color: ${(props) => `${props.isToday ? colors.LIGHTGREEN : null}`};
  border-radius: ${(props) => `${props.isToday ? "25px" : 0}`};
  padding: 5px;
`;
const CalScheduleTxt = styled.Text`
  font-size: 14px;
  color: black;
  font-family: "Cafe24OhsquareAir";
  text-align: center;
  border-width: 1px;
  border-color: ${colors.GREEN};
  border-radius: 15px;
  padding: 0 3px;
`;

const NoScheduleContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 30px;
`;
