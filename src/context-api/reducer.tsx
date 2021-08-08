import { actionTypes } from "./action-type";
export const initialState = {
  todoList: [],
  todoById: [],
};
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actionTypes.addToDo:
      return {
        ...state,
        todoList: [...state.todoList, action.data],
      };
    case actionTypes.removeToDo:
      let newTodoList: any = [...state.todoList];
      const index = state.todoList.findIndex(
        (list: any) => list.id === action.id
      );
      if (index >= 0) {
        newTodoList.splice(index, 1);
      } else {
        console.warn(`Can't remove (id : ${action.id}) as its now`);
      }
      return { ...state, todoList: newTodoList };
    case actionTypes.editToDo:
      return {
        ...state,
        todoById: action.value,
      };
    case actionTypes.editValueToDo:
      return {
        ...state,
        todoList: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
