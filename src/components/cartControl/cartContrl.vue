<template>
    <div class="cart-contrl">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
        <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
        <div style="display:none">{{ num.n }}</div>
    </div>
</template>

<script>
import Vue from 'Vue'
import Bus from '../../common/js/eventBus.js'
export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            num: {
                  n:0
            }
        }
    },
    created() {

    },
    methods: {
        addCart(event) {
           if (event._constructed) {
               return;
           }
          console.log(this.food.count)
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
                this.num.n = 1;
            } else {
                this.num.n = ++this.food.count;
            }
            Bus.$emit('cart.add', this.num);
        },
        decreaseCart(event) {
           if (event._constructed) {
               return;
           }
            if (this.food.count) {
                this.num.n = --this.food.count;
            }
            Bus.$emit('cart.add', this.num);
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>
.cart-contrl {
    font-size: 0;
    .cart-decrease {
        padding: 3px;
        display: inline-block;
        .inner {
            font-size: 24px;
            color: #00a0dc;
            vertical-align: middle;
        }
        &.move-enter-active,
        &.move-leave-active {
            transition: all 0.5s ease;
            transform: translate3d(0, 0, 0);
            .inner {
                transition: all 0.5s ease;
                transform: rotate(0deg);
            }
        }
        &.move-enter,
        &.move-leave-active {
            transform: translate3d(28px, 0, 0);
            opacity: 0;
            .inner {
                transition: all 2s ease;
                transform: rotate(180deg);
            }
        }
    }
    .cart-count {
        display: inline-block;
        font-size: 12px;
        vertical-align: middle;
        width: 25px;
        text-align: center;
    }
    .cart-add {
        display: inline-block;
        font-size: 24px;
        color: #00a0dc;
        vertical-align: middle;
        padding: 3px;
    }
}
</style>

