const favBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  return blogs.reduce((favorite, current) => {
    return current.likes > favorite.likes ? current : favorite;
  });
};

module.exports = {
  favBlog,
};
