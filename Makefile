all: build

build:
	yarn build

DOCKER_TAGS=-t bonnefoa/channelz-ui:latest \
	-t bonnefoa/channelz-ui:$(shell git describe --tags)

docker:
	docker build . \
		$(DOCKER_TAGS)

docker-minikube:
	eval $$(minikube docker-env) && docker build . \
		$(DOCKER_TAGS)
