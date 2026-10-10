import mongoose from 'mongoose'

mongoose.set('bufferCommands', true)
mongoose.set('bufferTimeoutMS', 10000)

export async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000
  })

  console.log('MongoDB conectado')
}

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB desconectado')
})

mongoose.connection.on('error', () => {
  console.error('Error de conexión con MongoDB; revisa la red y Atlas.')
})