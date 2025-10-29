export const getPageNumbers = (current, total, maxVisible = 5) => {
  const pages = [];

  if (total <= maxVisible + 2) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    const start = Math.max(2, current - Math.floor(maxVisible / 2));
    const end = Math.min(total - 1, current + Math.floor(maxVisible / 2));

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total - 1) pages.push("...");
    pages.push(total);
  }

  return pages;
};
