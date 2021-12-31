import EventEmitter from "eventemitter3";
import "regenerator-runtime/runtime";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  _loading = document.getElementById("progress");

  constructor() {
    super();
    const button = document.querySelector(".button");

    button.addEventListener("click", async () => {
      this._startLoading();
      const planets = await this._load();
      this._stopLoading();
      this._create(planets);
    });

    this.emit(Application.events.READY);
  }

  async _load() {
    return await fetch("https://swapi.boom.dev/api/planets")
      .then((response) => response.json())
      .then((res) => res.results);
  }
  _create(planets) {
    const planetsDiv = document.getElementById("planets");
    planets.forEach((planet) => {
      const planetName = document.createElement("li");
      planetName.innerHTML = planet.name;
      planetsDiv.appendChild(planetName);
    });
  }
  _startLoading() {
    this._loading.className = "visible";
  }
  _stopLoading() {
    this._loading.className = "hidden";
  }
}
