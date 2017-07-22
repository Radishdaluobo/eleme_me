<template>
    <div class="star" :class="starType">
        <span class="star-item" v-for="(itemClass,index) in itemClasses" :class="itemClass"></span>
    </div>
</template>

<script>

export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    data() {
        return {

        }
    },
    computed: {
        starType() {
            return 'star-' + this.size
        },
        itemClasses() {
            let classMap = [];
            let score = Math.floor(this.score * 2) / 2;
            let integer = parseInt(score);
            let float = score % 1 === 0 ? 0 : 1;
            for (let i = 0; i < integer; i++) {
                classMap.push('on')
            }
            if (float) {
                classMap.push('half')
            }
            let offNum = 5 - integer - float;
            for (let i = 0; i < offNum; i++) {
                classMap.push('off')
            }
            return classMap;
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>
//注意css的引入方法
@import '../../common/scss/mixins';
.star {
    font-size: 0;
    .star-item {
        display: inline-block;
        background-repeat: no-repeat;
        &:last-child {
            margin-right: 0;
        }
    }
    &.star-24 {
        .star-item {
            width: 10px;
            height: 10px;
            background-size: 10px 10px;
            margin-right: 10px;
            &.on {
                @include bg-image('star24_on')
            }
            &.half {
                @include bg-image('star24_half')
            }
            &.off {
                @include bg-image('star24_off')
            }
        }
    }
    &.star-36 {
        .star-item {
            width: 15px;
            height: 15px;
            background-size: 15px 15px;
            margin-right: 15px;
            &.on {
                @include bg-image('star36_on')
            }
            &.half {
                @include bg-image('star36_half')
            }
            &.off {
                @include bg-image('star36_off')
            }
        }
    }
    &.star-48 {
        .star-item {
            width:20px;
            height: 20px;
            background-size: 20px 20px;
            margin-right: 20px;
            &.on {
                @include bg-image('star48_on')
            }
            &.half {
                @include bg-image('star48_half')
            }
            &.off {
                @include bg-image('star48_off')
            }
        }
    }
}
</style>

