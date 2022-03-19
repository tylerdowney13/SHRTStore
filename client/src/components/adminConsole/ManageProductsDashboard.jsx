import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

export default function ManageProductsDashboard() {
  const dispatch = useDispatch();

  const products = useSelector(state => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Instock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/editproduct/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productListHeader">
        <span className="productsTitle">Products</span>
        <Link to="/admin/createproduct">
          <button className="createProductsButton">Create</button>
        </Link>
      </div>
      <div className="datagridContainer">
        <DataGrid
        rows={products}
        rowsPerPageOptions={[15]}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={15}
        checkboxSelection
      />
      </div>
    </div>
  );
}
