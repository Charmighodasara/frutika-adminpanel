import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Product(props) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm()

    };
    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("product"))
        let id = Math.floor(Math.random() * 1000)
        let data = {
            id: id,
            ...values
        }
        if (localData === null) {
            localStorage.setItem("product", JSON.stringify([data]))
        } else {
            localData.push(data)
            localStorage.setItem("product", JSON.stringify(localData))
        }
        // console.log(data);
        handleClose()
        loadData()

    }

    let schema = yup.object().shape({
        name: yup.string().required("please enter Product Name"),
        quantity: yup.string().required("Please Enter Product Quantity"),
        price: yup.number().required("please enter Product price").positive().integer(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            quantity: '',
            price: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            handleInsert(values);
        },
    });

    const { handleSubmit, handleBlur, handleChange, errors, touched } = formik

    const handleDelete =(params ) => {
        console.log(params.id);

        let localData =JSON.parse (localStorage.getItem("product"))
        let fData = localData.filter((p)=> p.id !== params.id)
        localStorage.setItem("product" , JSON.stringify(fData));
        loadData()
    }

    const columns = [
        { field: 'name', headerName: 'Product Name', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 200 },
        { field: 'price', headerName: 'Price', width: 200, },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <IconButton aria-label="delete" onClick={()=> handleDelete (params)}>
                    <DeleteIcon />
                </IconButton>
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
    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <h2>Fruitkha Products</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Product
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle> Add Product</DialogTitle>
                <Formik values={formik} >
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
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
                            <DialogActions>
                                <Button onClick={handleClose}>Close</Button>
                                <Button type='submit'>Add </Button>
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
            <h4>Product Data</h4>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default Product;