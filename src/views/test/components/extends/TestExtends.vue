<template>
  <div>
    <b-test msg="父亲给B的消息" :age="10" name="测试A">
      <template slot="name">
        <p>哈哈哈哈哈</p>
      </template>
      <p>BBBBBBBB</p>
      <template slot="msg">
        <p>YYYYYYYY</p>
      </template>
      <template slot="age">
        <p>QQQWWWWW</p>
      </template>
    </b-test>
  </div>
</template>

<script>
  import BTest from './B'
  export default {
    name: 'TestExtends',
    components: {
      BTest
    },
    created() {
      /**
       * 测试的结论如下
       * 1.继承属性的话,如果父类和子类有相同的属性值,则不会在父类中显示
       * 2.属性只在子类中有效
       * 3.如果继承的是插槽,插槽名字都相同的话
       * 那么在子类和在父类都插入相同的代码
       */
    }
  }
</script>

<style scoped>

</style>
