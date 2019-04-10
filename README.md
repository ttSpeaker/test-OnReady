# Test OnReady - API MOVIES
## Endpoints:
### GET /movies/
#### No params:
Get ALL movies from DB
#### Optional query params:
`title`: search by title (or parts of it)

`year`:  all results for that year

`genre`: searh by genre available options: [
    `Action`,
    `Adventure`,
    `Animation`,
    `Biography`,
    `Comedy`,
    `Crime`,
    `Documentary`,
    `Drama`,
    `Family`,
    `Horror`,
    `Mystery`,
    `Romance`,
    `Sci-Fi`,
    `Short`,
    `Thriller`]
    
`orderBy` : title, genre_id, year *must have order type*
`orderType` : `ASC` || `DESC`

### GET /movies/:id :
Get details from particular movie

### POST /movies/
#### Insert new movie into DB with fields:
`title`: string, mandatory

`year`: INT

`duration`: INT (mins) 

`director`: string

`release`: DATE ('yyyy-mm-dd')

`score`: INT (1-10)

`poster`: string (url)

`plot`: string 

`genre`: string

`actors`:array \['name','name',..]

### PUT /movies/:id :
#### Edit details from particular movie

`title`: string

`year`: INT

`duration`: INT (mins) 

`director`: string

`release`: DATE ('yyyy-mm-dd')

`score`: INT (1-10)

`poster`: string (url)

`plot`: string 

`genre`: string

### DELETE /movies/:id
#### Virtually delete movie.
##
## Configuration
### Config dotenv:

`#APP
PORT = 3030

#DB CONFIGURATION

DBHOST = (url)

DBPORT = (MySQL port)

DBUSER = (MySQL user)

DBPASSWORD = (MySQL password)

DBSCHEMA =OnReadyPelis`

### Config node_modules:
`npm install`

### Inicializar API:
`npm run start`

