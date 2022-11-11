import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL

console.log(process.env)
console.log(process.env.REACT_APP_SERVER_URL)
console.log(process.env.TEST)

export default axios;
