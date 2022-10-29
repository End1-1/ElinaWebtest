
module.exports = {
    id: "fashion",
    title: "Fashion",
    thumbnail: 'https://fashion.myshopian.com/themes/fashion/images/fashion.png',
    demoShopUrl: 'https://fashion.myshopian.com/',
    configs: [
        {
            title: 'footer',
            translate: ['title'],
            fields: [
                {
                    title: 'footer.block.id',
                    translate: ['title', 'comment', 'optionValue'],
                    id: 'fashionFooterBlockId',
                    comment: 'footer.block.comment',
                    type: 'select',
                    scope: 'shop',
                    options: "blockIds",
                }
            ]
        }
    ]
}