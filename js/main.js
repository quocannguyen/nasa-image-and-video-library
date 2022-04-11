const inputQTag = document.querySelector("#input-q")
const inputCenterTag = document.querySelector("#input-center")
const inputDescriptionTag = document.querySelector("#input-description")
const inputDescription508Tag = document.querySelector("#input-description-508")
const inputKeywordsTag = document.querySelector("#input-keywords")
const inputLocationTag = document.querySelector("#input-location")
const inputMediaTypeTag = document.querySelector("#input-media-type")
const inputNasaIdTag = document.querySelector("#input-nasa-id")
const inputPageTag = document.querySelector("#input-page")
const inputPhotographerTag = document.querySelector("#input-photographer")
const inputSecondaryCreatorTag = document.querySelector("#input-secondary-creator")
const inputTitleTag = document.querySelector("#input-title")
const inputYearStartTag = document.querySelector("#input-year-start")
const inputYearEndTag = document.querySelector("#input-year-end")
const searchResultListTag = document.querySelector("#section-search-result").querySelector("ul")

class NASAObject {
  constructor(nasaObject) {
    let data = nasaObject.data[0]
    this.center = data.center
    this.title = data.title
    this.id = data.nasa_id
    this.mediaType = data.media_type
    this.keywords = data.keywords
    this.description = data.description
    this.album = data.album
    this.description508 = data.description_508
    this.photographer = data.photographer
    this.secondaryCreator = data.secondary_creator
    this.links = nasaObject.links
    this.href = nasaObject.href
    this.fetchMediaUrls()
  }

  display() {
    let listItem = document.createElement("li")

    let title = document.createElement("h2")
    title.textContent = this.title
    listItem.appendChild(title)

    let mediaContainer = document.createElement("section")
    let mediaList = document.createElement("ul")
    console.log(this.mediaUrls.length)
    for (let i = 0; i < this.mediaUrls.length; i++) {
      console.log(this.mediaUrls[i])
      let mediaListItem = document.createElement("li")
      mediaListItem.textContent = this.mediaUrls[i]
      mediaList.appendChild(mediaListItem)
    }
    mediaContainer.appendChild(mediaList)
    listItem.appendChild(mediaContainer)

    let paragraphContainer = document.createElement("section")
    let description = document.createElement("p")
    description.textContent = this.description
    paragraphContainer.appendChild(description)
    listItem.appendChild(paragraphContainer)

    searchResultListTag.appendChild(listItem)
  }

  fetchMediaUrls() {
    if (!this.mediaUrls) {
      this.mediaUrls = []
      fetch(this.href)
        .then(result => result.json())
        .then(data => {
          this.mediaUrls.push(...data)
        }).catch(error => {
          console.log(error)
        })
    }
    return this.mediaUrls
  }
}

document.querySelector('button').addEventListener('click', getFetch)

function getUrl() {
  let url = `https://images-api.nasa.gov/search?`
  if (inputQTag.value != "") {
    url += `q=${inputQTag.value}`
  }
  if (inputCenterTag.value != "") {
    url += `&center=${inputCenterTag.value}`
  }
  if (inputDescriptionTag.value != "") {
    url += `&description=${inputDescriptionTag.value}`
  }
  if (inputDescription508Tag.value != "") {
    url += `&description_508=${inputDescription508Tag.value}`
  }
  if (inputKeywordsTag.value != "") {
    url += `&keywords=${inputKeywordsTag.value}`
  }
  if (inputLocationTag.value != "") {
    url += `&location=${inputLocationTag.value}`
  }
  if (inputMediaTypeTag.value != "") {
    url += `&media_type=${inputMediaTypeTag.value}`
  }
  if (inputNasaIdTag.value != "") {
    url += `&nasa_id=${inputNasaIdTag.value}`
  }
  if (inputPhotographerTag.value != "") {
    url += `&photographer=${inputPhotographerTag.value}`
  }
  if (inputSecondaryCreatorTag.value != "") {
    url += `&secondary_creator=${inputSecondaryCreatorTag.value}`
  }
  if (inputTitleTag.value != "") {
    url += `&title=${inputTitleTag.value}`
  }
  if (inputPageTag.value != "") {
    url += `&page=${inputPageTag.value}`
  }
  if (inputYearStartTag.value != "") {
    url += `&year_start=${inputYearStartTag.value}`
  }
  if (inputYearEndTag.value != "") {
    url += `&year_end=${inputYearEndTag.value}`
  }
  return url
}

function getFetch(){
  fetch(getUrl())
      .then(result => result.json()) // parse response as JSON
      .then(data => {
        let items = data.collection.items
        // console.log(items)
        searchResultListTag.innerHTML = ""
        for (let i = 0; i < items.length; i++) {
          let nasaData = new NASAObject(items[i])
          nasaData.display()
          // console.log(nasaData)
        }
      })
      .catch(error => {
          console.log(error)
      });
}