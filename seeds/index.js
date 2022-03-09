const mongoose= require('mongoose');
const cities = require('./cities');
const { places, descriptors}= require('./seedHelpers');
const Campground = require('../models/campground')
//because we are in differnet folder so find need to get out of that sp used ..
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() *20)+10;

     const camp= new Campground({
            author: '61d54134e66c249e5148ff3b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images:  [
                {
                  url: 'https://res.cloudinary.com/debf2lldh/image/upload/v1641976025/YelpCamp/bp1w7fvvnaduf5ahlsbo.jpg',
                  filename: 'YelpCamp/bp1w7fvvnaduf5ahlsbo'
                },
                {
                  url: 'https://res.cloudinary.com/debf2lldh/image/upload/v1641976026/YelpCamp/k2g6fersrsrbzjnmvv8q.jpg',
                  filename: 'YelpCamp/k2g6fersrsrbzjnmvv8q'
                },
                {
                  url: 'https://res.cloudinary.com/debf2lldh/image/upload/v1641976028/YelpCamp/m51exabuepln4cjf58w9.jpg',
                  filename: 'YelpCamp/m51exabuepln4cjf58w9'
                }
              ],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id ad iste in alias architecto sed dolorem magnam, nisi nemo ipsum quae consequatur suscipit quas consectetur maiores excepturi eveniet mollitia cumque',
            price

        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});