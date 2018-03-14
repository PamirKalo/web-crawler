const {
    getAllAds,
} = require('./scrape');
const {
    allCarsAds,
} = require('./models');

const runWithTestArr = async () => {
    const allAdsArr = await getAllAds();

    allAdsArr.map(async (ad) => {
        const title = ad[0];
        const price = Number(ad[1].match(/\d+/g).join(''));
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
    console.log('updated successful');
};

runWithTestArr();
