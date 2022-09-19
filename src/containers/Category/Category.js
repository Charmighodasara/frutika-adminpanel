
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
import { addCategory, GetCategory } from '../../Redux/Action/Category.action';


function Category(props) {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm()
    };

    const dispatch = useDispatch()

    const handleInsert = (values) => {
        console.log(values);
        dispatch(addCategory(values))
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
            handleInsert(values);

        },
    });

    const columns = [
        { field: 'name', headerName: 'Categoty Name', width: 150 },
        {
            field: 'profile_img',
            headerName: 'Profile Image',
            width: 100,
            flex: 1,
            renderCell: (params) => (
                <img src={params.row.profile_img} width={50} height={50} />
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

            <Dialog open={open} onClose={handleClose} fullWidth>

                <DialogTitle>
                    Categories</DialogTitle>
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
                            <input
                                type="file"
                                name="profile_img"
                                onChange={(e) => setFieldValue('profile_img', e.target.files[0])}
                            />
                            {errors.profile_img && touched.profile_img ? <p>{errors.profile_img}</p> : ''}
                            <DialogActions>
                                <Button onClick={handleClose}>Close</Button>
                                <Button type='submit'>Add </Button>
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