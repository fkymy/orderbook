build:
	docker-compose up --build

down:
	docker-compose down

down_volume:
	docker-compose down --volume

volume_clean:
	docker volume prune -f

image_clean:
	docker rmi $$(docker images -a -q)

clean:
	docker system prune -f

fclean:
	clean volume_clean image_clean
