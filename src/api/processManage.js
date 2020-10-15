import fetch from './request'


// 上传文件
export function postUpFile(params) {
  return fetch.post('UpLoad/postUpFile', params);
}

