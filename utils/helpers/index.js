import CryptoJS from "crypto-js";

const SECRET_KEY = "btd5";


export function encryptData (data) {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  }
    
  export function decryptData (data) {
    return CryptoJS.AES.decrypt(data, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  }

export function getUserInfoForLocalStorage () {
    const userInfoEncypt = localStorage.getItem("user");
    if(!userInfoEncypt) {
        return ""
    }
    const userInfoAsJson = decryptData(userInfoEncypt);
    if(!userInfoAsJson) {
        return ""
    }
    return JSON.parse(userInfoAsJson);
}

export function isAuth() {
    const userInfo = getUserInfoForLocalStorage();
    if(!userInfo) {
        return false
    }
    return true
}

export function timeFormatter(value) {
  if (!value || value === '' || (typeof value !== 'string')) return "--";
  
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return "--";
  
  const [_, year, month, day] = match;
  return `${day}/${month}/${year}`;
}

export const formatCurrency = (number) => {
  if(!number) return 0;
  if(typeof +number !== 'number') return 0;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return formatter.format(number);
}