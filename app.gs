const doc = SpreadsheetApp.openById("1mZkCxHD94nkR3WGv3_b3a-cxN2siOMx9EQysDLo5Q8c");

function doGet(request) {
  const type = request.parameter.type;
  const sheet = doc.getSheetByName(type);
  const range = sheet.getDataRange();
  const values = range.getValues();

  let questions = [];
  values.forEach((item, index) => {
    questions[index] = {
      "quiz_id": index + 1,
      "question": item[1],
      "answers": [item[2], item[3], item[4], item[5]]
    }
  });
  questions = questions.sort(() => Math.random() - Math.random());
  questions.length = 4;
  return ContentService.createTextOutput(JSON.stringify(questions)).setMimeType(ContentService.MimeType.JSON);
}
function doPost(request) {
  const postData = JSON.parse(request.postData.contents);
  const { type, questions } = postData;
  const sheet = doc.getSheetByName(type);
  const range = sheet.getDataRange();
  const values = range.getValues();
  let results = [];
  const correctID = 5
  questions.forEach((item, index) => {
    results[index] = {
      quiz_id: item.quiz_id,
      answer: values[item.quiz_id - 1][correctID],
    };
  });
  return ContentService.createTextOutput(JSON.stringify(results)).setMimeType(
    ContentService.MimeType.JSON
  );
}