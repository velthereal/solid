class ApiService{
	request(url){
		return fetch(url).then(res => res.json());
	}
}
class WidgetMaker {
	constructor(...widgets) {
		this.widgets = widgets;
		this.apiService = new ApiService();
		for (const w of widgets) {
			w.apiService = this.apiService;
		}
	}
	render() {
		this.widgets.forEach((w) => w.render());
	}
}
class WidgetMakerSmall {
	constructor(...widgets) {
		this.widgets = widgets;
		this.apiService = new ApiService();
		for (const w of widgets) {
			w.apiService = this.apiService;
		}
	}
	render() {
		this.widgets.forEach((w) => w.renderSmall());
	}
}
class Rate {
	constructor(selector, smallSelector) {
		this.element = document.querySelector(selector);
		this.smallElement = document.querySelector(smallSelector);
	}
	render() {
		this.apiService.request('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5')	
		.then((currencyU) => {
				let usd = Math.round(currencyU[0].sale * 100) / 100;

				let div = document.createElement("div");
				div.style.border = "2px solid gray";
				div.style.display = "inline-block";
				div.style.width = "100px";
				div.style.padding = "5px";
				div.style.textAlign = "center";
				div.style.margin = "10px";
				div.innerHTML = `<img style="width:90%" src="../images/usd.png" alt="usd" /> <b>${usd}</b>`;
				this.element.insertAdjacentElement("beforeend", div);
			});
	}
	renderSmall() {
		this.apiService.request('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5')	
		.then((currencyU) => {
				let usd = Math.round(currencyU[0].sale);

				let div = document.createElement("div");
				div.style.border = "2px solid gray";
				div.style.display = "inline-block";
				div.style.width = "60px";
				div.style.padding = "5px";
				div.style.textAlign = "center";
				div.style.margin = "10px";
				div.innerHTML = `<img style="width:90%" src="../images/usd.png" alt="usd" /> <b>${usd}</b>`;
				this.smallElement.insertAdjacentElement("beforeend", div);
		});
	}
}

class RateUE extends Rate {
	constructor(selector, smallSelector) {
		super(selector, smallSelector);
	}
	render() {
		super.render();
		this.apiService.request('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5')
			.then((currencyU) => {
				let eur = Math.round(currencyU[1].sale * 100) / 100;

				let div = document.createElement("div");
				div.style.border = "2px solid gray";
				div.style.display = "inline-block";
				div.style.width = "100px";
				div.style.padding = "5px";
				div.style.textAlign = "center";
				div.style.margin = "10px";
				div.innerHTML = `<img style="width:90%" src="../images/eur.png" alt="usd" /> <b>${eur}</b>`;
				this.element.insertAdjacentElement("beforeend", div);
			});
	}
	renderSmall() {
		super.render();
		this.apiService.request('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5')
			.then((currencyU) => {
				let eur = Math.round(currencyU[1].sale);

				let div = document.createElement("div");
				div.style.border = "2px solid gray";
				div.style.display = "inline-block";
				div.style.width = "60px";
				div.style.padding = "5px";
				div.style.textAlign = "center";
				div.style.margin = "10px";
				div.innerHTML = `<img style="width:90%" src="../images/eur.png" alt="usd" /> <b>${eur}</b>`;
				this.smallElement.insertAdjacentElement("beforeend", div);
			});
	}
}

class Moon {
	constructor(selector, smallSelector) {
		this.element = document.querySelector(selector);
		this.smallElement = document.querySelector(smallSelector);
	}
	render() {
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		
		this.apiService.request(`https://www.icalendar37.net/lunar/api/?year=${year}&month=${month}&shadeColor=gray&size=90&texturize=true`)
			.then((moon) => {
				let part = Math.round(moon.phase[day].lighting * 100) / 100;
				let div = document.createElement("div");
				div.style.border = "2px solid gray";
				div.style.display = "inline-block";
				// div.style.width = "100px";
				div.style.padding = "5px";
				div.style.textAlign = "center";
				div.style.margin = "10px";
				div.innerHTML = `<div>${moon.phase[day].svg}</div> <b>${part}%</b>`;
				this.element.insertAdjacentElement("beforeend", div);
			});
	}
	renderSmall() {
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		this.apiService.request(`https://www.icalendar37.net/lunar/api/?year=${year}&month=${month}&shadeColor=gray&size=45&texturize=true`)
			.then((moon) => {
				let part = Math.round(moon.phase[day].lighting);
				let div = document.createElement("div");
				div.style.border = "2px solid gray";
				div.style.display = "inline-block";
				// div.style.width = "100px";
				div.style.padding = "5px";
				div.style.textAlign = "center";
				div.style.margin = "10px";
				div.innerHTML = `<div>${moon.phase[day].svg}</div> <b>${part}%</b>`;
				this.smallElement.insertAdjacentElement("beforeend", div);
			});
	}
}

class Moon3 extends Moon {
	constructor(selector) {
		super(selector);
	}
	render() {
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		if(day === 1){
			if(month === 1){
				month = 12;
				year--;
			} else {
				month--;
			}
			day = new Date(year, month, 0).getDate();
		}
		if(day === new Date(year, month, 0).getDate()){
			if(month === 12){
				month = 1;
				year++;
			} else {
				month++;
			}
			day = 1;
		}
		this.apiService.request(`https://www.icalendar37.net/lunar/api/?year=${year}&month=${month}&shadeColor=gray&size=90&texturize=true`)
			.then((moon) => {
				let part = Math.round(moon.phase[day].lighting * 100) / 100;
				let div = document.createElement("div");
				div.style.border = "2px solid gray";
				div.style.display = "inline-block";
				// div.style.width = '100px';
				div.style.padding = "5px";
				div.style.textAlign = "center";
				div.style.margin = "10px";
				div.innerHTML = `<div>${moon.phase[day - 1].svg}${moon.phase[day].svg}${moon.phase[day + 1].svg
					}</div> <b>${part}%</b>`;
				this.element.insertAdjacentElement("beforeend", div);
			});
	}
}