dbPassword = 'mongodb+srv://sannonthachai:chai41742@cluster0-b4miu.mongodb.net/test?retryWrites=true&w=majority'
setMongoose = { useCreateIndex: true , useNewUrlParser: true , useFindAndModify: false, useUnifiedTopology: true }
secretJWT = 'CRIMSON_SECRET_KEY'

module.exports = {
    mongoURI: dbPassword,
    set: setMongoose,
    secret: secretJWT
}