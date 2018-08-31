const Koa = require('koa')

const app = new Koa()
const pagheRouter = require('./routers/dev-ssr')
const isDev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
  try {
    console.log(`请求的路径${ctx.path}`)
    await next()
  } catch (error) {
    console.log('error::::' + error)
    ctx.status = 500
    if (isDev) {
      ctx.body = `error:::: ${error}`
    } else {
      ctx.body = '服务器出错了'
    }
  }
})
app.use(pagheRouter.routes())
app.use(pagheRouter.allowedMethods())
const HOST = process.env.HOST || '127.0.0.1'
const POST = process.env.PORT || 3333
app.listen(POST, HOST, () => {
  console.log('服务启动 3333')
})
