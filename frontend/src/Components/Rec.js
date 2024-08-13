import React, { useContext, useRef } from 'react'
import recipeContext from '../Context/recipeContext'
import Nav from './Nav'
import '../mainrecipe.css'
import { Hourglass } from 'react-loader-spinner'
import { FiDownload } from "react-icons/fi";
import {jsPDF} from "jspdf"
import  html2canvas from "html2canvas"
const Rec = (props) => {
  const object = useContext(recipeContext)
  let {obh,dark,setdark} = object
  const pdfref = useRef()
  const downloadPDF = async ()=>{
    const pdfContent = pdfref.current 
    html2canvas(pdfContent).then((canvas)=>{
      const imgData = canvas.toDataURL("image/png")
      const pd = new jsPDF()
      const imgW = pd.internal.pageSize.getWidth()
      const imgH = (canvas.height * imgW) / canvas.width
      pd.addImage(imgData,"PNG",0,0,imgW,imgH)
      pd.save("recipe.pdf")
    })
  }
  return (
    <>
      <Nav/>
      {Object.keys(obh).length === 0 &&<p style={{textAlign: "center", fontFamily: "20px"}} > Fetching Recipe .... </p> }
      {
        Object.keys(obh).length === 0 && <div style={{textAlign: "center", fontSize: "20px"}} > <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
        /></div>
      }
    <div  ref={pdfref} className={dark? "body-dark": ""}>
     <div className={dark? "body-dark myrec-dark": "myrec"}>
      <img  className='imgg' src={`${obh.image}`} alt="" />
      <div className={dark? 'childd-dark':'childd'}>
      <div style={{display: "flex"}} >
      <h2> {obh.name} </h2>
      <button  onClick={downloadPDF} style={{marginLeft: "60%"}} className={dark? "darkBTN" : "BTN"} >  Download PDF <span> <FiDownload /> </span> </button>
      </div>
      <b> Recipe </b>
      <p> {obh.description} </p>
      <h4> Ingredients are:  </h4><p> {obh.ingredients}  </p>
      </div>
     </div>
    </div>
    </>
  )
}

export default Rec
