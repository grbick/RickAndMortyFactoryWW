import { Button } from 'antd'
import React, { useContext } from 'react'
import { CharacterContext } from '../../../../modules/characters/characters.context';



// Pagination would probably go to components folder, even tho now its only used here
// its more of a generic component than something home page specific
// the fact that only home page uses it, does not mean its a home page component

interface PagiButtonPropsType {
    buttonContent: number | string;
    buttonValue: number
}

const PaginationButton: React.FC<PagiButtonPropsType> = props => {
    const { queryParams, setQueryParams } = useContext(CharacterContext);
  
    return (
      <Button
        size='small'
        style={{marginInline:'5px'}}
        onClick={() =>
          setQueryParams({
            ...queryParams,
            page: props.buttonValue
          })
        }
      >
        {props.buttonContent}
      </Button>
    );
  }
  
  export default PaginationButton