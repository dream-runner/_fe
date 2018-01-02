export const LOGIN = 'LOGIN'
export const login = (user, token, organization) => ({
  type: LOGIN,
  payload: {
    user,
    token,
    organization,
  },
})



// WEBPACK FOOTER //
// ./packages/main/src/actions/index.js