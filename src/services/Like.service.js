import api from "./api";

async function addLotToLikes(lotId) {
  return api.post(`/lots/likes/${lotId}`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

async function removeLotFromLikes(lotId) {
  return api.delete(`/lots/likes/${lotId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export { addLotToLikes, removeLotFromLikes };
