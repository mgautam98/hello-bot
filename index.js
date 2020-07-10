/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  
  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    return context.github.issues.createComment(issueComment)
  })


  // Application end points
  const router = app.route('/fellows')

  // Use any middleware
  router.use(require('express').static('public'))

  // Add a new route
  router.get('/feed', (req, res) => {
    res.send('Fellows Feed')
  })
}
