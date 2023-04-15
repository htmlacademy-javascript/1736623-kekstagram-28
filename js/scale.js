const scaleValue = document.querySelector('.scale__control--value');
const onScaleSmaller = document.querySelector('.scale__control--smaller');
const onScaleBigger = document.querySelector('.scale__control--bigger');
const imgPreview = document.querySelector('.img-upload__preview img');

const scalePicture = (value) => {
  imgPreview.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const decreaseSize = () => {
  const getCurrentValue = parseInt(scaleValue.value, 10);
  if (getCurrentValue > 25) {
    const newValue = getCurrentValue - 25;
    scalePicture(newValue);
  }
};

const increaseSize = () => {
  const getCurrentValue = parseInt(scaleValue.value, 10);
  if (getCurrentValue < 100) {
    const newValue = getCurrentValue + 25;
    scalePicture(newValue);
  }
};

const setDefaulValue = () => {
  imgPreview.style.transform = 'scale(1)';
  scaleValue.value = `${100}%`;
};

onScaleSmaller.addEventListener('click', decreaseSize);
onScaleBigger.addEventListener('click', increaseSize);

export {setDefaulValue};
