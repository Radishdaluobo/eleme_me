<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="support">
                    <span class="icon" v-if="seller.supports" :class="classMap[seller.supports[1].type]"></span>
                    <span class="text" v-if="seller.supports">{{seller.supports[1].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-content" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img width="100%" height="100%" :src="seller.avatar">
        </div>
        <transition name="fade">
            <div class="detail-wrapper" v-show="detailShow">
                <div class="detail-main">
                    <h1 class="detail-title">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <star :score="2.6" :size="48"></star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul class="supports">
                        <li v-for="(sellerItem,index) in seller.supports" class="supports-item">
                            <span class="icon" :class="classMap[sellerItem.type]"></span>
                            <span class="text">{{sellerItem.description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p>{{seller.bulletin}}</p>
                    </div>
                </div>
                <div class="detail-close">
                    <i class="icon-close" @click="hideDetail"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import star from '../star/star'
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            detailShow: false
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
        showDetail() {
            this.detailShow = true;
        },
        hideDetail() {
            this.detailShow = false;
        }
    },
    components: {
        star: star
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>
//注意css的引入方法
@import '../../common/scss/mixins';
.header {
    color: #fff;
    position: relative;
    background: rgba(7, 17, 27, 0.5); // 防止filter:blur()之后模糊的溢出
    overflow: hidden;
    .content-wrapper {
        position: relative;
        padding: 24px 12px 18px 24px; // 两个inline-block之间可能有空隙,是因为有空白字符串,font-size: 0可除去空白,但是切记要将子元素的font-size改回来
        font-size: 0;
        .avatar {
            display: inline-block;
            /*设置图片和右边文字顶部对齐*/
            vertical-align: top;
            img {
                border-radius: 2px;
            }
        }
        .content {
            display: inline-block;
            margin-left: 16px;
            font-size: 14px;
            .title {
                margin: 2px 0 8px 0;
                .brand {
                    display: inline-block;
                    width: 30px;
                    height: 18px;
                    @include bg-image('brand');
                    background-size: 30px 18px;
                    background-repeat: no-repeat;
                    /*设置图片和文字的对齐方式*/
                    vertical-align: top;
                }
                .name {
                    margin-left: 6px;
                    line-height: 18px;
                }
            }
            .description {
                margin-bottom: 10px;
                line-height: 12px;
                font-size: 12px;
            }
            .support {
                .icon {
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    &.decrease {
                        @include bg-image('decrease_1')
                    }
                    &.discount {
                        @include bg-image('discount_1')
                    }
                    &.guarantee {
                        @include bg-image('guarantee_1')
                    }
                    &.invoice {
                        @include bg-image('invoice_1')
                    }
                    &.special {
                        @include bg-image('special_1')
                    }
                }
                .text {
                    font-size: 10px;
                    line-height: 12px;
                }
            }
        }
        .support-content {
            position: absolute;
            right: 12px;
            bottom: 14px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            background: rgba(0, 0, 0, 0.2);
            text-align: center;
            .count {
                font-size: 10px;
                vertical-align: top;
            }
            .icon-keyboard_arrow_right {
                vertical-align: top;
                font-size: 10px;
                margin-left: 2px;
                line-height: 24px;
            }
        }
    }
    .bulletin-wrapper {
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: rgba(7, 17, 27, 0.2);
        .bulletin-title {
            display: inline-block;
            vertical-align: top;
            margin-top: 7px;
            width: 22px;
            height: 12px;
            @include bg-image('bulletin');
            background-size: 22px 12px;
            background-repeat: no-repeat;
        }
        .bulletin-text {
            vertical-align: top;
            margin: 0 6px;
            font-size: 10px;
        }
        .icon-keyboard_arrow_right {
            position: absolute;
            font-size: 10px;
            top: 7px;
            right: 4px;
        }
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1; // 添加高斯模糊效果
        filter: blur(10px);
    }
    .detail-wrapper {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(7, 17, 27, .8);
        backdrop-filter: blur(10px);
        /*ios 模糊背景*/
        overflow: auto;
        transition: all .5s;
        &.fade-enter-active,
        &.fade-leave-active {
            transition: opacity 0.5s;
        }
        &.fade-enter,
        &.fade-leave-to/* .fade-leave-active in below version 2.1.8 */
        {
            opacity: 0;
        }
        .detail-main {
            box-sizing: border-box;
            min-height: 100%;
            padding: 70px 0 64px 0;
            .detail-title {
                text-align: center;
            }
            .star-wrapper {
                text-align: center;
                margin: 20px;
            }
            .title {
                display: flex;
                /*注意这里flex布局的写法*/
                width: 80%;
                margin: 20px auto;
                .line {
                    position: relative;
                    top: -6px;
                    flex: 1;
                    /*注意这里flex布局的写法*/
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                }
                .text {
                    font-size: 14px;
                    padding: 0 10px;
                }
            }
            .supports {
                font-size: 0;
                width: 80%;
                margin: 0 auto;
                .supports-item {
                    padding: 7px 0;
                    .icon {
                        display: inline-block;
                        vertical-align: top;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                        &.decrease {
                            @include bg-image('decrease_2')
                        }
                        &.discount {
                            @include bg-image('discount_2')
                        }
                        &.guarantee {
                            @include bg-image('guarantee_2')
                        }
                        &.invoice {
                            @include bg-image('invoice_2')
                        }
                        &.special {
                            @include bg-image('special_2')
                        }
                    }
                    .text {
                        font-size: 12px;
                        line-height: 12px;
                    }
                }
            }
            .bulletin {
                width: 80%;
                margin: 0 auto;
                font-size: 12px;
                line-height: 24px;
            }
        }
        .detail-close {
            position: relative;
            margin-top: -48px;
            font-size: 32px;
            text-align: center;
            clear: both;
        }
    }
}
</style>

