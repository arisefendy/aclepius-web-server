const predictCancerClassification = require("../services/inferenceService");
const crypto = require("crypto");
const { storeData, getAllData } = require("../services/data");

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { label, suggestion } = await predictCancerClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: label,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  await storeData(id, data);

  const response = h.response({
    status: "success",
    message: "Model is predicted successfully",
    data,
  });
  response.code(201);
  return response;
}

async function getAllPredictsHandler() {
  const histories = await getAllData();

  return {
    status: "success",
    data: histories,
  };
}

module.exports = { postPredictHandler, getAllPredictsHandler };
