import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, GetProduct, updateProduct } from '../../Redux/Action/Product.getaction';

function Product(props) {
    const [open, setOpen] = useState(false);
    const [dopen, setDopen] = useState(false);
    const [did, setDid] = useState(0)
    const [data, setData] = useState([])
    const [editData, setEditData] = useState(false)
    const [search, setSearch] = useState([])

    const count = useSelector(state => state.counter)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickDOpen = () => {
        setDopen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDopen(false);
        formik.resetForm();
        setEditData(false);

    };
    const handleInsert = (values) => {
        console.log(values);
        // let localData = JSON.parse(localStorage.getItem("product"))
        // let id = Math.floor(Math.random() * 1000)
        // let data = {
        //     id: id,
        //     ...values
        // }

        dispatch(addProduct(values))
        // if (localData === null) {
        //     localStorage.setItem("product", JSON.stringify([data]))
        // } else {
        //     localData.push(data)
        //     localStorage.setItem("product", JSON.stringify(localData))
        // }
        handleClose()
        loadData()

    }
    const handleUpdateData = (values) => {
        // let localData = JSON.parse(localStorage.getItem("product"))
        // let uData = localData.map((e) => {
        //     if (e.id === values.id) {
        //         return values;
        //     } else {
        //         return e;
        //     }
        // })
        // localStorage.setItem("product", JSON.stringify(uData))
        dispatch(updateProduct(values))
        handleClose()
        loadData()
    }
    let schema = yup.object().shape({
        name: yup.string().required("please enter Product Name"),
        quantity: yup.string().required("Please Enter Product Quantity"),
        price: yup.number().required("please enter Product price").positive().integer(),
        profile_img: yup.mixed().required("please select profile image.")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            quantity: '',
            price: '',
            profile_img:''
        },
        validationSchema: schema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            if (editData) {
                handleUpdateData(values)
            } else {
                handleInsert(values);
            }
        },
    });

    const { handleSubmit, handleBlur, handleChange, errors, touched, values , setFieldValue } = formik

    const handleDelete = () => {
        // console.log(params.id);
        // let localData = JSON.parse(localStorage.getItem("product"))
        // let fData = localData.filter((p) => p.id !== did)
        // localStorage.setItem("product", JSON.stringify(fData));

        dispatch(deleteProduct(did))
        loadData()
        handleClose()
    }
    const handleEdit = (params) => {
        handleClickOpen()
        formik.setValues(params.row)
        console.log(params.row);
        setEditData(true)
    }

    const columns = [
        { field: 'name', headerName: 'Product Name', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
        { field: 'price', headerName: 'Price', width:150 },
        {
            field: 'profile_img',
            headerName: 'Profile Image',
            width: 100,
            flex:1,
            renderCell: (params) => (
                    <img src={params.row.profile_img} width={50} height={50} />
            )
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 500,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)} >
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleClickDOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("product"))
        if (localData !== null) {
            setData(localData);
        }
        // console.log(localData);
    }

    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    useEffect(() => {
        // loadData()
        dispatch(GetProduct())
    }, [])

    const hancleSearch = (val) => {
        let localData = JSON.parse(localStorage.getItem("product"))

        let fData = localData.filter((p) => (
            p.name.toLowerCase().includes(val.toLowerCase()) ||
            p.quantity.toString().includes(val) ||
            p.price.toString().includes(val)
        ))
        // console.log(fData);
        setSearch(fData)
    }

    const finalData = search.length > 0 ? search : data

    return (
        <div>
            {
                product.isLoading ?
                    <p>Loading...</p>
                    :
                    product.error !== '' ?
                        <p>{product.error}</p>
                        :
                        <div>
                            <h2>Fruitkha Products {count.counter}</h2>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Add Product
                            </Button>
                            <TextField
                                margin="dense"
                                name="search"
                                label="Search Medicine "
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => hancleSearch(e.target.value)}
                            />
                            <Dialog
                                open={dopen}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Are you sure to delete this data ?"}
                                </DialogTitle>
                                <DialogActions>
                                    <Button onClick={handleClose}>No</Button>
                                    <Button onClick={handleDelete} autoFocus>
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={open} onClose={handleClose} fullWidth>
                                {
                                    editData ? <DialogTitle> update Product Details</DialogTitle>
                                        : <DialogTitle> Add Product</DialogTitle>
                                }
                                <Formik values={formik} >
                                    <Form onSubmit={handleSubmit}>
                                        <DialogContent>
                                            <TextField
                                                value={values.name}
                                                margin="dense"
                                                id="name"
                                                name='name'
                                                label="Product Name"
                                                type="name"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                                            <TextField
                                                value={values.quantity}
                                                margin="dense"
                                                id="quantity"
                                                name='quantity'
                                                label="Quantity"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.quantity && touched.quantity ? <p>{errors.quantity}</p> : ''}
                                            <TextField
                                                value={values.price}
                                                margin="dense"
                                                id="price"
                                                name='price'
                                                label="Product price"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.price && touched.price ? <p>{errors.price}</p> : ''}
                                            <input 
                                                type="file"
                                                name="profile_img"
                                                onChange={(e)=> setFieldValue('profile_img' , e.target.files[0])}
                                            />
                                            <DialogActions>
                                                <Button onClick={handleClose}>Close</Button>
                                                {
                                                    editData ? <Button type='submit'>update </Button>
                                                        : <Button type='submit'>Add </Button>
                                                }
                                            </DialogActions>

                                        </DialogContent>
                                    </Form>
                                </Formik>
                            </Dialog>
                            <h4>Product Data</h4>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={product.product}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                />
                                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => setData([])}>
                                    Delete
                                </Button>
                            </div>
                        </div>
            }
        </div>
    );
}

export default Product;