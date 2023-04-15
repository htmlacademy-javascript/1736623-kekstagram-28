const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const FILE_TYPES = ['gif', 'png', 'jpeg', 'jpg'];

const getUserPicture = () => {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
};

export {getUserPicture};
