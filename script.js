let input = document.getElementById('block__input')
let button = document.querySelector('.button__block')

let news = ''

let ul = document.querySelector('.block__news')

let page = 1

let prevBtn = document.querySelector('.prev__page')
let currentPage = document.querySelector('.current__page')
let nextBtn = document.querySelector('.next__page')

let apiKey = '87b4e5f0822f4a85a2cb266d37b1ecd6'

let apiURL = 'https://newsapi.org/v2/everything'

function fetchNews() {
    let url = `${apiURL}?q=${news}&page=${page}&pageSize=20&apiKey=${apiKey}`
    fetch(url, { methode: 'GET' })
        .then(response => response.json())
        .then(value => {
            ul.innerHTML = ''
            value.articles.forEach((item) => {
                let li = document.createElement('li')
                li.innerHTML = `<a href="${item.url}" target="_blank" rel="noopener noreferrer">
                    <article>
                        <img src="${item.urlToImage || 'https://via.placeholder.com/480'}" alt="${item.title}">
                        <h2>${item.title}</h2>
                        <p>Posted by: ${item.author || 'Unknown'}</p>
                        <p>${item.description || 'No description available'}</p>
                    </article>
                </a>`;
                ul.append(li)
            });

            if (value.articles.length === 0) {
                ul.innerHTML = `<li>No news</li>`
            }

            pagination(value.totalResults)
        })
}

button.addEventListener('click', function () {
    let inputV = input.value
    if (inputV !== news) {
        news = inputV
        fetchNews()
    }
})

nextBtn.addEventListener('click', function () {
    page++
    fetchNews()
})

prevBtn.addEventListener('click', function () {
    if (page > 1) {
        page--
        fetchNews()
    }
})

function pagination(totalResults) {
    let totalPages = Math.ceil(totalResults / 20)
    currentPage.textContent = `Page ${page} of ${totalPages}`

    nextBtn.disabled = page >= totalPages;
    prevBtn.disabled = page <= totalPages;
}