const yatranslate = {
    /* Original language */
    lang: "ru",
    /* The language we translate into on the first visit */
    /* Язык, на который переводим при первом посещении */
    // langFirstVisit: 'eng',
};

document.addEventListener('DOMContentLoaded', function () {
    // Start
    yaTranslateInit();
})

function yaTranslateInit() {

    if (yatranslate.langFirstVisit && !localStorage.getItem('yt-widget')) {
        /* Если установлен язык перевода для первого посещения и в localStorage нет yt-widget */
        /* If the translation language is installed for the first visit and in localStorage no yt-widget */
        yaTranslateSetLang(yatranslate.langFirstVisit);
    }

    // Подключаем виджет yandex translate
    // Connecting the yandex translate widget
    let script = document.createElement('script');
    script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${yatranslate.lang}&widgetTheme=light&autoMode=false`;
    document.getElementsByTagName('head')[0].appendChild(script);

    // Получаем и записываем язык на который переводим
    // We get and write down the language into which we translate
    let code = yaTranslateGetCode();

    // Показываем текущий язык в меню
    // Show the current language in the menu
    yaTranslateHtmlHandler(code);

    // Вешаем событие клик на флаги
    // We hang the event click on the flags
    yaTranslateEventHandler('click', '[data-ya-lang]', function (el) {
        yaTranslateSetLang(el.getAttribute('data-ya-lang'));
        // Перезагружаем страницу
        // Reloading the page
        window.location.reload();
    })
}

function yaTranslateSetLang(lang) {
    // Записываем выбранный язык в localStorage объект yt-widget 
    // Writing the selected language to localStorage 
    localStorage.setItem('yt-widget', JSON.stringify({
        "lang": lang,
        "active": true
    }));
}

function yaTranslateGetCode() {
    // Возвращаем язык на который переводим
    // Returning the language to which we are translating
    return (localStorage["yt-widget"] != undefined && JSON.parse(localStorage["yt-widget"]).lang != undefined) ? JSON.parse(localStorage["yt-widget"]).lang : yatranslate.lang;
}

function yaTranslateHtmlHandler(code) {
    // Получаем язык на который переводим и производим необходимые манипуляции с DOM
    // We get the language to which we translate and produce the necessary manipulations with DOM 
    document.querySelector('[data-lang-active]').innerHTML = `<img class="lang__img lang__img_select" src="lang__${code}.png" alt="${code}">`;
    document.querySelector(`[data-ya-lang="${code}"]`).remove();
}

function yaTranslateEventHandler(event, selector, handler) {
    document.addEventListener(event, function (e) {
        let el = e.target.closest(selector);
        if (el) handler(el);
    });
}

const text1_options = [
    "Italy",
    "France",
    "Germany",
    "Egypt",
    "Spain",
    "the UK",
    "Turkey",
    "UAE"
];
const text2_options = [
    " Italy is a country for relaxation, where you can learn a lot of interesting things, delicious delicious cuisine, and have a good time. Italy is a country that is happy to meet a young couple for a romantic pastime, families with children and will help you find a lot of entertainment, and even here there will be boring for big youth companies. ",
    "France is one of the most attractive countries for tourists from all over the world. Many people are familiar with every landmark of Paris since childhood, so people strive to come to Paris to see the Louvre with their own eyes, climb the Eiffel Tower and explore the chambers of the Sun King Louis XIV in Versailles. The Cote d'Azur offers excellent opportunities for relaxation in fashionable hotels and on private beaches with restaurants on the shore. Gambling enthusiasts can try their luck in the numerous casinos of Nice and Cannes, and fans of fashion brands can visit the Parisian boutiques of Chanel, Jean Paul Gaultier and Yves Saint-Laurent. A separate attraction of France is restaurants of national cuisine and wineries, where you can taste world-famous wines. ",
    "Modern Germany is divided into 16 states, which, in turn, are conventionally united into 5 regions. The most notable for tourists in the north of the country is Lower Saxony and the city of Hamburg. Agriculture still thrives in this region, with many fields, farms and beautiful landscapes, including mountains. Hamburg was a major seaport in the Middle Ages, so many castles and fortresses have been preserved there since then. Today it is the second largest city in Germany and a cultural center - there are more than 40 theaters in this city alone. In the south is the most popular land among tourists - Bavaria, which is also called the beer land. It is in Munich that the famous Oktoberfest is held annually, attracting thousands of travelers, as well as Neuschwanstein Castle and the Alpine slopes. In addition to beer, Munich is notable for being the capital of German football, a center of architecture and cultural centers, and also just a very cheerful city (like almost the rest of southern Germany).",
    "The country of sphinxes and pharaohs cannot have a banal administrative-territorial division - this clerical phrase alone gives off a boring feeling. Everything is different here. We know from school that in ancient times Egypt was divided into Upper, Lower and Middle. The most interesting thing is that Upper is not the part of the country near the Mediterranean Sea, in the north. On the contrary - this is Lower Egypt. And the part that is called 'upper' is located 'below' in the very south, near the border with Sudan. As a result, Egypt can be divided into 6 large regions: the Sinai Peninsula, the Red Sea coast, the Western Desert and those same three historical regions with which we began: Lower, Middle and Upper. You can read more about these regions on the page Cities and resorts of Egypt.",
    "Spain is one of the most interesting countries in Europe. Spain attracts not only with its climate, but also with its diverse traditions and colorful landscapes. Here you can find valleys with lush greenery and huge ancient cathedrals and castles, beautiful villages and Moorish palaces of Andalusia and mosques of Cordoba, rocks black from lava. And lovers of beach holidays in Spain are waiting for sandy beaches. Arriving in Spain at any time of the year, you will definitely get to either the extravaganza in Seville or a music festival. Thrill-seekers will not miss the running of the bulls in Pamplona in Spain and will definitely visit the bullfights that are held in almost every city in Spain. Connoisseurs of beauty will be able to please themselves in Spain by visiting the museums of the great Spanish artists Salvador Dali and Pablo Picasso.",
    "Great Britain is one of the most beautiful countries in Europe, where a huge number of castles and fortresses have been preserved. Many of them are open to tourists interested in the history of the country. If you like mysticism, then it's time to try to unravel the mystery of the famous Stonehenge - a stone structure, the authorship of which is attributed to extraterrestrial civilizations. Great Britain is considered one of the most unstable European countries in terms of climate conditions. In the summer, there can be heavy rains, and winters are warm and snowless. Therefore, it is worth focusing not on the time of year, but on the events that interest you. The peak of cultural activity in the country occurs in the spring months - it is at this time of year that a record number of fairs and festivals are held here.",
    "Holidays in Turkey are inexpensive holidays with European quality of service. Amazing nature, golden sandy beaches, picturesque mountains covered with pine relict forests, bright sun and, of course, crystal clear, gentle and warm sea - all this makes the resorts of Turkey attractive to tourists. And there is much to marvel at in Turkey for a prepared person. Protected natural areas, unique landscapes of Cappadocia, hot springs of Pamukkale, Istanbul striking the imagination with its imperial grandeur, perfectly preserved ruins of ancient cities. It is not for nothing that Turkey is called the cradle of great civilizations. An inquisitive traveler will find here Roman amphitheaters, ancient Byzantine temples, Seljuk caravanserais and, of course, mosques from the Ottoman Empire.",
    "In just three or four decades, the UAE has transformed from a backward agrarian country into a golden oasis in the desert, where all conceivable and inconceivable mirages come to life. Oil production and export have brought in so much money that local sheikhs no longer know what to do with it. Sparkling skyscrapers, artificial islands, 'seven-star' hotels, supercars at every turn, endless shopping malls have long become commonplace for residents of Dubai, Abu Dhabi and Sharjah. But tourists are incredibly interested in seeing this oriental bazaar of vanity. People go to the UAE for a beach holiday, entertainment, shopping, and, of course, to join the luxurious life. Where else can you find such an amount of 'luxury' per square kilometer?",
];
const color_options = ["#f8ce50", "#c9a516", "#ffe57c", "#ffd26a", "#e1b13f", "#ebc352", "#ffca37"];
const image_options = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8bp53vwmKbYmOViH-jxZlcBaPE7yO_kXs5g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk7yjnOQsOCg7gNZy3ktIi5mOTx9qTlJ2VlQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYKoBzRGlwCGlHwaCBSggv5HkeIhymhq1Psg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPXMfWjX2ykwm43-JsaFHDEFuvWCKwpMJHhA&s",
    "https://eimg.pravda.com/images/doc/5/a/5ab0135----.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZsyxctTKgnCYYFAF6pqUeogoTzANyO9iO-y4vMIDCJpX4PwnbRpsm2fbOIVwfeh0U24&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ509lZNY6fT-Woq4-0ZOsIUnvI0YDkvmZddv614jHBXmQosU-wJ28_FKiw7zdnWMaREEY&usqp=CAU",
    "https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/71774e.jpg.webp?itok=tP_iwzmm"
];
var i = 0;
const currentOptionText1 = document.getElementById("current-option-text1");
const currentOptionText2 = document.getElementById("current-option-text2");
const currentOptionImage = document.getElementById("image");
const carousel = document.getElementById("carousel-wrapper");
const mainMenu = document.getElementById("menu");
const optionPrevious = document.getElementById("previous-option");
const optionNext = document.getElementById("next-option");

currentOptionText1.innerText = text1_options[i];
currentOptionText2.innerText = text2_options[i];
currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
mainMenu.style.background = color_options[i];

optionNext.onclick = function () {
    i = i + 1;
    i = i % text1_options.length;
    currentOptionText1.dataset.nextText = text1_options[i];

    currentOptionText2.dataset.nextText = text2_options[i];

    mainMenu.style.background = color_options[i];
    carousel.classList.add("anim-next");

    setTimeout(() => {
        currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
    }, 455);

    setTimeout(() => {
        currentOptionText1.innerText = text1_options[i];
        currentOptionText2.innerText = text2_options[i];
        carousel.classList.remove("anim-next");
    }, 650);
};

optionPrevious.onclick = function () {
    if (i === 0) {
        i = text1_options.length;
    }
    i = i - 1;
    currentOptionText1.dataset.previousText = text1_options[i];

    currentOptionText2.dataset.previousText = text2_options[i];

    mainMenu.style.background = color_options[i];
    carousel.classList.add("anim-previous");

    setTimeout(() => {
        currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")";
    }, 455);

    setTimeout(() => {
        currentOptionText1.innerText = text1_options[i];
        currentOptionText2.innerText = text2_options[i];
        carousel.classList.remove("anim-previous");
    }, 650);
};