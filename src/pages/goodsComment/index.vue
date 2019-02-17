<template lang="">
    <div>
        <cmtbox :id="this.$route.params.id"></cmtbox>
    </div>
</template>
<script>
  import cmtbox from "../../components/supcomponents/comment.vue"
export default {
    components:{
        cmtbox
    }
}
</script>