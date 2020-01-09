<template>
 <div class="block-content">
  <div id="my-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close">&times;</span>
        <h2>Modal Header</h2>
      </div>
      <div class="modal-body">
        <p>This is my modal</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla repellendus nisi, sunt consectetur ipsa velit
          repudiandae aperiam modi quisquam nihil nam asperiores doloremque mollitia dolor deleniti quibusdam nemo
          commodi ab.</p>
      </div>
      <div class="modal-footer">
        <h3>Modal Footer</h3>
      </div>
    </div>
  </div>


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
                  <th class="text-center">#</th>
                  <th class="text-left">รหัสสินค้า</th>
                  <th class="text-left">ชื่อสินค้า</th>
                  <th class="text-left">หน่วยนับสินค้า</th>
                  <th class="text-right">ราคาต้นทุน</th>
                  <th class="text-right">ราคาขาย</th>
                </tr>
              </thead>
              <tbody v-if="GoodsObj === null">
                <tr v-for="item in GoodsObj" :key="item.name">
                  <td><v-btn color="primary" dark v-on="on" @click="11()">Edit</v-btn></td>
                  <td>{{ item.GoodsNo }}</td>
                  <td>{{ item.GoodsName }}</td>
                  <td>{{  }}</td>
                  <td class="text-right">{{ item.GoodsCost > 0 ? item.GoodsCost : '' }}</td>
                  <td class="text-right">{{ item.GoodsPrice }}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <v-btn color="primary" dark v-on="on" @click="newModal">ADD</v-btn>
                  <td class="text-center" colspan="6"><u><b>ไม่มีข้อมูลสินค้าในระบบ</b></u></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
        <div class="row transac-pagination" style="margin-top:10px;">
          <v-pagination v-model="thisPage" @input="GetGoodData" :circle="true" :length="GoodsPagination" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
        </div>
    </div>

  <button id="modal-btn" class="button">Click Here</button>
</div>
</template>

<style scoped>
/* @import './assets/styles/SaleAutomation/POS/PosSales.css'; */
</style>

<script>
export default {
  props: {
    method: { type: Function },
  },
  name: 'hello',
  data () {
    this.GetGoodData()
    return {
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
      editmode: false
    }
  },
  methods: {
    GetGoodData: function (pageNumber) {
      this.$http.get('http://127.0.0.1:8000/api/TestAPI?page=' + pageNumber)
        .then((result) => {
          this.GoodsObj = result.data.data
          this.GoodsPagination = result.data.last_page
          this.thisPage = result.data.current_page
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
    rkk: function name(x) {
      this.objSearch.thisFilter = x
    },
    newModal(){
        this.editmode = false;
        //this.form.reset();
        $('#addNew').modal('show');
    }
  }
}

// Get DOM Elements
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');

// Events
$(document).on('click', '#modal-btn', function () {
  $('#my-modal').attr('display', 'block');
  // modal.style.display = 'block';
});
// modalBtn.addEventListener('click', openModal);
// closeBtn.addEventListener('click', closeModal);
// window.addEventListener('click', outsideClick);

// Open
// function openModal() {
//   modal.style.display = 'block';
// }

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

</script>
<style scoped>
.transac-pos {
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
}
tr:not(:last-child).transac-posDetail {
  height: 30px;
  border-bottom: solid 1px black;
}
tr:last-child.transac-posDetail  {
  height: 30px;
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
</style>
