<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ count.count }}</h1>
    <h1>{{ todos }}</h1>
    <h1>{{ doneTodos }}</h1>
    <h2>Essential Links</h2>
    <h2>{{ reversedMessage }}</h2>
    <h2>{{ now }}</h2>
    <input v-model="question">
    <div v-if="Math.random() > 0.5">
      Now you see me
    </div>
    <div v-else>
      Now you don't
    </div>
    <ul id="example-2">
      <li v-for="(item, index) in items">
        {{ parentMessage }} - {{ index }} - {{ item.message }}
      </li>
    </ul>
    <ul>
      <li v-for="n in evenNumbers">{{ n }}</li>
    </ul>
    <button v-on:click="increment">Greet</button>

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    props: ['unit'],
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        question: 'Welcome to Your Vue.js App',
        parentMessage: 'Parent',
        items: [
          { message: 'Foo' },
          { message: 'Bar' },
        ],
        numbers: [1, 2, 3, 4, 5],
      };
    },
    watch: {
      question(newQuestion) {
        this.msg = newQuestion;
      },
    },
    computed: {
      reversedMessage() {
        return this.msg.split('').reverse().join('');
      },
      now() {
        return Date.now();
      },
      evenNumbers() {
        return this.numbers.filter(number => number % 2 === 0);
      },
      todos() {
        return this.$store.state.todos;
      },
      doneTodos() {
        return this.$store.getters.doneTodos;
      },
      ...mapState([
        'count',
      ]),
    },
    methods: {
      greet(event) {
        console.log(event);
      },
      ...mapActions([
        'increment',
      ]),
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
