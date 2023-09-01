const dataLoad = async () => {
    const loadApi = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const dataJson = await loadApi.json();
    const dataArr = dataJson.data;
    category(dataArr);
    const mainItems = document.querySelectorAll('#categories li');
    let count = 0;
    mainItems.forEach(el => {
        // console.log(count)
        const dataId = dataArr[count].category_id;
        el.addEventListener('click', ()=>{
            showItems(dataId);
            // console.log(dataArr[count]);
            // console.log(count);
            // const cateText = el.innerText;
            // // console.log(cateText);
            // console.log(data);
            // if(cateText.toLowerCase() === 'all'){
            //     allData();
            // }else if(cateText.toLowerCase() === 'music'){
            //     musicData();
            // }else if(cateText.toLowerCase() === 'comedy'){
            //     comedyData();
            // }else{
            //     drawingData();
            // }
            
        })
        count++;
    })
}
function category(d) {
    const newUl = document.createElement('ul');
    newUl.classList.add('w-2/6', 'flex', 'justify-between', 'mx-auto')
    d.forEach(element => {
        // console.log(element.category);
        const newLi = document.createElement('li');
        newLi.classList.add('px-4', 'py-2', 'bg-[#252525B2]', 'text-black', 'rounded-sm')
        newLi.innerHTML = `${element.category}`
        newUl.appendChild(newLi);
    });
    const cateDiv = document.getElementById('categories');
    cateDiv.appendChild(newUl);
}
const showItems=async(d)=>{
    const dataApi = await fetch(`https://openapi.programming-hero.com/api/videos/category/${d}`);
    const dataApiJson = await dataApi.json();
    const dataItems = dataApiJson.data;
    console.log(dataItems.length);
    if (dataItems.length > 0) {
        actionItems(dataItems); 
    }else{
        console.log('Empty');    
    }
}
const actionItems = q=>{
    q.forEach(e=>{
        const vDiv = document.getElementById('#videos');
        const newDiv = document.createElement('div');
        newDiv.ineerHtml = `

        `
    })
}


dataLoad();
// const allData = async()=>{
//     const allDataApi = await fetch(``)
// }
// const musicData=async()=>{
//     console.log('Music Data');
// }
// const comedyData = async()=>{
//     console.log('Comedy Data');
// }
// const drawingData = async()=>{
//     console.log('Drawing Data');
// }