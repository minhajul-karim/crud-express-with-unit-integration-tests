/*
 * Title: Utility functions
 * Description: A collection of functions those help to accomplish various operations easier accross the application
 * Author: Minhajul Karim
 * Date: 9 Aug 2021
 */

function getUsersInfo(users) {
  return users.map((userObj) => {
    const { id, name, phone, email } = userObj;
    return {
      id,
      name,
      phone,
      email,
    };
  });
}

module.exports = {
  getUsersInfo,
};
