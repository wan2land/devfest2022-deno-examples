exports.http = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send({
    message: req.query.message || null,
    version: "v1",
  });
};
// gcloud functions deploy http --region asia-northeast3 --runtime nodejs16 --trigger-http --gen2 --allow-unauthenticated --memory 1024
