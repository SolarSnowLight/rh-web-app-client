# Node package manager
start:
	npm start

update-win:
	npm run update:packages:windows

update-lin:
	npm run update:packages:linux


# Docker
docker-build: 
	docker build -t rh-web-image:latest .

docker-run:
	docker run -d -p 3000:3000 --env-file .env --rm --name rh-web-container rh-web-image:latest

docker-run-dev:
	docker run -d -p 3000:3000 -v "C:\Projects\DevelopmentProjects\rental-housing\web-app-client:/web-app-client" -v /web-app-client/node_modules --env-file .env --rm --name rh-web-container rh-web-image:latest 

docker-stop:
	docker stop rh-web-container

docker-start:
	docker start rh-web-container