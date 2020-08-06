const {
    getAllAds,
} = require('./scrape');
const {
    allCarsAds,
} = require('./models');

const runScrape = async () => {
    const allAdsArr = await getAllAds(); // call scrape function

    // saves in the database:
    allAdsArr.map(async (ad) => {
        const title = ad[0];
        let price;
        try {
            price = Number(ad[1].match(/\d+/g).join(''));
        } catch (error) {
            price = 0;
        }
        const year = Number(ad[2].split(' ')[0]);
        const provider = ad[3];
        const adObj = {
            title,
            price,
            year,
            provider,
        };

        await allCarsAds.create(adObj);
    });
    console.log('<<< the ads was updated successfully >>>');
};

runScrape();
