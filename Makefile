all:
	@echo "The Makefile is working!"
	./scripts/activate.sh
	# This is your existing 'all' target
all:
	@echo "The Makefile is working!"
	./scripts/activate.sh

# This is your new 'save' target
save:
	git add .
	git commit -m "Automatic update via Makefile"
	git push origin main
	all:
	@echo "The Makefile is working!"
	./scripts/activate.sh

save:
	git add .
	git commit -m "Automatic update"
	git push origin main