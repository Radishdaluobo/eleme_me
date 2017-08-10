<template>
    <div class="cart-contrl">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
        <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
        <div style="display:none">{{ num }}</div>
    </div>
</template>

<script>
import Vue from 'Vue'
export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            num: 0
        }
    },
    created() {

    },
    methods: {
        addCart(event) {
            if (event._constructed) {
                return;
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
            } else {
                this.num++;
                this.food.count++;
            }
        },
        decreaseCart(event) {
            if (event._constructed) {
                return;
            }
            if (this.food.count) {
                this.food.count--;
                this.num--;
            }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>
.cart-contrl {
    .cart-decrease {
        display: inline-block;
        font-size: 24px;
        color: #00a0dc;
        vertical-align: middle;
    }
    .cart-count {
        display: inline-block;
        font-size: 12px;
        vertical-align: middle;
        padding: 0 5px;
    }
    .cart-add {
        display: inline-block;
        font-size: 24px;
        color: #00a0dc;
        vertical-align: middle;
    }
}
</style>

