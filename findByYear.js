const {
    allCarsAds,
} = require('./models');

require('console.table');

const order = {
    where: {
        year: '2008',
    },
};

const run = async () => {
    const allAds = await allCarsAds.findAll(order);
    const arr = [];
    allAds.map((ad) => {
        const adObj = {
            title: ad.dataValues.title,
            price: ad.dataValues.price,
            year: ad.dataValues.year,
            provider: ad.dataValues.provider,
        };
        arr.push(adObj);
    });
    console.table(arr);
};

run();
