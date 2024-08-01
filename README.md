# test-akeneo

- fastapi python backend with a SQL database
- UI with React

## functionalities

users can:

- [x] create a list of participants
- [x] create a blacklist of participants
- [x] start a draw
  - [x] each participant draw a gift
  - [x] each participant receive a gift
  - [x] blacklist is respected
- [x] see last 5 draws

## todo

- [x] create participant api (list, create) and model : `id`, `name`, `blacklist`, `gift`
- [x] create draw model : `id`, `date`, `participants`, `draws`
- [x] create start draw api
- [x] create get last 5 draws api
- [x] frontend for participants
- [x] frontend for draws
