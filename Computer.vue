<template>
  <div>
    <button class="btn btn-primary pull-right" @click="showModal('create')"><i class="fa fa-plus"></i> New Computer</button>
    <table class="table table-hover" v-if="data !== null">
      <thead>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </thead>
    </table>
    <create-modal :property="createComputerModal"></create-modal>
    <empty v-if="data === null" :title="'Looks like you have not added a computer!'" :action="'Click the New Computer Button to get started.'"></empty>
  </div>
</template>
<style scoped>
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import axios from 'axios'
import ComputerModal from './CreateComputerModal.js'
export default {
  mounted(){
    this.retrieve()
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG,
      data: null,
      createComputerModal: ComputerModal
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'create-modal': require('components/increment/generic/modal/Modal.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    showModal(action, item = null){
      switch(action){
        case 'create':
          this.createComputerModal = {...ComputerModal}
          let inputs = this.createComputerModal.inputs
          inputs.map(input => {
            input.value = null
            input.disabled = false
          })
          // this.createComputerModal.params = [{
          //   variable: 'account_id',
          //   value: AUTH.user.userID
          // }]
          break
        case 'update':
          let modalData = {...this.createComputerModal}
          let parameter = {
            title: 'Update Sub Account',
            route: 'sub_accounts/update',
            button: {
              left: 'Cancel',
              right: 'Update'
            },
            sort: {
              column: 'created_at',
              value: 'desc'
            },
            params: [{
              variable: 'id',
              value: item.id
            }, {
              variable: 'account_id',
              value: item.member
            }]
          }
          modalData = {...modalData, ...parameter} // updated data without input values
          let selectedData = item
          modalData.inputs.map(data => {
            if(data.variable === 'status'){
              data.value = item.status
            }
            if(data.variable === 'username'){
              data.value = item.account.username
              data.disabled = true
            }
            if(data.variable === 'email'){
              data.value = item.account.email
              data.disabled = true
            }
            if(data.variable === 'password'){
              data.value = '*****'
              data.disabled = true
            }
          })
          this.createComputerModal = {...modalData}
          break
      }
      $('#createComputerModal').modal('show')
    },
    retrieve(){
      let parameter = {
        condition: [{
          value: this.user.userID,
          column: 'account_id',
          clause: '='
        }],
        account_id: this.user.userID
      }
      this.APIRequest('computers/retrieve', parameter).then(response => {
        if(response.data.length > 0){
          this.data = response.data
        }else{
          this.data = null
        }
      })
    }
  }
}
</script>
