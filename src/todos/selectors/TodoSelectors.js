import { createSelector } from 'reselect';
import { VisibilityFilters } from '../actions';

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos||[];
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
    }
}
//visibilityFilterSelector和todosSelector是input-selector。
// 因为他们并不转换数据，所以被创建成普通的非记忆的selector函数。
const visibilityFilterSelector = (state) => {
    return state.visibilityFilter;
}
const todosSelector = (state) => {
    const stateParent=state.todos.present;
    return stateParent;
}

//visibleTodosSelector是一个可记忆的selector。
// 他接收visibilityFilterSelector和todosSelector为input-selector，
// 还有一个转换函数来计算过滤的todos列表。
//createSelector(...inputSelectors | [inputSelectors], resultFunc)
/**
 const shopItemsSelector = state => state.shop.items
 const taxPercentSelector = state => state.shop.taxPercent

 const subtotalSelector = createSelector(
 shopItemsSelector,
 items => items.reduce((acc, item) => acc + item.value, 0)
 )

 const taxSelector = createSelector(
 subtotalSelector,
 taxPercentSelector,
 (subtotal, taxPercent) => subtotal * (taxPercent / 100)
 )

 export const totalSelector = createSelector(
 subtotalSelector,
 taxSelector,
 (subtotal, tax) => ({ total: subtotal + tax })
 )

 let exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.20 },
      { name: 'orange', value: 0.95 },
    ]
  }
}

 console.log(subtotalSelector(exampleState)) // 2.15
 console.log(taxSelector(exampleState))      // 0.172
 console.log(totalSelector(exampleState))    // { total: 2.322 }
 */
export const visibleTodosSelector = createSelector(
    [visibilityFilterSelector,todosSelector],
    (visibilityFilter,todos) => {
        const result=selectTodos(todos, visibilityFilter);
        return result;
    }
);


//可记忆的selector自身可以作为其它可记忆的selector的input-selector。
// 下面的visibleTodosSelector被当作另一个selector的input-selector，
// 来进一步通过关键字（keyword）过滤todos。
const keywordSelector = (state) => state.keyword;
export const keywordFilterSelector = createSelector(
    [ visibleTodosSelector, keywordSelector ],
    (visibleTodos, keyword) => visibleTodos.filter(
        todo => todo.indexOf(keyword) > -1
    )
)

