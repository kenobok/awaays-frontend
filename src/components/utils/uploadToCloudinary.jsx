const uploadToCloudinary = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/dxfgpihzb/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'profile_images');

    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) throw new Error('Upload failed');

    const data = await response.json();
    return data.secure_url;
};


export default uploadToCloudinary;

