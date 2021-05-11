# ibm-banking-api
An API for facilitating banking services. The API exposes various endpoints for Bank Management (as a bank operator).

## [API Documentation](https://documenter.getpostman.com/view/4731543/TVsrDTdv) 

### Steps to setup the repository

1. Clone the repository 
	`git clone https://github.com/ojaswa1942/ibm-banking-api.git` 

2. Change directory
`cd ibm-banking-api`

3. Add `.env` file and add secrets. The format is specified in `.env.example`. (Or run `cp .env.example .env`) 

4. Run `sudo docker-compose up -d`
This download and setup all the required services and start in detached mode. Kindly install docker and docker-compose by referring to official documentation.

5. [Optional] If you want to follow logs: You can run `sudo docker-compose logs -f`

### Usage
Kindly refer to the [API Documentation](https://documenter.getpostman.com/view/4731543/TVsrDTdv) for detailed information and examples about all the endpoints.

1. Login with default username and password (admin): ("ojaswa1942@gmail.com", "tester") via the `/api/auth` endpoint.

2. Use the token obtained by step 1 in Authorization Header (`Authorization: Bearer ${token}`) for all subsequent requests.

3. You can now perform the following actions:
	- Create more Admin accounts (only via `ojaswa1942@gmail.com` account).
	- Create a bank account (Default balance: 25,000, type: Savings) (Required: Name, Email)
	- Get account details by account number
	- Search for all accounts by matching name and/or email
	- Transfer money from one account to another (source, destination, amount)

### Notes for reference
- Mongo Replicasets require a pre-shared key between each replica instance or authorization. However, I've noticed that it was not required when setting up via docker-compose, and only seem to be essential in a certain case, which I could not yet identify.

- Initiating the Mongo Replicaset (in mongo-0):
```
mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD eval 'rs.initiate({_id: "rs0", version: 1, members: [ {_id: 0, host: "mongo-0.mongo-service.default.svc.cluster.local:27017"} ] });'
```
(Members can be added in accordance with the number of replicas)