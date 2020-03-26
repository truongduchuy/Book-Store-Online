import lodash from 'lodash'
import { message, notification } from 'antd'
import 'antd/es/notification/style/css'
import 'antd/es/message/style/css'

const show = (type, data) => {
  if (lodash.isObject(data) && data.size === 'large') {
    notification[type](data)
  } else {
    message[type](data)
  }
}

class Notification {
  static success(data) {
    show('success', data)
  }

  static warning(data) {
    show('warning', data)
  }

  static error(data) {
    show('error', data)
  }
}

export default Notification
