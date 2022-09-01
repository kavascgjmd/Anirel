import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import { doc , collection, runTransaction} from 'firebase/firestore';
import Avatar from '@mui/material/Avatar';
import { async } from '@firebase/util';

function Comments({postData}) { 
    const [comment, setcomment] = useState(null);
    
    const setData = async()=>{
        let arr = [];
   
        for(let i =  0; i<postData.comments.length; i++){
         let dataloc =  doc(db, "comments", postData.comments[i]);
         const data = await runTransaction(db, async(transaction)=>{
          const elem =  await transaction.get(dataloc);
          return elem.data();
         })
         console.log(data);
          arr.push(data);
        }
        setcomment(arr);
    }
    useEffect(()=> {
     setData();
    },[postData])


    return (
    <div className = 'comm-boxo'>
        {comment === null ? <></>:
        <>
        {
            comment.map((com)=>(
                <div  style={{display: "flex", gap: "5px", alignItems:"center"}}>
                <Avatar src ={com.uProfileURL} style ={{height : "30px", width : "30px"}}></Avatar>
                <p style ={{marginTop : '10px'}}><span style = {{fontWeight :"bold"}}>{com.uProfileName}</span><span>{com.text}</span></p>
                </div>
            ))
        }
        </>
        
        }
    </div>
  )
}

export default Comments