import { Link, useLocation } from "react-router-dom";
import "./editProduct.css";
import { useSelector } from 'react-redux';
import { useRef, useState } from "react";
import { updateProduct } from '../../redux/apiCalls';
import { useDispatch } from "react-redux";
import  {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import app from "../../firebase";

export default function EditProductDashboard() {
  const dispatch = useDispatch();

  const [file, setFile] = useState();

  const location = useLocation();
  const productId = location.pathname.split("/")[3];

  const product = useSelector(state => state.product.products.find(product => product._id === productId));

  const titleRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const categoriesRef = useRef();
  const sizesRef = useRef();
  const inStockRef = useRef();
  const colorsRef = useRef();

  const updateTheProduct = (e) => {
    e.preventDefault();
    const id = product._id;
    const fileName = new Date().getTime() + file.name;

    const storage = getStorage(app);

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    const updatedProduct = {
      _id: product._id,
      title: titleRef.current.value,
      desc: descRef.current.value,
      price: priceRef.current.value,
      categories: categoriesRef.current.value.split(","),
      size: sizesRef.current.value.split(","),
      inStock: Boolean(inStockRef.current.value),
      color: colorsRef.current.value.split(","),
      img: product.img,
    }

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
          const product = ({...updatedProduct, img: downloadURL});
          updateProduct(id, product, dispatch);
        });
      }
    );
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productBottom">
          <form className="productForm" onSubmit={updateTheProduct}>
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" defaultValue={product.title} ref={titleRef} required/>
                  <label>Description</label>
                  <input type="text" defaultValue={product.desc} ref={descRef} required/>
                  <label>Price</label>
                  <input type="number" defaultValue={product.price} ref={priceRef} required/>
                  <label>Categories</label>
                  <input type="text" defaultValue={product.categories} ref={categoriesRef} required/>
                  <label>Sizes</label>
                  <input type="text" defaultValue={product.size} ref={sizesRef} required/>
                  <label>Colors</label>
                  <input type="text" defaultValue={product.color} ref={colorsRef} required/>
                  <label>In Stock</label>
                  <select name="inStock" id="inStock" ref={inStockRef} required >
                      <option defaultValue="true">Yes</option>
                      <option defaultValue="false">No</option>
                  </select>
                  <div className="productChangeImage">
                    <label style={{marginBottom: "5px", color: "grey"}}>Image</label>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} required/>
                  </div>
                  <button className="productButton" type="submit">Update</button>
              </div>
              <div className="productUpload">
                  <img className="productImg" src={product.img} alt=""/>
                  <input type="file" id="file" style={{display:"none"}} />
              </div>
          </form>
      </div>
    </div>
  );
}