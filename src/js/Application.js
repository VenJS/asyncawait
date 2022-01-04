import EventEmitter from "eventemitter3";
import "regenerator-runtime/runtime";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  _loading = document.getElementById("progress");
  url = "https://swapi.boom.dev/api/planets";
  planets = [];

  constructor() {
    super();
    this.init();

    this.emit(Application.events.READY);
  }
  async init() {
    this._startLoading();
    await this._load();

    this._create(planets);
    this._stopLoading();
  }
  async _load(url) {
    for (let i = 0; i <= 6; i++) {
      const planetsResponse = await fetch(
        i === 0 ? this.url : this.url + "?page=" + i
      )
        .then((response) => response.json())
        .then((res) => res.results);
      this.planets = [...this.planets, ...planetsResponse];
    }
  }
  _create(planets) {
    const planetsDiv = document.getElementById("planets");
    this.planets.forEach((planet) => {
      this._render(planetsDiv, planet.name);
    });
  }
  _startLoading() {
    this._loading.className = "progress visible";
  }
  _stopLoading() {
    this._loading.className = "progress";
  }

  _render(planetsDiv, planetName) {
    const planetsName = document.createElement("li");
    planetsName.innerHTML = planetName;
    planetsDiv.appendChild(planetsName);
  }
}
