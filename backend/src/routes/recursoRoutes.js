import { Router } from 'express'

import {
  list,
  detail,
  create,
  update,
  remove,
  validId
} from '../controllers/recursoController.js'

import {
  protect,
  adminOnly
} from '../middleware/auth.js'

const router = Router()

router.get('/', list)

router.get(
  '/:id',
  validId,
  detail
)

router.post(
  '/',
  protect,
  adminOnly,
  create
)

router.put(
  '/:id',
  protect,
  adminOnly,
  validId,
  update
)

router.delete(
  '/:id',
  protect,
  adminOnly,
  validId,
  remove
)

export default router