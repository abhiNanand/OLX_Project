// /* eslint-disable import/no-cycle */
// import {
//   createApi,
//   fetchBaseQuery,
//   BaseQueryFn,
//   BaseQueryApi,
// } from '@reduxjs/toolkit/query/react';
// import type { RootState } from '../../Store';
// import { API_BASE_URL } from './Constants';
// import { ResponseOptions } from './api.d';
// import { updateAuthState, updateAuthToken } from '../../Store/Common';
// import { setLoading } from '../../Store/Loader';

// const baseQuery: BaseQueryFn = fetchBaseQuery({
//   baseUrl: API_BASE_URL,
//   prepareHeaders: async (headers: Headers, { getState }) => {
//     const { access: token } = (getState() as RootState).common;

//     if (token) {
//       headers.append('Authorization', `Bearer ${token}`);
//     }
//     headers.append('skip_zrok_interstitial', 'true');
//     return headers;
//   },
// });

// const baseQueryWithInterceptor = async (
//   args: unknown,
//   api: BaseQueryApi,
//   extraOptions: object
// ) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (
//     (result as ResponseOptions).error &&
//     (result as ResponseOptions).error.status === 401
//   ) {
//     // here you can deal with 401 error
    

//     const refreshResult = await baseQuery(
//       {
//         url: `account/refresh/`,
//         method: 'POST',
//         credentials: 'include',
//       },
//       api,
//       extraOptions
//     );
//     if ((refreshResult as ResponseOptions)?.data) {
//       const newToken = (refreshResult as any)?.data?.access;
//       api.dispatch(updateAuthToken(newToken));

//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       try {
//         await baseQuery(
//           {
//             url: `account/logout/`,
//             method: 'POST',
//             credentials: 'include',
//           },
//           api,
//           extraOptions
//         );

//         api.dispatch(
//           updateAuthState({
//             access: null,
//             id: null,
//             username: null,
//           })
//         );
//         api.dispatch(setLoading(true));
//       } catch (error) {
//         console.log(error, 'error');
//       }
//     }
//   }
//   return result;
// };

// const api = createApi({
//   baseQuery: baseQueryWithInterceptor,
//   tagTypes: ['wishlist'],
//   endpoints: () => ({}),
// });

// export default api;

/* eslint-disable import/no-cycle */
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  BaseQueryApi,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../Store';
import { API_BASE_URL } from './Constants';
import { ResponseOptions } from './api.d';
import { updateAuthState, updateAuthToken } from '../../Store/Common';
import { setLoading } from '../../Store/Loader';

const baseQuery: BaseQueryFn = fetchBaseQuery({
  baseUrl: API_BASE_URL,
   prepareHeaders: async (headers: Headers, { getState }) => {
    const { access: token } = (getState() as RootState).common;
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('skip_zrok_interstitial', 'true');
    return headers;
  },
});

const baseQueryWithInterceptor = async (
  args: unknown,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    (result as ResponseOptions).error &&
    (result as ResponseOptions).error.status === 401
  ) {
    // 🔄 Access token expired → Refresh
    const refreshResult = await baseQuery(
      {
        url: `account/refresh/`,
        method: 'POST',
        credentials: 'include',
      },
      api,
      extraOptions
    );

    if ((refreshResult as ResponseOptions)?.data) {
      const newToken = (refreshResult as any)?.data?.access;
      api.dispatch(updateAuthToken(newToken));

      // Retry original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      try {
        // ❌ Refresh bhi expire → Logout
        await baseQuery(
          {
            url: `account/logout/`,
            method: 'POST',
            credentials: 'include',
          },
          api,
          extraOptions
        );

        api.dispatch(
          updateAuthState({
            refresh: null,
            access: null,
            id: null,
            username: null,
          })
        );
        api.dispatch(setLoading(true));
      } catch (error) {
        console.log(error, 'error');
      }
    }
  }

  return result;
};

const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['wishlist'],
  endpoints: () => ({}),
});

export default api;
