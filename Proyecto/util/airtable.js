var Airtable = require('airtable');
var base = new Airtable({apiKey: 'YOUR_API_KEY'}).base('appKtLsQAiY5KAoge');

const table = base('Design Proyects');

const getRecords = async() =>{
    const records = await table.select().firstPage();
    console.log(records);
}