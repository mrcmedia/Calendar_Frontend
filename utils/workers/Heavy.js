export default function timing()
{
    setInterval(()=>{
        console.log(new Date().toLocaleString())
    },[1000])

}