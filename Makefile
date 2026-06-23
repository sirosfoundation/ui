# Variables
VERSION := $(shell node -p "require('./package.json').version")
NAME := ui
DIST := dist

.PHONY: install
install: ## Install dependencies
	pnpm install

.PHONY: clean
clean: ## Clean build artifacts
	pnpm clean

# Build
.PHONY: build
build: ## Build everything
	pnpm build

# Watch
.PHONY: watch
watch: ## Watch Chrome (default)
	pnpm watch

# Quality
.PHONY: lint
lint: ## Run linter
	pnpm lint

.PHONY: lint-fix
lint-fix: ## Fix lint errors
	pnpm lint:fix

.PHONY: format
format: ## Format code
	pnpm format

# Versioning
.PHONY: changeset
changeset: ## Add changeset
	pnpm changeset add

.PHONY: version
version: ## Bump version
	pnpm dotenv -e .changeset/.env -- changeset version

.PHONY: tag
tag: ## Create git tag
	pnpm changeset tag

.PHONY: prerelease-mode
prerelease-mode: ## Enter/exit prerelease mode
	pnpm changeset pre $(filter-out $@,$(MAKECMDGOALS))

# Publishing
.PHONY: publish-npm
publish-npm: clean build
	pnpm -r publish --access public
