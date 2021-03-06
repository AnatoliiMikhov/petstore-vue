<template>
  <div>
    <my-header :cartItemCount="cartItemCount"></my-header>
    <main>
      <div v-for="(product, key) in sortedProducts" :key="key">
        <div class="row">
          <div class="col-md-5 col-md-offset-0">
            <figure>
              <img v-bind:src="product.image" alt="image" class="product" />
            </figure>
          </div>
          <!-- end of col-md-5 col-md-offset-0 -->
          <div class="col-md-6 col-md-offset-0 description">
            <h1>
              <router-link
                tag="a"
                :to="{ name: 'Id', params: { id: product.id } }"
                >{{ product.title }}</router-link
              >
            </h1>
            <p v-html="product.description"></p>
            <p class="price">
              {{ product.price | formatPrice }}
            </p>
            <button
              class="btn btn-primary btn-lg"
              v-on:click="addToCart(product)"
              v-if="canAddToCart(product)"
            >
              Add To Cart
            </button>
            <button class="btn btn-primary btn-lg" disabled="true" v-else>
              Add To Cart
            </button>
            <transition name="bounce" mode="out-in">
              <span
                class="inventory-message"
                v-if="product.availableInventory - cartCount(product.id) === 0"
                key="1"
                >All Out!
              </span>
              <span
                class="inventory-message"
                v-else-if="
                  product.availableInventory - cartCount(product.id) < 5
                "
                key=""
              >
                Only
                {{ product.availableInventory - cartCount(product.id) }} left!
              </span>
              <span class="inventory-message" v-else key="">Buy Now! </span>
            </transition>
            <div class="rating">
              <span
                v-bind:class="{ 'rating-active': checkRating(n, product) }"
                v-for="(n, key) in 5"
                v-bind:key="key"
                >☆</span
              >
            </div>
            <!-- end of rating -->
          </div>
          <!-- end of col-md-6 col-md-offset-0 description -->
        </div>
        <!-- end of row -->
      </div>
      <!-- end of v-for -->
    </main>
  </div>
</template>

<script>
import MyHeader from "./Header";
import { mapGetters } from "vuex";

export default {
  name: "imain",
  data() {
    return {
      cart: [],
    };
  },
  components: { MyHeader },
  methods: {
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0;
    },
    addToCart(aProduct) {
      this.cart.push(aProduct.id);
    },
    canAddToCart(aProduct) {
      return aProduct.availableInventory > this.cartCount(aProduct.id);
    },
    cartCount(id) {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    },
  },
  computed: {
    ...mapGetters(["products"]),
    cartItemCount() {
      return this.cart.length || "";
    },
    sortedProducts() {
      if (this.products.length > 0) {
        let productsArray = this.products.slice(0);
        function compare(a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        }
        return productsArray.sort(compare);
      }
    },
  },
  filters: {
    formatPrice(price) {
      if (!parseInt(price)) {
        return "";
      }
      if (price > 99999) {
        let priceString = (price / 100).toFixed(2);
        let priceArray = priceString.split("").reverse();
        let index = 3;
        while (priceArray.length > index + 3) {
          priceArray.splice(index + 3, 0, ",");
          index += 4;
        }
        return "$" + priceArray.reverse().join("");
      } else {
        return "$" + (price / 100).toFixed(2);
      }
    },
  },
  created: function () {
    this.$store.dispatch("initStore");
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.bounce-enter-active {
  animation: shake 2.72s cubic-bezier(0.37, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

@keyframes shake {
  10%,
  90% {
    color: red;
    transform: translate3d(-5px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(8px, 0, 0);
  }
  30%,
  50%,
  70% {
    color: red;
    transform: translate3d(-10px, 0, 100px);
  }
  40%,
  60% {
    transform: translate3d(10px, 0, 0);
  }
}
</style>