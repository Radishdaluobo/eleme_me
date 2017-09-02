<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
    import BScroll from 'better-scroll'
    export default{
        props:{
            data:{
                type:Array,
                default:[]
            },
            probeType:{
                //1 滚动的时候会派发scroll事件 ,会截流
                //2 滚动的时候实时派发scroll事件,不会截流
                //3 除了实时派发 scroll 事件,在swipe的情况下任然能实时派发scroll事件
                type:Number,
                default:1
            },
            click:{
                type:Boolean,
                default:true
            },

          //是否横懤 滚动
            scrollX:{
                type:Boolean,
                default:false
            },

          //是否派发滚动到底部的事件,用于上啦加载
            pullUp:{
                type:Boolean,
                default:false
            },

          //是否派发滚动到顶部的事件,用于下啦刷新
            pullDown:{
                type:Boolean,
                default:false
            },

          //是否派发列表滚动开始的事件
            beforeScroll:{
                type:Boolean,
                default:false
            },

          //当数据更新后,刷新scroll的延迟
            refreshDelay:{
                type:Number,
                default:20
            },

          //是否派发滚动事件
            listenScroll:{
                type:Boolean,
                default:false
            }
        },
        mounted(){
            setTimeout(()=>{
                this.initScroll()
            },20)
        },
        methods:{
            initScroll(){
                if (!this.$refs.wrapper){
                   return;
                }

                this.scroll = new BScroll(this.$refs.wrapper,{
                    probeType:this.probeType,
                    click:this.click,
                    scrollX:this.scrollX
                })

                //是否派发滚动事件
                if (this.listenScroll){
                   let _this = this;
                   this.scroll.on('scroll',(position)=>{
                       _this.$emit('scroll',position)
                   })
                }

                //是否派发滚动到底部事件,用于上啦加载
                if (this.pullUp) {
                    this.scroll.on('scrollEnd',()=>{
                        //判断到底部                     //50是底部的导航高度
                        this.scroll.y <= (this.scroll.maxScrollY + 50) && this.$emit('scrollToEnd')
                    })
                }

                //是否派发滚动到顶部事件,用于下啦刷新
                if (this.pullDown){
                    this.scroll.on('touchend',(position)=>{
                        //50 是顶部的高度
                        position.y > 50 && this.$emit('beforeScroll')
                    })
                }

                //是否派发列表滚动开始的事件
                if (this.beforeScroll){
                    this.scroll.on('beforeScrollStart',()=>{
                        this.$emit('beforeScroll')
                    })
                }
            },

            disable(){
                this.scroll && this.scroll.disable()
            },

            enable(){
                this.scroll && this.scroll.enable()
            },

            refresh(){
                this.scroll && this.scroll.refresh()
            },

            scrollTo(){
              this.scroll && this.scroll.scrollTo()
            },

            scrollToElement(){
              this.scroll && this.scroll.scrollToElement()
            }
        },
        watch:{
            //数据变化时 重新计算高度
            data(){
                setTimeout(()=>{
                    this.refresh()
                },this.refreshDelay)
            }
        }
    }
</script>
