const hashTag = /^#[a-zа-яё0-9]{1,19}$/i;

const isTagUniq = (tags) => {
  const tagsArray = tags.map((tag) => tag.toLowerCase());

  return new Set(tagsArray).size === tagsArray.length;
};

const isTagValid = (tag) => hashTag.test(tag);

const tagCheck = (value) => {
  const getTags = value.trim().split(' ').filter((tag)=>tag.trim().length);

  return getTags.length < 6 && isTagUniq(getTags) && getTags.every(isTagValid);
};

export {tagCheck};
