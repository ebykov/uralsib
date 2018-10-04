import '../css/special.styl';

import BaseSpecial from './base';
import Data from './data';
import Svg from './svg';
import * as Share from './lib/share';
import * as Analytics from './lib/analytics';
import { makeElement, removeChildren } from './lib/dom';
import { shuffle } from './lib/array';
import { animate } from './lib/animate';

const CSS = {
  main: 'MegafonPixel',
};

const EL = {};
const IMAGES = {};

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
    EL.q = makeElement('div', `${CSS.main}-q`);
    EL.qHeader = makeElement('div', `${CSS.main}-q__header`);
    EL.qTitle = makeElement('div', `${CSS.main}-q__title`, {
      innerHTML: 'Угадайте, что изображено на&nbsp;картинке',
    });
    EL.qPages = makeElement('div', `${CSS.main}-q__pages`, {
      innerHTML: Svg.img,
    });
    EL.qPagesText = makeElement('span');
    EL.qFigureWrap = makeElement('div', `${CSS.main}-q__figure-wrap`);
    EL.qFigure = makeElement('div', `${CSS.main}-q__figure`);
    EL.qFigureBound = makeElement('div', `${CSS.main}-bound`, {
      innerHTML: '<span></span><span></span><span></span><span></span>',
    });
    EL.qFigureImg = makeElement('img', `${CSS.main}-q__figure-img`);
    EL.qFigureHint = makeElement('div', `${CSS.main}-q__figure-hint`, {
      textContent: 'Попробуйте еще раз',
    });
    EL.qOptions = makeElement('div', `${CSS.main}-q__options`);

    EL.qAnswer = makeElement('div', `${CSS.main}-q__answer`);
    EL.qAnswerTitle = makeElement('div', `${CSS.main}-q__answer-title`);
    EL.qAnswerText = makeElement('div', `${CSS.main}-q__answer-text`);
    EL.qBtn = makeElement('div', `${CSS.main}-q__next-btn`);
    EL.qNextBtn = makeElement('button', `${CSS.main}-btn`, {
      innerHTML: `<span class="${CSS.main}-btn__icon">${Svg.arrow}</span>`,
      data: {
        caption: 'Продолжить',
        click: 'continue',
      },
    });
    EL.qResultBtn = makeElement('button', `${CSS.main}-btn`, {
      innerHTML: `<span class="${CSS.main}-btn__icon">${Svg.arrow}</span>`,
      data: {
        caption: 'Результат',
        click: 'showResult',
      },
    });

    EL.result = makeElement('div', `${CSS.main}-result`);
    EL.rBody = makeElement('div', `${CSS.main}-result__body`);
    EL.rFigure = makeElement('div', `${CSS.main}-result__figure`);
    EL.rBound = makeElement('div', `${CSS.main}-bound`, {
      innerHTML: '<span></span><span></span><span></span><span></span>',
    });
    EL.rFigureInner = makeElement('div', `${CSS.main}-result__figure-inner`);
    EL.rHeadline = makeElement('div', `${CSS.main}-result__headline`);
    EL.rTitle = makeElement('div', `${CSS.main}-result__title`);
    EL.rImg = makeElement('img', `${CSS.main}-result__img`);
    EL.rFigureBottom = makeElement('div', `${CSS.main}-result__figure-bottom`);
    EL.rShare = makeElement('div', `${CSS.main}-result__share`);
    EL.rRestartBtn = makeElement('div', `${CSS.main}-result__restart-btn`, {
      innerHTML: `<span>Пройти ещё раз</span>${Svg.refresh}`,
      data: {
        click: 'restart',
      },
    });
    EL.rBottom = makeElement('div', `${CSS.main}-result__bottom`);
    EL.rText = makeElement('div', `${CSS.main}-result__text`, {
      innerHTML: '<p>С <a href="https://www.megafon.ru/internet/4g/?utm_source=vc&utm_campaign=fed_flight_www-b2c_vc-special-project-sep-oct-2018_rf&utm_medium=ag-media_media_all___cpc&utm_content=&utm_term=" target="_blank">самым быстрым мобильным интернетом</a> от «МегаФона» не придётся угадывать, что изображено на картинке — всё загрузится моментально.</p>',
    });
    EL.rBtn = makeElement('div', `${CSS.main}-result__btn`, {
      innerHTML: '<a href="https://megafon.ru/tariffs/vklyuchaysya/?utm_source=vc&utm_campaign=fed_flight_www-b2c_vc-special-project-sep-oct-2018_rf&utm_medium=ag-media_media_all___cpc&utm_content=&utm_term=" target="_blank" class="MegafonPixel-btn" data-caption="Подключить"></a>',
    });

    EL.rFigureBottom.appendChild(EL.rShare);
    EL.rFigureBottom.appendChild(EL.rRestartBtn);
    EL.rFigureInner.appendChild(EL.rHeadline);
    EL.rFigureInner.appendChild(EL.rTitle);
    EL.rFigureInner.appendChild(EL.rImg);
    EL.rFigureInner.appendChild(EL.rFigureBottom);
    EL.rFigure.appendChild(EL.rBound);
    EL.rFigure.appendChild(EL.rFigureInner);
    EL.rBody.appendChild(EL.rFigure);
    EL.rBottom.appendChild(EL.rText);
    EL.rBottom.appendChild(EL.rBtn);
    EL.result.appendChild(EL.rBody);
    EL.result.appendChild(EL.rBottom);


    EL.qPages.appendChild(EL.qPagesText);

    EL.qHeader.appendChild(EL.qTitle);
    EL.qHeader.appendChild(EL.qPages);

    EL.qFigure.appendChild(EL.qFigureBound);
    EL.qFigure.appendChild(EL.qFigureImg);

    EL.qFigureWrap.appendChild(EL.qFigure);

    EL.qBtn.appendChild(EL.qNextBtn);

    EL.qAnswer.appendChild(EL.qAnswerTitle);
    EL.qAnswer.appendChild(EL.qAnswerText);
    EL.qAnswer.appendChild(EL.qBtn);

    EL.q.appendChild(EL.qHeader);
    EL.q.appendChild(EL.qFigureWrap);
    EL.q.appendChild(EL.qOptions);
  }

  getResult(score) {
    let result = '';
    Data.results.some((item) => {
      if (item.range[0] <= score && item.range[1] >= score) {
        result = item;
        return true;
      }
    });

    return result;
  }

  storeImages(data) {
    let img;

    data.forEach((item, i) => {
      IMAGES[i] = [];

      item.images.forEach((it, j) => {
        img = document.createElement('img');
        img.src = it.img;
        img.srcset = `${it.img2x} 2x`;
        IMAGES[i][j] = { img };
      });
    });
  }

  setImage(obj) {
    EL.qFigureImg.src = obj.img;
    EL.qFigureImg.srcset = `${obj.img2x} 2x`;
  }

  setPages() {
    EL.qPagesText.textContent = `${this.activeIndex + 1}/${Data.questions.length}`;
  }

  makeOptions(options) {
    removeChildren(EL.qOptions);

    options = options.map((item, i) => { item.id = i; return item; });
    shuffle(options);
    options.forEach((item) => {
      const optionWrap = makeElement('div', `${CSS.main}-q__options-item`);
      const option = makeElement('button', `${CSS.main}-btn`, {
        data: {
          id: item.id,
          caption: item.text,
          click: 'checkAnswer',
        },
      });
      optionWrap.appendChild(option);

      EL.qOptions.appendChild(optionWrap);
    });
  }

  makeNextQuestion() {
    const question = Data.questions[this.activeIndex];

    // EL.qTitle.textContent = question.title;

    this.setImage(question.images[0]);

    this.makeOptions(question.options);

    this.setPages();
  }

  checkAnswer(el, e) {
    if (this.answered || el.dataset.answered) { return; }

    const id = el.dataset.id;


    const question = Data.questions[this.activeIndex];

    this.currentAttempts++;

    if (question.options[id].isCorrect) {
      el.classList.add('is-correct');
      this.answered = true;

      if (this.currentAttempts === 1) {
        this.correctAnswers++;

        setTimeout(() => {
          this.answered = false;
          this.showAnswer(true);
        }, 500);
      } else {
        setTimeout(() => {
          this.answered = false;
          this.showAnswer(undefined);
        }, 500);
      }

      Analytics.sendEvent('Answer - Correct Attempt');
    } else {
      el.dataset.answered = true;
      el.classList.add('is-wrong');

      this.setImage(question.images[this.currentAttempts]);

      if (this.currentAttempts > 2) {
        this.showAnswer(false);
      } else if (this.wrongAnswers < 3 && this.activeIndex !== 2) {
        this.wrongAnswers++;
        EL.qFigureHint.style = '';
        EL.qFigure.contains(EL.qFigureHint) ? '' : EL.qFigure.appendChild(EL.qFigureHint);

        animate(EL.qFigureHint, 'fadeInDown', '600ms').then(() => {
          animate(EL.qFigureHint, 'fadeOutDown', '600ms', '200ms').then(() => {
            EL.qFigure.contains(EL.qFigureHint) ? EL.qFigure.removeChild(EL.qFigureHint) : '';
          });
        });
      }

      Analytics.sendEvent('Answer - Wrong Attempt');
    }
  }

  showAnswer(isCorrect) {
    const question = Data.questions[this.activeIndex];

    this.setImage(question.images[3]);

    EL.q.removeChild(EL.qOptions);
    EL.q.appendChild(EL.qAnswer);

    EL.qAnswerTitle.textContent = isCorrect === undefined ? 'С первого раза не угадали.' : isCorrect ? 'Правильно!' : 'Неправильно.';
    isCorrect ? EL.qAnswerTitle.classList.add(`${CSS.main}-q__answer-title--correct`) : EL.qAnswerTitle.classList.remove(`${CSS.main}-q__answer-title--correct`);
    EL.qAnswerText.innerHTML = question.msg;

    if (this.activeIndex >= Data.questions.length - 1) {
      EL.qBtn.removeChild(EL.qNextBtn);
      EL.qBtn.appendChild(EL.qResultBtn);
    }
  }

  continue() {
    this.currentAttempts = 0;
    this.activeIndex++;

    EL.q.removeChild(EL.qAnswer);
    EL.q.appendChild(EL.qOptions);

    this.makeNextQuestion();

    Analytics.sendEvent('Next');
  }

  showResult() {
    const result = this.getResult(this.correctAnswers);

    removeChildren(this.container);
    this.container.appendChild(EL.result);

    EL.rHeadline.innerHTML = `${this.correctAnswers} из ${Data.questions.length} изображений с&nbsp;первого раза`;
    EL.rTitle.innerHTML = result.text;
    EL.rImg.classList = '';
    EL.rImg.classList.add(`${CSS.main}-result__img`);
    EL.rImg.classList.add(`${CSS.main}-result__img--${result.index}`);
    EL.rImg.src = result.img;
    EL.rImg.srcset = `${result.img2x} 2x`;

    removeChildren(EL.rShare);
    Share.make(EL.rShare, {
      url: this.params.share.url + this.correctAnswers,
      title: this.params.share.title,
      twitter: this.params.share.title,
    });

    Analytics.sendEvent(`Result — ${this.correctAnswers}`, 'Hit');
  }

  restart() {
    this.setInitialParamas();

    removeChildren(this.container);
    this.container.appendChild(EL.q);

    EL.q.removeChild(EL.qAnswer);
    EL.q.appendChild(EL.qOptions);

    EL.qBtn.removeChild(EL.qResultBtn);
    EL.qBtn.appendChild(EL.qNextBtn);

    this.makeNextQuestion();

    Analytics.sendEvent('Restart');
  }

  start() {
    removeChildren(this.container);
    this.container.appendChild(EL.q);

    this.container.classList.add(`${CSS.main}--q`);

    animate(EL.qHeader, 'fadeInDown', '200ms', '200ms');
    animate(EL.qFigure, 'fadeInDown', '400ms');
    animate(EL.qOptions, 'fadeInUp', '400ms');

    this.makeNextQuestion();

    Analytics.sendEvent('Start');
  }

  setInitialParamas() {
    this.activeIndex = 0;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.currentAttempts = 0;
  }

  init() {
    this.container.style.display = 'block';
    this.setInitialParamas();

    this.createElements();

    this.storeImages(Data.questions);

    this.params.isFeed ? this.container.classList.add('is-feed') : '';

    if (this.params.startBtn) {
      this.params.startBtn.addEventListener('click', () => {
        this.start();
      }, { once: true });
    }
  }
}

export default Special;
