
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import '../assets/css/class.css'
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './LogoutButton';

function App() {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileInfo, setFileInfo] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true); // New loading state
  const { user, isAuthenticated, isLoading } = useAuth0();
  const filesListRef = ref(storage, "files/");

  const uploadFile = () => {
    if (fileUpload == null) return;
    setUrl("Getting file link..");
    const fileRef = ref(storage, `files/${fileUpload.name + v4()}`);
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUrl(url);
        const newFileInfo = { name: fileUpload.name, url };
        const updatedFileInfo = [...fileInfo, newFileInfo];
        setFileInfo(updatedFileInfo);

        // Store the updated file info in local storage
        localStorage.setItem("fileInfo", JSON.stringify(updatedFileInfo));
      });
    });
  };

  useEffect(() => {
    setLoading(true);

    listAll(filesListRef)
      .then(async (response) => {
        const newFiles = [];

        for (const item of response.items) {
          const url = await getDownloadURL(item);
          newFiles.push({ name: item.name, url });
        }

        setFileInfo(newFiles);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Load file info from local storage on initial mount
    const storedFileInfo = JSON.parse(localStorage.getItem("fileInfo"));
    if (storedFileInfo) {
      setFileInfo(storedFileInfo);
    }
  }, []);

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
    
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center" 
    style={{background:'linear-gradient( 83.2deg,  rgba(150,93,233,1) 10.8%, rgba(99,88,238,1) 94.3% )',height:'100vh'}}>
      <h1 style={{color:'white'}}>Your Attachment Area</h1>
      <input
        type="file"
        onChange={(event) => {
          setFileUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}>Upload File</button>
      <br />
      <p>
        <a href={url}>{url}</a>
      </p>
      <ol>
        {loading ? (
          <p>Loading...</p>
        ) : (
          fileInfo.map((file, index) => (
            <li key={index}>
              {file.name.endsWith(".jpg") || file.name.endsWith(".jpeg") || file.name.endsWith(".png") ||
               file.name.endsWith(".docx") || file.name.endsWith(".ai") ? (
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  <img src={file.url} alt={file.name} style={{ maxWidth: '100px' }} />
                </a>
              ) : (
                <a href={file.url} target="_blank" rel="noopener noreferrer" style={{color:'white'}}>
                  {file.name}
                </a>
              )}
            </li>
          ))
        )}
      </ol>
    </div>
    </div>
  );
}

export default App;
