import { Link, useLocation } from "react-router-dom"

const  Success = ()=>{
    const location = useLocation()
    console.log("location",location);
    return (
            <div className='m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
<p className="">{Boolean(location&&location.state&&location.state.text)} </p>
<Link to="/" />
        </div>
    )
}
export default Success