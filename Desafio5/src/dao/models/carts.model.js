import mongoose from 'mongoose'

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
  products: {
    type: {
      productId: { type: mongoose.Types.ObjectId, ref: 'products', required: true },
      quantity: { type: Number, default: 1 },
    },
  },
})

cartSchema.pre(/^find/, function (next) {
  this.populate('products.productId')
  next()
})

export const cartModel = mongoose.model(cartCollection, cartSchema)
