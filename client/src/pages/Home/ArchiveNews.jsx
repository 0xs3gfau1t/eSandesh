import React from 'react'
import { Link } from "react-router-dom";
import { FaUserCircle, FaFilter } from "react-icons/fa";
import ArchiveCard from '../../components/common/ArchiveCard';

function ArchiveNews() {
  return (
    <div>
      {/* <input type="dropdown" onClick><FaFilter/></input> */}
      <div className='flex gap-2 items-center'>
        <FaFilter/>
        <select id="cars" name="cars">
          <option value="date">By NewsDate</option>
          <option value="category">By Category</option>
          <option value="archived date">By Archived Date</option>
        </select>
      </div>
     
      <ArchiveCard/>
      <ArchiveCard/>
      <ArchiveCard/>
      <ArchiveCard/>
      <ArchiveCard/>
      <ArchiveCard/>
    </div>
  )
}

export default ArchiveNews