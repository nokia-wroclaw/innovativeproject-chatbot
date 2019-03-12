# Chatbot with Watson NLU / NLP
## 1. Building images
### 1.1. Running all images locally with docker-compose
##### build images
`docker-compose -f docker-compose.yml build`  
##### start containers
`docker-compose -f docker-compose.yml up -d`  
##### stop and remove containers
`docker-compose -f docker-compose.yml down`  
or type `docker ps`,  
find image name and stop it using `docker stop [CONTAINER ID]`  

### 1.2. Running backend images locally
in InteliJ: "Maven Projects" -> "Lifecycle" -> "Install" and then:  
`cd backend/`  
`docker build -f Dockerfile.server -t spring-backend .`  
`docker run -p 8080:8080 -t spring-backend`  

### 1.3. Running frontend images locally
`cd frontend/`  
`npm run build`  
`docker build -f Dockerfile.web -t react-frontend`  
`docker run -p 3000:3000 -t react-frontend`  

## 2. Deploying to Heroku
__Dockerfiles without any extension are for production, dockerfiles *.server* and *.web* are for local development only!__
`cd backend/` or `cd frontend/`   
`heroku login`  
`heroku container:login`  
`heroku container:push web --app [APP NAME]`  
`heroku container:release web --app [APP NAME]`  
`heroku open --app [APP NAME]`  