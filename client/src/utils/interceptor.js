import axios from 'axios';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    console.log(error);
    alert('Got an error');
    return Promise.reject(error);
});

export default interceptor;
