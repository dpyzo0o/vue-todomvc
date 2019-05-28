import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const KEY = 'VUE_TODO_MVC'

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    localStorage.setItem(KEY, JSON.stringify(state))
  })
}

export default new Vuex.Store({
  plugins: [localStoragePlugin],
  state: JSON.parse(localStorage.getItem(KEY)) || {
    todos: [],
    filter: 'all',
  },
  getters: {
    filteredTodos: state =>
      state.filter === 'all'
        ? state.todos
        : state.filter === 'active'
        ? state.todos.filter(todo => !todo.completed)
        : state.todos.filter(todo => todo.completed),
    todosRemaining: state => state.todos.filter(todo => !todo.completed).length,
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id:
          state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        title: todo,
        completed: false,
        editing: false,
      })
    },
    editTodo(state, id) {
      state.todos.find(todo => todo.id === id).editing = true
    },
    doneEdit(state, id) {
      state.todos.find(todo => todo.id === id).editing = false
    },
    completeTodo(state, id) {
      const todo = state.todos.find(todo => todo.id === id)
      todo.completed = !todo.completed
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id)
    },
    checkAllTodos(state) {
      state.todos.forEach(todo => (todo.completed = !todo.completed))
    },
    setFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.todos.forEach(todo => (todo.completed = false))
    },
  },
})
