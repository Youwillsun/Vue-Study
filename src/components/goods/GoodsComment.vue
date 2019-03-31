<template>
    <div>
        <cmt-box :id="this.$route.params.id"></cmt-box>
    </div>
</template>

<script>
import cmtBox from '../subcomponents/comment.vue'
export default {
    components:{
        cmtBox
    }
}
</script>


<style lang="scss" scoped>

</style>
