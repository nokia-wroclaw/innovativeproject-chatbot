# Chatbot with Watson NLU / NLP
## Building images
### with docker-compose
##### build images
`docker-compose -f docker-compose.yml build`
##### start containers
`docker-compose -f docker-compose.yml up -d`
##### stop and remove containers
`docker-compose -f docker-compose.yml down`

### individual images
##### run container
`docker build -t [IMAGE] .`
`docker run -p 8080:8080 -t [IMAGE]`

##### stop container
`docker ps`
`docker stop [CONTAINER ID]`