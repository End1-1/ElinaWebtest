
module.exports = {
    id: "blank",
    title: "Blank",
    thumbnail: 'https://fashion.myshopian.com/themes/fashion/blank/images/blank.png',
    configs: [
        {
            title: 'general',
            translate: ['title'],
            fields: [
                {
                    title: 'sample.text.field',
                    translate: ['title', 'comment'],
                    id: 'blankSampleTextField',
                    comment: 'sample.text.field.comment',
                    type: 'text',
                    scope: 'shop',
                }
            ]
        }
    ]
}