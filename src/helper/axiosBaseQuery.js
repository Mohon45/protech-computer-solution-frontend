import axios from "axios";
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: `/api/v1${url}`,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;

// var headers = new Headers();
// headers.append('Content-Type', 'application/json');
// headers.append('Accept', 'application/json');

// return fetch('/your/server_endpoint', {
//     method: 'POST',
//     mode: 'same-origin',
//     redirect: 'follow',
//     credentials: 'include', // Don't forget to specify this if you need cookies
//     headers: headers,
//     body: JSON.stringify({
//         first_name: 'John',
//         last_name: 'Doe'
//     })
// })
