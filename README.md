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

- [] create participant api and model : `id`, `name`, `blacklist`, `gift`
- [] create draw model : `id`, `date`, `participants`, `draws`
- [] create start draw api
- [] create get last 5 draws api
