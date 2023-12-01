// http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc

import { requester } from "./requester.js";

const URL = {
  getAll: "data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
  getSingleIdea: "data/ideas/",
  create: "data/ideas/",
  delete: "data/ideas/",
};

export async function getAllIdeas() {
  const data = await requester("GET", URL.getAll);
  return data;
}

export async function getIdeaById(id) {
  const data = await requester("GET", URL.getSingleIdea + id);
  return data;
}

export async function createIdea(data) {
  return await requester("POST", URL.create, data);
}

export async function deleteIdea(id) {
  return await requester("DELETE", URL.delete + id);
}
