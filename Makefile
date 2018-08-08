space:
	docker-compose up

install:
	docker-compose exec jekyll bash -c "rm -rf node_modules && npm install" #npm install

serve:
	docker-compose exec jekyll jekyll serve

gulp-watch:
	docker-compose exec jekyll node_modules/.bin/gulp watch

gulp-build:
	docker-compose exec jekyll node_modules/.bin/gulp