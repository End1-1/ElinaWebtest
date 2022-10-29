export const getMapUrlFromEmbedHtml = (embedHtml = "") => {
    const searchIndex = String(embedHtml).search('https://maps.google.com/maps')
    const endIndex = String(embedHtml).search("output=embed")
    const url = String(embedHtml).substring(searchIndex, endIndex);
    return url
}