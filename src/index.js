import React from "react";
import { render } from "react-dom";
import { Provider } from 'mobx-react';

import TodoList from "./components/TodoList";
import TodoListModelMobx from "./models/mobx/TodoListModel";
import TodoListModelMst from "./models/mst/TodoListModel";

const storeMobx = new TodoListModelMobx();
const storeMst = TodoListModelMst.create();

render(
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <div style={{ width: '300px'}}>
      <h1>Mobx</h1>
      <Provider store={storeMobx}>
        <TodoList />
      </Provider>
    </div>

    <div style={{ width: '300px'}}>
      <h1>MST</h1>
      <Provider store={storeMst}>
        <TodoList />
      </Provider>
    </div>

    <div style={{ width: '300px'}}>
      <h1>Redux</h1>
      <Provider store={storeMobx}>
        <TodoList />
      </Provider>
    </div>
  </div>,
  document.getElementById("root")
);

storeMobx.addTodo("Get Coffee");
storeMobx.addTodo("Write simpler code");
storeMobx.todos[0].finished = true;

storeMst.addTodo("Get Coffee");
storeMst.addTodo("Write simpler code");
storeMst.todos[0].setFinished(true);

setTimeout(() => {
  storeMobx.addTodo("Get a cookie as well");
  storeMst.addTodo("Get a cookie as well");
}, 2000);

// playing around in the console
window.storeMobx = storeMobx;
