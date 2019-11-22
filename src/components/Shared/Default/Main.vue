<template>
  <div>
    <div class="nav-sidebar" :style="{ left : paddingSidebar + 'px' }">
        <div class="nav-sidebar-inner-scroll">
            <ul class="sidebar-top-level-items">
                <li @click="ActiveLink('dashboard')" :class="{ navSidebarActive : isSystem === 'dashboard'}">
                    <router-link to="/"><i class="fas fa-chart-line"><span class="LinkSidebar" :class="{ linkActive : isSystem === 'dashboard' }">Dashboard</span></i></router-link>
                </li>
                <li @click="ActiveLink('pos')" :class="{ navSidebarActive : isSystem === 'pos'}">
                    <router-link to="pos"><i class="fas fa-cash-register"><span class="LinkSidebar">POS</span></i></router-link>
                </li>
                <!-- <li>
                    <router-link to="dashboard/1">Unit</router-link>
                </li> -->
                <li @click="ActiveLink('Goods')" :class="{ navSidebarActive : isSystem === 'Goods'}">
                    <router-link to="Goods" @click="ActiveLink('Goods')"><i class="fas fa-cubes"><span class="LinkSidebar">Goods</span></i></router-link>
                </li>
                <li @click="ActiveLink('teststate')" :class="{ navSidebarActive : isSystem === 'teststate'}">
                    <router-link to="teststate" @click="ActiveLink('teststate')"><i class="fas fa-cubes"><span class="LinkSidebar">State</span></i></router-link>
                </li>
            </ul>
        </div>
    </div>
    <div class="content-wrapper">
      <div class="mobile-overlay" :class="{ mobileNavOpen : isSideBar }" @click="closeSideBar(true)"></div>
        <div class="container-fluid">
            <div class='block-menu'>
              <div class='row'>
                  <div class="col-6 d-flex">
                      <button name="button" type="button" class="toggle-mobile-nav" @click="openSideBar(true)"><span class="sr-only">Open sidebar</span>
                          <i aria-hidden="true" data-hidden="true" class="fa fa-bars"></i>
                      </button>
                  </div>
                  <div class="col-6 d-inline-flex flex-wrap justify-content-lg-end pa-0" id='menuRight' >
                    <ManageDocModal />
                    <!-- <button type="button" class="btn btn-dark" data-toggle="modal" v-bind:data-target="'#Manage' + $store.getters.SystemName + 'Modal'" @click="GenRunningNumber"><i class="fas fa-plus"></i> New {{ $store.getters.SystemName }}</button> -->
                  </div>
              </div>
            </div>
        </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import ManageDocModal from '@/components/Shared/Modal/ManageDocModal'
export default {
  name: 'leftmenu',
  components: {
    ManageDocModal
  },
  data () {
    //this.SetSystemName(this.$router.currentRoute.name)
    return {
      isSystem: this.$router.currentRoute.name,
      isSideBar: false,
      paddingSidebar: '',
      windowWidth: 0
    }
  },
  watch: {
    windowWidth (newWidth) {
      if (newWidth <= 768) {
        this.paddingSidebar = -220
      } else {
        this.paddingSidebar = 0
      }
      this.isSideBar = false
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    })
  },
  methods: {
    ActiveLink: function (urlRouter) {
      this.isSystem = urlRouter
    },
    openSideBar: function (e) {
      if (e) {
        this.paddingSidebar = 0
        this.isSideBar = true
      }
    },
    closeSideBar: function (e) {
      if (e) {
        this.paddingSidebar = -220
        this.isSideBar = false
      }
    }//,
    // GenRunningNumber: function (action) {
    //   this.$store.dispatch('GenRunningNumber')
    // },
    // SetSystemName: function (e) {
    //   this.$store.dispatch('GenSystemName', e)
    // }
  }
}
</script>
