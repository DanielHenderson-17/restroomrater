import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../services/userService.jsx";
import { storage } from "../../../firebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const Register = () => {
  const [customer, setCustomer] = useState({
    email: "",
    name: "",
    imgUrl: "",
    totalRatings: 0,
    averageRatings: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  let navigate = useNavigate();

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImageAndRegister = async () => {
    if (imageFile) {
      const imageRef = ref(storage, `avatars/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imgUrl = await getDownloadURL(imageRef);
      const updatedCustomer = { ...customer, imgUrl };
      createUser(updatedCustomer).then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "rr_user",
            JSON.stringify({
              id: createdUser.id,
              email: createdUser.email,
              name: createdUser.name,
              imgUrl: createdUser.imgUrl,
              totalRatings: createdUser.totalRatings,
              averageRatings: createdUser.averageRatings,
            })
          );
          navigate("/");
        }
      });
    } else {
      window.alert("Please upload an image");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(customer.email).then((response) => {
      if (response.length > 0) {
        window.alert("Account with that email address already exists");
      } else {
        uploadImageAndRegister();
      }
    });
  };

  const updateCustomer = (evt) => {
    const copy = { ...customer };
    copy[evt.target.id] = evt.target.value;
    setCustomer(copy);
  };

  return (
    <main className="mt-5 pt-5" style={{ textAlign: "center" }}>
      <form className="form-login card w-25" onSubmit={handleRegister}>
        <h2 className="my-5">Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="name"
              className="form-control border"
              placeholder="Name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="email"
              id="email"
              className="form-control border"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control border"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="login-btn btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
