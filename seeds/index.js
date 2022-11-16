const mongoose = require('mongoose');
const Article = require('../models/article');

mongoose.connect('mongodb://localhost:27017/inventari', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Article.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const preu = Math.floor(Math.random() * 20) + 10;
        const camp = new Article({
            responsable: '629a52730405b970f153b6f0',
            unitat: `aula ${i}`,
            nom: `cadira ${i}`,
            imatge: 'https://source.unsplash.com/collection/483251',
            descripcio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            preu
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})