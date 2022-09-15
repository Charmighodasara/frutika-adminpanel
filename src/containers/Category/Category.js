import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik, useFormik } from 'formik';
import * as yup from 'yup';


function Category(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm()
    };
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
            profile_img: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            // handleInsert(values);

        },
    });
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
                                autoFocus
                                margin="dense"
                                id="name"
                                name="name"
                                label="category Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                            <TextField
                                type="file"
                                name="profile_img"
                            // label="category Image"
                            // onChange={(e) => setFieldValue('profile_img', e.target.files[0])}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                            <Button onClick={handleClose}>Add</Button>
                        </DialogActions>
                    </Form>
                </Formik>

            </Dialog>
        </div>
    );
}

export default Category;