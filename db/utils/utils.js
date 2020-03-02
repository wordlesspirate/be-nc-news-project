exports.formatDates = list => {
  const convertedDate = list.map(({ created_at, ...otherProperties }) => {
    return { created_at: new Date(created_at), ...otherProperties };
  });
  return convertedDate;
};

exports.makeRefObj = list => {
  const referenceObject = list.reduce(
    (referenceElements, { title, article_id }) => {
      referenceElements[title] = article_id;
      return referenceElements;
    },
    {}
  );
  return referenceObject;
};

exports.formatComments = (comments, articleRef) => {};
