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
 * 홈화면 마운트될때 멤버이메일에 맞는 todolist불러오기
 * @post
 * @param title
 * @param content
 * @param member
 * @param selectedTodoId
 * @success
 */

const readTodoListApi = async (todoemail) => {
  try {
    const response = await api.post(`/todo/mylist`, {
      todoEmail: todoemail,
    });
    if (response.data.success) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("error:", error);
    return { success: false, error: "불러오기 실패" };
  }
};

const createTodoListApi = async (
  todoemail,
  title,
  content,
  selectedId,
  sharedState
) => {
  try {
    const response = await api.post("/todo/create", {
      todoEmail: todoemail,
      todoTitle: title,
      todoContent: content,
      todoDate: selectedId,
      todoCheck: sharedState,
    });
    console.log(response);
    if (response.data.success) {
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
const deleteTodoListApi = async (selectedId, todoemail) => {
  try {
    const response = await api.post(`/todo/delete/${selectedId}`, {
      todoEmail: todoemail,
    });
    if (response.data.success) {
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
 * @param Content
 * @param member
 * @param selectedTodoId
 * @success
 */
const updateTodoListApi = async (title, content, todoemail, selectedId) => {
  try {
    const response = await api.post(`/todo/update/${selectedId}`, {
      todoTitle: title,
      totoContent: content,
      todoEmail: todoemail,
    });
    return { success: true };
  } catch (error) {
    console.error("error:", error);
    return { success: false, error: "수정 실패" };
  }
};

/**
 * rating불러오기
 * @returns
 */
export {
  createTodoListApi,
  deleteTodoListApi,
  updateTodoListApi,
  getTodoListAllTableApi,
  readTodoListApi,
};
