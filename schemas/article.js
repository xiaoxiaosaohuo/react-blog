/**
 * 文章的表结构
 */
import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    author:String,
    creatTime:{ type: Date, default: Date.now },
    title:String,
    content:String,
    publish:Boolean,
    tags:Array
});
