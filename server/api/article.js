import Express from 'express'
const router = Express.Router()
import Article from '../../models/article'
import {responseClient,md5} from '../utils'

/**
 *文章
 */

router.post('/createArticle', (req, res) => {
    const {
        title,
        content,
        creatTime,
        topics,
        state,
        titleImage,
        favoriteCount,
    } = req.body;
    // const author = req.session.userInfo.username;
    console.log(req.session)
    //保存到数据库
    let newArticle = new Article({
        title,
        content,
        creatTime,
        topics,
        state,
        titleImage,
        favoriteCount,
        topics:topics.split(",")
    });
    newArticle.save()
        .then(function (json) {
            console.log("-----==========")
            // console.log(json);
            Article.findOne({_id: json._id})
                .then(data=>{
                    // console.log(data);
                    responseClient(res, 200, 0, '添加成功', data);
                    return;
                });
        })
    })

    router.post('/updateArticle',(req,res)=>{
        const {
            title,
            content,
            time,
            topics,
            isPublish,
            id
        } = req.body;
        Article.update({_id:id},{title,content,time,topics:topics.split(','),isPublish})
            .then(result=>{
                console.log(result);
                responseClient(res,200,0,'更新成功',result)
            }).cancel(err=>{
            console.log(err);
            responseClient(res);
        });
    });

    router.get('/delArticle',(req,res)=>{
        let id = req.query.id;
        Article.remove({_id:id})
            .then(result=>{
                if(result.result.n === 1){
                    responseClient(res,200,0,'删除成功!')
                }else{
                    responseClient(res,200,1,'文章不存在');
                }
            }).cancel(err=>{
                responseClient(res);
        })
    });

    //获取文章详情
router.get('/getArticleDetail', (req, res) => {
    let _id = req.query.id;
    Article.findOne({_id})
       .then(data=>{
           // data.viewCount = data.viewCount+1;
           // Article.update({_id},{viewCount:data.viewCount})
           //     .then(result=>{
           //         responseClient(res,200,0,'success',data);
           //     }).cancel(err=>{
           //         throw err;
           // })
           responseClient(res,200,0,'success',data);
       }).cancel(err => {
       responseClient(res);
   });
});


//获取文章
router.get('/getArticles', function (req, res) {
    console.log(req.query);
    let topics = req.query.topics || null;
    let state = req.query.state;
    let searchCondition = {
        state,
    };
    if (topics) {
        searchCondition.topics = topics;
    }

    let skip = (req.query.pageNum - 1) < 0 ? 0 : (req.query.pageNum - 1) * 5;
    let responseData = {
        total: 0,
        records: []
    };
    Article.count(searchCondition)
        .then(count => {
            responseData.total = count;
            Article.find(searchCondition, '_id title content state author viewCount favoriteCount titleImage creatTime topics', {
                skip: skip,
                limit: 5
            })
                .then(result => {
                    debugger;
                    responseData.records = result;
                    responseClient(res, 200, 0, 'success', responseData);
                }).cancel(err => {
                throw err
            })
        }).cancel(err => {
        responseClient(res);
    });
});
module.exports = router;
