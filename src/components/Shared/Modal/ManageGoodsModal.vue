<template>
  <div id="my-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="CloseModal">&times;</span>
        <h2>{{ (!this.infoModal.isEdit ? 'New ' : 'Edit ') + this.infoModal.Name }}</h2>
      </div>
        <div class="modal-body">
          <v-form ref="form">
            <v-text-field ref="GoodsNo" v-model="obj.GoodsNo" label="GoodsNo" outlined dense disabled></v-text-field>
            <v-checkbox v-model="obj.IsBarcode" :label="'ใช้งานบาร์โค้ด'" class="mt-0 pt-0" style="height:40px;" @click="SetIsBarcode($event)"></v-checkbox>
            <v-text-field ref="GoodsBarcode" v-model="obj.GoodsBarcode" label="GoodsBarcode" outlined dense :disabled="!obj.IsBarcode" :autofocus="obj.IsBarcode" autocomplete="off"></v-text-field>
            <v-text-field ref="GoodsName" v-model="obj.GoodsName" label="* GoodsName" outlined dense :rules="[() => !!obj.GoodsName || 'กรุณากรอกชื่อสินค้า']" autocomplete="off"></v-text-field>
            <v-text-field ref="GoodsCost" v-model="obj.GoodsCost" label="* GoodsCost" outlined dense :rules="[() => !!obj.GoodsCost || 'กรุณากรอกต้นทุนสินค้า']" @keypress="validateNumber($event)" @change="numberFormat('GoodsCost', obj.GoodsCost, 2)" autocomplete="off"></v-text-field>
            <v-text-field ref="GoodsPrice" v-model="obj.GoodsPrice" label="* GoodsPrice" outlined dense :rules="[() => !!obj.GoodsPrice || 'กรุณากรอกราคาสินค้า']" @keypress="validateNumber($event)" @change="numberFormat('GoodsPrice', obj.GoodsPrice, 2)" autocomplete="off"></v-text-field>
            <v-select v-model="itemsUnitDefault" :items="itemsUnit" item-text="UnitName" item-value="UnitID" label="UnitName" dense outlined @change="SetUnitSelected($event)"></v-select>
          </v-form>  
        </div>
        <div class="modal-footer">
          <v-btn class="ma-2 closeModal" tile outlined color="error" @click="CloseModal">
            <v-icon dark left>mdi-cancel</v-icon> Close
          </v-btn>
          <v-btn class="ma-2" outlined color="indigo" @click="BindManage">
            <v-icon dark left>mdi-checkbox-marked-circle</v-icon> {{ !this.infoModal.isEdit ? 'Save' : 'Update' }}
          </v-btn>
        </div>
    </div>
  </div>
<!-- <v-row justify="center" id='model'>
    <v-dialog v-model="dialog" persistent max-width="650">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" @click="GenerateData()">New Goods</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <div class="float-left">
            {{ Action + " Goods" }}
          </div>
          
          <div>
          <v-btn icon style="color:black;" @click="dialog = false" class="float-right">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          </div>

        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-5">
          <v-form ref="form">
            <v-text-field ref="GoodsNo" v-model="obj.GoodsNo" label="GoodsNo" outlined dense disabled></v-text-field>
            <v-checkbox v-model="obj.IsBarcode" :label="'ใช้งานบาร์โค้ด'" class="mt-0 pt-0" style="height:40px;" @click="SetIsBarcode($event)"></v-checkbox>
            <v-text-field ref="GoodsBarcode" v-model="obj.GoodsBarcode" label="GoodsBarcode" outlined dense :disabled="!obj.IsBarcode" :autofocus="obj.IsBarcode" autocomplete="off"></v-text-field>
            <v-text-field ref="GoodsName" v-model="obj.GoodsName" label="* GoodsName" outlined dense :rules="[() => !!obj.GoodsName || 'กรุณากรอกชื่อสินค้า']" autocomplete="off"></v-text-field>
            <v-text-field ref="GoodsCost" v-model="obj.GoodsCost" label="* GoodsCost" outlined dense :rules="[() => !!obj.GoodsCost || 'กรุณากรอกต้นทุนสินค้า']" @keypress="validateNumber($event)" @change="numberFormat('GoodsCost', obj.GoodsCost, 2)" autocomplete="off"></v-text-field>
            <v-text-field ref="GoodsPrice" v-model="obj.GoodsPrice" label="* GoodsPrice" outlined dense :rules="[() => !!obj.GoodsPrice || 'กรุณากรอกราคาสินค้า']" @keypress="validateNumber($event)" @change="numberFormat('GoodsPrice', obj.GoodsPrice, 2)" autocomplete="off"></v-text-field>
            <v-select v-model="itemsUnitDefault" :items="itemsUnit" item-text="UnitName" item-value="UnitID" label="UnitName" dense outlined @change="SetUnitSelected($event)"></v-select>
          </v-form>

          
          <v-text-field ref="name" v-model="name" :rules="[() => !!name || 'This field is required']" :error-messages="errorMessages" label="Full Name" placeholder="John Doe" required></v-text-field>
          <v-text-field
            ref="address"
            v-model="address"
            :rules="[
              () => !!address || 'This field is required',
              () => !!address && address.length <= 25 || 'Address must be less than 25 characters',
              addressCheck
            ]"
            label="Address Line"
            placeholder="Snowy Rock Pl"
            counter="25"
            required
          ></v-text-field>

        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn color="error" text @click="CloseModal()">Close</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="my-0"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="BindManage">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row> -->
