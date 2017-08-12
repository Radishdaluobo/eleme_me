<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item" 
                :class="currentIndex === index ? 'active' : '' "
                @click="selectMenu(index,$event)">
                    <span class="text">
                        <span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="goods-wrapper" ref="goodsWrapper">
            <ul>
                <!--一般起用于js计算的class名goods-list-hook-->
                <li v-for="(item,index) in goods" class="goods-item goods-list-hook">
                    <h3 class="goods-item-title">{{item.name}}</h3>
                    <ul>
                        <li v-for="food in item.foods" class="food-item">
                            <div class="food-image">
                                <img :src="food.icon" width="57" height="57" />
                            </div>
                            <div class="food-content">
                                <h3 class="name-title">{{food.name}}</h3>
                                <h4 class="food-detail">{{food.description}}</h4>
                                <h4 class="food-detail">月售{{food.sellCount}}份&nbsp;&nbsp;好评率{{food.rating}}%</h4>
                                <p class="price">
                                    <span class="now">¥{{food.price}}</span>
                                    <span v-if="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
                                </p>
                                <div class="cartControl-wrapper">
                                    <cartControl :food="food"></cartControl>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>            
            </ul>
        </div>
        <shopCart></shopCart>
    </div>
</template>

<script>
import BSroll from 'better-scroll'
import shopCart from '../shopCart/shopCart.vue'
import cartControl from '../cartControl/cartContrl.vue'

const ERR_OK = 0;
export default {
    data() {
        return {
            goods: {},
            heightList: [],
            scrollY: 0
        }
    },
    created() {
        this.$http.get('/api/goods').then((resp) => {
            resp = resp.data;
            if (resp.errno === ERR_OK) {
                this.goods = resp.data;
                // DOM 更新了 操作dom时一定要调用$nextTick接口,在这个接口的回调函数里进行操作
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                })
            }
        })
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.heightList.length; i++) {
                let height1 = this.heightList[i];
                let height2 = this.heightList[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i
                }
            }
            return 0
        }
    },
    methods: {
        _initScroll() {
            this.menuScroll = new BSroll(this.$refs.menuWrapper, {
                click: true
            })
            this.goodsScroll = new BSroll(this.$refs.goodsWrapper, {
                click: true,//BSroll阻止了点击事件，加上才能在元素上绑定点击事件
                probeType: 3
                //希望scroll在滚动的时候实时告诉我们位置
            })
            this.goodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            })
        },
        _calculateHeight() {
            let height = 0;
            this.heightList = [0];
            let goodsLiDOM = document.getElementsByClassName('goods-list-hook');
            for (let i = 0; i < goodsLiDOM.length; i++) {
                height += goodsLiDOM[i].clientHeight;
                this.heightList.push(height)
            }
        },
        selectMenu(index,$event) { 
            // BSscroll手动派发的$event,浏览器原生的$event没有这个属性
            if (!$event._constructed) {
                return;
            }         
            let goodsLiDOM = document.getElementsByClassName('goods-list-hook');
            let el = goodsLiDOM[index];
            this.goodsScroll.scrollToElement(el,300)
        }
    },
    components: {
    'shopCart': shopCart,
    'cartControl': cartControl
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
        .menu-item {
            /*垂直居中*/
            display: table;
            height: 54px;
            width:100%;
            font-size: 0;
            padding-left: 12px;
            box-sizing: border-box;
            &.active{
                background: #fff;
                font-weight: 700;
            }
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
                padding: 15px;
                .food-image {
                    flex: 0 0 57px;
                    margin-right: 10px;
                }
                .food-content {
                    flex: 1;
                    position: relative;
                    .name-title {
                        font-size: 14px;
                        margin-bottom: 8px;
                    }
                    .food-detail {
                        font-size: 10px;
                        color: rgb(156, 161, 167);
                        margin: 2px 0;
                    }
                    .price {
                        .now {
                            color: #e4393c;
                        }
                        .old {
                            font-size: 10px;
                            text-decoration: line-through;
                            color: rgb(156, 161, 167);
                        }
                    }
                    .cartControl-wrapper{
                        position: absolute;
                        right: -12px;;
                        bottom: -4px;
                    }
                }
            }
        }
    }
}
</style>