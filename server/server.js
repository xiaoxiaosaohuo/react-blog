import path from 'path'
import Express from 'express'
import httpProxy from 'http-proxy'
import compression from 'compression'
import history from 'connect-history-api-fallback'
import config from '../config/config'
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.dev')
const  morgan = require('morgan')
const app = new Express();
const port = config.port;
const ROOT_PATH = path.resolve(__dirname,'..');
const ENTRY_PATH = path.resolve(ROOT_PATH, 'src');




app.use(morgan('dev'))
app.use(history());


//代理API
const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const proxy = httpProxy.createProxyServer({
    target:targetUrl
});
app.use('/api',(req,res)=>{
    proxy.web(req,res,{target:targetUrl},function(e) { console.log(e) })
});

//热更新
if(process.env.NODE_EVN!=='production'){
    const compiler = webpack(webpackConfig)

  console.log('Enable webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : ENTRY_PATH,
    hot         : true,
    quiet       : false,
    noInfo      : false,
    lazy        : false,
    stats       : {
    chunks : false,
    chunkModules : false,
    colors : true
    },
  }))
  // compiler.apply(new DashboardPlugin({ port: 3000 }));
  app.use(require('webpack-hot-middleware')(compiler))
  app.use(Express.static(path.resolve(ROOT_PATH,'static')))
}else{
    app.use('/',Express.static(path.join(__dirname,"..",'dist')));
}


app.use(compression());

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(port,(err)=>{
    if(err){
        console.error(err)
    }else{
        console.log(`===>open http://${config.host}:${config.port} in a browser to view the app`);
    }
});
