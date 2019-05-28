<template>
  <div class="container">
    <img src="../assets/logo.png" alt="vue logo" class="logo" />
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done"
      v-model="newTodo"
      @keydown.enter="addTodo"
    />
    <div class="todo-item" v-for="todo in filteredTodos" :key="todo.id">
      <div class="todo-item-left">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="completeTodo(todo.id)"
        />
        <div
          v-if="!todo.editing"
          class="todo-item-label"
          :class="{ completed: todo.completed }"
          @dblclick="editTodo(todo.id)"
        >
          {{ todo.title }}
        </div>
        <input
          v-else
          autofocus
          type="text"
          class="todo-item-edit"
          v-model="todo.title"
          @blur="doneEdit(todo.id)"
          @keydown.enter="doneEdit(todo.id)"
        />
      </div>
      <div class="remove-item" @click="deleteTodo(todo.id)">&times;</div>
    </div>
    <div class="extra-container">
      <div>
        <label>
          <input type="checkbox" @change="checkAllTodos" />Check All
        </label>
      </div>
      <div>{{ todosRemaining }} items left</div>
    </div>
    <div class="extra-container">
      <div>
        <button @click="setFilter('all')" :class="{ active: filter === 'all' }">
          All
        </button>
        <button
          @click="setFilter('active')"
          :class="{ active: filter === 'active' }"
        >
          Active
        </button>
        <button
          @click="setFilter('completed')"
          :class="{ active: filter === 'completed' }"
        >
          Completed
        </button>
      </div>

      <div>
        <button @click="clearCompleted">Clear Completed</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'TodoList',
  data: () => ({
    newTodo: '',
  }),
  computed: {
    ...mapState(['filter']),
    ...mapGetters(['filteredTodos', 'todosRemaining']),
  },
  methods: {
    addTodo() {
      this.$store.commit('addTodo', this.newTodo)
      this.newTodo = ''
    },
    ...mapMutations([
      'editTodo',
      'doneEdit',
      'completeTodo',
      'deleteTodo',
      'checkAllTodos',
      'setFilter',
      'clearCompleted',
    ]),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}
.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}
.todo-item-left {
  // later
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc; //override defaults
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  &:focus {
    outline: none;
  }
}
.completed {
  text-decoration: line-through;
  color: grey;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;

  input {
    margin-right: 8px;
  }
}
button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  &:hover {
    background: salmon;
  }
  &:focus {
    outline: none;
  }
}
.active {
  background: salmon;
}
</style>
