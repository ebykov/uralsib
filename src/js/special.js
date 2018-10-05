import '../css/special.styl';

import BaseSpecial from './base';
import Data from './data';
import Svg from './svg';
import { makeElement, removeChildren } from './lib/dom';
import * as Share from './lib/share';
import { animate } from './lib/animate';
import makeSwipeable from './lib/swipe';
// import * as Analytics from './lib/analytics';
// import { shuffle } from './lib/array';

const CSS = {
  main: 'uralsib',
};

const EL = {};

class Special extends BaseSpecial {
  constructor(params = {}) {
    super();

    Object.assign(this.params, params);
    this.saveParams();

    if (Data && params.data) {
      Object.assign(Data, params.data);
    }

    if (this.params.css) {
      this.loadStyles(this.params.css).then(() => this.init());
    } else {
      this.init();
    }
  }

  createElements() {
    EL.bgMovie = makeElement('img', `${CSS.main}__bg-movie`, {
      src: Data.bg.movie,
      srcset: `${Data.bg.movie2x} 2x`,
    });
    EL.bgBusiness = makeElement('img', `${CSS.main}__bg-business`, {
      src: Data.bg.business,
      srcset: `${Data.bg.business2x} 2x`,
    });

    EL.logo = makeElement('div', `${CSS.main}__logo`, {
      innerHTML: Svg.logo,
    });

    EL.enter = makeElement('div', `${CSS.main}-enter`);
    EL.eTitle = makeElement('div', `${CSS.main}-enter__title`, {
      innerHTML: Data.title,
    });
    EL.eDesc = makeElement('div', `${CSS.main}-enter__description`, {
      innerHTML: Data.description,
    });
    EL.eStartBtn = makeElement('button', `${CSS.main}-enter__start-btn`, {
      textContent: 'Начать',
      data: {
        click: 'start',
      },
    });

    EL.enter.appendChild(EL.bgMovie);
    EL.enter.appendChild(EL.bgBusiness);
    EL.enter.appendChild(EL.eTitle);
    EL.enter.appendChild(EL.eDesc);
    EL.enter.appendChild(EL.eStartBtn);

    EL.q = makeElement('div', `${CSS.main}-q`);
    EL.qPages = makeElement('div', `${CSS.main}-q__pages`);
    EL.qOptionL = makeElement('div', [`${CSS.main}-q__option`, `${CSS.main}-q__option--left`], {
      innerHTML: `<div class="${CSS.main}-q__option-icon">${Svg.movie}</div><div class="${CSS.main}-q__option-caption">Фильм</div>`,
    });
    EL.qOptionR = makeElement('div', [`${CSS.main}-q__option`, `${CSS.main}-q__option--right`], {
      innerHTML: `<div class="${CSS.main}-q__option-icon">${Svg.case}</div><div class="${CSS.main}-q__option-caption">Бизнес</div>`,
    });
    EL.qCards = makeElement('div', `${CSS.main}-q__cards`);
    EL.qCard = makeElement('div', `${CSS.main}-q__card`);
    EL.card = makeElement('div', `${CSS.main}-card`);
    EL.cHead = makeElement('div', `${CSS.main}-card__head`);
    EL.cBottom = makeElement('div', `${CSS.main}-card__bottom`);
    EL.cImg = makeElement('img', `${CSS.main}-card__img`);
    EL.cText = makeElement('div', `${CSS.main}-card__text`);
    EL.cAnswer = makeElement('div', [`${CSS.main}-card__answer`, `${CSS.main}-card-answer`]);
    EL.cAnswerInfo = makeElement('div', `${CSS.main}-card-answer__info`);
    EL.cAnswerInfoImg = makeElement('img', `${CSS.main}-card-answer__info-img`);
    EL.cAnswerInfoBio = makeElement('div', `${CSS.main}-card-answer__info-bio`);
    EL.cAnswerTitle = makeElement('div', `${CSS.main}-card-answer__title`);
    EL.cAnswerText = makeElement('div', `${CSS.main}-card-answer__text`);
    EL.cAnswerNextBtn = makeElement('button', `${CSS.main}-card-answer__next-btn`, {
      innerHTML: `<span>Продолжить</span>${Svg.arrow}`,
      data: {
        click: 'continue',
      },
    });

    EL.qOptionL.addEventListener('click', () => { this.answer('left'); });
    EL.qOptionR.addEventListener('click', () => { this.answer('right'); });

    EL.cHead.appendChild(EL.cImg);

    EL.cAnswerInfo.appendChild(EL.cAnswerInfoImg);
    EL.cAnswerInfo.appendChild(EL.cAnswerInfoBio);

    EL.cAnswer.appendChild(EL.cAnswerInfo);
    EL.cAnswer.appendChild(EL.cAnswerTitle);
    EL.cAnswer.appendChild(EL.cAnswerText);
    EL.cAnswer.appendChild(EL.cAnswerNextBtn);

    EL.card.appendChild(EL.cHead);
    EL.card.appendChild(EL.cBottom);

    EL.qCard.appendChild(EL.card);

    EL.q.appendChild(EL.qPages);
    EL.q.appendChild(EL.qOptionL);
    EL.q.appendChild(EL.qOptionR);
    EL.q.appendChild(EL.qCards);
    EL.q.appendChild(EL.qCard);

    makeSwipeable(EL.card, (t) => {
      this.answer(t);
    });

    EL.result = makeElement('div', `${CSS.main}-result`);
    EL.rText = makeElement('div', `${CSS.main}-result__text`);
    EL.rBtn = makeElement('button', `${CSS.main}-result__btn`, {
      textContent: 'Есть своя идея',
      data: {
        click: 'showOffer',
      },
    });
    EL.rTitle = makeElement('div', `${CSS.main}-result__title`);
    EL.rSubtitle = makeElement('div', `${CSS.main}-result__subtitle`);
    EL.rShare = makeElement('div', `${CSS.main}-result__share`);
    EL.rImg = makeElement('img', `${CSS.main}-result__img`);

    EL.result.appendChild(EL.rText);
    EL.result.appendChild(EL.rBtn);
    EL.result.appendChild(EL.rTitle);
    EL.result.appendChild(EL.rSubtitle);
    EL.result.appendChild(EL.rShare);
    EL.result.appendChild(EL.rImg);

    EL.offer = makeElement('div', `${CSS.main}-offer`);
    EL.oIcon = makeElement('div', `${CSS.main}-offer__icon`, {
      innerHTML: Svg.hat,
    });
    EL.oText = makeElement('div', `${CSS.main}-offer__text`, {
      innerHTML: 'Каждая бизнес-идея требует тщательного планирования. Банк «Уралсиб» <a href="https://www.youtube.com/watch?v=8eMP8kr4xYc" target="_blank">пригласил</a> эксперта рассказать, с чего начать своё дело и как детально оценить возможности.',
    });
    EL.oBlock = makeElement('div', `${CSS.main}-offer__block`);
    EL.oBlockIcon = makeElement('div', `${CSS.main}-offer__block-icon`, {
      innerHTML: Svg.payment,
    });
    EL.oBlockText = makeElement('div', `${CSS.main}-offer__block-text`, {
      innerHTML: 'Начинающим предпринимателям «Уралсиб» предлагает отдельные тарифы: банк бесплатно откроет вам счёт и первые три месяца будет бесплатно его обслуживать.',
    });
    EL.oBlockBtn = makeElement('a', `${CSS.main}-offer__block-btn`, {
      href: 'https://old.uralsib.ru/smallbusiness/start.wbp',
      target: '_blank',
      textContent: 'Подробности',
    });
    EL.oBackBtn = makeElement('div', `${CSS.main}-offer__back-btn`, {
      innerHTML: `${Svg.arrow}<span>Вернуться назад</span>`,
      data: {
        click: 'backToResult',
      },
    });
    EL.oImg = makeElement('img', `${CSS.main}-offer__img`, {
      src: 'https://leonardo.osnova.io/0c3fb28c-a09f-0c60-0f90-b7ce8bfb3618/',
      srcset: 'https://leonardo.osnova.io/3872df09-cbb2-95a2-3c7e-002b01cc0822/ 2x',
    });

    EL.oBlock.appendChild(EL.oBlockIcon);
    EL.oBlock.appendChild(EL.oBlockText);
    EL.oBlock.appendChild(EL.oBlockBtn);

    EL.offer.appendChild(EL.oIcon);
    EL.offer.appendChild(EL.oText);
    EL.offer.appendChild(EL.oBlock);
    EL.offer.appendChild(EL.oBackBtn);
    EL.offer.appendChild(EL.oImg);
  }

