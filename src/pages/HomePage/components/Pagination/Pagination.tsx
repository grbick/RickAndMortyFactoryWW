import React, { useContext } from 'react'
import { CharacterContext } from '../../../../modules/characters/characters.context'
import PaginationButton from '../PaginationButton/PaginationButton'
import './pagination.scss'



// Pagination would probably go to components folder, even tho now its only used here
// its more of a generic component than something home page specific
// the fact that only home page uses it, does not mean its a home page component

const Pagination = () => {
 const {queryParams,pageCount} = useContext(CharacterContext)

  const currentPage = queryParams.page

   const pageButtons= [
      <PaginationButton
        key="Prev"
        buttonContent="Prev"
        buttonValue={currentPage === 1 ? currentPage : currentPage - 1}
      />
    ]
    


  if (pageCount <= 5 || currentPage === 1 || currentPage === 2) {
    for (let i = 1; i <= pageCount && i <= 5; i++) {
      pageButtons.push(
        <PaginationButton 
        key={i} buttonContent={i} buttonValue={i} 
        />
      );
    }
  } else if (currentPage === pageCount - 1 || currentPage === pageCount) {
    for (let i = pageCount - 4; i <= pageCount; i++) {
      pageButtons.push(
        <PaginationButton 
        key={i} buttonContent={i} buttonValue={i} 
        />
      );
    }
  } else {
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      pageButtons.push(
        <PaginationButton
         key={i} buttonContent={i} buttonValue={i} 
        />
      );
    }
  }
  pageButtons.push(
    <PaginationButton
      key="Next"
      buttonContent="Next"
      buttonValue={currentPage === pageCount ? currentPage : currentPage + 1}
    />
  );
  if (pageCount > 5) {
    pageButtons.unshift(
      <PaginationButton key="First" buttonContent={"First"} buttonValue={1} />
    );
    pageButtons.push(
      <PaginationButton
        key="Last"
        buttonContent={"Last"}
        buttonValue={pageCount}
      />
    );
  }
  return (
    <div className='pagination'>
        {pageCount > 1 && pageButtons}
    </div>
    
  )
}

export default Pagination