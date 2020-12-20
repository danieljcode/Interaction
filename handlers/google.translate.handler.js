//THIS PROJECT IS NOT AFFILIATED WITH OR SPONSORED BY GOOGLE / GOOGLE TRANSLATE IN ANY WAY
//I needed a translation API system and "googletrans" on npm was the first reliable one I could find...

const tr = require("googletrans").default;




//This function takes in the text to be translated, the language to be translated to and a callback function
async function TranslateHandler(text, translateTo, callback) {
    var fromLang;

    try {
        tr(text).then(function (result) {
            fromLang = result.src;
        })

        const result = await tr(text, {
            from: fromLang,
            to: translateTo
        });

        callback(result);

    } catch (error) {
        callback(error);
    }
}

module.exports = TranslateHandler;