exports.withPagination = (query, limit = 10, page = 1) => {
  query.limit(limit);
  query.offset(limit * (page - 1));
};

exports.withOrderBy = (query, order = "desc", sort_by = "created_at") => {
  query.orderBy({ sort_by, order })
}