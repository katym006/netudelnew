import Airtable from "airtable";
const token = 'patw1BfApdvasewun.e5cece4b87fc9bc014cdbdf68333fb7545c5c4b0303034d52d14f983a6ff9b50';

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: token
});

let base = Airtable.base('appqcanDpqVdaYzv2');

function getPostTeasers() {
    return new Promise((resolve, reject) => {
        const content = [];
        base('netudel_articles')
            .select({maxRecords: 100})
            .firstPage().then((result) => {
                result.forEach(record => {
                    content.push({
                        id: record.id,
                        title: record.fields['Name'],
                        tags: record.fields['tags'],
                        image: record.fields['image'],
                    })
                });
                resolve(content);
            })
    })
}

export {getPostTeasers}