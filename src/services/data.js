const { Firestore } = require("@google-cloud/firestore");

const db = new Firestore({
  projectId: "submissionmlgc-muhammadaris",
});
const predictCollection = db.collection("predictions");

async function storeData(id, data) {
  return predictCollection.doc(id).set(data);
}

async function getAllData() {
  const data = await predictCollection.get();
  const histories = data.docs.map((doc) => ({
    id: doc.id,
    history: doc.data(),
  }));
  return histories;
}

module.exports = { storeData, getAllData };
