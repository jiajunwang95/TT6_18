import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// const columns: Column[] = [
//   { id: 'from', label: '', minWidth: 10 },
//   { id: 'to1', label: 'MYR', minWidth: 10 },
//   { id: 'to2', label: 'RMB', minWidth: 10 },
//   { id: 'to3', label: 'MYR', minWidth: 10 },
//   { id: 'to4', label: 'MYR', minWidth: 10 },
//   { id: 'to5', label: 'MYR', minWidth: 10 },
//   { id: 'to6', label: 'MYR', minWidth: 10 },
//   { id: 'to7', label: 'MYR', minWidth: 10 },
//   { id: 'to8', label: 'MYR', minWidth: 10 },
//   { id: 'to9', label: 'MYR', minWidth: 10 },
//   { id: 'to10', label: 'MYR', minWidth: 10 },
//   { id: 'to11', label: 'MYR', minWidth: 10 },
// ];

// interface Data {
//   from: string;
//   to1: string;
//   to2: string;
//   to3: string;
//   to4: string;
//   to5: string;
//   to6: string;
//   to7: string;
//   to8: string;
//   to9: string;
//   to10: string;
//   to11: string;
  
// }

// function createData(
//   from: string,
//   to1: string,
//   to2: string,
//   to3: string,
//   to4: string,
//   to5: string,
//   to6: string,
//   to7: string,
//   to8: string,
//   to9: string,
//   to10: string,
//   to11: string,

// ): Data {
//   return { from, to1, to2, to3, to4, to5, to6, to7, to8, to9, to10, to11};
// }

const rows = [
  createData('SGP', 3, 1, 3,2,4,1,7,1,3,5,4)
];

export default function ColumnGroupingTable() {

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={11}>
                Exchange Rate
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .map((row) => {
                return (
                  <TableRow key={row.to1}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
