import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedcomponents = router.getMatchedComponents()
      console.log(matchedcomponents)
      if (!matchedcomponents.length) {
        return reject(new Error('matchedcomponents 没有数据'))
      }
      resolve(app)
    })
  })
}
