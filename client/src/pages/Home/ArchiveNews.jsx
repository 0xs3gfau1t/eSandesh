import React from 'react'
import { FaUserCircle, FaFilter } from "react-icons/fa";
import ArchiveCard from '../../components/common/ArchiveCard';

function ArchiveNews() {
  return (
    <div>
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