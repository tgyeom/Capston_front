import api from "../api/Instance";

/**
 * todoPage에서 전체 테이블 가져오기
 * @get
 * @success
 */
const getTodoListAllTableApi = async () => {
  try {
    const response = await api.get(`/todo/alllist`);
    const result = response.data;
    console.log(result);
    if (result.success) {
      return { success: true, data: result };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("error:", error);
    return { success: false, error: "글 불러오기 실패" };
  }
};

/**
 * 홈화면 마운트될때 멤버이메일에 맞는 오늘의 todolist불러오기
 * @post
 * @param title
 * @param content
 * @param member
 * @param selectedTodoId
 * @success
 */

const todoListApi = async (userEmail: any) => {
  try {
    const response = await api.post(`/todo/today`, {
      todoEmail: userEmail,
    });
    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("error:", error);
    return { success: false, error: "불러오기 실패" };
  }
};

/**
 * 홈화면 마운트될때 멤버이메일에 맞는 내일의 todolist불러오기
 * @post
 * @param title
 * @param content
 * @param member
 * @param selectedTodoId
 * @success
 */

const tomorrowTodoListApi = async (userEmail: any) => {
  try {
    const response = await api.post(`/todo/tomorrow`, {
      todoEmail: userEmail,
    });
    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("error:", error);
    return { success: false, error: "불러오기 실패" };
  }
};

/**
 * 투두리스트 생성 api

 */
const createTodoListApi = async (title: any, content: any, time: any) => {
  try {
    const response = await api.post("/todo/create", {
      todoListApi: title,
    });
    console.log(response);
    if (response.status === 200) {
      console.log(response.data);
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("error:", error);
    return { success: false, error: "전송 실패" };
  }
};

/**
 * 홈에서 날짜 선택후 투두리스트 삭제
 * @post
 * @param selectedTodoId
 * @success
 */
const deleteTodoListApi = async (todoemail: any, selectedId: any) => {
  try {
    const response = await api.post(`/todo/delete/${selectedId}`, {
      todoEmail: todoemail,
    });

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("error:", error);
    return { success: false, error: "삭제 실패" };
  }
};
/**
 * 홈에서 날짜 선택후 투두리스트 수정(update)
 * @post
 * @param title
 * @param content
 * @param categories
 * @param time
 */
const updateTodoListApi = async (
  title: any,
  content: any,
  time: any,
  categories: any
) => {
  try {
    const response = await api.post(`/todo/update`, {});
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("error:", error);
    return { success: false, error: "수정 실패" };
  }
};

/**
 * 투두리스트 검색
 * @param input
 * @returns
 */
const sendSearchTitleApi = async (input: any) => {
  try {
    const response: any = await api.post(`/todo/searchTitle`, {
      todoTitle: input,
    });
    console.log(input);
    const data = response.data;
    console.log(data);
    if (response.status === 200) {
      return { success: true, data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("error:", error);
    return { success: false, error: "글찾기 불러오기 실패" };
  }
};

/**
 * 투두리스트 검색
 * @param input
 * @returns
 */
const sendSearchCaterogyApi = async (input: any) => {
  try {
    const response: any = await api.post(`/todo/searchCategory`, {
      todoTitle: input,
    });
    console.log(input);
    const data = response.data;
    console.log(data);
    if (response.status === 200) {
      return { success: true, data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("error:", error);
    return { success: false, error: "글찾기 불러오기 실패" };
  }
};

/**
 * 댓글
 * @param comment
 * @returns
 */
const createCommentApi = async (comment: any) => {
  try {
    const memberId = localStorage.getItem("memberId");
    const response: any = await api.post(`/todo/comment`, {
      todoTitle: comment,
      memberId: memberId,
    });

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("error:", error);
    return { success: false, error: "글찾기 불러오기 실패" };
  }
};
export {
  createTodoListApi,
  deleteTodoListApi,
  updateTodoListApi,
  getTodoListAllTableApi,
  todoListApi,
  tomorrowTodoListApi,
  sendSearchTitleApi,
  sendSearchCaterogyApi,
  createCommentApi,
};