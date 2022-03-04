const bcrypt =require("bcrypt")


const validateUserInput = (email, password) => {
  return email && password;

};
const comparePassword=(password,hashedPasword)=>{
 return bcrypt.compareSync(password,hashedPasword);
}
module.exports = {
    validateUserInput,
    comparePassword
};
