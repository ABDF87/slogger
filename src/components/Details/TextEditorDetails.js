// import React, { useEffect, useState } from "react";
// import useAxiosPrivate from '../hooks/useAxiosPrivate';
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import './textEditor.css'
// import { handleInputChange } from "react-select/dist/declarations/src/utils";


//  function TextEditorDetails({id}) {


//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty(),
//   );
//   // const axiosPrivate = useAxiosPrivate();
//   // const controller = new AbortController();

//   // const contentState = editorState
//   // .getCurrentContent().getPlainText('\u0001')


// //   useEffect(()=>{

// //     const uploadPost = async () => {
// //       console.log("contentState",contentState)
// //       try {
// //         const response = await axiosPrivate.get('/details', {
// //           signal: controller.signal,
// //           taskid: id,    
// //         }); 
// //         let result = response.data
// //         result.map((el)=>{
// //           if(el.taskid === id){
// //             console.log('DATA TASKPOST', el.taskpost)
// //             // setPost(el.taskpost)
// //           }
// //         })
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };
// //     uploadPost()
// //   },[])

  

// // console.log("ID DETAIL",id)
// // console.log('editorState', editorState)
// //     const savePost = async () => {
// //       console.log("contentState",contentState)
// //       try {
// //         const response = await axiosPrivate.put('/details', {
// //           signal: controller.signal,
// //           taskid: id,
// //           taskpost: contentState
        
// //         });
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };

 

 
//   return (
//     <div>
//       <h3 className='editorTitle'>Notes</h3>
//       <div>
    
//         <Editor
//           editorState={editorState}
         
//           toolbar={{
//             options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
//             inline: { inDropdown: true },
//             list: { inDropdown: true },
//             textAlign: { inDropdown: true },
//             link: { inDropdown: true },
//             history: { inDropdown: true },
          
//         }}
//         />
//           {/* <button onClick={savePost}>Save</button> */}
//       </div>
//     </div>
//   );
// }

// export default TextEditorDetails