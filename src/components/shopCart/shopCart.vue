<template>
    <div class="shopCart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo">
                        <i class="icon-shopping_cart"></i>
                    </div>    
                </div>   
                <div class="price"></div>
                <div class="desc"></div>            
            </div>
            <div class="content-right"></div>
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
    .shopCart{
        position: fixed;
        bottom: 0;
        height: 48px;
        width:100%;
        background: #ddd;
        .content{
            display: flex;
            height: 100%;
            .content-left{
                flex:1;
                background: yellow;
                position: relative;
                .logo-wrapper{
                    width: 56px;
                    height: 56px;
                    position: absolute;
                    background:blue;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 56px;
                    top: -5px;
                }
            }
            .content-right{
                flex:0 0 105px;
                background:pink;
            }
        }
    }
</style>

