# App

GymPass style app.

# RFs (Requisitos funcionais)

- [x] Should be possible register 
- [] Should be possible to authenticate;
- [] Should be possible get a logged user perfil
- [] Should be possible get the numbers of check-ins of users logged;
- [] Should be possible the user get his history
- [] Must be possible the user search for new gyms
- [] Must be possible the user search a gym by the name
- [] Must be possible the user search a gyms by the name
- [] Must be possible the user accomplish check-in the gym;
- [] Must be possible validate the user check-in;
- [] Must be possible register a gym;  

# RNs (Regras de negócio)

- [x] The user shoudn't register with a duplicate email;
- [] The user must'n  make twice check-ins at the same day;
- [] The user can't do the check-in if they are not at least 100 meters from the gym
- [] The check-in only can validade at least 20 minutes after created
- [] The check-in only be validade by administer
- [] The gym only be register by administrator

# RNFs (Requisitos não-funcionais)

- [x] The user password needs be encrypted;
- [x] the aplication data must be persisted in the database
- [] All lists of data must be paginate with 20 items per page;
- [] The user must be identify byt a JWT (JSON WEB Token);