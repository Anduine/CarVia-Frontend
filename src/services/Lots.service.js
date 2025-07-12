import api from "./api";

async function getLotById(lotId) {
  return api.get(`/lots/sell_lots_id/${lotId}`);
}

async function getLotsCount() {
  return api.get(`/lots/sell_lots_count`);
}

async function getLots(page, limit) {
  return api.get(`/lots/sell_lots`, {
    params: { page, limit },
  });
}

async function getLotsFilteredCount(brand, model, minPrice, maxPrice, minYear, maxYear) {
  return api.get(`/lots/sell_lots_filtered_count`, {
    params: {
      brand: brand,
      model: model,
      min_price: minPrice,
      max_price: maxPrice,
      min_year: minYear,
      max_year: maxYear,
    },
  });
}

async function getLotsFiltered(brand, model, minPrice, maxPrice, minYear, maxYear, page = 1, limit = 10) {
  return api.get(`/lots/sell_lots_filtered`, {
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
  });
}

async function getBrands() {
  return api.get(`/lots/brands`);
}

async function getModels(brand) {
  return api.get(`/lots/models`, { params: { brand } });
}

async function getUserPostedLots() {
  return api.get(`/lots/user_posted_lots`);
}

async function getUserLikedLots() {
  return api.get(`/lots/user_liked_lots`);
}

async function createLot(lotData) {
  const formData = new FormData();

  for (const key in lotData) {
    if (key === "new_images") {
      lotData.new_images.forEach((file) => {
        formData.append("new_images", file);
      });
    } else {
      formData.append(key, lotData[key]);
    }
  }

  return api.post("/lots/create_lot", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

async function editLot(lotData) {
  const formData = new FormData();

  for (const key in lotData) {
    if (key === "new_images") {
      lotData.new_images.forEach((file) => {
        formData.append("new_images", file);
      });
    } else if (key === "delete_images") {
      lotData.delete_images.forEach((name) => {
        formData.append("delete_images", name);
      });
    } else if (Array.isArray(lotData[key])) {
      formData.append(key, JSON.stringify(lotData[key]));
    } else {
      formData.append(key, lotData[key]);
    }
  }

  return api.put(`/lots/update_lot/${lotData.lot_id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

async function deleteLot(lotId) {
  return api.delete(`/lots/delete_lot/${lotId}`);
}

async function buyLot(lotId) {
  return api.put(`/lots/buy_lot/${lotId}`);
}

export {
  getLotById,
  getLotsCount,
  getLots,
  getLotsFilteredCount,
  getLotsFiltered,
  getBrands,
  getModels,
  getUserPostedLots,
  getUserLikedLots,
  createLot,
  editLot,
  deleteLot,
  buyLot,
};
