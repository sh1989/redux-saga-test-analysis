export const getUser = (username, context) => {
  return {
    username,
    context,
    admin: false
  };
};
