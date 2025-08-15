export const uploadImageToImgbb = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbApi}`, {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  return data?.data?.url; 
};