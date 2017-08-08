var myMVC = (function() {

	/* ----------------------- Model ----------------------- */
	var m = (function() {
		return {
			
			score: 10,

			state__button_up: false,

			_(el) {
				var all = document.querySelectorAll(el);
				return all.length > 1 ? all : document.querySelector(el);
			},

			renderAll(sel, tmpl) {
				this._(sel).innerHTML = tmpl;
			},

			renderDependingOnState(state, selector, inner) {
				if (state) return m._(selector).innerHTML = inner;
				return m._(selector).innerHTML = '';
			},


			/// Native
			putDataInElement(selector, data) {
				this._(selector).innerHTML = data;
			}

		}
	}());
	/* ----------------------- End of Model ----------------------- */





	/* ----------------------- View ----------------------- */
	var v = (function() {

		return {

			counter: {
				inner: `<div id="score"></div>`,
				tmpl() {
					return `<counter>${this.inner}</counter>`;
				}
			},

			button_up: {
				inner: `<button id="counterUp">Up</button>`,
				tmpl(state) {
					return state ? `<button_up>${this.inner}</button_up>` : `<button_up></button_up>`;
				}
			},

			renderApp() {
				return {
					entry: '#app',
					tmpl: `
						<button id="show">Show components</button>
						${this.button_up.tmpl(m.state__button_up)} 
						${this.counter.tmpl()} 
					`
				}
			},

		}
	}());
	/* ----------------------- End of View ----------------------- */





	/* ----------------------- Controller ----------------------- */
 	var c = (function() {
 		// for the most repeatings executions
		function query(htmlStr) {
			return htmlStr.slice('1', htmlStr.indexOf('>'));
		}

 		function rendBool(state, selector, inner) {
 			m.renderDependingOnState(m.state__button_up, query(v.button_up.tmpl()), v.button_up.inner)
 		}

	 	function renderAll() {
 			m.renderAll(v.renderApp().entry, v.renderApp().tmpl);
			m.putDataInElement('#score', m.score);
 		}


 		return {

 			init() {
 				renderAll();
 				// // Handlers
 				m._('#show').onclick = () => {
	 				m.state__button_up = !m.state__button_up;
 					rendBool(m.state__button_up, query(v.button_up.tmpl()), v.button_up.inner)
 				}

 				m._('button_up').onclick = () => {
 					m.score++;
 					m.putDataInElement('#score', m.score);
 				}

 			}
 		}

 	}());
 	/* ----------------------- End of Controller ----------------------- */


 	// Init
	(function() {
		c.init();
	}());
	return {
		m
	}

}());