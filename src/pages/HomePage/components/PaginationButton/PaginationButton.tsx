import { Button } from 'antd'
import React, { useContext } from 'react'
import { CharacterContext } from '../../../../modules/characters/characters.context';

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