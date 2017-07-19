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
                    <span class="icon"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="support-content">
                <span>{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper">

        </div>
    </div>
</template>

<script>

export default {
    props: {
        seller: {
            type: Object
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>
//注意css的引入方法
@import '../../common/scss/mixins';
    .header{
        background-color:#aaa;
      .content-wrapper{
          padding:24px 12px 18px 24px;
        // 两个inline-block之间可能有空隙,是因为有空白字符串,font-size: 0可除去空白,但是切记要将子元素的font-size改回来
          font-size: 0;
          .avatar{
              display:inline-block;
              /*设置图片和右边文字顶部对其*/
              vertical-align: top;
              img{
                  border-radius: 2px;
              }
          }
          .content{ 
              display:inline-block;
              margin-left:16px;
              font-size: 14px;
              .title{
                  margin:2px 0 8px 0;
                  .brand{
                      display: inline-block;
                      width:30px;
                      height:18px;
                      @include bg-image('brand');
                      background-size:30px 18px;
                      background-repeat: no-repeat;
                      /*设置图片和文字的对齐方式*/
                      vertical-align: top;
                  }
                  .name{
                      margin-left: 6px;
                      line-height: 18px;
                  }
              }
              .description{
                margin-bottom: 10px;
                line-height: 12px;
                font-size: 12px;
              }
              .support{
                  .icon{
                    display: inline-block;
                    width:12px;
                    height: 12px;
                    margin-right: 4px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                  }

                //   &.decrease{
                //      @include bg-image('decrease_1')
                //   }
                //   &.discount{
                //      @include bg-image('discount_1') 
                //   }
                //   &.guarance{
                //      @include bg-image('guarance_1')
                //   }
                //   &.invpice{
                //      @include bg-image('invpice_1') 
                //   }
              }
          }
      }  
    }
</style>

