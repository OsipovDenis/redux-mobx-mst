import React from "react";
import { render } from "react-dom";
import { Provider as MobxProvider } from 'mobx-react';
import { Provider as ReduxProvider } from 'react-redux';

import TodoList from "./components/TodoList";
import TodoListRedux from "./components/TodoListRedux";

import TodoListModelMobx from "./models/mobx/TodoListModel";
import TodoListModelMst from "./models/mst/TodoListModel";
import TodoListModelRedux from './models/redux/store';
import { addTodoAction, setTodoFinishedAction } from './models/redux/actions';

const storeRedux = TodoListModelRedux;
const storeMobx = new TodoListModelMobx();
const storeMst = TodoListModelMst.create();

import "babel-core/register";
import "babel-polyfill";

render(
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>

    <div style={{ width: '300px'}}>
      <h1>Redux</h1>
      <ReduxProvider store={storeRedux}>
        <TodoListRedux />
      </ReduxProvider>
    </div>

    <div style={{ width: '300px'}}>
      <h1>Mobx</h1>
      <MobxProvider store={storeMobx}>
        <TodoList />
      </MobxProvider>
    </div>

    <div style={{ width: '300px'}}>
      <h1>MST</h1>
      <MobxProvider store={storeMst}>
        <TodoList />
      </MobxProvider>
    </div>

  </div>,
  document.getElementById("root")
);

storeRedux.dispatch(addTodoAction("Get Coffee"));
storeRedux.dispatch(addTodoAction("Write simpler code"));
storeRedux.dispatch(setTodoFinishedAction({id: storeRedux.getState().todos[0].id, finished: true}));

storeMobx.addTodo("Get Coffee");
storeMobx.addTodo("Write simpler code");
storeMobx.todos[0].finished = true;

storeMst.addTodo("Get Coffee");
storeMst.addTodo("Write simpler code");
storeMst.todos[0].setFinished(true);

setTimeout(() => {
  storeMobx.addTodo("Get a cookie as well");
  storeMst.addTodo("Get a cookie as well");
  storeRedux.dispatch(addTodoAction("Get a cookie as well"));
}, 2000);
