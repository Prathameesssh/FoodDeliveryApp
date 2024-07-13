/*async function ImageToBase64(file) {
if (file !== "") {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  const data = new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

  return data;
} else {
  return console.log("Data is not set");
}
}*/

async function ImageToBase64(file) {
  return new Promise((resolve, reject) => {
    if (file && file instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    } else {
      reject(new Error("Provided input is not a Blob or File."));
    }
  });
}

export { ImageToBase64 };
