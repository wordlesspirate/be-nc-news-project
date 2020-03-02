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

exports.formatComments = (comments, articleRef) => {
  const formattedComments = comments.map(
    ({ created_by, belongs_to, created_at, ...otherProperties }) => {
      return {
        author: created_by,
        article_id: articleRef[belongs_to],
        created_at: new Date(created_at),
        ...otherProperties
      };
    }
  );
  return formattedComments;
};
