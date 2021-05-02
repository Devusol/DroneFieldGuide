mapboxgl.accessToken = "pk.eyJ1IjoiMTA3YXZpYXRpb24iLCJhIjoiY2tuNmhzeWo2MGU5MTJ1am5jNml3cGRzNyJ9.o4UxcDcG8oQkylhgJ_OrQg";
var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/107aviation/cknouazib1olc17tclqd3gef4", // stylesheet location
  center: [-81.47, 28.45],
  zoom: 9
});
var marker = new mapboxgl.Marker({
  'color': '#314ccd'
});
var popup;
var formElement = document.getElementById("contributeForm");

//Popup Card Function
map.on("click", function (e) {
  
var resetForm = document.getElementById("regForm");

  if (resetForm) {
    console.log("form Reset")
    resetForm.reset();
  }

  if (popup) {
    popup.remove();
  }

  if (marker) {
    marker.remove();
  }

  map.flyTo({ center: e.lngLat });

  let features = map.queryRenderedFeatures(e.point, {
    layers: ["3-30-21-dfg"] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

  let feature = features[0];
  let title = feature.properties.title;
  let flightDate = feature.properties.latestDate;
  let image = feature.properties.image;
  let video = feature.properties.video;
  let htmlString;

  if (image) {
    htmlString = `<h3>${title}</h3>
    <div><button id="addPopUpBtn" class="addBtn" type="button">Rate</button></div>
    <p>${flightDate}</p><h4> Rating
    <img src="assets/images/ratings/${feature.properties.rating}.png"/></h4>
    <h6><marquee scrollamount=4>${feature.properties.comments}</marquee></h6>
    <img id="myImg" src="${image}" style="width: 300px; height: auto">`;

  } else if (video) {
    video = video.slice(video.lastIndexOf("/") + 1);
    htmlString = `<h3>${title}</h3>
    <div><button id="addPopUpBtn" class="addBtn" type="button">Rate</button></div>
    <p>${flightDate}</p><h4> Rating 
    <img src="assets/images/ratings/${feature.properties.rating}.png"/></h4>
    <h6><marquee scrollamount=4>${feature.properties.comments}</marquee></h6>
    <iframe src='https://www.youtube.com/embed/${video}' 
      title='YouTube video player' frameborder='0' allow='accelerometer; 
      autoplay; clipboard-write; encrypted-media; 
      gyroscope; picture-in-picture' allowfullscreen>
      </iframe>`;
  } else {
    console.log(`no image or video property: ${image}, ${video}`);
    htmlString = `<h3>${title}</h3>
    <div><button id="addPopUpBtn" class="addBtn" type="button">Rate</button></div>
    <p>${flightDate}</p><h4> Rating 
    <img src="assets/images/ratings/${feature.properties.rating}.png"/>
    </h4><h6><marquee scrollamount=4>${feature.properties.comments}</marquee></h6>`;
  }

  popup = new mapboxgl.Popup({
    anchor: 'bottom'
  }).setLngLat(feature.geometry.coordinates)
    .setHTML(htmlString)
    .addTo(map);

  let modal = document.getElementById("myModal");
  let img = document.getElementById("myImg");
  let modalImg = document.getElementById("img01");

  if (img) {
    img.onclick = function () {
      console.log("onclick function entered");
      modal.style.display = "block";
      modalImg.src = this.src;
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      console.log("modal closed/hidden");
      modal.style.display = "none";
    }
  }

  let popUpAdd = document.getElementById('addPopUpBtn');

  popUpAdd.addEventListener('click', function () {
    popup.setDOMContent(formElement);
  });

});

//lat long pin fnction and popup Form
map.on("click", function (e) {


  if (marker) {
    marker.remove();
  }

  let features = map.queryRenderedFeatures(e.point, {
    layers: ["3-30-21-dfg"] // replace this with the name of the layer
  });

  if (features.length) {
    return;
  }

  marker.setLngLat(e.lngLat).addTo(map);
  console.log("just added a marker");

  let popupForm = new mapboxgl.Popup({
    //offset: [0,275],
    maxWidth: 'none',
    anchor: 'top'
    //closeOnMove: true
  }).setLngLat(e.lngLat)
    .setDOMContent(formElement)
    .addTo(map);

  document.getElementById("locationInput").value = e.lngLat;

  document.getElementById("closeButt").onclick = function removeStuff() {
    popupForm.remove();
    marker.remove();
    return;
  };

  
/*   popupForm.on('close', function () {

    resetForm.reset();
    console.log("Form should reset")
  }); */

});

// Add the geocoder to the map
let geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  placeholder: "Search drone places",
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false // Do not use the default marker style
});

map.addControl(geocoder);
map.addControl(new mapboxgl.NavigationControl());
map.touchZoomRotate.disableRotation();
map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
}));


/* function mapLongClick() {

  // Create variable for setTimeout
  var delay;

  // Set number of milliseconds for longpress
  var longpress = 1300;

  var listItems = document.getElementsByClassName('list-item');
  var listItem;

  for (var i = 0, j = listItems.length; i < j; i++) {
    listItem = listItems[i];

    listItem.addEventListener('mousedown', function (e) {
      var _this = this;
      delay = setTimeout(check, longpress);

      function check() {
        _this.classList.add('is-selected');
      }

    }, true);

    listItem.addEventListener('mouseup', function (e) {
      // On mouse up, we know it is no longer a longpress
      clearTimeout(delay);
    });

    listItem.addEventListener('mouseout', function (e) {
      clearTimeout(delay);
    });

  }

}
 */



