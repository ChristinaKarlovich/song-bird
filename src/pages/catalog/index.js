import './style.scss';
import birdsdata from '../../assets/birdsdata';

let divWrapper = null;

setCatalog();

function closeCatalogItemInfo(event) {
  if (event.target != null && event.target === divWrapper) {
    document.body.removeChild(divWrapper);
  }
}

function showCatalogItemInfo(element) {
  divWrapper = document.createElement('div');
  divWrapper.id = 'element-info-wrapper';
  divWrapper.classList.add('element-info-wrapper');
  divWrapper.addEventListener('click', (event) => {
    closeCatalogItemInfo(event);
  });
  document.body.append(divWrapper);

  let divInfo = document.createElement('div');
  divInfo.classList.add('element-info');
  divWrapper.append(divInfo);

  let imgBird = document.createElement('img');
  imgBird.classList.add('element-image');
  imgBird.src = element.image;
  divInfo.append(imgBird);

  let pName = document.createElement('div');
  pName.classList.add('element-name');
  pName.innerText = element.name;
  divInfo.append(pName);

  let pSpecies = document.createElement('div');
  pSpecies.classList.add('element-species');
  pSpecies.innerHTML = element.species;
  divInfo.append(pSpecies);

  let pDescription = document.createElement('div');
  pDescription.classList.add('element-description');
  pDescription.innerHTML = element.description;
  divInfo.append(pDescription);

  let audioSong = document.createElement('audio');
  audioSong.classList.add('element-audio');
  audioSong.src = element.audio;
  audioSong.controls = true;
  divInfo.append(audioSong);
}

function setCatalog() {
  var birdsList = birdsdata.flat();

  var itemUl = document.getElementById('catalog-list');
  birdsList
    .sort((a, b) => {
      if (a.name > b.name) return 1;
      else if (a.name < b.name) return -1;
      else return 0;
    })
    .forEach((element) => {
      var itemLi = document.createElement('li');
      itemLi.classList.add('catalog-item');
      itemLi.addEventListener('click', () => {
        showCatalogItemInfo(element);
      });
      itemUl.appendChild(itemLi);

      var divContent = document.createElement('div');
      divContent.classList.add('catalog-item-content');
      divContent.style.backgroundImage = `url(${element.image})`;

      var divName = document.createElement('div');
      divName.classList.add('catalog-item-name');
      divName.innerText = element.name;

      divContent.append(divName);
      itemLi.appendChild(divContent);
    });
}
