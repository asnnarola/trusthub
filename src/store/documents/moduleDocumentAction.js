import jwt from '../../http/requests/auth/jwt/index.js'
import router from '@/router'
import axios from '../../axios'
import { response } from 'express'

export default {
  getFiles ({ commit, state }) {
      jwt.getallfiles()
      .then(response => {
        // console.log('AB Data', response.data);
        state.documents = response.data
        // console.log('AB Data 2', state.documents);
      })
      .catch(error => {
        console.log('I am here =>', error);
        reject(error)
      })
  },
  createFolder ({ commit }, payload) {
    const { name, path, parentId } = payload.folderDetails
    return jwt.createFolder(name, path, parentId)
        .then(response => {
          console.log('response =>',response);
        })
        .catch(error => { console.log('Error =>', error); })
  },
  renameFolder ({ commit }, payload) {
    const { newName, id } = payload.folderDetails
    return jwt.renameFolder(newName, id)
        .then(response => {
          console.log('response =>',response);
        })
        .catch(error => { console.log('Error =>', error); })
  },
  renameFile ({ commit }, payload) {
    const { newName, id } = payload.folderDetails
    return jwt.renameFile(newName, id)
      .then(response => {
        console.log('response =>',response);
      })
      .catch(error => { console.log('Error =>', error); })
  },
  deleteFolder ({ commit }, id) {
    return jwt.deleteFolder(id)
    .then(response => {
      console.log('response =>',response);
    })
    .catch(error => { console.log('Error =>', error); })
  },
  deleteFile ({ commit }, id) {
    return jwt.deleteFile(id)
    .then(response => {
      console.log('response =>',response);
    })
    .catch(error => { console.log('Error =>', error); })
  },
  downloadFile ({ commit }, id) {
    return jwt.downloadFile(id)
    .then(response => {
      console.log('response =>',response);
    })
    .catch(error => { console.log('Error =>', error); })
  },
  uploadFiles ({ commit }, formData) {
    return jwt.uploadFile(formData)
    .then(response => {
      console.log('response =>',response);
    })
    .catch(error => { console.log('Error =>', error); })
  },
  searchFiles ({ commit }, dataparam) {
    console.log('Data =>', dataparam);
    return jwt.searchFiles(dataparam)
    .then(response => {
      console.log('response =>',response);
    })
    .catch(error => { console.log('Error =>', error); })
  }
}
