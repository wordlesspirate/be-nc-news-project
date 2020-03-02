exports.formatDates = list => {
  const convertedDate = list.map(({ created_at, ...otherProperties }) => {
    return { created_at: new Date(created_at), ...otherProperties };
  });
  return convertedDate;
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
