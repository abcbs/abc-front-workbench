/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO';
export const SUBMMIT_TODO = 'SUBMMIT_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const ADD_TODO_VERFIY='ADD_TODO_VERFIY'
/*
 * 其它的常量
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  ADD_TODO_VERFIY: 'ADD_TODO_VERFIY'
};

/*
 * action 创建函数
 */
export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

export function addTodoVerfiy(text) {
  return { type: ADD_TODO_VERFIY, text }
}

/*
 * action 创建函数
 */
export function submmitTodo(text) {
  return { type: SUBMMIT_TODO, text }
}