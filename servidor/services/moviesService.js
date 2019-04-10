var conDb = require("../util/conexionbd");

function getQuery(req) {
  var sql = " from movies";

  var filtersRequested = false;
  if (req.query.title || req.query.genre || req.query.year) {
    sql = sql.concat(" where ");
    if (req.query.title) {
      sql = sql.concat('title like "%' + req.query.title + '%"');
      filtersRequested = true;
    }
    if (req.query.genre) {
      if (filtersRequested) {
        sql = sql.concat(" and ");
      }
      sql = sql.concat(" genre_id = " + req.query.genre);
      filtersRequested = true;
    }
    if (req.query.year) {
      if (filtersRequested) {
        sql = sql.concat(" and ");
      }
      sql = sql.concat(" year = " + req.query.year);
      filtersRequested = true;
    }
  }
  if (filtersRequested) {
    sql = sql.concat(" and active = 1");
  } else {
    sql = sql.concat(" where active = 1");
  }
  if (req.query.orderType) {
    sql = sql.concat(
      " order by " + req.query.orderBy + " " + req.query.orderType
    );
  }
  if (req.query.ammount) {
    sql = sql.concat(" limit 0," + req.query.ammount);
  }
  sql = sql.concat(";");
  return sql;
}

function Service() {
  //Recibe query params opcionales para filtrar y/o:
  // title, genre, year, (orderBy y orderType), ammount
  this.getAll = async (req, res) => {
    var query = getQuery(req);
    var sql = "select *".concat(query);
    var countSql = "select count(id) as total".concat(query);
    console.log(sql)
    console.log(countSql)
    conDb.query(sql, function(error, respMovies) {
      conDb.query(countSql, function(error, respCount) {
        res.status(200).send(
          JSON.stringify({
            movies: respMovies,
            totalResults: respCount[0].total
          })
        );
      });
    });
  };

  this.getById = async (id, res) => {
    var sql =
      "SELECT * FROM movies m LEFT JOIN actor_movie am ON m.id = am.movie_id JOIN actors a ON am.actor_id = a.id where m.id=" +
      id +
      ";";
    conDb.query(sql, function(error, result) {
      var genreSql =
        "SELECT * FROM genre where id=" + result[0].genre_id + ";";
      conDb.query(genreSql, function(error, resultGenre) {
        var actors = [];
        var movie = {
          title: result[0].title,
          duration: result[0].duration,
          director: result[0].director,
          poster: result[0].poster,
          year: result[0].year,
          release: result[0].release,
          plot: result[0].plot,
          score: result[0].score,
          name: resultGenre[0].name
        };
        result.forEach(element => {
          actors.push(element.name);
        });
        var resp = {
          movie: movie,
          actors: actors
        };
        res.status(200).send(JSON.stringify(resp));
      });
    });

  };

  this.post = async (req, res) => {
    return "ok";
    var query =
      "INSERT INTO shops (name, image, address, lat, lon, phone, type, description, hours) VALUES (?,?,?,?,?,?,?,?,?);";
    var result = await db.query(
      query,
      [
        req.body.name,
        req.file.path,
        req.body.address,
        req.body.lat,
        req.body.lon,
        req.body.phone,
        req.body.type,
        req.body.description,
        req.body.hours
      ],
      function(error, results, fields) {
        if (error) {
          console.log("hubo un error en la consulta POST", error.message);
          return res.status(404).send("Hubo un error en la consulta POST");
        }
        res.status(200).send(JSON.stringify(results));
      }
    );
    return result;
  };

  this.put = async (req, res) => {
    return "ok";
    var query = ` UPDATE shops SET name = ?, image = ?, 
                  address = ?, lat = ?, lon = ?,
                  phone = ?, type = ?, description = ?, 
                  hours = ? WHERE id = ? ;`;
    var data = [
      req.body.name,
      req.file.path,
      req.body.address,
      req.body.lat,
      req.body.lon,
      req.body.phone,
      req.body.type,
      req.body.description,
      req.body.hours,
      req.params.id
    ];
    var result = await db.query(query, data, function(error, results, fields) {
      if (error) {
        console.log("hubo un error en la consulta PUT", error.message);
        return res.status(404).send("Hubo un error en la consulta POST");
      }
      res.status(200).send(JSON.stringify(results));
    });
    return result;
  };

  this.deleteById = async (req, res) => {
    return "ok";
    var id = req.params.id;
    var query = "DELETE FROM shops WHERE id = ?";

    var result = await db.query(query, [id], function(error, results, fields) {
      if (error) {
        console.log("hubo un error en la consulta delteById", error.message);
        return res.status(404).send("Hubo un error en la consulta delteById");
      }
      return res.status(200).send(JSON.stringify(results));
    });
    return result;
  };
}

