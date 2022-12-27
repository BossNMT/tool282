module.exports = {
    listDb: function(mongoose) {
        return mongoose.map(mongoose => mongoose.toObject())
    },

    oneDb: function(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
}

$.post('/handle', {
    cookie: valueCookie.split(';'),
    proxy: listProxy[index]
}).done(msg => {
    if (msg.success) {
        $('#listTokenIG').append(msg.token + '\n');
    } else {
        $('#listCokieErr').append(valueCookie + '\n');
    }
})