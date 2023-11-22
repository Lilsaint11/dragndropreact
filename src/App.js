import React, { useState } from 'react';
import './App.css';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from '@mui/icons-material/Visibility';

const App = () => {
  const [leftItems, setLeftItems] = useState([{
    id:"1",description:"New Shoe",
    size:"32",price:"$1000",
    status:"available"
  }]);
  const [rightItems, setRightItems] = useState([
    {id:"2",description:"dress"},
    {id:"3",description:"watch"},
    {id:"4",description:"bag"},
    {id:"5",description:"necklace"}
  ]);

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData('text', item.id);
    event.target.classList.add('dragging');
  };

  const handleDragEnd = (event) => {
    event.target.classList.remove('dragging');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedItemId = event.dataTransfer.getData('text');
    const droppedItem = rightItems.find((item) => item.id === droppedItemId);

    setLeftItems([...leftItems, droppedItem]);
    setRightItems(rightItems.filter((item) => item.id !== droppedItemId));
    console.log(leftItems)
  };

  const  handleDragOver = (event) => {
    event.preventDefault();
  }
 

  return (
    <div className="container">
      <h2>Animation Select List</h2>
      <div  className="tables">
        <div className="left-list">
        <TableContainer component={Paper} style={{ width: '500px', height: '400px' }}  onDrop={handleDrop} onDragOver={handleDragOver}>
            <Table  size="large" aria-label="Vendors Table">
            <TableHead>
                <TableRow>
                    <TableCell>A</TableCell>
                    <TableCell>B</TableCell>
                    <TableCell>C</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>E</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {leftItems.map((item,index) => (
              <TableRow style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff' }}> 
                  <TableCell className="b-r">{item.id}</TableCell>
                  <TableCell className="b-r">{item.description}</TableCell>
                  <TableCell className="b-r"> <input type="checkbox" name="" id="" /> </TableCell>
                  <TableCell className="b-r">{item.price}</TableCell>
                  <TableCell className="b-r"><VisibilityIcon /></TableCell>
                  
              </TableRow>
               ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        </div>
        <div className="right-list">
          <TableContainer component={Paper} style={{ width: '300px'}} >
            <Table  size="small" aria-label="Vendors Table">
            <TableHead>
                <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Id</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {rightItems.map((item,index) => (

                  <TableRow
                    key={item.id}
                    draggable
                    onDragStart={(event) => handleDragStart(event, item)}
                    onDragEnd={handleDragEnd}
                    style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff' }}
                   > 
                  <TableCell className="b-r">{item.description}</TableCell>
                  <TableCell className="b-r">{item.id}</TableCell>
                  
                  
              </TableRow>
              ))}
            </TableBody>
          </Table>
         </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default App;