  showCount() {
    const index = this.activeIndex + 1;
    if (index === Data.questions.length) {
      EL.qCards.innerHTML = '';
    } else if (index > Data.questions.length / 2) {
      EL.qCards.innerHTML = '<div></div>';
    } else if (index > Data.questions.length / 4) {
      EL.qCards.innerHTML = '<div></div><div></div>';
    } else {
      EL.qCards.innerHTML = '<div></div><div></div><div></div>';
    }
  }

  static getResult(score) {
    let result = '';
    Data.results.some((item) => {
      if (item.range[0] <= score && item.range[1] >= score) {
        result = item;
        return true;
      }
      return false;
    });

    return result;
  }

  start() {
    this.container.removeChild(EL.enter);
    this.container.appendChild(EL.q);

    this.makeNextQuestion();
  }

  // restart() {
  //   EL.cAnswerNextBtn.innerHTML = `<span>Продолжить</span>${Svg.arrow}`;
  //   EL.cAnswerNextBtn.dataset.click = 'continue';
  // }

  continue() {
    this.activeIndex += 1;

    const animationClassName = this.lastAnsweredType === 'left' ? 'fadeOutLeft' : 'fadeOutRight';

    animate(EL.card, animationClassName).then(() => {
      EL.qCard.removeChild(EL.card);

      this.makeNextQuestion();
    });
  }

