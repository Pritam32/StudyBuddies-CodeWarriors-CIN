import React,{useState,useEffect} from 'react';
import ClassRoom from './ClassRoom';
import {firebase} from './firebase1';
import '../assets/css/class.css';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './LogoutButton';


const Classes = () => {
    const [show,setshow]=useState(false);
    const [name,setname]=useState();
    const [desc,setdesc]=useState();
    const [theme,setTheme]=useState();
    const [classes,setclasses]=useState([]);

   
    const { user, isAuthenticated, isLoading } = useAuth0();
    const changestate=()=>{
        setshow(true);
    }
    const ref=firebase.firestore().collection('classes');

    useEffect(()=>{
      
        return ref.onSnapshot(querySnapshot=>{
          const list=[]
          querySnapshot.forEach(doc=>{
            list.push({
              id:doc.id,
             class:doc.data().class,
              desc:doc.data().desc,
              theme:doc.data().theme,
            })
          })
          setclasses(list)
          console.log("Our Classes:"+ classes)
         
        })
      },[])
    

    const addclass=async(e)=>{
        e.preventDefault();  
       
        try {
            const docRef = await ref.add({
              
             class:name ,
              desc:desc,    
              theme:theme,
            }).then(()=>{
                setname('');
                setdesc('');
                setshow(false);
            })
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

    }
  return (
    <div>
            <nav className="navbar navbar-light navbar-expand-lg">
        <div className="container d-flex flex-row">
          <a className="navbar-brand" href="#">StudyBuddies</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav m-auto my-2 my-lg-0 ">
              <li className="nav-item">
                <a className="nav-link active" href="/classes">StudyRoom</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/todos">Study Goals</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/whiteboard" >
                  Whiteboard
                </a>
               
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/ide">Code Editor</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/files">Files </a>
              </li>
              {isAuthenticated?<LogoutButton/>:null}

            </ul>
           
          </div>
        </div>
      </nav>
    <div class='d-flex align-items-center justify-content-center'>   
        <div class="container main1">
        <div class="welcome">
        
        <button style={{padding:10}} onClick={changestate}>Create classroom</button>
        </div>
        <div class="row">
        {
        classes?.map((item,i)=>(
            <ClassRoom key={i} item={item}/>
        ))
    }
        </div>
 

    </div>


    <div class={show?'create-form d-block':'create-form d-none'}>
        <div class="container d-flex flex-column">
            <form>
        <div class=" mt-4 mb-3">
          <label for= "classroomName" class="form-label">Classroom Name</label>
          <input type="text" name= "classroomName" id="cname" class="form-control" required="yes" value={name}  onChange={(e)=>setname(e.target.value)}/>
          
        </div>
        <div class="mb-3">
            <label for="classDesc" class="form-label">Class Description</label>
            <input type="text" name="classDesc" id="cdesc" class="form-control" required="yes" value={desc}  onChange={(e)=>setdesc(e.target.value)}/>
            
          </div>
          <div class="mb-3">
            <label for="classTheme" class="form-label">Classroom Theme</label><br/>
            <select class="form-control" id="theme" onChange={e=>setTheme(e.target.value)}>
                <option></option>
                <option>red</option>
                <option>green</option>
                <option>blueviolet</option>
            </select>
            
          </div>
          <div class="mb-3">
            <button class="create-btn" type="submit" onClick={addclass}>Submit form</button>
            <button class="create-btn mx-3" type="cancel" onClick={()=>setshow(false)}>Cancel</button>
          </div>
        </form>
        </div>
    </div>
    </div>
    </div>
  )
}


export default Classes;