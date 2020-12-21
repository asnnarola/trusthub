// axios
import axios from 'axios'

const baseURL = 'http://beta.trusthub.cloud:8080/'
// const baseURL = 'https://localhost:8080/'
// const baseURL = 'http://192.168.1.243:8081/'

export default axios.create({
  baseURL
  // You can add your headers here
})
