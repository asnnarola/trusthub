// axios
import axios from 'axios'

const baseURL = 'http://beta.trusthub.cloud:8080/'

export default axios.create({
  baseURL
  // You can add your headers here
})
