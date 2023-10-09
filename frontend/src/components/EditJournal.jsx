import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';

const EditJournal = ({journalData}) => {

    const [journalContent, setJournalContent] = useState(journalData.content);

    // const [selFile, setSelFile] = useState("");

    const textRef = useRef(null);

    const updateJournal = async () => {
        const res = await fetch('http://localhost:5000/journal/update/'+journalData._id, {
            method: 'PUT',
            body : JSON.stringify({content : journalContent}),
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        console.log(res.status);
        if(res.status === 200){
            Swal.fire({
                icon : 'success',
                title: 'Updated Successfully',
            })
        }else{
            Swal.fire({
                icon : 'error',
                title: 'Something went wrong'
            })
        }
    };

    useEffect(() => {
      console.log(journalContent);
    }, [])
    
    const addText = () => {
        const obj = {type : 'text', value : textRef.current.value};
        setJournalContent([...journalContent, obj])
        console.log(journalContent);
    }

    const uploadFile = async (e, cb) => {
        if(!e.target.files) return;
    
        const file = e.target.files[0];
        console.log(file.name);
        // setSelFile(file.name);
    
        const fd = new FormData();
        fd.append('myfile', file);
    
        const res = await fetch('http://localhost:5000/util/uploadfile', {
          method: 'POST',
          body: fd
        });
    
        console.log(res.status);
        cb(file.name)
      }

      const addVideo = (filename) => {
        const obj = {type : 'video', value : filename};
        setJournalContent([...journalContent, obj])
        console.log(journalContent);
      };
      
      const addImage = (filename) => {
        const obj = {type : 'image', value : filename};
        setJournalContent([...journalContent, obj])
        console.log(journalContent);
      };



    const displayItem = (item) => {
        if(item.type === 'text'){
            return <p>{item.value}</p>
        }else if(item.type === 'video'){
            return <video className='img-fluid' src={'http://localhost:5000/'+item.value} controls></video>
        }else if(item.type === 'audio'){
            return <audio className='img-fluid' src={'http://localhost:5000/'+item.value} controls></audio>
        }else if(item.type === 'image'){
            return <img className='img-fluid' src={'http://localhost:5000/'+item.value} />
        }
    }

    const displayJournal = () => {
        return journalContent.map((item) => (
            displayItem(item)
        ))
    }
    
  return (
    <div>
        <h4>Edit Journal</h4>
        <textarea className='form-control' ref={textRef}></textarea>
        <button onClick={addText}>Add Text</button>
        
        <label>Upload Video</label>
        <input type="file" className='form-control' onChange={(e) => { uploadFile(e, addVideo) }} />

        <label htmlFor="">Upload Image</label>
        <input type="file" className='form-control' onChange={(e) => { uploadFile(e, addImage) }} />
        
        <hr />

        <button className='btn btn-success mt-4' onClick={updateJournal}>Save Changes</button>

        {
            displayJournal()
        }

    </div>
  )
}

export default EditJournal