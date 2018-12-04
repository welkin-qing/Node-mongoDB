const router = require('express').Router()



router.get('/admin', (req, res) => {

  res.render('admin/index.html')

})



router.get('/admin/login', (req, res) => {

  res.render('admin/login.html')

})



router.get('/admin/posts', (req, res) => {

  res.render('admin/posts.html')

})



router.get('/admin/posts', (req, res) => {

  res.render('admin/posts.html')

})



router.get('/admin/posts/new', (req, res) => {

  res.render('admin/posts-new.html')

})



router.get('/admin/categories', (req, res) => {

  res.render('admin/categories.html')

})



router.get('/admin/comments', (req, res) => {

  res.render('admin/comments.html')

})



router.get('/admin/settings/navmenu', (req, res) => {

  res.render('admin/settings-navmenu.html')

})



router.get('/admin/settings/slides', (req, res) => {

  res.render('admin/settings-slides.html')

})



router.get('/admin/settings/general', (req, res) => {

  res.render('admin/settings-general.html')

})



router.get('/admin/settings/security', (req, res) => {

  res.render('admin/settings-security.html')

})



router.get('/admin/profile', (req, res) => {

  res.render('admin/profile.html')

})



router.get('/admin/users', (req, res) => {

  res.render('admin/users.html')

})



module.exports = router