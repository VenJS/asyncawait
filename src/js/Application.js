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
      const planets = await this._load();
      this._create(planets);
    });

    this.emit(Application.events.READY);
  }

  async _load() {
    this._startLoading();
    const allPlanets = await fetch("https://swapi.boom.dev/api/planets")
      .then((response) => response.json())
      .then((res) => res.results);
    this._stopLoading();
    return allPlanets;
  }
  _create(planets) {
    const planetsDiv = document.getElementById("planets");
    planets.forEach((planet) => {
      this._render(planetsDiv, planet.name);
    });
  }
  _startLoading() {
    this._loading.className = "visible";
  }
  _stopLoading() {
    this._loading.className = "hidden";
  }

  _render(planetsDiv, planetName) {
    const planetsName = document.createElement("li");
    planetsName.innerHTML = planetName;
    planetsDiv.appendChild(planetsName);
  }
}
