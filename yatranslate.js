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
    " Италия страна для отдыха, в которой можно узнать много интересного, попробовать изысканную кухню, приятно провести время.  Италия – страна, которая радо встретит, молодую пару для романтического времяпровождения, семей с детьми и поможет найти массу развлечений, и даже тут не будет скучно большим молодежным компаниям. ",
    "Франция — одна из самых притягательных стран для туристов всего мира. Каждая достопримечательность Парижа многим знакома с детства, поэтому люди стремятся приехать в Париж, чтобы своими глазами увидеть Лувр, подняться на Эйфелеву башню и осмотреть покои «короля-солнце» Людовика XIV в Версале. Лазурный берег предоставляет отличные возможности для отдыха в фешенебельных отелях и на частных пляжах с ресторанами на берегу. Любители азартных развлечений могут испытать удачу в многочисленных казино Ниццы и Канн, а поклонники фэшн-брендов — побывать в парижских бутиках Chanel, Jean Paul Gaultier и Yves Saint-Laurent. Отдельная достопримечательность Франции — рестораны национальной кухни и винодельни, где можно продегустировать известные во всем мире вина",
    "Современная Германия разделена на 16 земель, которые, в свою очередь, условно объединены в 5 регионов. Самое примечательное для туристов на севере страны — это Нижняя Саксония и город Гамбург. В этом регионе до сих пор процветает сельское хозяйство, много полей, фермерских хозяйств и красивых ландшафтов, в том числе, горных. Гамбург в средневековую эпоху был крупным морским портом, так что с тех пор там сохранилось множество замков и крепостей. Сегодня это — второй по величине город в Германии и культурный центр — одних только театров в этом городе более 40. На юге находится самая популярная среди туристов земля — Бавария, которую еще называют «пивной землей». Именно в Мюнхене ежегодно проводится знаменитый фестиваль Октоберфест, привлекающий тысячи путешественников, а еще замок Нойшванштайн и альпийские склоны. Помимо пива, Мюнхен примечателен тем, что это столица немецкого футбола, средоточие архитектуры и культурных центров, а также просто очень веселый город (как практически весь остальной юг Германии).",
    "Страна сфинксов и фараонов не может иметь банального административно-территориального деления — от одного этого канцелярского словосочетания уже веет чем-то скучным. Здесь все по-другому. Еще со школьной скамьи мы знаем, что в давние времена Египет делился на Верхний, Нижний и Средний. Самое интересное, что Верхний — это вовсе не часть страны у Средиземного моря, на севере. Наоборот — это Египет Нижний. А та часть, что называется «верхней», расположена «внизу» на самом юге, у границы с Суданом. В итоге Египет можно разделить на 6 больших областей: Синайский полуостров, побережье Красного моря, Западную пустыню и те самые три исторических области, с которых мы начали: Нижний, Средний и Верхний. Подробнее об этих областях можно прочитать на странице города и курорты Египта.",
    "Испания является одной из интереснейших стран Европы. Испания привлекает не только климатом, но и разнообразием традиций, красочностью пейзажей. Здесь можно найти долины с пышной зеленью и огромные старинные соборы и замки, красивые деревушки и мавританский дворцы Андалусии и мечети Кордовы, черные от лавы скалы. А любителей пляжного отдыха в Испании ждут песчаные пляжи.Приехав в Испанию в любое время года, вы обязательно попадете или на феерию в Севилье, или на музыкальный фестиваль.Любители острых ощущений не пропустят в Испании бег быков в Памплоне и обязательно посетят бои быков, которые проводятся практически в каждом городе Испании.Ценители прекрасного смогут в Испании порадовать себя посещением музеев великих испанских художников Сальвадора Дали и Пабло Пикассо.",
    "Великобритания – одна из самых красивых стран Европы, где сохранилось огромное количество замков и крепостей. Многие из них открыты для туристов, интересующихся историей страны. Если вы любите мистику, то самое время попытаться разгадать тайну знаменитого Стоунхенджа - каменного сооружения, авторство которого приписывают внеземным цивилизациям.Великобритания считается одной из самых нестабильных европейских стран в плане климатических условий. Летом здесь могут идти проливные дожди, а зимы бывают теплыми и бесснежными. Поэтому стоит ориентироваться не на время года, а на события, которые вас интересуют. Пик культурной активности в стране приходится на весенние месяцы – именно в это время года здесь проводится рекордное количество ярмарок и фестивалей.",
    "Отдых в Турции - это недорогой отдых при европейском качестве обслуживания. Изумительная природа, золотые песчаные пляжи, живописные горы, покрытые сосновыми реликтовыми лесами, яркое солнце и, конечно, кристально-чистое, ласковое и теплое море — все это делает курорты Турции привлекательными для туристов.А подивиться в Турции подготовленному человеку есть чему. Заповедные природные зоны, уникальные пейзажи Каппадокии, горячие источники Памуккале, поражающий воображение имперским величием Стамбул, великолепно сохранившиеся руины античных городов. Турцию не зря называют колыбелью великих цивилизаций. Любознательный путешественник найдет здесь римские амфитеатры, древние византийские храмы, сельджукские караван-сараи и, конечно, мечети времен Османской империи.",
    "Всего за каких-то три-четыре десятилетия ОАЭ из отсталой аграрной страны превратились в золотой оазис пустыни, где оживают все мыслимые и немыслимые миражи. Добыча и экспорт нефти принесли столько денег, что местные шейхи уже и не знают, куда их девать. Сверкающие небоскребы, искусственные острова, «семизвездочные» отели, суперкары на каждом шагу, бесконечные торговые центры уже давно стали обыденностью для жителей Дубая, Абу-Даби и Шарджи. А вот туристам безумно интересно посмотреть на этот восточный базар тщеславия.В ОАЭ едут за пляжным отдыхом, развлечениями, шопингом, ну и, разумеется, чтобы приобщиться к роскошной жизни. Где еще встретишь такое количество «лакшери» на квадратный километр?",
    ""
];
const color_options = ["#f8ce50"];
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
