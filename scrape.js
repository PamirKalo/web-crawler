const jsdom = require('jsdom');
const {
    JSDOM,
} = jsdom;
const jQueryInit = require('jquery');

const urlCarsBg = 'https://www.cars.bg/?brandId=38&currencyId=1&fromhomeu=1&models%5B0%5D=591&go=cars&offersFor1=2&offersFor4=1&stateId=1&search=2&cref=107&page=1&cref=107';
const urlAutoBg = 'https://www.auto.bg/obiavi/avtomobili-dzhipove/kia/ceed';

// cars.bg:
const getAdsFromCarsBg = async (url, arr) => {
    const dom = await JSDOM.fromURL(url); // create DOM
    const $ = jQueryInit(dom.window); // create JQuery model

    if ($('.odd,.even').length === 0) { // symptoms for the last ad page
        return arr;
    }

    // essentially scraping:
    const adsFromCurrentPage = [...$('.odd,.even')]
        .map((tr) => {
            const title = $(tr).find('.ver15black b').html();
            const price = $(tr).find('.ver20black strong').html() || 'N/A';
            const year = $(tr).find('.year').html();
            const provider = 'cars.bg';
            return [title, price + ' лв', year + ' год', provider];
        });
    arr.push(...adsFromCurrentPage);

    // finding next page url:
    const pageRegex = /(page=)(\d+)/;
    const nextPageUrl = url.replace(pageRegex, (match, p1, p2) => {
        const nextPage = Number(p2) + 1;
        return p1 + nextPage;
    });

    // recursive call:
    await getAdsFromCarsBg(nextPageUrl, arr);
    return arr;
};

// auto.bg:
const getAdsFromAutoBg = async (url, arr) => {
    const dom = await JSDOM.fromURL(url); // create DOM
    const $ = jQueryInit(dom.window); // create JQuery model

    if ($('.resultItem').length === 0) { // symptoms for the last ad page
        console.log('alooooo');
        return arr;
    }

    // content scraping:
    const pageAdsNames = [...$('.resultItem')]
        .map((ad) => {
            const title = $(ad).find('.link a').html();
            const price = $(ad).find('.price').html();
            const year = $(ad).find('.info div strong').html()
                .match(/\d+/)[0];
            const provider = 'auto.bg';
            return [title, price + ' лв', year + ' год', provider];
        });
    arr.push(...pageAdsNames);

    // finding next page url:
    const pageRegex = /(page\/)(\d+)/;
    let nextPageUrl = url.replace(pageRegex, (match, p1, p2) => {
        const nextPage = Number(p2) + 1;
        return p1 + nextPage;
    });
    if (pageRegex.test(nextPageUrl) === false) nextPageUrl = url + '/page/1';

    // recursive call:
    await getAdsFromAutoBg(nextPageUrl, arr);
    return arr;
};

const getAllAds = async () => {
    const resultArrAutoBg = await getAdsFromAutoBg(urlAutoBg, []);
    const resultArrCarsBg = await getAdsFromCarsBg(urlCarsBg, []);
    return [...resultArrCarsBg, ...resultArrAutoBg];
};

module.exports = {
    getAllAds,
};
