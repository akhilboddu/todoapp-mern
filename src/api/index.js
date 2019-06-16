import axios from 'axios';

export default
   axios.create({
      baseURL: 'https://calm-mesa-30648.herokuapp.com',
      timeout: 20000
   });

   