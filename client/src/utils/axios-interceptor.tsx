import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import axios from 'axios';

const calculatePercentage = (loaded: any, total: any) => (Math.floor(loaded * 1.0) / total);

const setupRequestInterceptor = () => {
  // axios.defaults.onDownloadProgress = e => {
  //   const percentage = calculatePercentage(e.loaded, e.total);
  //   NProgress.set(percentage);
  // }

  axios.interceptors.request.use(
    (response) => {
      NProgress.start();
      return response;
    },
    (error) => {
      console.log(error);
      alert('Got an request error');
      return Promise.reject(error);
    }
  );
}

const setupResponseInterceptor = () => {
  axios.interceptors.response.use(
    (response) => {
      NProgress.done(true)
      return response;
    },
    (error) => {
      console.log(error);
      alert('Got an response error');
      return Promise.reject(error);
    }
  );
}

export default function interceptor() {
  NProgress.configure({ showSpinner: true })
  setupRequestInterceptor()
  setupResponseInterceptor()
}
