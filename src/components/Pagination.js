import React from "react";
//import {AiFillLeftCircle, AiFillRightCircle} from 'react-icons/ai';

const Pagination = (props) => {

    const {page, totalPages, onLeftClick, onRightClick} = props;

    return(
        <div className="pagination-container">
            <button onClick={onLeftClick} className="btn-left"><div>◀️</div></button>
            <div>{page} de {totalPages}</div>
            <button onClick={onRightClick} className="btn-right"><div>▶️</div></button>
        </div>
    );
}

export default Pagination;