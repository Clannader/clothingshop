<template>
  <div>
    <span>{{register}}</span><br>
    <span :class="roomNumber === '001' ? 'td-blue' : 'td-red'">{{roomNumber}}</span><br>
    <span>{{rooms}}</span><br>
    <span>{{guestName}}</span><br>
    <span>{{arrivalDate}}</span><br>
    <span>{{departureDate}}</span><br>
    <span>{{profileNumber}}</span>
  </div>
</template>

<script>
  export default {
    name: 'TdCell',
    props: {
      register: {
        type: String,
        default: ''
      },
      roomNumber: {
        type: String,
        default: ''
      },
      rooms: {
        type: Number,
        default: 0
      },
      guestName: {
        type: String,
        default: ''
      },
      arrivalDate: {
        type: String,
        default: ''
      },
      departureDate: {
        type: String,
        default: ''
      },
      profileNumber: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
 .td-blue{
   background: #0055b8;
 }
  .td-red{
    background: red;
  }
</style>
