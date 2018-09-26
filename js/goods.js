'use strict';

var _goodsCount = 26;
var _productNames = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Почток в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var _productContents = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба', 'идентичный натуральному', 'ароматизатор картофеля', 'лионная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия, ксилит', 'карбаид', 'вилларибо', 'виллабаджо'];
var _cardPicturePath = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-cucumber', 'ice-garlic', 'ice-italian', 'ice-mushroom', 'ice-pig', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour', 'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];
var _amount = {min: 0, max: 20};
var _price = {min: 100, max: 1500};
var _weight = {min: 30, max: 300};
var _energy = {min: 70, max: 500};
var _rating = {
  value: {min: 1, max: 5},
  number: {min: 10, max: 900}
};

function getRandomBoolean() {
  return Math.random() >= 0.5;
}

function getRandomInt(object) {
  return Math.floor(Math.random() * (object.max - object.min + 1)) + object.min;
}

function getRandomArrrayItems(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// function getRandomArrayJoin(array) {
//   var k = Math.floor(Math.random() * array.length);
//   var s = array[k];
//   for (var i = 1; i < k; i++){
//     var randomIndex = Math.floor(Math.random() * array.length)
//     s = s + ',' + array[i];
//   };
//   return s;
// }

// function getRandomArrrayJoin(array) {
//   var result = array.filter(function filter() {
//     return getRandomBoolean();
//   });
//   return result.join(', ');
// }

function getRandomArrrayJoin(array) {
  var result = array.reduce(function reduce(prev, current) {
    return getRandomBoolean() ? prev + ' ,' + current : prev;
  });
  return result;
}

var cardsData = _productNames.slice(0, _goodsCount).map(function () {
  return {
    name: getRandomArrrayItems(_productNames),
    picture: 'img/cards/' + getRandomArrrayItems(_cardPicturePath) + '.jpg',
    amount: getRandomInt(_amount),
    price: getRandomInt(_price),
    weight: getRandomInt(_weight),
    rating: {value: getRandomInt(_rating.value), number: getRandomInt(_rating.number)},
    nutritionFacts: {sugar: getRandomBoolean(), energy: getRandomInt(_energy), contents: getRandomArrrayJoin(_productContents)},
  };
});

document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
document.querySelector('.catalog__load').classList.add('visually-hidden');

function getCardClass(k) {
  if (k > 5) {
    return 'card--in-stock';
  }
  if (k >= 1 && k <= 5) {
    return 'card--little';
  }
  return 'card--soon';
}

var getCardRating = function (cr) {
  switch (cr) {
    case 1: {
      return 'stars__rating--one';
    }
    case 2: {
      return 'stars__rating--two';
    }
    case 3: {
      return 'stars__rating--three';
    }
    case 4: {
      return 'stars__rating--four';
    }
    case 5: {
      return 'stars__rating--five';
    }
    default: {
      return '';
    }
  }
};

var isSugarText = function (sugar) {
  return sugar ? 'Содержит сахар.' : 'Без сахара.';
};

var getElementCopy = function (template, element) {
  return document.importNode(document.querySelector(template).content.querySelector(element), true);
};

var cardsList = document.createDocumentFragment();
var setCards = function (data) {
  var card = getElementCopy('#card', '.catalog__card');

  card.classList.add(getCardClass(data.amount));
  card.querySelector('.card__title').textContent = data.name;

  var rating = card.querySelector('.stars__rating');
  rating.classList.remove('stars__rating--five');
  rating.classList.add(getCardRating(data.rating.value));

  var picture = card.querySelector('.card__img');
  picture.src = data.picture;
  picture.alt = data.name;

  var price = card.querySelector('.card__price');
  price.childNodes[0].textContent = data.price + ' ';
  price.childNodes[2].textContent = '/ ' + data.weight + 'Г';

  card.querySelector('.star__count').textContent = data.rating.number;

  card.querySelector('.card__characteristic').textContent = isSugarText(data.nutritionFacts.sugar);

  card.querySelector('.card__composition-list').textContent = data.nutritionFacts.contents;

  cardsList.appendChild(card);
};

cardsData.forEach(setCards);

document.querySelector('.catalog__cards').appendChild(cardsList);

var cardsOrder = document.createDocumentFragment();
var setOrders = function (data) {
  var order = getElementCopy('#card-order', '.card-order');

  order.querySelector('.card-order__title').textContent = data.name;

  var picture = order.querySelector('.card-order__img');
  picture.src = data.picture;
  picture.alt = data.name;

  var price = order.querySelector('.card-order__price');
  price.textContent = data.price + 'Р';

  cardsOrder.appendChild(order);
};

(cardsData).slice(0, 3).forEach(setOrders);

var cardsIsOrder = document.querySelector('.goods__cards');
cardsIsOrder.appendChild(cardsOrder);
cardsIsOrder.classList.remove('goods__cards--empty');

var cardsIsEmptyOrder = document.querySelector('.goods__card-empty');
cardsIsEmptyOrder.classList.add('visually-hidden');
