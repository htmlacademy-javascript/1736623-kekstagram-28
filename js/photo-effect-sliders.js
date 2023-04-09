const FILTERS = [
  {
    name:'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name:'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name:'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name:'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const defaultEffect = FILTERS[0];
let chosenEffect = defaultEffect;

const slider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectsRadio = document.querySelector('.effects');
const imgPreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const isDefault = () => chosenEffect === defaultEffect;

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onFilter = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = FILTERS.find((filter) => filter.name === evt.target.value);
  imgPreview.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const slidervalue = slider.noUiSlider.get();
  imgPreview.style.filter = isDefault() ? defaultEffect.style : `${chosenEffect.style}(${slidervalue}${chosenEffect.unit})`;
  effectValue.value = slidervalue;
};

const resetFilters = () => {
  chosenEffect = defaultEffect;
  updateSlider();
};

noUiSlider.create(slider, {
  range: {
    min: defaultEffect.min,
    max: defaultEffect.max,
  },
  start: defaultEffect.max,
  step: defaultEffect.step,
  connect: 'lower',
});
hideSlider();

effectsRadio.addEventListener('change', onFilter);
slider.noUiSlider.on('update', onSliderUpdate);

export {resetFilters};
