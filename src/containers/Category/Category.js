
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, GetCategory, updateCategory } from '../../Redux/Action/Category.action';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function Category(props) {
    const [open, setOpen] = useState(false)             //popup open close
    const [dopen, setDopen] = useState(false);          // delete popup box open close
    const [editData, setEditData] = useState(false)     // edit data 
    const [did, setDid] = useState(0)                   //delete data


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDopen(false);
        formik.resetForm();
        setEditData(false);
    };
    const handleClickDOpen = () => {
        setDopen(true);
    };

    const dispatch = useDispatch()

    const handleInsert = (values) => {
        console.log(values);
        dispatch(addCategory(values))
        handleClose()
    }
    const handleEdit = (params) => {
        handleClickOpen()
        formik.setValues(params.row)
        console.log(params.row);
        setEditData(true)
    }

    const handleUpdateData = (values) => {
        dispatch(updateCategory(values))
        handleClose()
    }

    const handleDelete = () => {
        dispatch(deleteCategory(did))
        handleClose()
    }

    let schema = yup.object().shape({
        name: yup.string().required("please enter Product Name"),
        profile_img: yup.mixed().required("please select profile image.")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            profile_img: ''
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

    const columns = [
        { field: 'name', headerName: 'Categoty Name', width: 150 },
        {
            field: 'profile_img',
            headerName: 'Profile Image',
            width: 100,
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
                    <IconButton aria-label="delete" onClick={() => { handleClickDOpen(); setDid(params.row) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    useEffect(() => {
        // loadData()
        dispatch(GetCategory())
    }, [])

    const category = useSelector(state => state.category)
    const { handleSubmit, handleBlur, handleChange, errors, touched, values, setFieldValue } = formik
    return (
        <div>
            <h2>Category</h2>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Categories
            </Button>
            <Dialog    // delete popup
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
                    editData ? <DialogTitle> update Category Details</DialogTitle>
                        : <DialogTitle> Add Category</DialogTitle>
                }
                <Formik values={formik} >
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                value={values.name}
                                margin="dense"
                                id="name"
                                name='name'
                                label="Category Name"
                                type="name"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                            <TextField
                                type="file"
                                name="profile_img"
                                onChange={(e) => setFieldValue('profile_img', e.target.files[0])}
                            />
                            {errors.profile_img && touched.profile_img ? <p>{errors.profile_img}</p> : ''}
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
            <h4>category Data</h4>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={category.category}
                    columns={columns}
                    pageSize={6}
                    rowsPerPageOptions={[6]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default Category;