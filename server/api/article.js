import Express from 'express'
const router = Express.Router()
import Article from '../../models/article'
import {responseClient,md5} from '../utils'

/**
 *文章
 */

router.post('/createArticle', (req, res) => {
    let {author, title, article} = req.body;
    console.log(req.body);
    debugger;
    //保存到数据库
    let newArticle = new Article(req.body);
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
            tags,
            isPublish,
            id
        } = req.body;
        Article.update({_id:id},{title,content,time,tags:tags.split(','),isPublish})
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
module.exports = router;
