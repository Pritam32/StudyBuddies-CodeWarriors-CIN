    import React from "react";
    import {Link} from 'react-router-dom';
    import '../assets/css/class.css'

    const ClassRoom = ({item}) => {
    return (
        <div className="col-lg-3 col-md-3 col-12">
            
                <div class="card">
                    
                <div class="card-body">
                    <div class="color" style={{backgroundColor:item.theme}}></div>
                    <div class="content">
                    <h6 class="card-title">{item.class}</h6>
                    <p class="card-text">{item.desc}</p>
                    <a href="/meeting">
                    <button class="meet" style={{backgroundColor:item.theme}}>Join Study Room</button>
                    </a>
                    </div></div></div></div>
            

    )
    }

    export default ClassRoom;