const mongoose = require('mongoose'); 



var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      mobile: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      }
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
      next()
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  userSchema.methods.createPasswordResetToken = async function (){
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash('sha256').update('resettoken').digest("hex")
    this.passwordChangeAt = Date.now() +30*60*1000;
    return resetToken
  }
module.exports = mongoose.model('User', userSchema);