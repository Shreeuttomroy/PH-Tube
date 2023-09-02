const dataLoad = async () => {
    const loadApi = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const dataJson = await loadApi.json();
    const dataArr = dataJson.data;
    category(dataArr);
    loader(true);
    showItems(1000)
    const mainItems = document.querySelectorAll('#categories button');
    let count = 0;
    mainItems.forEach(el => {
        const dataId = dataArr[count].category_id;
        el.addEventListener('click', () => {
            showItems(dataId);
            const prevActive = document.querySelector('.active');
            prevActive.classList.remove('active')
            prevActive.classList.replace('bg-orange-500', 'bg-[#252525B2]')
            el.classList.add('active');
            el.className =el.className.replace('bg-[#252525B2]','bg-orange-500')

        })
        count++;
    })
}
function category(d) {
    const newUl = document.createElement('ul');
    newUl.classList.add('w-[370px]', 'flex', 'justify-between', 'mx-auto')
    d.forEach(element => {
        const newLi = document.createElement('button');
        newLi.type = 'button';
        newLi.classList.add('px-4', 'py-2', 'bg-[#252525B2]', 'text-black', 'rounded-sm', 'cursor-pointer')
        newLi.innerHTML = `${element.category}`
        newUl.appendChild(newLi);
    });
    const cateDiv = document.getElementById('categories');
    cateDiv.appendChild(newUl);
    const mainItems = document.querySelector('#categories button');
    mainItems.classList.add('active');
    const prevActive = document.querySelector('.active');
    prevActive.classList.replace('bg-[#252525B2]','bg-orange-500')
}
const showItems = async (d) => {
    const dataApi = await fetch(`https://openapi.programming-hero.com/api/videos/category/${d}`);
    const dataApiJson = await dataApi.json();
    const dataItems = dataApiJson.data;
    const vDiv = document.getElementById('videos');
    const vNotDiv = document.getElementById('videosNot');
    if (dataItems.length > 0) {
        vDiv.innerHTML = '';
        vNotDiv.innerHTML = '';
        vNotDiv.style.height = '';
        document.getElementById('btnSort').disabled = false;
        document.getElementById('btnSort').addEventListener('click',()=>{
            loader(true);
            dataItems.sort((d1,d2)=>parseFloat(d2.others.views)-parseFloat(d1.others.views));
            vDiv.innerHTML = '';
            vNotDiv.innerHTML = '';
            actionItems(dataItems,vDiv);
           loader(false)
        });
        actionItems(dataItems, vDiv);
    } else {
        vDiv.innerHTML = '';
        document.getElementById('btnSort').disabled = true;
        emptyData(vNotDiv);
    }
    loader(false);
}
function actionItems(q, v) {
    q.forEach(e => {
        const newDiv = document.createElement('div');
        const postHrs = Math.floor((parseInt(e.others.posted_date)/60)/60);
        const postMin = Math.floor((e.others.posted_date/60)-(postHrs*60));
        newDiv.innerHTML = `        <div class="card w-[300px] m-4 mx-auto p-0 rounded-lg shadow-xl">
        <figure class="relative"><img src="${e.thumbnail}" class="w-full h-64 bg-cover" alt="Thumbnail" />${e.others.posted_date? `<p class="absolute bottom-2 bg-[#171717] py-1 px-2 rounded-md text-white right-2">${postHrs} hrs ${postMin} min ago</p>` : ''}</figure>
        <div class="flex py-4 flex-nowrap">
            <img src="${e.authors[0].profile_picture}" class="w-[40px] rounded-3xl h-[40px] m-2" alt="">
            <div class="w-4/5 justify-end">
                <h2 class="card-title my-1">${e.title}</h2>
                <div class="flex flex-nowrap">
                    <p>${e.authors[0].profile_name}</p>
                    <span>${e.authors[0].verified? `<img class='mx-2 w-6 h-6' src="./img/tik.png" alt="">`:''}</span>
                </div>
                <p><span id="viwes" class="my-1">${e.others.views} </span>Views</p>
            </div>
        </div>
    </div>`
        v.appendChild(newDiv);
    })
}

const emptyData = (n) => {
    n.innerHTML = `
    <div class="w-[380px] h-fit mx-auto flex flex-wrap justify-center my-12 text-center">
      <img src="./img/Icon.png" class="w-28 h-28 mb-4" alt="Not Found Image"> <br>
      <p class="text-3xl text-black font-bold">Oops!! Sorry, There is no content here</p>
    </div>
    `
    n.style.height = '72vh';
}
function loader(q) {
    const loaderId = document.getElementById('loader');
    if (q) {
        loaderId.classList.remove('hidden');
    }else{
        loaderId.classList.add('hidden');
    }
}
document.getElementById('blog').addEventListener('click',()=>{
    window.location.pathname = './blog.html'
})

dataLoad();