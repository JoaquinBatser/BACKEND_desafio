import { Router } from 'express'
import cartsController from '../controllers/carts.controller.js'

const cartRouter = Router()

cartRouter.get('/', cartsController.getCart)

cartRouter.get('/:cId', cartsController.getCartById)

cartRouter.post('/:cId/purchase', cartsController.purchaseCart)

cartRouter.post('/', cartsController.createCart)

cartRouter.post('/:cId/product/:pId', cartsController.addProductToCart)

cartRouter.put('/:cId/product/:pId', cartsController.updateProductQuantity)

cartRouter.delete('/:cId/product/:pId', cartsController.deleteProductFromCart)

cartRouter.delete('/:cId', cartsController.emptyCart)

export default cartRouter
