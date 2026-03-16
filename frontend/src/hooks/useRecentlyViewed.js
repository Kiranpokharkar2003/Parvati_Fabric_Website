export default function addRecentlyViewed(product) {
  let list = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

  list = list.filter((p) => p.id !== product.id);
  list.unshift(product);

  if (list.length > 20) list.pop();

  localStorage.setItem("recentlyViewed", JSON.stringify(list));
}

export function getRecentlyViewed() {
  return JSON.parse(localStorage.getItem("recentlyViewed")) || [];
}

export function clearRecentlyViewed() {
  localStorage.removeItem("recentlyViewed");
}