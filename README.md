# test-akeneo

- fastapi python backend with a SQL database
- UI with React

## functionalities

users can:

- [] create a list of participants
- [] create a blacklist of participants and link to a participant
- [] start a draw
  - [] each participant draw a gift
  - [] each participant receive a gift
  - [] blacklist is respected
- [] see last 5 draws

## todo

- [x] create participant api (list, create) and model : `id`, `name`, `blacklist`, `gift`
- [x] create draw model : `id`, `date`, `participants`, `draws`
- [x] create start draw api
- [x] create get last 5 draws api
- [] frontend for participants
- [] frontend for draws
