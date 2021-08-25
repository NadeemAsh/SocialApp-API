module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username cannot be empty!";
  }
  if (email.trim() === "") {
    errors.email = "Email cannot be empty!";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email is not valid!";
    }
  }
  if (password === "") {
    errors.password = "Password cannot be empty!";
  } else if (password.length < 6) {
    errors.password = "Password must be atleast 6 characters long!";
  } else if (password !== confirmPassword) {
    errors.password = "Both the Passwords must match!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
    //if the lenght of the keys of the errors object is less than one
    //then it means there is no error in our inputs and is valid
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username cannot be empty!";
  }
  if (password === "") {
    errors.password = "Password cannot be empty!";
  }
  if (password.length < 6) {
    errors.password = "Password must be atleast 6 characters long!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
    //if the lenght of the keys of the errors object is less than one
    //then it means there is no error in our inputs and is valid
  };
};
