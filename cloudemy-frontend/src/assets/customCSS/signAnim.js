import {
  nameValidator,
  emailValidator,
  phoneValidator,
  cPasswordValidator,
  passwordValidator,
} from "../validators";
//Sign In page Input box Focus Out transitions
export const blurSignin = (Class, Value) => {
  if (Value !== "") {
    let x = document.getElementsByClassName(Class)[0].style;
    x.fontSize = "18px";
    x.marginLeft = "-220px";
    x.marginTop = Class === "ph-mail" ? "-40px" : "130px";
  }
};

//Sign Out page Input box Focus out transitions for left side inputs
export const blurLeftSet = (Class, Value) => {
  if (Value !== "") {
    let x = document.getElementsByClassName(Class)[0].style;
    x.marginTop = "-5px";
    x.fontSize = "16px";
    if (window.innerWidth >= 706) {
      x.marginLeft = Class === "ph-email" ? "-570px" : "-540px";
    } else {
      x.marginLeft = "-200px";
    }
  }
  let y = document.getElementsByClassName("tp-" + Class.slice(3))[0].style;
  y.visibility = "hidden";
};

//Sign Out page Input box Focus out transitions for right side inputs
export const blurRightSet = (Class, Value) => {
  if (Value !== "") {
    let x = document.getElementsByClassName(Class)[0].style;

    x.fontSize = "16px";
    if (window.innerWidth >= 706) {
      x.marginTop = "-5px";
      x.marginLeft = Class === "ph-lname" ? "-220px" : Class === "ph-phone" ? "-250px" : "-180px";
    } else {
      x.marginTop = "80px";
      x.marginLeft = "-200px";
    }
  }
  let y = document.getElementsByClassName("tp-" + Class.slice(3))[0].style;
  y.visibility = "hidden";
};

//Sign Out page Tooltip visibility -> visible
export const inputFocused = (Class, Value) => {
  let x = document.getElementsByClassName("tp-" + Class.slice(3))[0];
  let tooltipText;
  if (Class.slice(3) === "pswd") {
    tooltipText = passwordValidator(Value);
    x.style.visibility = "visible";
    x.innerHTML = `<p style="margin:0;padding:0">${tooltipText[0]}More than 8 characters</p>
    <p style="margin:0;padding:0">${tooltipText[1]}An uppercasse and Lowercase</p>
    <p style="margin:0;padding:0">${tooltipText[2]}A number and a character</p>`;
  } else if (Class.slice(3) === "phone") {
    tooltipText = phoneValidator(Value);
    if (tooltipText.slice(0, 5) === "Code:") {
      x.style.visibility = "visible";
      x.innerHTML = `<span style="color:lime;font-size:20px">✔ </span>` + tooltipText.slice(5);
    } else if (tooltipText.slice(0, 6) === "Valid") {
      x.style.visibility = "hidden";
    } else {
      x.style.visibility = "visible";
      x.innerHTML = `<span style="color:red;font-size:20px">✘ </span>` + tooltipText;
    }
  } else {
    if (Class.slice(4) === "name") tooltipText = nameValidator(Value);
    else if (Class.slice(3) === "email") tooltipText = emailValidator(Value);
    else if (Class.slice(3) === "cpswd") tooltipText = cPasswordValidator(Value);
    x.style.visibility = "visible";
    tooltipText !== "Valid"
      ? (x.innerHTML = `<span style="color:red;font-size:20px">✘ </span>` + tooltipText)
      : (x.style.visibility = "hidden");
  }
};
