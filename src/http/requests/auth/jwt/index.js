import axios from "../../../axios/index.js";
import store from "../../../../store/store.js";

// Token Refresh
let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter(callback => callback(access_token));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

export default {
  init() {
    axios.interceptors.response.use(
      function(response) {
        return response;
      },
      function (error) {
        // const { config, response: { status } } = error
        const { config, response } = error;
        const originalRequest = config;
        // if (status === 401) {
        //   if (response && response.status === 401) {
        //     if (!isAlreadyFetchingAccessToken) {
        //       isAlreadyFetchingAccessToken = true;
        //       store.dispatch("auth/fetchAccessToken").then(access_token => {
        //         isAlreadyFetchingAccessToken = false;
        //         onAccessTokenFetched(access_token);
        //       });
        //     }

        //     const retryOriginalRequest = new Promise(resolve => {
        //       addSubscriber(access_token => {
        //         originalRequest.headers.Authorization = `Bearer ${access_token}`;
        //         resolve(axios(originalRequest));
        //       });
        //     });
        //     return retryOriginalRequest;
        //   }
        //   return Promise.reject(error);
        // }
      }
    );
  },
  async login(email, pwd, language) {
    console.log("login called");
     return await axios.post("auth/authenticate", {
      email,
       password: pwd,
       language
    });
  },
  // login (email, pwd) {
  //   return axios.post('/api/auth/login', {
  //     email,
  //     password: pwd
  //   })
  // },
  registerUser(payload) {
    return axios
      .post("auth/register", payload)
      .then(res => console.log("responce =>", res));
  },
  // registerUser (name, email, pwd) {
  //   return axios.post('/api/auth/register', {
  //     displayName: name,
  //     email,
  //     password: pwd
  //   }).then(res => console.log('responce =>', res))
  // },
  resetPassword(pwd, key) {
    return axios
      .put("auth/reset-password", {
        newPassword: pwd,
        key: key
      })
      .then(res => console.log("responce =>", res));
  },
  forgotPassword(payload) {
    return axios
      .post("auth/forgot-password", payload)
      .then(res => console.log("responce =>", res));
  },
  refreshToken() {
    return axios.post("/api/auth/refresh-token", {
      accessToken: localStorage.getItem("accessToKen")
    });
  },

  getallfiles () {
    const token = localStorage.getItem('accessToken')
    console.log('Token =>', token);
    return axios.get('folders', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  createFolder (name, path, parentId) {
    const token = localStorage.getItem('accessToken')
    return axios.post('folders', { name: name, path: path, parentId:parentId }, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  renameFolder (newName, id) {
    const token = localStorage.getItem('accessToken')
    return axios.put('folders/rename', { newName: newName, id: id}, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  renameFile (newName, id) {
    const token = localStorage.getItem('accessToken')
    return axios.put('files/rename-file', { newName: newName, id: id}, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  deleteFolder (id) {
    const token = localStorage.getItem('accessToken')
    return axios.delete('folders/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },

  deleteFile (id) {
    const token = localStorage.getItem('accessToken')
    // return axios.delete('files', {
    //   headers: {
    //     Authorization: 'Bearer ' + token
    //   }
    // })
    return axios({
      method: 'delete',
      url: 'files',
      headers: {Authorization: 'Bearer ' + token},
      params:{ fileId: id}
    })
  },
  downloadFile (id) {
    const token = localStorage.getItem('accessToken')
    return axios({
      method: 'get',
      url: 'files/download-file',
      headers: {Authorization: 'Bearer ' + token},
      params:{ fileId: id}
    })
    // return axios.get('files/download-file',params, header)
  },
  uploadFile (formData) {
    const token = localStorage.getItem('accessToken')
    return axios.post('files/upload-file' , formData,  {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  // searchFiles (dataparam) {
  //   const token = localStorage.getItem('accessToken')
  //   return axios({
  //     method: 'get',
  //     url: 'folders/search/'+ dataparam.id',
  //     headers: {Authorization: 'Bearer ' + token},
  //     params:{ fileId: id}
  //   })
    // return axios.get('folders/search/'+ dataparam.id, {params: {name: dataparam.value}}, {
    //   headers: {
    //     Authorization: 'Bearer ' + token
    //   }
    // })
  // }
};
