<template>
 <div class='block-content'>
    <div class="row side-pos">
        <div class="col-xl-6 col-sm-4" id="Sell-PageLeft" style="height:100%!important;">

        </div>
        <div class="col-xl-6 col-sm-8">
          <div class="row">
            <div class="col-2">
              <input type="number" name="qtyBarcode" v-model="qtyBarcode" class="form-control" :min="1" :max="99">
            </div>
            <div class="col-10">
              <input type="text" name="GoodsBarCode" v-model="GoodsBarCode" class="form-control" autofocus placeholder="input barcode" @change="GetGoodsByBarCode()">
            </div>
          </div>
          <div class="row">
            <div class="card w_100" style="height:75vh;">
              <div class="card-body" style="padding:0px;">
                <div class="transac-pos">
                  <div class="transac-pos-scroll">
                    <table>
                      <thead style="background:rgba(0,0,0,0.04);">
                        <th style="width: 5vw;">Qty</th>
                        <th class="text-left" style="width: 15vw;">ItemName</th>
                        <th class="text-right" style="width: 8vw;">Per Items</th>
                        <th class="text-right" style="width: 8vw;padding-right:5px;">Total</th>
                      </thead>
                      <tbody>
                        <tr class="transac-posDetail" v-for="_Goods in Goods" v-bind:key="_Goods.GoodsID">
                          <td style="width: 2vw;">{{ _Goods.Qty }}</td>
                          <td class="text-left" style="width: 5vw;">{{ _Goods.GoodsName }}</td>
                          <td class="text-right" style="width: 5vw;">{{ '@' + _Goods.GoodsPrice }}</td>
                          <td class="text-right" style="width: 5vw;padding-right:5px;">{{ _Goods.GoodsPrice * _Goods.Qty }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="card-footer" style="padding:0px;background-color: transparent;">
                <div class="row" style="height:6vh;margin:0px;">
                  <div class="col-8 text-right" style="padding:10px;">
                    <span>Sub Total : </span>
                  </div>
                  <div class="col-4" style="padding:0px 5px 0px 0px;">
                    <input type="text" name="subTotal" v-model="subtotal" class="w_100 h_100 text-right" style="border:none;background: transparent;" disabled>
                  </div>
                </div>
                <div class="row" style="height:6vh;margin:0px;">
                  <div class="col-8 text-right" style="padding:10px;">
                    <span>Discount : </span>
                  </div>
                  <div class="col-4" style="padding:0px;">
                    <input type="text" name="discount" v-model="discount" class="w_100 h_100 text-right" style="border:none;padding-right:5px;" @focus="ClearValue(this)" @change="calSummary()" autocomplete="false">
                  </div>
                </div>
                <div class="row" style="height:6vh;margin:0px;">
                  <div class="col-8 text-right" style="padding:10px;">
                    <span>Grand Total : </span>
                  </div>
                  <div class="col-4" style="padding:0px 5px 0px 0px;">
                    <input type="text" name="grandtotal" v-model="grandtotal" class="w_100 h_100 text-right" style="border:none;background: transparent;" disabled>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      Goods: [],
      GoodsBarCode: '',
      qtyBarcode: 1,
      barcode: '',
      subtotal: '0.00',
      discount: '0.00',
      grandtotal: '0.00'
    }
  },
  methods: {
    ClearValue: function () {
      this.discount = ''
    },
    GetGoodsByBarCode: function () {
      this.$http.get('http://127.0.0.1:8000/api/GetGoodsByBarcode/' + this.GoodsBarCode)
        .then((response) => {
          if (response.status === 200) {
            var foundIndex = this.Goods.findIndex(x => x.GoodsID === response.data.GoodsID)
            if (foundIndex >= 0) {
              this.Goods[foundIndex].Qty = this.Goods[foundIndex].Qty + this.qtyBarcode
            } else {
              response.data['Qty'] = this.qtyBarcode
              this.Goods.push(response.data)
            }
            let subTotal = parseFloat(this.subtotal)
            subTotal += parseFloat(response.data['GoodsPrice']) * parseFloat(response.data['Qty'])
            this.subtotal = subTotal.toFixed('2')
          } else {
            // console.log('ไม่เจอสินค้าที่เลือก')
          }
        })
        .catch(function () {

        })
      this.GoodsBarCode = ''
    },
    calSummary: function () {
      let subtotal = parseFloat(this.subtotal.replace(/,/g, ''))
      let discount = parseFloat(this.discount.replace(/,/g, ''))
      if (subtotal > discount) {
        this.discount = discount
        this.grandtotal = (subtotal - discount).toFixed(2)
      }
    }
  }
}
</script>

<style scoped>
.side-pos, .row {
  margin: 10px;
}
.side-pos .card {
  margin: 15px;
}
.transac-posDetail tr:not(:last-child) {
  height: 30px;
  border-bottom: solid 1px black;
}
.transac-posDetail tr:last-child {
  height: 30px;
}
.decressQty {
  border: 0;
  background-color: white;
  border-right: solid 1px black;
  border-top-right-radius: 0;
  width: 40px;
}
.incressQty {
  border: 0;
  background-color: white;
  border-left: solid 1px black;
  border-top-left-radius: 0;
  width: 40px;
}
.border {
  border: solid 1px black;
}

.transac-pos {
  position:relative;
}
.transac-pos-scroll {
  height: 56vh;
  overflow:auto;
}
.transac-pos table {
  width:100%;
}
.transac-posDetail td {
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
  overflow: hidden;
}
</style>
