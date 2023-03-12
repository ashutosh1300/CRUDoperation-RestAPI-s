import mongoose from "mongoose";
import validator from "mongoose-unique-validator";

const categorySchema = mongoose.Schema({
    _id : Number,
    catname:{
      type : String,
      unique : true,
      required :[true,"catname is required"],
      lowercase : true,
      trim : true,
    },
    caticonname :{
        type : String,
        required :[true,"catname is required"],
        trim : true,  
    },
})
categorySchema.plugin(validator);

const categorySchemaModel = mongoose.model("categories",categorySchema);

export default categorySchemaModel;