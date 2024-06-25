import("leaflet").then((L) => {
  let map = L.map("map").setView([54.4618725, 17.0486302], 16);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  let marker;

  function updateForm(lat, lng, name = "", description = "") {
    document.getElementById("place-name").value = name;
    document.getElementById("place-description").value = description;
    document.getElementById("place-coordinates").value = `${lat}, ${lng}`;
    document.getElementById("details-form").style.display = "block";
  }

  map.on("dblclick", function (e) {
    let lat = e.latlng.lat;
    let lng = e.latlng.lng;

    if (marker) {
      map.removeLayer(marker);
    }

    marker = L.marker([lat, lng], { draggable: true }).addTo(map);

    marker
      .bindPopup(
        `<b>${document.getElementById("place-name").value}</b><br>${document.getElementById("place-description").value}`
      )
      .openPopup();

    updateForm(lat, lng);

    marker.on("dragend", function (event) {
      var newLatLng = event.target.getLatLng();
      updateForm(
        newLatLng.lat,
        newLatLng.lng,
        document.getElementById("place-name").value,
        document.getElementById("place-description").value
      );
    });
  });

  document.getElementById("place-name").addEventListener("input", function () {
    if (marker) {
      marker
        .getPopup()
        .setContent(
          `<b>${this.value}</b><br>${document.getElementById("place-description").value}`
        )
        .openOn(map);
    }
  });

  document
    .getElementById("place-description")
    .addEventListener("input", function () {
      if (marker) {
        marker
          .getPopup()
          .setContent(
            `<b>${document.getElementById("place-name").value}</b><br>${this.value}`
          )
          .openOn(map);
      }
    });
});
