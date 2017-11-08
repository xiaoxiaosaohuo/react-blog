/**
 * 文章的表结构
 */
import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    author:String,
    creatTime:{ type: Date, default: Date.now },
    title:String,
    content:String,
    coverImg:String,//封面图片
    favoriteCount:Number,//喜欢次数
    isPublish:Boolean,//是否发布
    tags:Array
});
