module.exports = {
    id: "elina",
    title: "Elina",
    configs: [
        {
            title: 'HomePage',
            fields: [
                {
                    title: 'Telephone',
                    id: 'pepsiHeaderTelephone',
                    type: 'text',
                    placeholder: "",
                    comment: "This appears on the top left of the header"
                },
                {
                    title: 'Top Message',
                    id: 'pepsiHeaderTopMessage',
                    type: 'text',
                    placeholder: "",
                    comment: "This appears on the top center of the header"
                },
                {
                    title: 'Slider Id',
                    id: 'pepsiSliderId',
                    type: 'select',
                    options: "sliderIds",
                    placeholder: "Please Select"
                },
                {
                    title: 'Top Banner Id',
                    id: 'pepsiTopBannerId',
                    type: 'select',
                    options: "bannerIds",
                    placeholder: "Please Select",
                    comment: "This appears on the top right of the homepage"
                },
                {
                    title: 'Bottom Right Banner Id',
                    id: 'pepsiBottomRightBannerId',
                    type: 'select',
                    options: "bannerIds",
                    placeholder: "Please Select"
                },
                {
                    title: 'Bottom Left Banner Id',
                    id: 'pepsiBottomLeftBannerId',
                    type: 'select',
                    options: "bannerIds",
                    placeholder: "Please Select"
                },
                {
                    title: 'Top Product Slider Cat Id',
                    id: 'pepsiTopProductSliderCatId',
                    type: 'select',
                    options: "categoryIds",
                    placeholder: "Please Select",
                    comment: "This product slider appears on the homapage first"
                },
                {
                    title: 'Bottom Product Slider Cat Id',
                    id: 'pepsiBottomProductSliderCatId',
                    type: 'select',
                    options: "categoryIds",
                    placeholder: "Please Select",
                    comment: "This product slider appears on the homapage second"
                }
            ]
        }
    ]
}