import React, { useState, useEffect, FC } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal";
import {
  Header,
  SearchButton,
  SearchContainer,
  SearchInput,
  ModalBackdrop,
  RecentSearchList,
  BottomNav,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSearch,
  faHome,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  searchSuccessSelector,
  searchListSelector,
  searchBackDropSelector,
  searchSuccessListSelector,
  navState,
} from "../../../utils/recoil/atom";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  sendSearchTitleApi,
  sendSearchCaterogyApi,
} from "../../../utils/apimodule/todolist";
import { toast } from "react-toastify";
import Select from "react-select";

interface Props {
  type?: boolean;
}

const Layout: FC<Props> = ({ type }) => {
  const [activePage, setActivePage] = useRecoilState(navState);
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [searchOption, setSearchOption] = useState("제목");
  const [successResponseData, setSuccessResponseData] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const showTodoModal = () => {
    setIsModalOpen(true);
    setModalType("searchResult");
  };

  const setSearchSuccessData: any = useSetRecoilState(searchSuccessSelector);

  const [searchListValue, setSearchListValue]: any =
    useRecoilState(searchListSelector);

  const [searchSuccessList, setSearchSuccessList]: any = useRecoilState(
    searchSuccessListSelector
  );

  const [searchBackDropState, setSearchBackDropState]: any = useRecoilState(
    searchBackDropSelector
  );

  const sendSearchData = async () => {
    updateRecentSearches(searchInput);
    console.log(searchListValue);

    try {
      let response: any;
      if (searchOption === "제목") {
        response = await sendSearchTitleApi(searchInput);
      } else {
        response = await sendSearchCaterogyApi(searchInput);
      }

      if (response.success === "true") {
        toast.warning("검색결과가 없습니다.");
        setSuccessResponseData(false);
      } else {
        const searchResult = {
          title: "안녕",
          categories: "#ㄴㅁㄷㄹ#ㄴ#ㄴㅁㄷㄹ",
          likes: 12,
          liked: 0,
          content: "ㅁㄴㄷㄹㄴㅁㄹㄷ",
          memberemail: "ktg5679@gmail.com",
        };
        setSearchSuccessList([searchResult]); // 배열로 설정
        toast.success("검색 성공");
        setSuccessResponseData(true);
        setSearchSuccessData(searchResult);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateRecentSearches = (searchKeyword: any) => {
    setSearchListValue((prevSearchList: any[]) => {
      if (!prevSearchList.includes(searchKeyword)) {
        return [...prevSearchList, searchKeyword];
      } else {
        return prevSearchList;
      }
    });
  };

  const handleBackdropClick = () => {
    setSearchBackDropState(true);
  };

  useEffect(() => {
    let page = "";

    if (location.pathname === "/home") {
      page = "home";
    } else if (location.pathname === "/todopage") {
      page = "todopage";
    }

    if (page) {
      setActivePage(page);
    }
  }, [location.pathname]);

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      fontSize: "12px",
      marginLeft: "-10px",
      width: "80px",
      marginRight: "20px",
      borderRadius: "10px",
      border: "none",
      focus: "none",
      outline: "none",
      zIndex: "1000",
    }),
  };

  const options = [
    { value: "title", label: "제목" },
    { value: "category", label: "카테고리" },
  ];

  return (
    <>
      {type ? (
        <Header>
          <SearchContainer>
            <Select
              options={options}
              value={options.find((option) => option.value === searchOption)}
              onChange={(selectedOption) =>
                setSearchOption(selectedOption?.value || "제목")
              }
              styles={customStyles}
            />
            <SearchInput
              type="text"
              placeholder="투두리스트 검색..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onClick={handleBackdropClick}
            />
            <SearchButton onClick={sendSearchData}>
              <FontAwesomeIcon icon={faSearch} />
            </SearchButton>
          </SearchContainer>

          {searchBackDropState ? (
            <>
              {successResponseData ? (
                <RecentSearchList>
                  {(Array.isArray(searchSuccessList)
                    ? searchSuccessList
                    : []
                  ).map((search: any, index: number) => (
                    <div key={index}>
                      {search.title}
                      <p>{search.memberEmail}</p>
                    </div>
                  ))}
                </RecentSearchList>
              ) : searchListValue.length > 0 ? (
                <RecentSearchList>
                  {searchListValue.map((search: string, index: number) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSearchInput(search);
                      }}
                    >
                      {search}
                    </div>
                  ))}
                </RecentSearchList>
              ) : (
                <RecentSearchList>
                  <div>최근 검색어가 없습니다.</div>
                </RecentSearchList>
              )}
            </>
          ) : null}
        </Header>
      ) : (
        <></>
      )}
      <Outlet />
      {searchBackDropState && (
        <ModalBackdrop
          onClick={() => {
            setSearchBackDropState(false);
            setSearchInput("");
          }}
        />
      )}
      {type ? (
        <BottomNav>
          <ul>
            <li
              className={activePage === "home" ? "activePage" : ""}
              onClick={() => {
                navigate("/home");
              }}
            >
              <FontAwesomeIcon icon={faHome} />
              <div>홈</div>
            </li>
            <li
              className={activePage === "todopage" ? "activePage" : ""}
              onClick={() => {
                navigate("/todopage");
              }}
            >
              <FontAwesomeIcon icon={faStar} />
              <div>투두 순위/업데이트</div>
            </li>
          </ul>
        </BottomNav>
      ) : null}
      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)} modalType={modalType} />
      )}
    </>
  );
};

export default Layout;
