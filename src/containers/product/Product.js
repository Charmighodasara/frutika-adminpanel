import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';

function Product(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm()
        
    };
    const handleInsert = (values) => {
        localStorage
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
        </div>
    );
}

export default Product;