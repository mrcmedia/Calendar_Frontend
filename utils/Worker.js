import Heavy from './workers/heavy';

addEventListener('message', (event) =>{
    console.log(event.data);
})


// setInterval(() => {
//     postMessage("go on")
// }, 10000);

postMessage("go on");


// 1800000