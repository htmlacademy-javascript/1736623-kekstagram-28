import { initialization } from './filters.js';

const getData = () => {
  fetch('https://28.javascript.pages.academy/kekstagram/data').then((response) => response.json()).then((data) => initialization(data));
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://28.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body,
  },
  ).then((response) => {
    if (response.ok){
      onSuccess();
    } else {
      throw new Error ();
    }
  }).catch(() => {
    onFail();
  });
};

export {getData, sendData};
