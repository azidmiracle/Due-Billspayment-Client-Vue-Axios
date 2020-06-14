<template>
   <div>
    <div class="post-container">
      <div
        class="post"
        v-for="(due,index) in billsList"
        v-bind:item="due"
        v-bind:index="index"
        v-bind:key="due._id"
        v-on:dblclick="deletePost(due._id)"
      >
      
        <p class="text">{{post.benefeciary_name}}</p>
      </div>
    </div>


   </div>
</template>

<script>

export default {
 name: "DueList",
  props: {
    billsList: Array
  },
  mounted(){
     console.log(this.billsList)
    
 }
}
</script>

<style>

</style>