<script setup>
import { reactive, toRaw } from 'vue'

const data = reactive({
  name: '',
  amount: 0,
  products: []
})

const temp = reactive({
  title: '',
  price: 0,
  frame: ''
})

const addProduct = () => {
  data.products.push({ title: temp.title, price: temp.price, frame: temp.frame })
  temp.title = ''
  temp.price = 0
  temp.frame = ''
}

const removeProduct = (title) => {
  data.products = data.products.filter(e => e !== title)
}

const logData = () => {
  console.log(toRaw(data))
}

const sendData = async () => {
  let res = await fetch("http://localhost:3000/add-json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toRaw(data))
  })
  let resData = await res.json()
  console.log(resData)
}

</script>

<template>
  <h1>Vue Demo</h1>
  <label for="name">Name: </label>
  <input id="name" v-model="data.name" placeholder="hello there">
  <br />
  <label for="amount">Amount: </label>
  <input id="amount" v-model="data.amount" type="number">
  <h2>Add A Product</h2>
  <label for="title">Title: </label>
  <input id="title" v-model="temp.title" placeholder="cool product">
  <br />
  <label for="price">Price: </label>
  <input id="price" v-model="temp.price" type="number">
  <br />
  <label for="frame">Frame: </label>
  <input id="frame" v-model="temp.frame" placeholder="cool frame">
  <br />
  <button @click="addProduct">Add Product</button>
  <button @click="logData">Log Data To Console</button>
  <hr />
  <ul>
    <li v-for="product in data.products" :key="product.title">
      {{ product.title }}. Price: {{ product.price }}, Frame: {{ product.frame }}
      <button @click="removeProduct(product)">X</button>
    </li>
  </ul>
  <hr />
  <button @click="sendData">Send Data to MongoDB</button>
  <!--<h1>Debug!</h1>
  <h3>{{ data.name }}</h3>
  <h3>{{ data.amount }}</h3>
  <h3>{{ temp.title }}</h3>
  <h3>{{ temp.price }}</h3>
  <h3>{{ temp.frame }}</h3>-->
</template>

<style>
body {
  margin: 10em;
  display: block;
  text-align: center;
  background-color: #333;
  color: #ddd;
  font-family: sans-serif;
}
h1 {
  font-size: 48px;
}
h2 {
  font-size: 36px;
  font-family: sans-serif;
}
label, button {
  font-size: 24px;
}
</style>
