<template>
<v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="650">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card ref="form">
        <v-card-title>
          <div class="float-left">
            Select Country
          </div>
          
          <div>
                      <v-btn icon style="color:black;" @click="dialog = false" class="float-right">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          </div>

        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-5">
          <v-text-field ref="GoodsNo" v-model="this.obj.GoodsNo" label="GoodsNo" outlined dense="true" disabled="true"></v-text-field>
          <v-checkbox @click="SetIsBarcode($event)" :label="'ใช้งานบาร์โค้ด'"></v-checkbox>
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

          
          <v-text-field v-model="this.obj.GoodsNo" label="ฺBarcode" outlined :disabled="!this.obj.IsBarcode"></v-text-field>

          <v-text-field
            ref="city"
            v-model="city"
            :rules="[() => !!city || 'This field is required', addressCheck]"
            label="City"
            placeholder="El Paso"
            required
          ></v-text-field>
          <v-text-field
            ref="state"
            v-model="state"
            :rules="[() => !!state || 'This field is required']"
            label="State/Province/Region"
            required
            placeholder="TX"
          ></v-text-field>
          <v-text-field
            ref="zip"
            v-model="zip"
            :rules="[() => !!zip || 'This field is required']"
            label="ZIP / Postal Code"
            required
            placeholder="79938"
          ></v-text-field>
          <v-autocomplete
            ref="country"
            v-model="country"
            :rules="[() => !!country || 'This field is required']"
            :items="countries"
            label="Country"
            placeholder="Select..."
            required
          ></v-autocomplete>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text>Cancel</v-btn>
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
          <v-btn color="primary" text @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ManageGoodsModal',
  data () {
    return {
      obj: {
        IsBarcode: false
      },
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    }
  },
  mounted () {
    this.obj.GoodsNo = 'GOOODS250'
    // this.obj.GoodsNo = this.$http.get(this.$api + 'GetRunningNumber/Goods')
  },
  methods: {
    BindManage: function () {
      this.obj.GoodsNo = this.$store.getters.RunningNumber
      this.$http.post(this.$api + 'BindManage' + this.$store.getters.SystemName, this.obj)
        .then(function (response) {
          if (response.status === '201') {
            console.log('')
            this.obj = ''
          } else {
            console.log('')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    SetIsBarcode: function (e) {
      this.obj.IsBarcode = e.target.checked
    }
  }
}
</script>
<style scoped>
.disabledInput {
    background-color: #e9ecef;
    opacity: 1;
}
</style>
