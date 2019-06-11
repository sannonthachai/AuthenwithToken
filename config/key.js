dbPassword = 'mongodb+srv://sannonthachai:chai41742@cluster0-b4miu.mongodb.net/test?retryWrites=true&w=majority'
setMongoose = { useCreateIndex: true , useNewUrlParser: true , useFindAndModify: false }

module.exports = {
    mongoURI: dbPassword,
    set: setMongoose
}