import mongoose ,{Schema,Document,Model} from 'mongoose'

export interface ICategory extends Document {
    type:string;
    color:string;
    userId:mongoose.Types.ObjectId;
}

const CategorySchema:Schema<ICategory>= new Schema({
    type:{type:String,default:'Investment'},
    color:{type:String,default:'#FCBE44'},
    userId:{type:Schema.Types.ObjectId,ref:'User',required:true},
});

export const Category: Model<ICategory> = mongoose.model<ICategory>('Category',CategorySchema);

export interface ITransaction extends Document{
    name:string;
    type:string;
    amount:number;
    date:Date;
    userId:mongoose.Types.ObjectId;
}

const TransactionSchema:Schema<ITransaction>=new Schema({
    name:{type:String,default:'Anonymous'},
    type:{type:String,default:'Investment'},
    amount:{type:Number,required:true},
    date:{type:Date,default:Date.now},
    userId:{type:Schema.Types.ObjectId,ref:'User',required:true},
});

export const Transaction:Model<ITransaction>=mongoose.model<ITransaction>('Transaction',TransactionSchema);