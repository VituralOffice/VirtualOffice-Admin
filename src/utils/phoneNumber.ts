import {
  PhoneNumberUtil,
  PhoneNumberFormat as PNF,
} from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

const getPhoneNumber = (phoneNumber: string) =>
  phoneUtil.parse(phoneNumber, 'VN');

export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneUtil.format(getPhoneNumber(phoneNumber), PNF.NATIONAL);
};

export const isValidPhoneNumber = (phoneNumber: string) => {
  let phoneNumberObj;

  try {
    phoneNumberObj = getPhoneNumber(phoneNumber);
  } catch (error) {
    return false;
  }

  return phoneUtil.isValidNumber(phoneNumberObj);
};

export const getPhoneCodeAndNumber = (phoneNumber: string) => {
  const regPhone = /\+?[\s\d]*\(\d+\)[\s\-\d]+/;

  if (regPhone.test(phoneNumber)) {
    const regCode = /\(\d+\)/;
    const result = regCode.exec(phoneNumber);

    if (result) {
      const codeString = result[0];
      const codeIndex = result.index;
      const codeLength = codeString.length;
      const code = codeString.slice(1, codeLength - 1);
      const number = phoneNumber.slice(codeIndex + codeLength);

      return [code, number];
    }
  }

  return '';
};
