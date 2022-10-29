
module.exports = {
    id: "vmall-com",
    title: "Vmall Com",
    extends: 'default',
    configs: [
        {
            title: 'Homepage',
            fields: [
                {
                    title: 'Homepage Top Block Id',
                    id: 'vmallHomeTopBlock',
                    type: 'select',
                    options: "blockIds",
                    placeholder: "Please Select",
                    comment: "This product slider appears on the homapage second"
                }
            ]
        }
    ]
}