export const applyQueryOptions = async (
  model,
  query,
  queryParams = {},
  searchableFields = [],
  sortableFields = []
) => {
  const page = Math.max(parseInt(queryParams.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(queryParams.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  // Search
  if (queryParams.search && searchableFields.length > 0) {
    const keyword = queryParams.search.trim();
    if (keyword.length > 0) {
      const regex = new RegExp(keyword, 'i');
      const searchConditions = searchableFields.map((field) => ({ [field]: regex }));
      query.find({ $or: searchConditions });
    }
  }

  // Sort
  let sortField = 'created_at';
  let sortOrder = -1; // Default to descending

  if (
    queryParams.sort_by &&
    (sortableFields.length === 0 || sortableFields.includes(queryParams.sort_by))
  ) {
    sortField = queryParams.sort_by;
  }

  if (queryParams.sort_order && String(queryParams.sort_order).toLowerCase() === 'asc') {
    sortOrder = 1;
  }

  query.sort({ [sortField]: sortOrder });

  // Pagination
  query.skip(skip).limit(limit);

  const [results, totalCount] = await Promise.all([query, model.countDocuments(query.getQuery())]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    results,
    pagination: {
      total_count: totalCount,
      current_page: page,
      total_pages: totalPages,
      per_page: limit,
    },
  };
};
