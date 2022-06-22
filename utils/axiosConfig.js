import axios from 'axios'

export const config_axios = () => {
    if(typeof localStorage === 'undefined') return
    axios.interceptors.request.use(
        async config => {
            try{
                const session = localStorage.getItem('token')
                if (config.url&&config.url.indexOf("token") === -1 && session  ) {
                    config.headers['Authorization'] = 'Bearer ' + session;
                }
            }catch(err){
                console.log(err);
                return config
            }
            
            return config
            
        },
        error => {
            console.log(error);
            Promise.reject(error) 
        }
      );
}