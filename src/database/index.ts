import mongoose from 'mongoose';

export async function connect() {
    try {
        const dbUrl = `mongodb+srv://admin:${process.env.MONGO_DB_PASS}@fujiwarachikabot.dx1tg.gcp.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.log('Ocurred an error while connecting database', err);
    }
}
