
const router = require('express').Router()

const query = require('../utils/db')

const moment = require('moment')



router.get('/categories', async (req, res, next) => {

  try {

    const data = await query('SELECT * FROM `ali_cate`')

    res.status(200).json(data)

  } catch (err) {

    next(err)

  }

})



router.get('/categories/:id', async (req, res, next) => {

  try {

    const ret = await query('SELECT * FROM `ali_cate` WHERE `cate_id`=?', req.params.id)

    res.status(200).json(ret[0])

  } catch (err) {

    next(err)

  }

})



router.post('/categories', async (req, res, next) => {

  try {

    const body = req.body

    const ret = await query('INSERT INTO `ali_cate` SET ?', {

      cate_name: body.cate_name,

      cate_slug: body.cate_slug,

      cate_addtime: moment().format('YYYY-MM-DD'),

      cate_icon: 'fa-glass',

      cate_state: 1,

      cate_show: 1

    })

    res.status(201).json(ret)

  } catch (err) {

    next(err)

  }

})



router.patch('/categories/:id', async (req, res, next) => {

  try {

    res.send('patch /categories/:id')

  } catch (err) {

    next(err)

  }

})



router.delete('/categories/:id', async (req, res, next) => {

  try {

    await query('DELETE FROM `ali_cate` WHERE `cate_id`=?', req.params.id)

    res.sendStatus(204)

  } catch (err) {

    next(err)

  }

})



module.exports = router