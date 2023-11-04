import React,{useState} from 'react';
import { fetchStudents,deletePost } from '../redux/counterSlice';
import store from '../redux/store';
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectAllPosts, getPostsError, getPostsStatus } from '../redux/counterSlice';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux'
import Icon from '@mui/material/Icon';

const Student = () =>{
    const posts = useSelector(selectAllPosts);
    const status = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const dispatch = useDispatch();

    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    
      const handleDelete = (id) =>{
        dispatch(deletePost({ id })).unwrap();
      }
      
    return(
        <>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 650 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">Email Id</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.firstName}
                      </TableCell>
                      <TableCell align="right">{row.lastName}</TableCell>
                      <TableCell align="right">{row.emailId}</TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                      <TableCell align="right"> <Icon onClick={()=>handleDelete(row.id)}>delete</Icon> </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5,10, 25, 100]}
                component="div"
                count={posts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

        </>
    )
};


export default Student;