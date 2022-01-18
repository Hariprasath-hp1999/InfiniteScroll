const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");


//variables declaration for loading of images
let ready= false;
let imagesloaded = 0;
let totalImages = 0;
 
//global variable to get the infos from the link
let photoArray = [];
//URL
const count = 30;
// const apiKey = 'xnai96EY_vLnMyVX4oW1iqYB2JKRtNlMhT8soKoLIus';
const apiKey = 'b1W7HIIRrZOO4tZTNaVVBLRx7L7q810zjqEjxj3OAeY'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageloaded()
{
 
  imagesloaded++;
  if(imagesloaded === totalImages)
  {
    ready = true;
    loader.hidden=true;
    // console.log(ready);
  }
 
}

//helping function to set the attribute to the tag<a> and <img> and passing the Element(item,img) and attributes
function setAttribute(Element,attribute)
{
  for(const key in attribute)
  {
    Element.setAttribute(key,attribute[key]);
  }
}


//create elements for the links,images to display and modify in DOM structure
function displayPhotos()
{
  imagesloaded = 0;
  totalImages = photoArray.length;
  console.log(totalImages);
  photoArray.forEach((photo)=>
  {
    //add attribute for new link and target _blank to open in new tab
    const item = document.createElement('a');
    // item.setAttribute('href',photo.links.html);
    // item.setAttribute('target','_blank');
    setAttribute(item,{
      href:photo.links.html,
      target:'_blank'
    });
    // create image to display 
    const img = document.createElement('img');
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_description);
    // img.setAttribute('title',photo.alt_description);
    setAttribute(img,{
      src:photo.urls.regular,
      alt:photo.alt_description,
      title:photo.alt_description
    });

    //Check whether each loading of image is checking
    img.addEventListener('load',imageloaded);
    //the created <img> to add under <a>
    item.appendChild(img);
    //the <a> whole to add under image container div 
    imageContainer.appendChild(item);
  });
}

  async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    }
catch(error){

}
}
window.addEventListener('scroll',() =>
{
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready)
   {

    ready = false;
     getPhotos();
    
   }
});
getPhotos();

