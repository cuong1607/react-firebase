import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./new.scss";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import CircularIndeterminate from "../../components/progress";

const New = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
    const [valProgress, setValProgress] = useState(0);

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value });
    }

    console.log("valProgress", valProgress);

    useEffect(() => {
        const upLoadFile = () => {
            const name = new Date().getTime() + file.name;
            console.log("name", name);
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setValProgress(progress);
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log("error", error);
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                        default:
                            break;
                    }
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                })
        }
        file && upLoadFile();
    }, [file])


    const onSubmitComfirm = async (e) => {
        e.preventDefault();
        const res = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );
        await setDoc(doc(db, "users", res.user.uid), {
            ...data,
            image: file,
            timeStamp: serverTimestamp(),
        });
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        {
                            file ?
                                valProgress < 100 
                                ? 
                                <CircularIndeterminate /> 
                                :
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt=""
                                />
                            :
                            <img
                                src={"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                alt=""
                            />
                                
                        }
                    </div>
                    <div className="right">
                        <form onSubmit={onSubmitComfirm}>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Ảnh: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        id={input.id}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        onChange={handleInput} />
                                </div>
                            ))}
                            <button type="submit">Xác nhận</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New;
