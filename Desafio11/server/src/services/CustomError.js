export default class CustomError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
    this.name = this.cosntructor.name

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
