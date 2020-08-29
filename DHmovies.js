const http = require('http');
const fs = require('fs');
let movies = require('./movies');
let faqs = require('./faqs');
let theaters = require('./theaters');
const { title } = require('process');

// Servidor
http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	
	// Route System
	switch (req.url) {
		// Home
		case '/':

			movies = movies.sort(function(a,b){
				if (a.title > b.title) return 1
				if (a.title < b.title) return -1
				return 0;
			});
			

			let listado = "";

			for (var i = 0; i < movies.length; i++){
				listado += `- ${movies[i].title} <br/>`
			}

			let content = `Bienvenidos a DH Movies el mejor sitio para encontrar las mejores películas, incluso mucho mejor que Netflix, Cuevana y PopCorn​.
			<hr/>
			<br/>
			Total de peliculas ${movies.length}
			<br/>	
			<br/>Listado de peliculas
			<br/>${listado}	
			<hr/>
			<p align=center>
			<a href="/en-cartelera">En Cartelera</a>
			- <a href="/mas-votadas">Mas Votadas</a>
			- <a href="/sucursales">Sucursales</a>
			- <a href="/contacto">Contacto</a>
			- <a href="/preguntas-frecuentes">Preguntas Frecuentes</a></p>
			`
			res.end(content);
			break;

		// En cartelera
		case '/en-cartelera':

			let listadoCartelera = "";

			for (var i = 0; i < movies.length; i++){
				listadoCartelera += `<h3>- ${movies[i].title} </h3> <strong>Reseña</strong> <br/> ${movies[i].overview} <br/><br/>`
			}	

			let cartelera= `<h1>En Cartelera</h1>
			<hr/>
			<br/> Total de peliculas: ${movies.length} <br>
			<br/>Listado de peliculas: <br/>
			<br/> ${listadoCartelera}
			<br/>
			<a href="#top"><p align=center><strong>Ir al cielo</strong></a></p>
			<p align=center><a href="/">Home</a>
			- <a href="/mas-votadas">Mas Votadas</a>
			- <a href="/sucursales">Sucursales</a>
			- <a href="/contacto">Contacto</a>
			- <a href="/preguntas-frecuentes">Preguntas Frecuentes</a></p>	
			`
			res.end(cartelera);
			break;

		case '/mas-votadas':

		
			let listadoMasVotadas = [];
			let sumaRating = 0;
			let totalPeliculas = 0;

			
			for (var i = 0; i < movies.length; i++){
                if (movies[i].vote_average >= 7){
					listadoMasVotadas.push(movies[i].title) + listadoMasVotadas.push(movies[i].overview)+ listadoMasVotadas.push(movies[i].vote_average)
					sumaRating += movies[i].vote_average
					totalPeliculas += 1

				}
			}

			promedio = sumaRating / totalPeliculas
			let promedioConDecimal = promedio.toFixed(1)
			
            let masVotadas = `<h1>Mas Votadas</h1>
            <hr/>
            <br/><strong>Total de peliculas: ${listadoMasVotadas.length} </strong>
            <br/><strong>Rating promedio: ${promedioConDecimal}</strong>
			<br/><strong> Listado de peliculas: </strong><br/>
			<br/> 
			${listadoMasVotadas}
			
			
			<a href="#top"><p align=center><strong>Ir al cielo</strong></a></p>
			<p align=center><a href="/">Home</a>
			- <a href="/en-cartelera">En Cartelera</a>
			- <a href="/sucursales">Sucursales</a>
			- <a href="/contacto">Contacto</a>
			- <a href="/preguntas-frecuentes">Preguntas Frecuentes</a></p>
			`	
			res.end(masVotadas);
			break;
		case '/sucursales':

			let totalSalas = 0
			for (var i = 0; i < theaters.length; i++){
				totalSalas += theaters[i].total_rooms
			}

			let listadoSalas = "";
			for (var i = 0; i < theaters.length; i++){
				listadoSalas += `<h3>- ${theaters[i].name} </h3> <strong>Direccion </strong> <br/> ${theaters[i].address} <br/><br/> ${theaters[i].description} <br/>`
			}

			let contentSucursales = `<h2>Sucursales</h2>
			<hr/>
			<br/>
			Total de Salas: ${totalSalas}

			${listadoSalas}

			<a href="#top"><p align=center><strong>Ir al cielo</strong></a></p>
			<p align=center><a href="/">Home</a>
			- <a href="/en-cartelera">En Cartelera</a>
			- <a href="/mas-votadas">Mas Votadas</a>
			- <a href="/contacto">Contacto</a>
			- <a href="/preguntas-frecuentes">Preguntas Frecuentes</a></p>	
			`
			res.end(contentSucursales);
			break;
		case '/contacto':

			let contacto = `<h1>Contáctanos</h1>
			<hr/>
			<br/>
			<br/> Tenés algo para contarnos? Nos encanta escuchar a nuestros
			clientes. Si deseas contactarnos podés escribirnos al siguiente email: dhmovies@digitalhouse.com o en las redes sociales. Envianos tu consulta, sugerencia o reclamo y será respondido a la brevedad posible. Recordá que también podes consultar la sección de Preguntas Frecuentes para obtener respuestas inmediatas a los problemas más comunes.
			<br/>
			<a href="#top"><p align=center><strong>Ir al cielo</strong></a></p>
			<p align=center><a href="/">Home</a>
			- <a href="/en-cartelera">En Cartelera</a>
			- <a href="/mas-votadas">Mas Votadas</a>
			- <a href="/sucursales">Sucursales</a>
			- <a href="/preguntas-frecuentes">Preguntas Frecuentes</a></p>	
			`
			res.end(contacto);
			break;
		case '/preguntas-frecuentes':

			let listadoPreguntasFrecuentes = "";

			for (var i = 0; i < faqs.length; i++){
				listadoPreguntasFrecuentes += `<br/><strong>- ${faqs[i].faq_title}</strong><br/><br/> - ${faqs[i].faq_answer}<br/>`
			}

			let contentPreguntasFrecuentes = `<h1>Preguntas Frecuentes</h1>
			<hr/>
			<br/>
			<br/>Total de preguntas: ${faqs.length}<br/>
			<br/>${listadoPreguntasFrecuentes}
			<br/>
			<a href="#top"><p align=center><strong>Ir al cielo</strong></a></p>
			<p align=center><a href="/">Home</a>
			- <a href="/en-cartelera">En Cartelera</a>
			- <a href="/contacto">Contacto</a>
			- <a href="/mas-votadas">Mas Votadas</a>
			- <a href="/sucursales">Sucursales</a></p>
			`
			res.end(contentPreguntasFrecuentes);
			break;
		default:
			res.end('404 not found')
	}
}).listen(3030, 'localhost', () => console.log('Server running in 3030 port'));
