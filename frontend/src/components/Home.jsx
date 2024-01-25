import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "./Navbar";
import styles from "./Home.module.css";


const Home = () => {
        const baseUrl = process.env.REACT_APP_BASE_URL;
        const formdata = new FormData();
        const [file, setFile] = useState(null);
        const [title, setTitle] = useState("");
        const [list, setList] = useState([]);
        const [parsedData, setParsedData] = useState([]);
        const [columns, setColumns] = useState([])
        const [showInput, setShowInput] = useState(true);
        const [currentPage, setCurrentPage] = useState(1);
        const [itemsPerPage, setItemsPerPage] = useState(10);

        const deleteDoc = async (_id) =>{

            await axios.get(`${baseUrl}/delete/${_id}`, {
              headers:{
                "Content-Type": "application/json"
              }
            })

            window.location.reload()
        }
 
        const validation = (e) =>{
            e.preventDefault();
            const csv = e.target.files[0];

            if(csv){
                
                if(csv.name.endsWith('.csv') && csv.type === 'text/csv'){
                    setFile(csv)
                }else{
                    alert("please upload a .csv file")
                    e.target.value = "";
                }
            }
        }

        
          const uploadHandler = async(e) =>{
              
              try {
                
              formdata.append('csv', file)

              formdata.append('title', title)
              
              console.log(`${baseUrl}/upload`)

               await axios.post(`${baseUrl}/upload`, formdata, {
                headers:{
                  "Content-Type": "multipart/form-data"
                }
              })

              
              document.getElementById("file-input").value = "";
              setFile(null);
              setTitle("")
              formdata.delete('csv')
              formdata.delete('title')

              } catch (error) {
                console.log(error.message)
              }
              
          }


          useEffect(()=>{

            const getUploads = async () =>{
              try {
                const uploads = await axios.get(`${baseUrl}/getuploads`, {
                  headers:{
                    "Content-Type": "application/json"
                  }
                })
                
              
                setList(uploads.data.data)

              } catch (error) {
                console.log(error.message)
              }
            }

            getUploads();
                

          }, [])


          const fetchParsed = async (_id) =>{

            try {

                  const parsed = await axios.get(`${baseUrl}/read/${_id}`,  {
                  headers:{
                    "Content-Type": "application/json"
                  }
                })

                setParsedData(parsed.data.data);

            } catch (error) {
                console.log(error)
            }

          }

          useEffect(()=>{

                const column = parsedData.length > 0 ? Object.keys(parsedData[0]) : [];

                setColumns(column);

                column.length > 0 ? setShowInput(false) : setShowInput(true)

          },[parsedData])


          const lastItemIndex = currentPage * itemsPerPage;

          const firstItemIndex = lastItemIndex - itemsPerPage;

          const currentItems = parsedData.slice(firstItemIndex, lastItemIndex);

          const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      <Navbar data={parsedData}/>
      <div className={styles.total}>



        { showInput ? 

        

      
        (<div className={styles.unparsed}>
            <div className={styles.input}>

                <form encType="multipart/form-data" onSubmit={uploadHandler}>


                      <input id={styles.fileInput} name="csv" type="file" accept=".csv"  onChange={validation} className="input-box"/>

                      {
                          file && <button className={styles.uploadBtn} type="submit">Upload</button>
                      }

                      <input id={styles.fileInput} name="title" type="text" onChange={(e)=> setTitle(e.target.value)}  value={title} className="input-box" placeholder="Enter File Name" required/>

                </form>

            </div>
            

            <div className={styles.listWrapper}>

              { list.length > 0 ?
                      
                      (<div className={styles.list}>
                      
                        {
                        
                        list.map((item, index) => (
                            <div key={index} className={styles.listItem} >
                             <button  onClick={()=>fetchParsed(item._id)} >{item.filename} </button> 
                             <span onClick={()=>deleteDoc(item._id)}>DEL</span>
                            </div>
                          ))

                        }
                      
                      </div>)

                      :

                      (
                        <div className="no-uploads">
                          <p>No Files Uploaded!</p>
                        </div>
                      )

              }
            </div>
         </div>)

         :


         (<div className={styles.parsed}>
          
              { 
                <table>
                 
                  <thead>
                    <tr>
                      {

                        columns.map((name, index)=>(

                          <th key={index}>{name}</th>

                        ))

                      }
                        
                    </tr>
                  </thead>
                  <tbody>

                    {

                      currentItems.map((object, index)=>(

                        <tr key={index}>

                            { columns.map((eachColumn, index)=>(

                                <td key={index}>
                                    {object[eachColumn]}
                                </td>

                            ))
                            }
                        </tr>
                      ))

                    }
                      
                  </tbody>
                </table>

                
              }


              <div className={styles.pagination}>
                  
                  {Array.from({length:Math.ceil(parsedData.length/itemsPerPage)}, (_,index)=>(

                    <button className={styles.pgBtn} onClick={()=>paginate(index+1)}>{index+1}</button>

                  ))}

              </div>
         </div>)

            }
      </div>
    </>
  )
}

export default Home