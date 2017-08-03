<template>
    <div class="cart-contrl">
        <transition name="move">
            <div class="cart-decrease">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count">2</div>
        <div class="cart-add icon-add_circle"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {

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
        padding:0 5px;

    }
    .cart-add {
        display: inline-block;
        font-size: 24px;
        color: #00a0dc;
        vertical-align: middle;
    }
}
</style>

