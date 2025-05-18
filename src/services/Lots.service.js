import api from "./api";

async function getLotsCount() {
  return api
    .get(`/lots/sell_lots_count`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // console.error("Помилка getLotsCount: ", error.message);
      throw error;
    });
}

async function getLots(page, limit) {
  return api
    .get(`/lots/sell_lots`, {
      params: { page, limit },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // console.error("Помилка getLots:", error.message);
      throw error;
    });
}

async function getLotsFilteredCount(brand, model, minPrice, maxPrice, minYear, maxYear) {
  return api
    .get(`/lots/sell_lots_filtered_count`, {
      params: {
        brand: brand,
        model: model,
        min_price: minPrice,
        max_price: maxPrice,
        min_year: minYear,
        max_year: maxYear,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // console.error("Помилка getLotsFilteredCount:", error.message);
      throw error;
    });
}

async function getLotsFiltered(brand, model, minPrice, maxPrice, minYear, maxYear, page = 1, limit = 10) {
  return api
    .get(`/lots/sell_lots_filtered`, {
      params: {
        brand: brand,
        model: model,
        min_price: minPrice,
        max_price: maxPrice,
        min_year: minYear,
        max_year: maxYear,
        page: page,
        limit: limit,
      },
    })
    .then((response) => {
      if (Array.isArray(response.data)) {
        return response;
      } else {
        console.error("Помилка отримані фільтровані лоти не є масивом");
        return [];
      }
    })
    .catch((error) => {
      // console.error("Помилка getLotsFiltered:", error.message);
      throw error;
    });
}

async function getBrands() {
  return api
    .get(`/lots/brands`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Помилка отримання брендів: ", error.message);
      throw error;
    });
}

async function getModels(brand) {
  return api
    .get(`/lots/models`, { params: { brand } })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // console.error("Помилка отримання моделей: ", error.message);
      throw error;
    });
}

async function getUserPostedLots(userID) {
  return api
    .get(`/lots/user_posted_lots`, { params: { user_id: userID } })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Помилка отримання опублікованих лотів: ", error.message);
      throw error;
    });
}

async function getUserLikedLots(userID) {
  return api
    .get(`/lots/user_liked_lots`, { params: { user_id: userID } })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Помилка отримання лайкнутих лотів: ", error.message);
      throw error;
    });
}

export {
  getLotsCount,
  getLots,
  getLotsFilteredCount,
  getLotsFiltered,
  getBrands,
  getModels,
  getUserPostedLots,
  getUserLikedLots,
};
