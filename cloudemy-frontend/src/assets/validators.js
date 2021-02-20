import CODES from "./countryCodes";

export const emailValidator = (email) => {
  if (!email) {
    return "Email is mandatory";
  } else if (!/@/.test(email)) {
    return "Missing an @";
  } else if (/@$/.test(email)) {
    return "Missing the domain part";
  } else if (!/\./.test(email)) {
    return "Missing the subdomain part";
  } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return "Valid";
  }
  return "Invalid email";
};

export const passwordValidator = (password) => {
  let tempArray = [];
  password.length >= 8
    ? tempArray.push(`<span style="color:lime;font-size:20px">✔ </span>`)
    : tempArray.push(`<span style="color:red;font-size:20px">✘ </span>`);
  /[a-z]/.test(password) && /[A-Z]/.test(password)
    ? tempArray.push(`<span style="color:lime;font-size:20px">✔ </span>`)
    : tempArray.push(`<span style="color:red;font-size:20px">✘ </span>`);
  /[0-9]/.test(password) && /\W/.test(password)
    ? tempArray.push(`<span style="color:lime;font-size:20px">✔ </span>`)
    : tempArray.push(`<span style="color:red;font-size:20px">✘ </span>`);
  return tempArray;
};

export const cPasswordValidator = (password) => {
  if (!password) {
    return "Confirm Password is mandatory";
  } else if (password !== document.getElementsByTagName("input")[4].value) {
    return "Passwords do not match";
  } else {
    return "Valid";
  }
};

export const nameValidator = (name) => {
  if (!name) {
    return "Name is mandatory";
  } else if (/\d/.test(name)) {
    return "Numbers are not allowed";
  } else if (/[^a-zA-Z\s]/.test(name)) {
    return "Special Characters not allowed";
  } else {
    return "Valid";
  }
};

export const phoneValidator = (phone) => {
  if (!phone) {
    return "Phone number is mandatory";
  } else if (/[a-zA-Z]/.test(phone)) {
    return "Words are not allowed";
  } else if (/[^0-9+ -]/.test(phone)) {
    return "Special Characters not allowed";
  } else if (phone[0] !== "+") {
    return "Plus missing";
  } else {
    let [code, num] = phone.split(" ");
    for (let country in CODES) {
      if (CODES.hasOwnProperty(country)) {
        if (CODES[country] === code) {
          if (!num) {
            return "Code:" + country.replace(/_/g, " "); //Replace all _ with blank space in Country name
          } else if (num.length < 8) {
            return "Phone number cannot be less than 8 digits";
          } else if (num.length > 12) {
            return "Phone number cannot exceed 12 digits";
          } else return "Valid";
        }
      }
    }
    return "Invalid Country Code";
  }
};