  makeNextQuestion() {
    const question = Data.questions[this.activeIndex];

    this.isAnswered = false;

    EL.q.classList.remove('is-correct');
    EL.q.classList.remove('is-incorrect');

    EL.qOptionL.classList.remove('is-hide');
    EL.qOptionR.classList.remove('is-hide');

    EL.cImg.src = question.img;
    EL.cImg.srcset = `${question.img2x} 2x`;
    EL.cText.innerHTML = question.text;

    removeChildren(EL.cBottom);
    EL.cBottom.appendChild(EL.cText);

    EL.qPages.innerHTML = `${this.activeIndex + 1}/${Data.questions.length}`;

    this.showCount();

    EL.qCard.appendChild(EL.card);
    animate(EL.card, 'fadeInDown');
  }

  answer(t) {
    if (this.isAnswered) { return; }
    this.isAnswered = true;

    const question = Data.questions[this.activeIndex];
    const type = t;

    this.lastAnsweredType = type;

    if (type === 'left') {
      EL.qOptionR.classList.add('is-hide');
    } else {
      EL.qOptionL.classList.add('is-hide');
    }

    if (question.correct === type) {
      this.correctAnswers += 1;
      EL.q.classList.add('is-correct');
      EL.cAnswerTitle.innerHTML = type === 'left' ? 'Да, это фильм' : 'Да, это дало старт бизнесу ';
      EL.cAnswerText.innerHTML = question.correctMsg;
    } else {
      EL.q.classList.add('is-incorrect');
      EL.cAnswerTitle.innerHTML = type === 'left' ? 'Нет, это дало старт бизнесу' : 'Нет, это фильм';
      EL.cAnswerText.innerHTML = question.incorrectMsg;
    }

    if (this.activeIndex === Data.questions.length - 1) {
      EL.cAnswerNextBtn.innerHTML = `<span>Результат</span>${Svg.arrow}`;
      EL.cAnswerNextBtn.dataset.click = 'result';
    }

    EL.cAnswerInfoImg.src = question.info.avatar;
    EL.cAnswerInfoBio.innerHTML = question.info.bio;

    removeChildren(EL.cBottom);
    animate(EL.cBottom, 'fadeIn', '200ms').then(() => {
      EL.cBottom.appendChild(EL.cAnswer);
      animate(EL.cAnswer, 'fadeIn', '200ms');
    });
  }

  result() {
    const result = Special.getResult(this.correctAnswers);

    this.container.removeChild(EL.q);
    this.container.appendChild(EL.result);

    EL.rText.innerHTML = `Идеи для бизнеса повсюду, но распознать их не всегда легко. <b>У вас это получилось в ${this.correctAnswers} из ${Data.questions.length} ситуаций</b>.`;
    EL.rTitle.innerHTML = result.title;
    EL.rSubtitle.innerHTML = result.subtitle;
    EL.rImg.src = result.img;
    EL.rImg.srcset = `${result.img2x} 2x`;

    removeChildren(EL.rShare);
    Share.make(EL.rShare, {
      url: this.params.share.url + this.correctAnswers,
      title: this.params.share.title,
      twitter: this.params.share.title,
    });
  }

  showOffer() {
    this.container.removeChild(EL.result);
    this.container.appendChild(EL.offer);
  }

  backToResult() {
    this.container.removeChild(EL.offer);
    this.container.appendChild(EL.result);
  }

  setInitialParams() {
    this.activeIndex = 0;
    this.correctAnswers = 0;
  }

  init() {
    this.setInitialParams();
    this.createElements();
    removeChildren(this.container);
    this.container.appendChild(EL.logo);
    this.container.appendChild(EL.enter);


    // this.container.style.display = 'block';
    // this.setInitialParamas();
    //
    // this.createElements();
    //
    // this.storeImages(Data.questions);
    //
    // this.params.isFeed ? this.container.classList.add('is-feed') : '';
    //
    // if (this.params.startBtn) {
    //   this.params.startBtn.addEventListener('click', () => {
    //     this.start();
    //   }, { once: true });
    // }
  }
}

export default Special;
