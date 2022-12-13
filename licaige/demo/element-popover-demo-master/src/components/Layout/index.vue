<template>
  <div class="layout-wrapper">
    <Sidebar />
    <div class="main-wrapper">
      <Navbar />
      <AppMain />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  components: {
    Navbar: () => import('./components/Navbar.vue'),
    Sidebar: () => import('./components/Sidebar.vue'),
    AppMain: () => import('./components/AppMain.vue')
  },
  mixins: [],
  computed: {},
  methods: {}
}
</script>
