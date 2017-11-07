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
                    responseClient(res, 200, 0, '注册成功', data);
                    return;
                });
        })
    })

// //用户验证
// router.get('/userInfo',function (req,res) {
//     if(req.session.userInfo){
//         responseClient(res,200,0,'',req.session.userInfo)
//     }else{
//         responseClient(res,200,1,'请重新登录',req.session.userInfo)
//     }
// });
//
// router.get('/logout',function (req,res) {
//     req.session.destroy();
//     res.redirect('/');
// });

module.exports = router;