module.exports = Service;

// function armarQuery(req) {
//     var sql = " from pelicula";

//     var filtersRequested = false;
//     if (req.query.titulo || req.query.genero || req.query.anio) {
//       sql = sql.concat(" where ");
//       if (req.query.titulo) {
//         sql = sql.concat('titulo like "%' + req.query.titulo + '%"');
//         filtersRequested = true;
//       }
//       if (req.query.genero) {
//         if (filtersRequested) {
//           sql = sql.concat(" and ");
//         }
//         sql = sql.concat(" genero_id = " + req.query.genero);
//         filtersRequested = true;
//       }
//       if (req.query.anio) {
//         if (filtersRequested) {
//           sql = sql.concat(" and ");
//         }
//         sql = sql.concat(" anio = " + req.query.anio);
//       }
//     }
//     if (req.query.tipo_orden) {
//       sql = sql.concat(
//         " order by " + req.query.columna_orden + " " + req.query.tipo_orden
//       );
//     }
//     if (req.query.cantidad) {
//       sql = sql.concat(" limit 0," + req.query.cantidad);
//     }
//     sql = sql.concat(";");
//     return sql;
//   }
//   function peliculaId(id, res) {
//     // agregar la busqueda del genero al query
//     var sql =
//       "SELECT * FROM pelicula LEFT JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id JOIN actor ON actor_pelicula.actor_id = actor.id where pelicula.id=" +
//       id +
//       ";";
//     conDb.query(sql, function(error, resultado) {
//       var generoSql =
//         "SELECT * FROM genero where id=" + resultado[0].genero_id + ";";
//       conDb.query(generoSql, function(error, resultadoGenero) {
//         var actores = [];
//         var pelicula = {
//           titulo: resultado[0].titulo,
//           duracion: resultado[0].duracion,
//           director: resultado[0].director,
//           poster: resultado[0].poster,
//           anio: resultado[0].anio,
//           fecha_lanzamiento: resultado[0].fecha_lanzamiento,
//           trama: resultado[0].trama,
//           puntuacion: resultado[0].puntuacion,
//           nombre: resultadoGenero[0].nombre
//         };
//         resultado.forEach(element => {
//           actores.push(element);
//         });
//         var respuesta = {
//           pelicula: pelicula,
//           actores: actores
//         };
//         res.send(respuesta);
//       });
//     });
//   }
//   function todasPeliculas(req, res) {
//     var query = armarQuery(req);
//     var sql = "select *".concat(query);
//     var count = "select count(id) as total".concat(query);
//     conDb.query(sql, function(error, resultado) {
//       conDb.query(count, function(errorCount, resultadoCount) {
//         var respuesta = {
//           peliculas: resultado,
//           total: resultadoCount[0].total
//         };
//         res.send(respuesta);
//       });
//     });
//   }
//   function todosGeneros(req, res) {
//     var sql = "select * from genero;";
//     conDb.query(sql, function(error, resultado) {
//       var respuesta = {
//         generos: resultado
//       };
//       res.send(respuesta);
//     });
//   }
//   function recomendacion(req, res) {
//     var anioInic = req.query.anio_inicio;
//     var anioFin = req.query.anio_fin;
//     var manyReqs = false;
//     var sql =
//       "SELECT * FROM pelicula JOIN genero ON pelicula.genero_id=genero.id ";
//     if (
//       req.query.puntuacion ||
//       (req.query.anio_inicio && req.query.anio_fin) ||
//       req.query.genero
//     ) {
//       sql = sql.concat("where");
//       if (req.query.puntuacion) {
//         sql = sql.concat(" puntuacion > " + req.query.puntuacion);
//         manyReqs = true;
//       }
//       if (req.query.anio_inicio && req.query.anio_fin) {
//         if (manyReqs) {
//           sql = sql.concat(" AND");
//         }
//         sql = sql.concat(
//           " anio BETWEEN " + req.query.anio_inicio + " AND " + req.query.anio_fin
//         );
//         manyReqs = true;
//       }
//       if (req.query.genero) {
//         if (manyReqs) {
//           sql = sql.concat(" AND");
//         }
//         sql = sql.concat(" nombre='" + req.query.genero + "'");
//       }
//     }
//     sql = sql.concat(";");
//     conDb.query(sql, function(error, resultado) {
//       var respuesta = {
//         peliculas: resultado
//       };
//       res.send(respuesta);
//     });
//   }
