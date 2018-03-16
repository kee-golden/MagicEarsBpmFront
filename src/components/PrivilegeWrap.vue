<template >
  <span v-if="hasPrivilege">
    <slot></slot>
  </span>
</template>

<script>

  export default{
    name: 'PrivilegeWrap',
    componentName: 'PrivilegeWrap',
    props: {
      code: {
        type: String,
        default: '',
      },
    },
    computed: {
      hasPrivilege() {
        console.log(this.code);
        if (!this.code) {
          return true;
        }
        const b = this.$store.state.user.privileges.has(this.code);
        console.log(b);
        return b;
      },
    },
  };

</script>

