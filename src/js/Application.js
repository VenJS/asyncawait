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

  constructor() {
    super();
    const button = document.querySelector(".button");

    button.addEventListener("click", async () => {
      this._startLoading();
      const { planets, nextUrl } = await this._load(this.url)
        .then((response) => response.json())
        .then((res) => ({ planets: res.results, nextUrl: res.next }));
      this._stopLoading();
      this.url = nextUrl;
      this._create(planets);
    });

    this.emit(Application.events.READY);
  }

  async _load(url) {
    return await fetch(url);

    // .then((res) => ({ planets: res.results, nextUrl: res.next }));

    // this.url = nextUrl;
    // return planets;
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
