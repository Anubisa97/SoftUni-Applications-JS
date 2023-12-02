import { api } from "./api.js";

const dataEndPoints = {
  getAll: "/data/fruits?sortBy=_createdOn%20desc",
  getSingleFruit: "/data/fruits/",
};

async function getAllFruits() {
  return api.get(dataEndPoints.getAll);
}

async function getSingleFruit(id) {
  return api.get(dataEndPoints.getSingleFruit + id);
}

async function createFruit(data) {
  return api.post(dataEndPoints.getSingleFruit, data);
}

async function updateFruit(id, data) {
  return api.put(dataEndPoints.getSingleFruit + id, data);
}

async function delFruit(id) {
  return api.del(dataEndPoints.getSingleFruit + id);
}

async function search(query) {
    return api.get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
  }

export const dataService = {
  getAllFruits,
  getSingleFruit,
  createFruit,
  updateFruit,
  delFruit,
  search
};
