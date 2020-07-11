const sqlite3 = require('sqlite3').verbose();
var db = require('./lib/db') 
/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  
  db.setup_db()

  app.on(['issues.opened', 'issue_comment.created', 'pull_request.opened', 'push'], async context => {
    row = []
    if (context.name == 'issue_comment') {
      row = [context.payload.organization.login, 
            context.payload.comment.user.login,
            context.name, 
            context.payload.issue.title,
            context.payload.repository.full_name,
            context.payload.comment.created_at, 
            context.payload.comment.html_url];

    } else if (context.name == 'issues') {
      row = [context.payload.organization.login, 
            context.payload.issue.user.login,
            context.name,
            context.payload.issue.title,
            context.payload.repository.full_name,
            context.payload.issue.created_at,
            context.payload.issue.html_url];
 
    } else if (context.name == 'pull_request') {
      row = [context.payload.organization.login, 
            context.payload.pull_request.user.login,
            context.name,
            context.payload.pull_request.title,
            context.payload.repository.full_name,
            context.payload.pull_request.created_at,
            context.payload.pull_request.html_url];

    } else if (context.name == 'push') {
      row = [context.payload.organization.login,
            context.payload.sender.login,
            context.name,
            context.payload.head_commit.message,
            context.payload.repository.full_name,
            context.payload.head_commit.timestamp,
            context.payload.head_commit.url];

    }
    // db.insertRow(row);
  })


  // Application end points
  const router = app.route('/app')

  // Use any middleware
  router.use(require('express').static('public'))

  // Add a feed route
  router.get('/:org', (req, res) => {
    const org = req.params.org;
    res.send(org + ' Feed')
  })
}
