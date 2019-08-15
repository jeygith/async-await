const axios = require('axios');
const API_KEY = 'fa50031a574df80b9aaaeb52f27bd6d0';

const getExchangeRate = async (from, to) => {

    try {
        let url = `http://data.fixer.io/api/latest?access_key=${API_KEY}`;
        const response = await axios.get(url);

        const rate = response.data.rates[to];

        if(rate){
            return rate;
        }else{
            throw new Error();
        }

    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
    }

};

const getCountries = async (currencyCode) => {
    try {

        const response = await axios.get(`http://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);

    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }

    /*    return axios.get(`http://restcountries.eu/rest/v2/currency/${currencyCode}`).then((res) => {
            return res.data.map((country) => {
                return country.name;

            })
        });*/
};


const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to)
    }).then((rate) => {
        const exchangedAmount = amount * rate;
        return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
    });
};


const convertCurrencyAlt = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);
    const exchangedAmount = amount * rate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
}

/*convertCurrency('EUR', 'EUR', 100).then((status) => {
    console.log(status);
});*/

convertCurrencyAlt('EUR', 'MMMM', 100).then((res) => {
    console.log(res);
}).catch((err) => console.log(err));

getExchangeRate('USD', 'KES').then((rate) => {
    console.log(rate);
});

getCountries('EUR').then((countries) => {
    console.log(countries);
});