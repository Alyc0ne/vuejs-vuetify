<template>
<div>
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
                    <!-- <ManageGoodsModal v-bind:infoModal="this.infoModal" v-if="this.$router.currentRoute.name == 'Goods'" /> -->
                    <v-btn color="primary" id="modal-btn" dark @click="openModal" style="margin: 0.4em;" v-if="this.isShowButton">New {{ this.$router.currentRoute.name }}</v-btn>
                    <!-- <ManageGoodsModal isModalVisible="this.isModalVisible" v-if="this.$router.currentRoute.name == 'Goods'" /> -->
                    <!-- <button type="button" class="btn btn-dark" data-toggle="modal" v-bind:data-target="'#Manage' + $store.getters.SystemName + 'Modal'"><i class="fas fa-plus"></i> New {{ $store.getters.SystemName }}</button> -->
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'HeaderMenu',
  props: ['modal'],
  data () {
    return {
      isShowButton: false,
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
    //ทำงานเมื่อโหลดหน้า
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    }),
    this.ActiveControl()
  },
  methods: {
     ActiveControl: function () {
      switch (this.$router.currentRoute.name) {
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
    openModal: function () {
      this.$emit('modalControl', false)
    }
  }
}
</script>