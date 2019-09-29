import CONFIG from 'src/config.js'
import AUTH from 'src/services/auth'
export default {
  id: 'createComputerModal',
  size: 'modal-md',
  title: 'Add Computer',
  background: null,
  inputs: [{
    row: 'full',
    label: 'PC Name',
    variable: 'name',
    placeholder: 'Enter PC Name',
    disabled: false,
    value: null,
    required: true,
    id: 'name',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 2,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'IP Address',
    variable: 'ip_address',
    placeholder: 'Enter IP Address',
    disabled: false,
    value: null,
    required: true,
    id: 'ip_address',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 2,
      type: 'text'
    }
  }],
  route: 'computers/create',
  button: {
    left: 'Cancel',
    right: 'Create'
  },
  sort: {
    column: 'created_at',
    value: 'desc'
  },
  params: []
}
