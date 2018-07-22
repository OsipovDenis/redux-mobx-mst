import React from "react";
import { render } from "react-dom";
import { Provider } from 'mobx-react';
import DevTools from "mobx-react-devtools";

import TodoList from "./components/TodoList";
import TodoListModel from "./models/TodoListModel";
import TodoModel from "./models/TodoModel";

const store = new TodoListModel();

render(
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <div style={{ width: '300px'}}>
      <h1>Mobx</h1>
      <Provider store={store}>
        {/* <DevTools /> */}
        <TodoList />
      </Provider>
    </div>

    <div style={{ width: '300px'}}>
      <h1>MST</h1>
      <Provider store={store}>
        {/* <DevTools /> */}
        <TodoList />
      </Provider>
    </div>

    <div style={{ width: '300px'}}>
      <h1>Redux</h1>
      <Provider store={store}>
        {/* <DevTools /> */}
        <TodoList />
      </Provider>
    </div>
  </div>,
  document.getElementById("root")
);

store.addTodo("Get Coffee");
store.addTodo("Write simpler code");
store.todos[0].finished = true;

setTimeout(() => {
  store.addTodo("Get a cookie as well");
}, 2000);

// playing around in the console
window.store = store;
