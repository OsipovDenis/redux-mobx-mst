export const defaultState = {
    todos: []
};

const todosReducer = (state = defaultState, action) => {
    switch(action.type) {
      case 'ADD_TODO': {
        const todos = [...state.todos];
        todos.push({ id: Math.random(), title: action.title, finished: false });
        return Object.assign({}, state, { todos });
      }
      case 'REMOVE_TODO': {
        return Object.assign({}, state, {
            todos: state.todos.filter(item => item.id !== action.id)
        });
      }
      case 'SET_TODO_TITLE': {
        console.log('action: ', action);
        return Object.assign({}, state, {
            todos: state.todos.map(item => {
              if (item.id === action.id) {
                return { ...item, title: action.title };
              }
              return item;
            })
        });
      }
      case 'SET_TODO_FINISHED': {
        return Object.assign({}, state, {
            todos: state.todos.map(item => {
              if (item.id === action.id) {
                return { ...item, finished: action.finished };
              }
              return item;
            })
        });
      }
      default: {
        return state;
      }
    }
};

export default todosReducer;