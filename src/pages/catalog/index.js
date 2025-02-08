import birdsdata from '../../assets/birdsdata';

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
    itemUl.appendChild(itemLi);

    var divContent = document.createElement('div');
    var divName = document.createElement('div');
    divName.innerText = element.name;
    var divSpecies = document.createElement('div');
    divSpecies.innerText = element.species;
    var imgBird = document.createElement('img');
    imgBird.src = element.image;

    var audioSong = document.createElement('audio');
    audioSong.src = element.audio;
    audioSong.controls = true;

    var pDescription = document.createElement('p');
    pDescription.innerText = element.description;

    divContent.append(divName, divSpecies, imgBird, audioSong, pDescription);
    itemLi.appendChild(divContent);
  });
