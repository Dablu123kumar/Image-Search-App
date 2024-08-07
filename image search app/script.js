const AccessKey = 'YQpNYZijzE7VmjLfMR9jtKpgaXa_C5HYeAcbZF4glk0'

const SearchForm = document.querySelector('form')
const ImageContainer = document.querySelector('.images-container')
const SearchInput = document.querySelector('#search-input')
const LoadMoreBtn = document.querySelector('.loadMore')
let page = 1
// function to fetch images using api
const fetchImages = async (query,pageNo) => {
    try {
      if(pageNo === 1){
           ImageContainer.innerHTML = ''
      }
   
     const URL = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&page=${pageNo}&client_id=${AccessKey}`
     const response = await fetch(URL)
     const data = await response.json()
     //console.log(data)
     if(data.results.length > 0){
        data.results.forEach((photo) => {
            const ImageElement = document.createElement('div')
            ImageElement.classList.add('imgDiv')
            ImageElement.innerHTML = `<img src="${photo.urls.regular}">`
              const overlayElement = document.createElement('div')
              overlayElement.classList.add('overlay')
    
             //creating overlay text
             const overlayText = document.createElement('h3')
             overlayText.innerText = `${photo.alt_description}`
             overlayElement.appendChild(overlayText)
              ImageElement.appendChild(overlayElement)
            ImageContainer.appendChild
            (ImageElement)
        })
        if(data.total_pages === pageNo){
                 LoadMoreBtn.style.display = 'none'
        }
        else{
             LoadMoreBtn.style.display = 'block'
        }
     }
     else{
         ImageContainer.innerHTML =` <h2>OH HO SORRY NO IMAGE FOUND</h2>`
          LoadMoreBtn.style.display = 'none'
     }
   } catch (error) {
          ImageContainer.innerHTML =` <h2>Fail to search images please try again later..</h2>`
          
     }  
    
}

// adding eventlistner to search form
SearchForm.addEventListener('submit', (e) => {
    e.preventDefault()
const InputText = SearchInput.value.trim()
if(InputText !== ''){
    page=1
    fetchImages(InputText,page)
}
else{
    ImageContainer.innerHTML =` <h2>Please enter a search query...</h2>`
    if( LoadMoreBtn.style.display === 'block'){
        LoadMoreBtn.style.display = 'none'
     }
}
})

// adding eventlistner to load more button
LoadMoreBtn.addEventListener('click', () => {
    fetchImages(SearchInput.value.trim(),++page)
})