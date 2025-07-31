import mongoose from 'mongoose'

const connectDB = async () =>{
    mongoose.connection.on('connect',() => {
        console.log('Database Connected')
    })

    await mongoose.connect(process.env.DATABASE_URL)
}

export default connectDB