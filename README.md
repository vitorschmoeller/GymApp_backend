# App

GymPass style app.

# RFs (Requisitos funcionais)

- [x] Should be possible register 
- [x] Should be possible to authenticate;
- [x] Should be possible get a logged user perfil
- [x] Should be possible get the numbers of check-ins of users logged;
- [x] Should be possible the user get his history
- [x] Must be possible the user search for near gyms (up to 10km)
- [x] Must be possible the user search a gym by the name
- [x] Must be possible the user accomplish check-in the gym;
- [x] Must be possible validate the user check-in;
- [x] Must be possible register a gym;  

# RNs (Regras de negócio)

- [x] The user shoudn't register with a duplicate email;
- [x] The user can't make twice check-ins at the same day;
- [x] The user can't do the check-in if they are not at least 100 meters from the gym
- [x] The check-in only can validade at least 20 minutes after created
- [x] The check-in only be validade by administer
- [x] The gym only be register by administrator

# RNFs (Requisitos não-funcionais)

- [x] The user password needs be encrypted;
- [x] the aplication data must be persisted in the database
- [x] All lists of data must be paginate with 20 items per page;
- [x] The user must be identify byt a JWT (JSON WEB Token);


- [x] Teste E2E