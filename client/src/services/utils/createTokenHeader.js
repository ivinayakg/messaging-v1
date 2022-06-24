export function createTokenHeader(token) {
  return {
    headers: {
      authorization: token,
    },
  };
}
