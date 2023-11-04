import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useTheme,makeStyles } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Button, { ButtonProps } from '@mui/material/Button';
import '../styles/employee.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const DeleteDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



const validationSchema = yup.object({
  firstName: yup
    .string('Enter your First Name')
    .required('First Name is required'),
  lastName: yup
    .string('Enter your Last Name')
    .required('Last Name is required'),
  salary:yup.string('Enter Salary').required('Salary required'),
  designation:yup.string('Enter Designation').required('Designation is required')
});

const Employee = () =>{

    const [employeeList,seEmployee] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDailog,setOpenDailog] = useState(false);
    const [openDeleteDailog,setOpenDeleteDailog] = useState(false);
    const [selectedEmployee,setSelectEmployee] = useState({});
    const [openEditDailog,setOpenEditDailog] = useState(false);
    const [openSuccessAlert,setOpenSuccessAlert] = useState({status:false,message:""});
    const [openErrorAlert,setOpenErrorAlert] = useState({status:false,message:""});


    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () =>{
      axios.get("https://localhost:44320/api/Employee/GetAllEmployees").then((data) => {
        seEmployee(data?.data);
      }).catch((error) => {
        console.log(error);
      });
    }  

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    
    const handleClickOpen = () => {
      setOpenDailog(true);
    };
    const handleClose = () => {
      setOpenDailog(false);
    };

    const handleDeleteClickOpen = (row) => {
      setSelectEmployee(row);
      setOpenDeleteDailog(true);
    };
    const handleDeleteClose = () => {
      setSelectEmployee({});
      setOpenDeleteDailog(false);
    };
    

    const handleEditClickOpen = (row) => {
      setSelectEmployee(row);
      setOpenEditDailog(true);
    };
    const handleEditClose = () => {
      setSelectEmployee({});
      setOpenEditDailog(false);
    };
    

    const deleteEmployee= () =>{
      axios.delete("https://localhost:44320/api/Employee/DeleteEmployee?id="+selectedEmployee.employeeId).then((data)=>{
        if(data?.data && data?.data.isSuccess)
        {
          setOpenDeleteDailog(false);
          setSelectEmployee({});
          getAllEmployees();
          setOpenSuccessAlert({status:true,message:data?.data.messsage});
        }
      }).catch(error => {
        console.log(error.response.data.error)
     })
    }

    const formik = useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        salary:'',
        designation:''
      },
      validationSchema: validationSchema,
      onSubmit: (values,{resetForm}) => {
        let employeeInfo = {
          employeeFirstName: values.firstName,
          employeeLastName: values.lastName,
          salary: parseInt(values.salary),
          designation: values.designation
        }
        axios.post("https://localhost:44320/api/Employee/SaveEmployees",employeeInfo).then((data)=>{
            if(data?.data && data?.data.isSuccess)
            {
              setOpenDailog(false);
              getAllEmployees();
              resetForm({values:""})
              setOpenSuccessAlert({status:true,message:data?.data.messsage});
            }
        })
      },
    });


    const editFormik = useFormik({
      initialValues: {
        firstName: selectedEmployee.employeeFirstName,
        lastName: selectedEmployee.employeeLastName,
        salary:selectedEmployee.salary,
        designation:selectedEmployee.designation
      },
      enableReinitialize:true,
      validationSchema: validationSchema,
      onSubmit: (values,{resetForm}) => {
        let employeeInfo = {
          employeeFirstName: values.firstName,
          employeeLastName: values.lastName,
          salary: parseInt(values.salary),
          designation: values.designation,
          employeeId:selectedEmployee.employeeId
        }
        axios.post("https://localhost:44320/api/Employee/SaveEmployees",employeeInfo).then((data)=>{
            if(data?.data && data?.data.isSuccess)
            {
              setOpenEditDailog(false);
              getAllEmployees();
              resetForm({values:""});
              setOpenSuccessAlert({status:true,message:data?.data.messsage});
            }
        })
      },
    });



    return (<div className="employee-list-css">

      <Collapse in={openSuccessAlert.status}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenSuccessAlert({status:false,message:""});
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {openSuccessAlert.message}
              </Alert>
            </Collapse>


            <Collapse in={openErrorAlert.status}>
              <Alert severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenErrorAlert({status:false,message:""});
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {openErrorAlert.status}
              </Alert>
            </Collapse>


        <div>
           <h2>Employee List</h2>
             
          <div className='add-employee-custom-css'>
            <Button variant="contained" onClick={handleClickOpen}>Add Employee</Button>
          </div>  

        </div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 650 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">Salary</TableCell>
                    <TableCell align="right">Desgination</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeeList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow
                      key={row.employeeId}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.employeeFirstName}
                      </TableCell>
                      <TableCell align="right">{row.employeeLastName}</TableCell>
                      <TableCell align="right"><i class="fa fa-inr"></i> {row.salary.toLocaleString()}</TableCell>
                      <TableCell align="right">{row.designation}</TableCell>
                      <TableCell align="right"> <Icon onClick={()=>handleEditClickOpen(row)}>edit</Icon> <Icon onClick={()=>handleDeleteClickOpen(row)}>delete</Icon> </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5,10, 25, 100]}
                component="div"
                count={employeeList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDailog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Employee
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>

          <div className='row' >
           <div className="email-custom-css col-md-6">
                <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                />
            </div>
           <div className="email-custom-css col-md-6">
                <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                type="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                />
             </div>

              <div className="email-custom-css col-md-6">
                <TextField
                fullWidth
                id="salary"
                name="salary"
                label="Salary"
                type="salary"
                value={formik.values.salary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.salary && Boolean(formik.errors.salary)}
                helperText={formik.touched.salary && formik.errors.salary}
                />
             </div>

            <div className="email-custom-css col-md-6">
                <TextField
                fullWidth
                id="designation"
                name="designation"
                label="Designation"
                type="designation"
                value={formik.values.designation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.designation && Boolean(formik.errors.designation)}
                helperText={formik.touched.designation && formik.errors.designation}
                />
             </div>   
          </div>
           <div className="action_custom_css">
             <div className='form_custom_css'>
            <Button variant="contained" size="large" type="submit" className="form_custom_css">
              Submit
            </Button>
            </div>
            <div>
            <Button variant="outlined" size="large" onClick={handleClose}>
            Close
          </Button>
          </div>
          </div>
          </form>
        </DialogContent>
      </BootstrapDialog>



      <BootstrapDialog
        onClose={handleEditClose}
        aria-labelledby="customized-dialog-title"
        open={openEditDailog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Employee
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleEditClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={editFormik.handleSubmit}>

          <div className='row' >
           <div className="email-custom-css col-md-6">
                <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={editFormik.values.firstName}
                onChange={editFormik.handleChange}
                onBlur={editFormik.handleBlur}
                error={editFormik.touched.firstName && Boolean(editFormik.errors.firstName)}
                helperText={editFormik.touched.firstName && editFormik.errors.firstName}
                />
            </div>
           <div className="email-custom-css col-md-6">
                <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                type="lastName"
                value={editFormik.values.lastName}
                onChange={editFormik.handleChange}
                onBlur={editFormik.handleBlur}
                error={editFormik.touched.lastName && Boolean(editFormik.errors.lastName)}
                helperText={editFormik.touched.lastName && editFormik.errors.lastName}
                />
             </div>

              <div className="email-custom-css col-md-6">
                <TextField
                fullWidth
                id="salary"
                name="salary"
                label="Salary"
                type="salary"
                value={editFormik.values.salary}
                onChange={editFormik.handleChange}
                onBlur={editFormik.handleBlur}
                error={editFormik.touched.salary && Boolean(editFormik.errors.salary)}
                helperText={editFormik.touched.salary && editFormik.errors.salary}
                />
             </div>

            <div className="email-custom-css col-md-6">
                <TextField
                fullWidth
                id="designation"
                name="designation"
                label="Designation"
                type="designation"
                value={editFormik.values.designation}
                onChange={editFormik.handleChange}
                onBlur={editFormik.handleBlur}
                error={editFormik.touched.designation && Boolean(editFormik.errors.designation)}
                helperText={editFormik.touched.designation && editFormik.errors.designation}
                />
             </div>   
          </div>
           <div className="action_custom_css">
             <div className='form_custom_css'>
            <Button variant="contained" size="large" type="submit" className="form_custom_css">
              Update
            </Button>
            </div>
            <div>
            <Button variant="outlined" size="large" onClick={handleEditClose}>
            Close
          </Button>
          </div>
          </div>
          </form>
        </DialogContent>
      </BootstrapDialog>


      <DeleteDialog
        onClose={handleDeleteClose}
        aria-labelledby="customized-dialog"
        open={openDeleteDailog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog">
          Delete Employee
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleDeleteClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
           Are you sure want to Delete <b>{selectedEmployee.employeeFirstName} {selectedEmployee.employeeLastName}</b>
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleDeleteClose}>
            No
          </Button>
          <Button autoFocus onClick={deleteEmployee}>
            Yes
          </Button>
        </DialogActions>
      </DeleteDialog>

    </div>);
};

export default Employee;