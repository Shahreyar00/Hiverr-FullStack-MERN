import axios from "axios";

const upload = async (file) => {
    console.log(file)
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Hiverr");
    try{
        const uploadRes = await axios.post(process.env.REACT_APP_UPLOAD_URL, data);
        const { url } = uploadRes.data;
        return url;
    }catch(err){
        console.log(err);
    }
};

export default upload;