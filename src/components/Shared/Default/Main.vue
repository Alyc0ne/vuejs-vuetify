<template>
  <div>
    <div class="nav-sidebar" :style="{ left : paddingSidebar + 'px' }">
        <div class="nav-sidebar-inner-scroll">
            <ul class="sidebar-top-level-items">
                <li @click="ActiveLink('dashboard')" :class="{ navSidebarActive : systemName === 'dashboard'}">
                    <router-link to="/"><i class="fas fa-chart-line"><span class="LinkSidebar" :class="{ linkActive : systemName === 'dashboard' }">Dashboard</span></i></router-link>
                </li>
                <li @click="ActiveLink('pos')" :class="{ navSidebarActive : systemName === 'pos'}">
                    <router-link to="pos"><i class="fas fa-cash-register"><span class="LinkSidebar">POS</span></i></router-link>
                </li>
                <!-- <li>
                    <router-link to="dashboard/1">Unit</router-link>
                </li> -->
                <li @click="ActiveLink('Goods')" :class="{ navSidebarActive : systemName === 'Goods'}">
                    <router-link to="Goods" @click="ActiveLink('Goods')"><i class="fas fa-cubes"><span class="LinkSidebar">Goods</span></i></router-link>
                </li>
                <li @click="ActiveLink('teststate')" :class="{ navSidebarActive : systemName === 'teststate'}">
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
                    <ManageGoodsModal v-bind:infoModal="this.infoModal" v-if="this.$router.currentRoute.name == 'Goods'" />
                    <v-btn color="primary" id="modal-btn" dark @click="newModal('Goods')" style="margin: 0.4em;" v-if="this.isShowButton">New {{ this.systemName }}</v-btn>
                    <!-- <ManageGoodsModal isModalVisible="this.isModalVisible" v-if="this.$router.currentRoute.name == 'Goods'" /> -->
                    <!-- <button type="button" class="btn btn-dark" data-toggle="modal" v-bind:data-target="'#Manage' + $store.getters.SystemName + 'Modal'"><i class="fas fa-plus"></i> New {{ $store.getters.SystemName }}</button> -->
                  </div>
              </div>
            </div>
        </div>
      <router-view :method="editModal"></router-view>
    </div>
  </div>
</template>
<script>
import ManageGoodsModal from '@/components/Shared/Modal/ManageGoodsModal'

//Modal Control
// $(document).on('click', '#modal-btn', function () {
//   $('#my-modal').css('display','block')
// });
//Close Modal
$(document).on('click', '.close, .closeModal', function () {
  $('#my-modal').css('display','none')
});

export default {
  name: 'leftmenu',
  components: {
    ManageGoodsModal
  },
  data () {
    //this.SetSystemName(this.$router.currentRoute.name)
    return {
      systemName: this.$router.currentRoute.name,
      isShowButton: false,
      isSideBar: false,
      paddingSidebar: '',
      windowWidth: 0,
      infoModal: {
        Name: '',
        isEdit: false
      }
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
      this.systemName = urlRouter

      switch (urlRouter) {
        case "Goods":
          this.isShowButton = true
          break;
        default:
          this.isShowButton = false
          break;
      }
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
    },
    reLoadData: function (e) {
      console.log('reLoadData Success !!')
    },
    newModal: function (e) {
      var e = this.$store.dispatch('GenRunningNumber')
      console.log(e)
      // this.infoModal.Name = e
      // this.infoModal.isEdit = false
      // $('#my-modal').css('display','block')
    },
    editModal: function (e) {
      this.infoModal.Name = e.Name
      this.infoModal.isEdit = e.isEdit
      $('#my-modal').css('display','block')
      //this.isModalVisible = e
    },
    closeModal: function () {
      $('#my-modal').css('display','none')
    }
    //,
    // GenRunningNumber: function (action) {
    //   this.$store.dispatch('GenRunningNumber')
    // },
    // SetSystemName: function (e) {
    //   this.$store.dispatch('GenSystemName', e)
    // }
  }
}
</script>
