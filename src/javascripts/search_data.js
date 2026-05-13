import Airtable from "airtable";
const token = 'pateHmCh4GAhz9UJV.0770e34ee3b1dee634a922d250dc386eff8d93933faff26b17613ad62c2d9ffa';

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: token
});

let base = Airtable.base('appzYp2PFjIXiifWA');

function getPostTeasers() {
    return new Promise((resolve, reject) => {
        const content = [];
        base('netudel_hobbies')
            .select({maxRecords: 100})
            .firstPage().then((result) => {
                result.forEach(record => {
                    content.push({
                        id: record.id,
                        title: record.fields['Name'],
                        time: record.fields['time'],
                        cost: record.fields['cost'],
                        complexity: record.fields['complexity'],
                        image: record.fields['image'],
                        desc: record.fields['desc'],
                    })
                });
                resolve(content);
            })
    })
}

export {getPostTeasers}
