import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./new.scss";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  }

  console.log("data", data);

  const onSubmitComfirm = async (e) => {

    e.preventDefault();
    const res = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    await setDoc(doc(db, "users", res.user.uid), {
      ...data,
      timeStamp: serverTimestamp(),
    });
    console.log("res", res);
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
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
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
