import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import {
    Paper, Table, TableBody, TableContainer,
    TableHead, TableRow, TableCell, Button, Box, IconButton,
} from '@mui/material';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowTeachers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    if (loading) {
        return <div>Loading...</div>;
    } else if (response) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <GreenButton variant="contained" onClick={() => navigate("/Admin/teachers/chooseclass")}>
                    Add Teacher
                </GreenButton>
            </Box>
        );
    } else if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Deleted Successfully")
        setShowPopup(true)

        dispatch(deleteUser(deleteID, address)).then(() => {
            dispatch(getAllTeachers(currentUser._id));
        });
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'teachSubject', label: 'Subject', minWidth: 100 },
        { id: 'teachSclass', label: 'Class', minWidth: 170 },
    ];

    const rows = teachersList.map((teacher) => {
        console.log(teacher);
        return {
            name: teacher.name,
            teachSubject: Array.isArray(teacher.teachSubject) ? teacher.teachSubject.map(sub => sub.subName).join(', ') : teacher.teachSubject?.subName || null,
            teachSclass: Array.isArray(teacher.teachSclass) ? teacher.teachSclass.map(cls => cls.sclassName).join(', ') : teacher.teachSclass?.sclassName || null,
            teachSclassID: Array.isArray(teacher.teachSclassID) ? teacher.teachSclassID.map(cls => cls._id).join(', ') : teacher.teachSclassID?.[0]?._id || null,
            id: teacher._id,
        };
    });

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Teachers',
            action: () => deleteHandler(currentUser._id, "Teachers")
        },
    ];

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center">
                                Actions
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    // console.log(row);
                                    if (column.id === 'teachSubject' || column.id === 'teachSclass') {
                                        return (
                                            <StyledTableCell key={column.id} align={column.align}>
                                                {value ? (
                                                    value
                                                ) : (
                                                    <Button variant="contained"
                                                        onClick={() => {
                                                            navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)
                                                        }}>
                                                        Add {column.label}
                                                    </Button>
                                                )}
                                            </StyledTableCell>
                                        );
                                    }
                                    return (
                                        <StyledTableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </StyledTableCell>
                                    );
                                })}
                                <StyledTableCell align="center">
                                    <IconButton onClick={() => deleteHandler(row.id, "Teacher")}>
                                        <PersonRemoveIcon color="error" />
                                    </IconButton>
                                    <BlueButton variant="contained"
                                        onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}>
                                        View
                                    </BlueButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', marginRight: '8px' }}>
                <span>Total Rows: {rows.length}</span>
            </Box>

            <SpeedDialTemplate actions={actions} />
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Paper >
    );
};

export default ShowTeachers;
