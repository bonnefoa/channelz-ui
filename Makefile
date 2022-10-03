all: build

build:
	yarn build

DOCKER_TAGS=-t bonnefoa/channelz-ui:latest \
	-t bonnefoa/channelz-ui:$(shell git describe --tags) \
	-t bonnefoa/channelz-ui:$(shell git describe --tags | awk -F. 'BEGIN{OFS="."} {print $$1,$$2}' ) \
	-t bonnefoa/channelz-ui:$(shell git describe --tags | awk -F. '{print $$1}' )

docker:
	docker build . \
		$(DOCKER_TAGS)

docker-minikube:
	eval $$(minikube docker-env) && docker build . \
		$(DOCKER_TAGS)

docker-publish:
	docker image push --all-tags bonnefoa/channelz-ui
