function patchUserValidation(values) {
    let errors = {};
  
    if (values.length < 3) {
      errors.displayName = "A Display Name Must Be At Least 3 Characters!";
    }
  
    if (values.length > 30) {
      errors.displayName = "Display Name May Have No More Than 30 Characters!";
    }
  
    return errors
  }
  
  export default patchUserValidation 