<template>
<div class="rightBox">
<HeaderMenu @modalControl="modalControl"/>
<ManageGoodsModal v-bind:infoModal="this.infoModal" @reloadData="reloadData"/>
<div class="block-content">
  <div class='block-menu' style="border-bottom:none;margin-right:10px;margin-left:10px">
      <div class='row' style="margin:10px;">
          <div class="col-md-12 col-lg-6 d-flex">
          </div>
          <div class="col-md-12 col-lg-6 pa-0">
            <div class="d-flex flex-row-reverse">
            <v-btn depressed color="primary" class="ml-2" style="height:auto;" @click="GetGoodDataBySearch()">Search</v-btn>                     
            <v-menu transition="scroll-x-reverse-transition">
                <template v-slot:activator="{ on }">
                  <v-btn color="secondary" class="ml-2" style="height:auto; width:150px;" v-on="on" v-text="objSearch.thisFilter">
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="n in this.FilterSearch" :key="n.text" link>
                    <v-list-item-title v-text="n.text" @click="rkk(n.text)"></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-text-field class="justify-start" :outlined="true" :solo="true" :clearable="true" :flat="true" :dense="true" :single-line="true" :hide-details="true" v-model="objSearch.txtSearch"></v-text-field>
            </div>
          </div> 
      </div>
  </div>
  <div style="margin:10px;">
    <!-- class="contentGoods" -->
      <div class="row m_a0 bordered-box pane">
        <v-simple-table :fixed-header="true" :height="500" style="width:100%;">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center w_10">#</th>
                <th class="text-left">รหัสสินค้า</th>
                <th class="text-left">ชื่อสินค้า</th>
                <th class="text-left">หน่วยนับสินค้า</th>
                <th class="text-right">ราคาต้นทุน</th>
                <th class="text-right">ราคาขาย</th>
              </tr>
            </thead>
            <!-- <tbody v-if="GoodsObj === null"> -->
              <tbody>
              <tr v-for="item in GoodsObj" :key="item.name">
                <td class="text-center w_10">
                  <v-icon color="red" left @click="modalControl(true, item)">mdi-pencil</v-icon>
                  <v-icon left>mdi-delete</v-icon>
                </td>
                <td>{{ item.GoodsNo }}</td>
                <td>{{ item.GoodsName }}</td>
                <td>{{  }}</td>
                <td class="text-right">{{ item.GoodsCost > 0 ? item.GoodsCost : '' }}</td>
                <td class="text-right">{{ item.GoodsPrice }}</td>
              </tr>
            </tbody>
            <!-- <tbody v-else>
              <tr>
                <td class="text-center" colspan="6"><u><b>ไม่มีข้อมูลสินค้าในระบบ</b></u></td>
              </tr>
            </tbody> -->
          </template>
        </v-simple-table>
      </div>
      <div class="row transac-pagination" style="margin-top:10px;">
        <v-pagination v-model="thisPage" @input="GetGoodData" :circle="true" :length="GoodsPagination" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
      </div>
  </div>
</div>
</div>
</template>

<style scoped>
/* @import './assets/styles/SaleAutomation/POS/PosSales.css'; */
</style>

<script>
import HeaderMenu from '@/components/Shared/Default/HeaderMenu'
import ManageGoodsModal from '@/components/Shared/Modal/ManageGoodsModal'

export default {
  props: {
    method: { type: Function },
  },
  components: {
    HeaderMenu,
    ManageGoodsModal
  },
  name: 'hello',
  data () {
    this.GetGoodData()
    return {
      currentRoute: this.$router.currentRoute.name,
      GoodsObj: [],
      GoodsPagination: 0,
      thisPage: 1,
      objSearch: {
        thisFilter: 'All'
      },
      FilterSearch: [
        { text : 'All' },
        { text : 'GoodsNo' },
        { text : 'GoodsName' }
      ],
      infoModal: {
        Name: '',
        isEdit: false,
        objData:{
          GoodsNo: '',
          itemsUnit: []
        }
      }
    }
  },
  watch: {
  },
  methods: {
    GetGoodData: function (pageNumber) {
      this.Loading(true)
      //console.log(this.$store.dispatch('GetGoodsList', pageNumber))
      this.$http.get(this.$api + 'TestAPI?page=' + pageNumber)
        .then((result) => {
          this.GoodsObj = result.data.data
          this.GoodsPagination = result.data.last_page
          this.thisPage = result.data.current_page
          this.Loading(false)
        })
    },
    GetGoodDataBySearch: function () {
      this.$http.post('http://127.0.0.1:8000/api/BindLoadGoods', this.objSearch)
        .then((result) => {
          this.GoodsObj = result.data.data
          this.GoodsPagination = result.data.last_page
          this.thisPage = result.data.current_page
      })
    },
    modalControl: function (editMode, value) {
      this.$http.get(this.$api + 'GenerateData/' + this.currentRoute)
      .then((response) => {
        if (!editMode) 
          this.infoModal.objData.GoodsNo = response.data.RunningNumber.original
        this.infoModal.objData.itemsUnit = response.data.Unit
        if (editMode) {
          let tempItemUnit = $.grep(response.data.Unit, function (e) {
            return e.UnitID === value.GoodsUnitID
          })
          this.infoModal.objData.itemsUnitDefault = !!tempItemUnit[0] ? tempItemUnit[0] : ''
        }
      })

      if (!editMode) {
        this.infoModal.Name = this.currentRoute
        this.infoModal.isEdit = editMode
      }
      else
      {
        this.infoModal.Name = this.currentRoute
        this.infoModal.isEdit = editMode
        this.infoModal.objData.GoodsNo = value.GoodsNo
        this.infoModal.objData.GoodsName = value.GoodsName
        this.infoModal.objData.GoodsCost = value.GoodsCost
        this.infoModal.objData.GoodsPrice = value.GoodsPrice
      }
      $('#my-modal').css('display','block')
    },
    reloadData: function (response) {
      this.GetGoodData()
    },
    rkk: function name(x) {
      this.objSearch.thisFilter = x
    }
  }
}

// Get DOM Elements
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');

// Events
// modalBtn.addEventListener('click', openModal);
// closeBtn.addEventListener('click', closeModal);
// window.addEventListener('click', outsideClick);

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

</script>
<style scoped>
/* .transac-pos {
  position:relative;
  width:100%;
}
.transac-pos table {
  width:100%;
}
.transac-posDetail-Scroll {
  height: 56vh;
  overflow:auto;
}
.transac-posDetail td {
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
  overflow: hidden;
} */
.theme--light.v-data-table.v-data-table--fixed-header thead th {
  background-color:#2C3E50;
  color: whitesmoke;
  height: 40px;
  font-size: 14px;
}
.theme--light.v-data-table tbody tr td{
  height: 32px;
}

.transac-pagination {
  /* justify-content: center; */
  float: right;
  margin-right: 0px;
}
i {
  cursor: pointer;
}
.disabled {
  pointer-events: none;
  opacity: 0.6;
}
/* tr:nth-of-type(even) {
  background-color: rgba(0,0,0,.05);
} */
</style>
