import React, { useEffect, useState } from "react"; 

const Content = () =>{
    const [studenstList,setStudentsList] = useState([]);
    const [loading,setLoading] = useState(false);
    const [currentPage,setCurrentPage] =useState(1);
    const [totalPage,setTotalPage] = useState(0);
    const [action,setAction] = useState('next');
    const [fistLast,setFistLast] = useState('fist')

    useEffect(()=>{
        setLoading(true);
        async function getStudentsList(){
            let response = await fetch(`https://js-post-api.herokuapp.com/api/students?_page=${currentPage}`)
            let student = await response.json();
            setStudentsList(student.data);
            setLoading(false)
            setTotalPage(Math.ceil(Number(student.pagination._totalRows)/Number(student.pagination._limit)))
        }
        getStudentsList();

        return () => {
            console.log('Component Will Unmount');
        }
    },[currentPage])

    const handleNextPage = () => {
        if(currentPage < totalPage){
            setCurrentPage(currentPage + 1)
            setAction('next')
        }
    }

    const handlePreviousPage = () => {
        if(currentPage > 1)
        {
            setCurrentPage(currentPage - 1)
            setAction('prev')
        }
    }
    const handleFistPage = () => {
        setCurrentPage (1) 
        setFistLast('fist')
    }
    const handleLastPage = () => {
        setCurrentPage(totalPage)
        setFistLast('last')
    }

    return(

        <div className="">
        <h1>Student List</h1>
   
        {
            loading ? <p className="text-danger">Loading...</p> : (
                <table className="table">
                <thead>
                  <tr> 
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Mark</th>
                    <th scope="col">Gender</th>
                    <th scope="col">City</th>
                  </tr>
                </thead>
                    {
                        studenstList.map((student) => (
                            <tbody>
                            <tr>
                              <td>{student.id}</td>
                              <td>{student.name}</td>
                              <td>{student.age}</td>
                              <td>{student.mark}</td>
                              <td>{student.gender}</td>
                              <td>{student.city}</td>
                            </tr>
                            </tbody>
                        ))
                    }
                </table>
            )
        }
        
        <nav className="navigation">
                    <ul className="pagination">
                        <li className={` ${action == 'fist' ? 'active' : ''} 'page-item' `}>
                            <a role="button" className="page-link"
                                onClick={handleFistPage}
                            >Fist</a>
                        </li>
                        <li className={`${currentPage <= 1 ? 'page-item disabled' : 'page-item'} ${action == 'prev' ? 'active' : ''}`}>
                            <a role="button" className="page-link"
                                onClick={handlePreviousPage}
                            >Previous</a>
                        </li>
                        <li className={`${currentPage >= totalPage ? 'page-item disabled' : 'page-item'} ${action == 'next' ? 'active' : ''}`}>
                            <a role="button" className="page-link"
                                onClick={handleNextPage}
                            >Next</a>
                        </li>
                        <li className={` ${action == 'last' ? 'active' : ''} 'page-item' `}>
                            <a role="button" className="page-link"
                                onClick={handleLastPage}
                            >Last</a>
                        </li>
                    </ul>
                </nav>
    </div>
    )
}

export default Content;