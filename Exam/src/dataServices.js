import { api } from "./api.js";

const dataEndPoints = {
  getAll: "/data/characters?sortBy=_createdOn%20desc",
  getSingleCharacter: "/data/characters/",
  createChar: "/data/characters",
};

async function getAllCharacters() {
  return api.get(dataEndPoints.getAll);
}

async function getSingleCharacter(id) {
  return api.get(dataEndPoints.getSingleCharacter + id);
}

async function createCharacter(data) {
  return api.post(dataEndPoints.createChar, data);
}

async function updateCharacter(id, data) {
  return api.put(dataEndPoints.getSingleCharacter + id, data);
}

async function delCharacter(id) {
  return api.del(dataEndPoints.getSingleCharacter + id);
}

async function likeCharacter(data) {
  return api.post("/data/useful", data);
}

async function getCharacterLikes(id) {
  return api.get(
    `/data/useful?where=characterId%3D%22${id}%22&distinct=_ownerId&count`
  );
}

async function userLikes(characterId, userId) {
  return api.get(
    `/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}

export const dataService = {
  getAllCharacters,
  getSingleCharacter,
  createCharacter,
  updateCharacter,
  delCharacter,
  likeCharacter,
  getCharacterLikes,
  userLikes,
};
