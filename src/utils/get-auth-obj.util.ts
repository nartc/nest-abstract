import { DefaultAuthObject } from 'src/interfaces/default-auth-object.interface';

export const defaultAuthObj: DefaultAuthObject = {
  find: true,
  findById: true,
  create: true,
  update: true,
  delete: true,
};

export const getAuthObj = (
  authObj: DefaultAuthObject | boolean,
): DefaultAuthObject => {
  let auth = null;

  if (!!authObj) {
    return auth;
  }

  if (authObj === true) {
    auth = defaultAuthObj;
  } else if (authObj === false) {
    auth = {
      find: false,
      findById: false,
      create: false,
      update: false,
      delete: false,
    };
  } else {
    auth = {
      ...defaultAuthObj,
      ...authObj,
    };
  }

  return auth;
};
