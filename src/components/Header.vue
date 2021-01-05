<template>
  <header>
    <div class="navbar navbar-default">
      <div class="navbar-header">
        <h1>
          <router-link :to="{ name: 'iMain' }">
            {{ sitename }}
          </router-link>
        </h1>
      </div>
      <!-- end of navbar-header -->
      <div class="nav navbar-nav navbar-right cart">
        <router-link
          active-class="active"
          tag="button"
          class="btn btn-default btn-lg"
          :to="{ name: 'Form' }"
        >
          <span class="glyphicon glyphicon-shopping-cart">{{
            cartItemCount
          }}</span
          >Checkout</router-link
        >
      </div>
      <!-- end of nav navbar-nav navbar-right cart -->
    </div>
  </header>
</template>

<script>
export default {
  name: "my-header",
  data() {
    return {
      sitename: "Vue Pet Store",
    };
  },
  props: ["cartItemCount"],
  methods: {},
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.router-link-exact-active {
  color: #337ab7;
}
</style>