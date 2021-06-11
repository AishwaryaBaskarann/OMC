var mongoose=require('mongoose');
var reportSchema = new mongoose.Schema({
    symp1:String,
    symp2:String,
    symp3:String,
    cause:String
},{collection:'report'});
module.exports = mongoose.model('report', reportSchema);