<template>
    <div class="shopCart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo">
                        <i class="icon-shopping_cart"></i>
                    </div>
                </div>
                <div class="desc">
                    另需配送费¥
                    <span>4</span>元
                </div>
                <div class="price">
                    ¥0
                </div>
    
            </div>
            <div class="content-right">
                ¥20元起送
            </div>
        </div>
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
.shopCart {
    position: fixed;
    bottom: 0;
    height: 48px;
    width: 100%;
    background: #ddd;
    .content {
        display: flex;
        height: 100%;
        background: #141d27;
        .content-left {
            flex: 1;
            background: #141d27;
            position: relative;
            color: #80858a;
            .logo-wrapper {
                width: 56px;
                height: 56px;
                position: absolute;
                background: #141d27;
                border-radius: 50%;
                padding: 5px;
                box-sizing: border-box;
                text-align: center;
                top: -15px;
                left: 15px;
                .logo {
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                    line-height: 56px;
                    background: #2b343c;
                    .icon-shopping_cart {
                        font-size: 30px;
                        color: #80858a;
                    }
                }
            }
            .price {
                float: right;
                margin: 14px 40px 0 60px;
            }
            .desc {
                float: right;
                font-size: 10px;
                margin:17px 15px 0 5px;
                padding-left:20px;
                border-left:1px solid #80858a;
            }
        }
        .content-right {
            flex: 0 0 105px;
            line-height: 48px;
            text-align: center;
            font-size: 12px;
            background: #2b333b;
            color: #80858a;
        }
    }
}
</style>

