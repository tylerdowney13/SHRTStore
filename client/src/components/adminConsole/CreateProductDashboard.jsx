import { useState } from "react";
import "./createProduct.css";
import  {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from '../../firebase';
import { addProduct } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';

export default function NewProduct() {
  const [inputs, setInputs] = useState({inStock: true});
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  };

  const handleCategories = (e) => {
    setCategories(e.target.value.split(","));
  };

    const handleSizes = (e) => {
      setSizes(e.target.value.split(","));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fileName = new Date().getTime() + file.name;

    const storage = getStorage(app);

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = 
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = ({...inputs, img: downloadURL, categories: categories, size: sizes});
          addProduct(product, dispatch);
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} required/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" name="title" placeholder="Apple Airpods" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" name="desc" placeholder="description" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="number" name="price" placeholder="0" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" name="categories" placeholder="men,women,shirt" onChange={handleCategories}/>
        </div>
        <div className="addProductItem">
          <label>Sizes</label>
          <input type="text" name="sizes" placeholder="S,M,L,XL" onChange={handleSizes}/>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" >Create</button>
      </form>
    </div>
  );
}
