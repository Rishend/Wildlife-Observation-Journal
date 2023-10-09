import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import EditJournal from './EditJournal';

const MyJournals = () => {

  const [journalData, setjournalData] = useState([]);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const [masterList, setMasterList] = useState([]);

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const [selJournal, setSelJournal] = useState(null);

  const fetchjournalData = async () => {
    const res = await fetch("http://localhost:5000/journal/getbyuser/" + currentUser._id);
    console.log(res.status);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setjournalData(data);
      setMasterList(data);
    }
  };

  const deleteJournal = async (id) => {

    toast.promise(
      fetch("http://localhost:5000/journal/delete/" + id, { method: "DELETE" }),
      {
        loading: "Deleting...",
        success: () => {
          fetchjournalData();
          return <b>JOURNAL Deleted!</b>;
        },
        error: <b>Could not delete.</b>,
      }
    );
  };

  useEffect(() => {
    fetchjournalData();
  }, []);

  const showJournalData = () => {
    return journalData.map(journal => (
      <div className='card mb-4'>
        <div className="card-body">
          <h2>{new Date(journal.date).getDate()} {monthNames[new Date(journal.date).getMonth()]} {new Date(journal.date).getFullYear()} </h2>
          <h5 className='fw-bold'>{journal.title}</h5>
          <p>{journal.description}</p>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={(e) => { setSelJournal(journal) }}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger ms-3"
            onClick={(e) => {
              deleteJournal(journal._id)
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ))
  }

  const deleteUser = async (id) => {
    // const res = await fetch('http://localhost:5000/user/delete/'+id, {method : 'DELETE'});
    // if(res.status === 200){
    //     console.log('user deleted');
    //     fetchUserData();
    //     const data = await res.json();
    //     toast.success(data.name+' Successfully deleted');
    // }

    toast.promise(
      fetch("http://localhost:5000/journal/delete/" + id, { method: "DELETE" }),
      {
        loading: "Deleting...",
        success: () => {
          fetchjournalData();
          return <b>User Deleted!</b>;
        },
        error: <b>Could not delete.</b>,
      }
    );
  };

  const searchJournal = (e) => {
    const val = e.target.value;
    setjournalData(
      masterList.filter((journal) => {
        return journal.title.toLowerCase().includes(val.toLowerCase());
      })
    )
  }
  

  return (
    <div className='journal-bg py-5'>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {
                selJournal !== null && (
                  <EditJournal journalData={selJournal} />
                )
              }
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info "
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-success ">
                Save changes!
              </button>
            </div>
          </div>
        </div>
      </div>



      <div className='container'>

              <div className="card mb-4">
                <div className="card-body">
                  <div className='card-shadow  mt-8'></div>
                  <h1 className='text-center position:static' >SEARCH HERE!</h1>
                  <input type="text" className='form-control w-100' placeholder='Enter Journal name to search ...' onChange={searchJournal} />
                </div>
              </div>


        {showJournalData()}
      </div>
    </div>
  )
}

export default MyJournals;