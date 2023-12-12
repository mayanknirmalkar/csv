import {  useState } from "react"
import styles from "./Navbar.module.css";

const Navbar = ({data}) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [columns, setColumns] = useState([])
   
 
    const submitHandler = (e) =>{
      e.preventDefault();
     
        console.log(searchTerm)
      const searchedData = data.filter((item) => (
            
            Object.values(item).some((value) =>{

              if (typeof value === 'string') {
                // If the value is a string, perform a case-insensitive search
                return value.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (typeof value === 'number') {
                // If the value is a number, convert it to string and search
                return value.toString().includes(searchTerm);
              }

              return false;

            }
            
          
              
      )))


      setFilteredData(searchedData)

      if(searchedData.length > 0){
        const columns = Object.keys(searchedData[0])
        setColumns(columns);
      }
    
        
    }


    

  return (<>
     
      { filteredData.length > 0 ? 

        
        (<div className={styles.searchData}>

              <table>
                  <thead>
                      <tr>
                      { columns.map((field, index)=>(

                        <th key={index}>
                          {field}
                        </th>

                      ))
                      }
                      </tr>
                  </thead>
                  <tbody>
                      

                        { filteredData.map((obj,index)=>(

                            <tr key={index}>
                           { Object.values(obj).map((value, index)=>(

                              <td key={index}>
                                {value}
                              </td>

                            ))}
                            </tr>
                        ))

                        }

                          
                      
                  </tbody>
              </table>
          
          </div>)

                :

            (<div className={styles.navtotal}>

            <form onSubmit={submitHandler}>

                    <input type="text" className={styles.searchbar} placeholder="Search..." onChange={(e)=>setSearchTerm(e.target.value)}/>
                    <button type="submit">Search</button>
            </form>
        </div>)

      }

</> 
)
}

export default Navbar