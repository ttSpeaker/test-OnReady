# Test OnReady - API MOVIES
## Endpoints:
### GET /movies/
#### No params
Get ALL movies from DB
#### Optional query params
`<title>`: search by title (or parts of it)

year:  all results for that year

genre: searh by genre available options:
    -Action
    -Adventure
    -Animation
    -Biography
    -Comedy
    -Crime
    -Documentary
    -Drama
    -Family
    -Horror
    -Mystery
    -Romance
    -Sci-Fi
    -Short
    -Thriller
    
orderBy : title, genre_id, year *must have order type*
orderType :ASC || DESC


## Configuration
### Config dotenv:

#APP
PORT = 3030

#DB CONFIGURATION

DBHOST = (url)

DBPORT = (MySQL port)

DBUSER = (MySQL user)

DBPASSWORD = (MySQL password)

DBSCHEMA =OnReadyPelis

### Config node_modules:
npm install

### Inicializar API:
npm run start

