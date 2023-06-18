import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
async function main() {
  try {
    // await mongoose.connect('mongodb://127.0.0.1:27017/test');
    await mongoose.connect(config.database_url as string)
    console.log('Database connected successfully')

    app.listen(config.port, () => {
      console.log(`University management server running port:  ${config.port}`)
    })
  } catch (err) {
    console.log('Failed to connect database ', err)
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()
