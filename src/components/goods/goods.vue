<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li v-for="item in goods" class="menu-item">
                    <span class="text">
                        <span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="goods-wrapper">
            <ul>
                <li v-for="(item,index) in goods" class="goods-item">
                    <h3 class="goods-item-title">{{item.name}}</h3>
                    <ul>
                        <li v-for="food in item.foods" class="food-item">
                            <div class="food-image">
                                <img :src="food.icon" width="57" height="57"/>
                            </div>
                            <div class="food-content">
                                <h3 class="name-title">{{food.name}}</h3>
                                <h4 class="food-detail">{{food.description}}</h4>
                                <h4 class="food-detail">月售{{food.sellCount}}份&nbsp;&nbsp;好评率{{food.rating}}%</h4>
                                <p class="price">
                                    <span class="now">¥{{food.price}}</span>
                                    <span v-if="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
                                </p>
                                <div class="cartcontrol-wrapper">
                                    <span class="icon-remove_circle_outline icon"></span>
                                    <span class="count">1</span>
                                    <span class="icon-add_circle icon"></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
const ERR_OK = 0;
export default {
    data() {
        return {
            goods: {}
        }
    },
    created() {
        this.$http.get('/api/goods').then((resp) => {
            resp = resp.data;
            if (resp.errno === ERR_OK) {
                this.goods = resp.data;
            }
        })
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>
@import '../../common/scss/mixins';
.goods {
    display: flex;
    position: absolute;
    top: 174px;
    left: 0;
    right: 0;
    bottom: 46px;
    overflow: hidden;
    .menu-wrapper {
        /*flex: flex-grow flex-shrink flex-basis 放大 缩小
            flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
            flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
            flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。
            浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
            */
        /*flex:0 1 auto;默认*/
        flex: 0 0 80px;
        overflow: auto;
        background: #f3f5f7;
        padding: 0 12px;
        .menu-item {
            /*垂直居中*/
            display: table;
            height: 54px;
            width: 56px;
            font-size: 0;
            .text {
                font-size: 12px;
                /*垂直居中*/
                display: table-cell;
                vertical-align: middle;
                .icon {
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    margin-right: 2px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    &.decrease {
                        @include bg-image('decrease_3')
                    }
                    &.discount {
                        @include bg-image('discount_3')
                    }
                    &.guarantee {
                        @include bg-image('guarantee_3')
                    }
                    &.invoice {
                        @include bg-image('invoice_3')
                    }
                    &.special {
                        @include bg-image('special_3')
                    }
                }
            }
        }
    }
    .goods-wrapper {
        /*注意这里*/
        flex: 1;
        overflow: auto;
        .goods-item {
            .goods-item-title {
                height: 26px;
                line-height: 26px;
                font-size: 12px;
                background: rgb(243, 245, 247);
                color: rgb(156, 161, 167);
                padding-left: 12px;
                border-left: 4px solid #d9dde1;
            }
            .food-item {
                display: flex;
                padding:15px;
                .food-image {
                    flex: 0 0 57px;
                    margin-right:10px;
                }
                .food-content {
                    flex: 1;
                    position: relative;
                    .name-title{
                        font-size: 14px;
                        margin-bottom: 8px;
                    }
                    .food-detail{
                        font-size: 10px;
                        color: rgb(156, 161, 167);
                        margin:2px 0;
                    }
                    .price{
                        .now{
                            color:#e4393c;
                        }
                        .old{
                            font-size: 10px;
                            text-decoration:line-through;
                            color: rgb(156, 161, 167);
                        }
                    }
                    .cartcontrol-wrapper{
                        position: absolute;
                        bottom:0;
                        right:0;
                        .icon{
                            font-size: 20px;
                            vertical-align: middle;
                            color:#00a0dc;
                        }
                        .count{
                            color: rgb(156, 161, 167);
                        }
                    }

                }
            }
        }
    }
}
</style>