</template>

<script>
export default {
  // props: {
  //   method: { type: Function },
  // },
  props: ['infoModal'],
  name: 'ManageGoodsModal',
  data () {
    return {
      Action: '',
      obj: {
        IsBarcode: false,
        UnitID: ''
      },
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      itemsUnit: [],
      itemsUnitDefault: '',
    }
  },
  computed: {
    // form () {
    //   return {
    //     obj: {
    //       IsBarcode: this.IsBarcode,
    //       GoodsName: this.GoodsName,
    //       GoodsPrice: this.GoodsPrice
    //     }
    //   }
    // },
  },
  mounted () {
    //this.obj.GoodsNo = 'GO201911-25',
    //this.itemsDefault = this.items[0] //this.$http.get(this.$api + 'GetUnit')
    // this.obj.GoodsNo = this.$http.get(this.$api + 'GetRunningNumber/Goods')
  },
  methods: {
    GenerateData: function () {
      this.$http.get(this.$api + 'GenerateData/Goods')
      .then((response) => {
        this.obj.GoodsNo = response.data.RunningNumber.original
        this.itemsUnit = response.data.Unit
        this.itemsUnitDefault = response.data.Unit[0].UnitID
        this.$refs.GoodsName.focus()
        console.log(this.obj)
      })
    },
    BindManage: function () {
      if (this.$refs.form.validate()) {
          this.snackbar = true
      } else {
        this.obj.isEdit = this.infoModal.isEdit
      // this.obj.GoodsNo = this.$store.getters.RunningNumber
      // this.$http.post(this.$api + 'BindManage' + this.$store.getters.SystemName, this.obj)
        this.$http.post(this.$api + 'BindManageGoods', this.obj)
        .then(response => {
          console.log(response)
          if (response.status === "201") {
            console.log('Success')
            this.CloseModal()
            this.method(response.data)
          } else {
            console.log('error')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
    SetIsBarcode: function (e) {
      console.log(e)
      this.$refs.GoodsBarcode.focus()
    },
    CloseModal: function () {
      this.dialog = false
      this.$refs.form.reset()
    },
    validateNumber: function (e) {
      if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46) {
        return true
      } else {
        e.preventDefault()
      }
       //else {
      //     if ($(this).hasClass("_numzero") && e.keyCode == 45) {
      //         return true
      //     } else {
      //         e.preventDefault()
      //     }
      // }
      if ((e.shiftKey || (e.keyCode < 46 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && e.keyCode != 110) {
          e.preventDefault();
      }
    },
    numberFormat: function (target, number, length) {
      this.obj[target] = parseFloat(number).toFixed(length).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    SetUnitSelected: function (event) {
      this.obj.UnitID = event
    }
  }
}
</script>
<style scoped>
/* @import url(https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css); */
.disabledInput {
    background-color: #e9ecef;
    opacity: 1;
}
.v-text-field.v-input--dense:first-child {
    height: 55px !important;
}
.v-text-field.v-input--dense {
    height: 70px !important;
}
</style>
