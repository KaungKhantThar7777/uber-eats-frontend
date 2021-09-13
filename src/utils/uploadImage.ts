export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const { url }: { url: string } = await (
    await fetch("http://localhost:4000/uploads", {
      method: "POST",
      body: formData,
    })
  ).json();

  return url;
};
