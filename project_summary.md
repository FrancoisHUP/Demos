# Table of Contents
- .gitignore
- .gitlab-ci.yml
- .gitmodules
- docker-compose.dev.yml
- docker-compose.yml
- README.md
- certs\linum-domain.crt
- certs\linum-domain.key
- sbh-auth\.gitignore
- sbh-auth\app.py
- sbh-auth\config.py
- sbh-auth\Dockerfile
- sbh-auth\README.md
- sbh-auth\requirements.txt
- sbh-auth\website\models.py
- sbh-auth\website\oauth2.py
- sbh-auth\website\routes.py
- sbh-auth\website\settings.py
- sbh-auth\website\__init__.py
- sbh-auth\website\static\style.css
- sbh-auth\website\templates\authorize.html
- sbh-auth\website\templates\create_client.html
- sbh-auth\website\templates\create_user.html
- sbh-auth\website\templates\home.html
- sbh-backend\.dockerignore
- sbh-backend\.gitignore
- sbh-backend\Dockerfile
- sbh-backend\README.md
- sbh-backend\requirements.txt
- sbh-backend\start.ps1
- sbh-backend\start.sh
- sbh-backend\src\database.py
- sbh-backend\src\main.py
- sbh-backend\src\namespaces\auth.py
- sbh-backend\src\namespaces\experiment.py
- sbh-backend\src\namespaces\image.py
- sbh-backend\src\namespaces\neuroglancer.py
- sbh-backend\src\namespaces\ROI.py
- sbh-backend\src\namespaces\template.py
- sbh-backend\src\namespaces\user.py
- sbh-backend\src\neuroglancer_manager\neuroglancer_manager.py
- sbh-backend\src\tables\experiment.py
- sbh-backend\src\tables\image.py
- sbh-backend\src\tables\neuroglancer.py
- sbh-backend\src\tables\ROI.py
- sbh-backend\src\tables\user.py
- sbh-backend\src\util\util.py
- sbh-backend\test\basetest.py
- sbh-backend\test\test.py
- sbh-backend\test\testtest.py
- sbh-backend\test\test_experience.py
- sbh-backend\test\test_roi.py
- sbh-file-server\.gitignore
- sbh-file-server\Dockerfile
- sbh-file-server\README.md
- sbh-file-server\start.ps1
- sbh-file-server\start.sh
- sbh-file-server\temp_list_of_tokens.txt
- sbh-file-server\sbh_file_server.egg-info\dependency_links.txt
- sbh-file-server\sbh_file_server.egg-info\PKG-INFO
- sbh-file-server\sbh_file_server.egg-info\requires.txt
- sbh-file-server\sbh_file_server.egg-info\SOURCES.txt
- sbh-file-server\sbh_file_server.egg-info\top_level.txt
- sbh-file-server\src\cashed_tokens.json
- sbh-file-server\src\cleanup.py
- sbh-file-server\src\file_server.py
- sbh-file-server\src\setup.py
- sbh-file-server\src\utils.py
- sbh-file-server\src\database\main.py
- sbh-frontend\.browserslistrc
- sbh-frontend\.eslintrc.js
- sbh-frontend\.gitignore
- sbh-frontend\babel.config.js
- sbh-frontend\Dockerfile
- sbh-frontend\package.json
- sbh-frontend\README.md
- sbh-frontend\vue.config.js
- sbh-frontend\public\demos.json
- sbh-frontend\public\experiments.json
- sbh-frontend\public\index.html
- sbh-frontend\src\App.vue
- sbh-frontend\src\main.ts
- sbh-frontend\src\shims-vue.d.ts
- sbh-frontend\src\components\Experiment.vue
- sbh-frontend\src\plugins\axios.ts
- sbh-frontend\src\plugins\vuetify.ts
- sbh-frontend\src\plugins\webfontloader.ts
- sbh-frontend\src\router\index.ts
- sbh-frontend\src\store\index.ts
- sbh-frontend\src\types\ExperimentType.ts
- sbh-frontend\src\types\MenuItem.ts
- sbh-frontend\src\types\ViewerPayload.ts
- sbh-frontend\src\views\AboutView.vue
- sbh-frontend\src\views\AuthentificationView.vue
- sbh-frontend\src\views\ExperiementView.vue
- sbh-frontend\src\views\ForgotPasswordView.vue
- sbh-frontend\src\views\HomeView.vue
- sbh-frontend\src\views\NeuroglancerViewer.vue
- sbh-frontend\src\views\RegisterView.vue
- sbh-frontend\src\views\ViewerView.vue

## File: .gitignore

- Extension: 
- Language: unknown
- Size: 396 bytes
- Created: 2024-07-26 11:29:59
- Modified: 2024-07-26 11:29:59

### Code

```unknown
*config.json
*.db
.env
.DS_Store
.vscode/
.idea/
.devcontainer
*__pycache__*

# Unit test / coverage reports
api/htmlcov/
api/.tox/
api/.coverage
api/.coverage.*
api/.cache
api/nosetests.xml
api/coverage.xml
api/*.cover
api/.hypothesis/

# Tests reports for gitlab CI
api/tests-reports/

#
annotation/
mouse_connectivity/
manifest.json
structures.json
secrets/
data/*
```

## File: .gitlab-ci.yml

- Extension: .yml
- Language: yaml
- Size: 153 bytes
- Created: 2024-07-26 11:29:59
- Modified: 2024-07-26 11:29:59

### Code

```yaml
build-job:
  stage: build
  script:
    - echo "Hello, $GITLAB_USER_LOGIN!"

test-job:
  stage: test
  script:
    - echo "Running unit tests..."
```

## File: .gitmodules

- Extension: 
- Language: unknown
- Size: 503 bytes
- Created: 2024-07-26 11:29:59
- Modified: 2024-07-26 11:29:59

### Code

```unknown
[submodule "sbh-backend"]
	path = sbh-backend
	url = git@github.com:linum-uqam/sbh-backend.git
[submodule "neuroglancer"]
	path = neuroglancer
	url = git@github.com:linum-uqam/neuroglancer.git
[submodule "sbh-frontend"]
	path = sbh-frontend
	url = git@github.com:linum-uqam/sbh-frontend.git
[submodule "sbh-auth"]
	path = sbh-auth
	url = git@github.com:linum-uqam/sbh-auth.git
[submodule "sbh-file-server"]
	path = sbh-file-server
	url = https://github.com/linum-uqam/sbh-file-server.git

```

## File: docker-compose.dev.yml

- Extension: .yml
- Language: yaml
- Size: 938 bytes
- Created: 2024-07-26 11:29:59
- Modified: 2024-07-26 11:29:59

### Code

```yaml

version: "3.9"
services:
  backend:
    build: sbh-backend/
    image: sbh-backend
    ports:
      - "5000:5000"
      - "9000:9000"
    volumes:
      - ./sbh-backend/src:/sbh-backend/src
    networks:
      - sbh-network
    depends_on:
      - auth
    env_file:
      - secrets/.env.backend
    
  frontend:
    build: sbh-frontend/
    image: sbh-frontend
    volumes:
      - ./sbh-frontend:/sbh-frontend
      - /sbh-frontend/node_modules
    ports:
      - "8080:8080"
    environment:
      - CHOKIDAR_USEPOLLING=true
      - NODE_ENV=development
    stdin_open: true
    tty: true
  
  auth:
    build: sbh-auth/
    image: sbh-auth
    ports:
      - "5001:5001"
    volumes:
      - ./sbh-auth/:/sbh-auth/
    networks:
      - sbh-network
    env_file:
      - secrets/.env.auth

  # file-server: 
  #   build: sbh-file-server/

networks:
  sbh-network:
    driver: bridge

```

## File: docker-compose.yml

- Extension: .yml
- Language: yaml
- Size: 1478 bytes
- Created: 2024-07-26 11:29:59
- Modified: 2024-07-26 11:29:59

### Code

```yaml

version: "3.9"
services:
  backend:
    build:
      # Needs to have the hole project context to install local neuroglancer version. See sbh-backend/Dockerfile for more info
      context: ./ 
      dockerfile: ./sbh-backend/Dockerfile 
    image: sbh-backend
    ports:
      - "5000:5000"
      - "9000:9000"
    volumes:
      - ./sbh-backend/src:/sbh-backend/src
    networks:
      - sbh-network
    depends_on:
      - auth
    env_file:
      - secrets/.env.backend
    
  frontend:
    build: sbh-frontend/
    image: sbh-frontend
    volumes:
      - ./sbh-frontend:/sbh-frontend
      - /sbh-frontend/node_modules
    ports:
      - "8080:8080"
    environment:
      - CHOKIDAR_USEPOLLING=true
      - NODE_ENV=development
    stdin_open: true
    tty: true
  
  auth:
    build: sbh-auth/
    image: sbh-auth
    ports:
      - "5001:5001"
    volumes:
      - ./sbh-auth/:/sbh-auth/
    networks:
      - sbh-network
    env_file:
      - secrets/.env.auth

  file-server: 
    build: sbh-file-server/
    image: sbh-file-server
    ports:
      - "8866:8866"
    volumes:
      - ./sbh-file-server/src:/sbh-file-server/src
      - ./data:/sbh-file-server/data
      - ./certs:/sbh-file-server/certs 
    networks:
        - sbh-network
    environment:
      - CERTIFICATES_PATH=/sbh-file-server/certs/
    env_file:
        - secrets/.env.file_server

networks:
  sbh-network:
    driver: bridge

```

## File: README.md

- Extension: .md
- Language: markdown
- Size: 889 bytes
- Created: 2024-07-26 11:29:59
- Modified: 2024-07-26 11:29:59

### Code

```markdown
# sbh-assistant

![Description of image](logo_light.png)

## Installation

Get de secret key and use this directories structure :

```
sbh-assistant/
|-- docker-compose.yml
|-- secrets/
    |-- .env.auth
    |-- .env.backend
    |-- ...
|-- certs/
    |-- linum-domain.crt
    |-- linum-domain.key
|-- data/
    |-- allen_average_template_10um_pir.zarr
```

We need to initialize and fetch the code for the submodules

```bash
$ git submodule update --init --recursive
```

We are using `docker-compose` to deploy the application. It can be launched with the following commands

```bash
$ docker compose up --build
```

## Development

To use the tool in development mode, enabling hot reloading when a change is made in the code, launch the application with the following command

```bash
$ docker compose -f docker-compose.dev.yml up --build
```

```

## File: certs\linum-domain.crt

- Extension: .crt
- Language: unknown
- Size: 1456 bytes
- Created: 2024-07-26 11:29:59
- Modified: 2024-07-26 11:29:59

### Code

```unknown
-----BEGIN CERTIFICATE-----
MIID...8zCCw==
-----END CERTIFICATE-----

```

## File: certs\linum-domain.key

- Extension: .key
- Language: unknown
- Size: 1736 bytes
- Created: 2024-07-26 11:29:59
- Modified: 2024-07-26 11:29:59

### Code

```unknown
-----BEGIN PRIVATE KEY-----
MIIEv...9CZA==
-----END PRIVATE KEY-----

```

## File: sbh-auth\.gitignore

- Extension: 
- Language: unknown
- Size: 5078 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
### JetBrains template
# Covers JetBrains IDEs: IntelliJ, RubyMine, PhpStorm, AppCode, PyCharm, CLion, Android Studio, WebStorm and Rider
# Reference: https://intellij-support.jetbrains.com/hc/en-us/articles/206544839

# User-specific stuff
.idea/**/workspace.xml
.idea/**/tasks.xml
.idea/**/usage.statistics.xml
.idea/**/dictionaries
.idea/**/shelf

# AWS User-specific
.idea/**/aws.xml

# Generated files
.idea/**/contentModel.xml

# Sensitive or high-churn files
.idea/**/dataSources/
.idea/**/dataSources.ids
.idea/**/dataSources.local.xml
.idea/**/sqlDataSources.xml
.idea/**/dynamic.xml
.idea/**/uiDesigner.xml
.idea/**/dbnavigator.xml

# Gradle
.idea/**/gradle.xml
.idea/**/libraries

# Gradle and Maven with auto-import
# When using Gradle or Maven with auto-import, you should exclude module files,
# since they will be recreated, and may cause churn.  Uncomment if using
# auto-import.
# .idea/artifacts
# .idea/compiler.xml
# .idea/jarRepositories.xml
# .idea/modules.xml
# .idea/*.iml
# .idea/modules
# *.iml
# *.ipr

# CMake
cmake-build-*/

# Mongo Explorer plugin
.idea/**/mongoSettings.xml

# File-based project format
*.iws

# IntelliJ
out/

# mpeltonen/sbt-idea plugin
.idea_modules/

# JIRA plugin
atlassian-ide-plugin.xml

# Cursive Clojure plugin
.idea/replstate.xml

# SonarLint plugin
.idea/sonarlint/

# Crashlytics plugin (for Android Studio and IntelliJ)
com_crashlytics_export_strings.xml
crashlytics.properties
crashlytics-build.properties
fabric.properties

# Editor-based Rest Client
.idea/httpRequests

# Android studio 3.1+ serialized cache file
.idea/caches/build_file_checksums.ser

### Example user template template
### Example user template

# IntelliJ project files
.idea
*.iml
out
gen
### Python template
# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
share/python-wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# PyInstaller
#  Usually these files are written by a python script from a template
#  before PyInstaller builds the exe, so as to inject date/other infos into it.
*.manifest
*.spec

# Installer logs
pip-log.txt
pip-delete-this-directory.txt

# Unit test / coverage reports
htmlcov/
.tox/
.nox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
*.py,cover
.hypothesis/
.pytest_cache/
cover/

# Translations
*.mo
*.pot

# Django stuff:
*.log
local_settings.py
db.sqlite3
db.sqlite3-journal

# Flask stuff:
instance/
.webassets-cache

# Scrapy stuff:
.scrapy

# Sphinx documentation
docs/_build/

# PyBuilder
.pybuilder/
target/

# Jupyter Notebook
.ipynb_checkpoints

# IPython
profile_default/
ipython_config.py

# pyenv
#   For a library or package, you might want to ignore these files since the code is
#   intended to run in multiple environments; otherwise, check them in:
# .python-version

# pipenv
#   According to pypa/pipenv#598, it is recommended to include Pipfile.lock in version control.
#   However, in case of collaboration, if having platform-specific dependencies or dependencies
#   having no cross-platform support, pipenv may install dependencies that don't work, or not
#   install all needed dependencies.
#Pipfile.lock

# poetry
#   Similar to Pipfile.lock, it is generally recommended to include poetry.lock in version control.
#   This is especially recommended for binary packages to ensure reproducibility, and is more
#   commonly ignored for libraries.
#   https://python-poetry.org/docs/basic-usage/#commit-your-poetrylock-file-to-version-control
#poetry.lock

# pdm
#   Similar to Pipfile.lock, it is generally recommended to include pdm.lock in version control.
#pdm.lock
#   pdm stores project-wide configurations in .pdm.toml, but it is recommended to not include it
#   in version control.
#   https://pdm.fming.dev/#use-with-ide
.pdm.toml

# PEP 582; used by e.g. github.com/David-OConnor/pyflow and github.com/pdm-project/pdm
__pypackages__/

# Celery stuff
celerybeat-schedule
celerybeat.pid

# SageMath parsed files
*.sage.py

# Environments
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/

# Spyder project settings
.spyderproject
.spyproject

# Rope project settings
.ropeproject

# mkdocs documentation
/site

# mypy
.mypy_cache/
.dmypy.json
dmypy.json

# Pyre type checker
.pyre/

# pytype static type analyzer
.pytype/

# Cython debug symbols
cython_debug/

# PyCharm
#  JetBrains specific template is maintained in a separate JetBrains.gitignore that can
#  be found at https://github.com/github/gitignore/blob/main/Global/JetBrains.gitignore
#  and can be added to the global gitignore or merged into this file.  For a more nuclear
#  option (not recommended) you can uncomment the following to ignore the entire idea folder.
.idea/
.vscode/

```

## File: sbh-auth\app.py

- Extension: .py
- Language: python
- Size: 1879 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
# from website.app import create_app
from flask import Flask
from flask_cors import CORS
import os 
from dotenv import load_dotenv
import os
from flask import Flask
from website.models import db
from website.oauth2 import config_oauth
from website.routes import bp


# Load environment variables from .env file
load_dotenv()


def create_app(config=None):
    app = Flask(__name__, template_folder='website/templates', static_folder='website/static')

    # load default configuration
    app.config.from_object('website.settings')        

    # load environment configuration
    if 'WEBSITE_CONF' in os.environ:
        app.config.from_envvar('WEBSITE_CONF')

    # load app specified configuration
    if config is not None:
        if isinstance(config, dict):
            app.config.update(config)
        elif config.endswith('.py'):
            app.config.from_pyfile(config)

    setup_app(app)
    return app

def setup_app(app):
    db.init_app(app)
    config_oauth(app)
    app.register_blueprint(bp, url_prefix='')

app = create_app({
    'SECRET_KEY': 'secret',
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,
    'OAUTH2_REFRESH_TOKEN_GENERATOR': True,
    'SQLALCHEMY_DATABASE_URI': os.environ.get('CONNECTION_STRING'),
})

# import app secret key
app.config.from_object('config')

# TODO rmv before deployement 
CORS(app,supports_credentials=True, resources={r"/*": {"origins": "http://127.0.0.1:8080"}})
os.environ['AUTHLIB_INSECURE_TRANSPORT'] = 'True'

# TODO Uncomment in production 
# app.config['SESSION_COOKIE_SECURE'] = True
# app.config['SESSION_COOKIE_HTTPONLY'] = True
# app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

@app.cli.command()
def initdb():
    from website.models import db
    db.create_all()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)


```

## File: sbh-auth\config.py

- Extension: .py
- Language: python
- Size: 95 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
SECRET_KEY = '...'
```

## File: sbh-auth\Dockerfile

- Extension: 
- Language: unknown
- Size: 472 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
FROM python:3.10
LABEL authors="frans"

WORKDIR /sbh-auth/

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1

RUN pip3 install --no-cache --upgrade pip setuptools

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 5001

ENV OAUTHLIB_INSECURE_TRANSPORT=1
ENV FLASK_ENV="development"

# CMD [ "python", "app.py" ] 
CMD [ "flask", "--app", "app.py", "--debug", "run", "--host", "0.0.0.0", "--port", "5001"]
```

## File: sbh-auth\README.md

- Extension: .md
- Language: markdown
- Size: 642 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```markdown
# SBH-auth

Base on this github : [example-oauth2-server](https://github.com/authlib/example-oauth2-server)

### Create the virtual environnement

```
$ python -m venv .venv/;
$ source .venv/bin/activate
```

### Install dependencies environnement

```
$ pip install -r requirements.txt
```

### Setup Env variables

```
$ export FLASK_APP=app
$ export FLASK_ENV="development"
```

**NOTE:** : for windows user

```
$env:FLASK_ENV="development"
$env:FLASK_APP="app"
```

### Initialize database

```
$ flask initdb
```

### Start app

```
$ python app.py
```

or

```
$ python -m flask run
```

```

## File: sbh-auth\requirements.txt

- Extension: .txt
- Language: plaintext
- Size: 147 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```plaintext
Authlib==1.2.1
flask==3.0.0
flask_sqlalchemy==3.1.1
pyargon2==1.0.7
werkzeug~=3.0.1
flask_cors
psycopg2-binary 
python-dotenv
jwt
requests
```

## File: sbh-auth\website\models.py

- Extension: .py
- Language: python
- Size: 6439 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from authlib.integrations.sqla_oauth2 import (
    OAuth2ClientMixin,
    OAuth2TokenMixin,
    OAuth2AuthorizationCodeMixin
)
from flask import current_app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import BIGINT
from sqlalchemy.sql import func
from pyargon2 import hash
from werkzeug.security import gen_salt
from datetime import datetime, timedelta 
import time

db = SQLAlchemy()

# Resource Owner: user using your service
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(BIGINT, primary_key=True, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    salt = db.Column(db.String, nullable=False)
    role = db.Column(BIGINT, nullable=False)
    status = db.Column(BIGINT, nullable=False)
    created_on = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    last_login = db.Column(db.DateTime(timezone=True), nullable=False)


    def __init__(self, email, password): # username,
        # self.username = username
        self.email = email
        self.salt = gen_salt(16)
        self.password = self.hash_password(password)
        self.role=1, 
        self.status=1, 
        self.created_on=datetime.datetime.utcnow()
        self.last_login=datetime.datetime.utcnow()


    def hash_password(self, password):
        pepper = current_app.config.get("PEPPER")
        hashed_password = hash(password=password, salt=self.salt, pepper=pepper, time_cost=2, memory_cost=19456,
                               parallelism=1, hash_len=128)
        return hashed_password

    def verify_password(self, password):
        pepper = current_app.config.get("PEPPER")
        hashed_password = hash(password=password, salt=self.salt, pepper=pepper, time_cost=2, memory_cost=19456,
                               parallelism=1, hash_len=128)
        return hashed_password == self.password

    def __str__(self):
        return self.email

    def get_user_id(self):
        return self.id
    
    # TODO add get_user_info ?


# Client: Application making protected resource requests on behalf of resource owner
# Registered to developer (user on your site)
class OAuth2Client(db.Model, OAuth2ClientMixin):
    __tablename__ = 'oauth2_client'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))
    user = db.relationship('User')


# Common grant type, authorization code exchanged for access code
class OAuth2AuthorizationCode(db.Model, OAuth2AuthorizationCodeMixin):
    __tablename__ = 'oauth2_code'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))
    user = db.relationship('User')


# Tokens: used to access users' resources
class OAuth2Token(db.Model, OAuth2TokenMixin):
    __tablename__ = 'oauth2_token'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))
    user = db.relationship('User')
    # access_token = db.Column(db.Text, nullable=False)  
    # refresh_token = db.Column(db.Text) 

    def is_refresh_token_active(self):
        if self.revoked:
            return False
        expires_at = self.issued_at + self.expires_in * 2
        return expires_at >= time.time()


class RefreshToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    token = db.Column(db.String(256), index=True, unique=True, nullable=False)
    expires = db.Column(db.DateTime, nullable=False, default=lambda: datetime.utcnow() + timedelta(days=1)) 
    is_revoked = db.Column(db.Boolean, default=False)

    user = db.relationship('User', backref=db.backref('refresh_tokens', lazy=True))

    # TODO add refresh token function ?

# class AuthorizationGrant(db.Model):
#     __tablename__ = 'authorization_grants'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Ensure 'users.id' matches your User table's primary key column
#     client_id = db.Column(db.Integer, db.ForeignKey('oauth2_clients.id'), nullable=False)  # Ensure 'oauth2_clients.id' matches your OAuth2Client table's primary key column
#     scope = db.Column(db.Text)
#     granted_at = db.Column(db.DateTime, nullable=False)
#     expires_at = db.Column(db.DateTime)
#     revoked = db.Column(db.Boolean, default=False)

#     # Relationships
#     user = db.relationship('User', backref=db.backref('authorization_grants', lazy=True))
#     client = db.relationship('OAuth2Client', backref=db.backref('authorization_grants', lazy=True))

    
#     def authorization_granted(user, client, requested_scopes=None):
#         """
#         Check if an authorization has been granted by the user to the client.
#         Optionally verify if the requested scopes are covered by the grant.

#         :param user: The User object
#         :param client: The OAuth2Client object
#         :param requested_scopes: A list or space-separated string of requested scopes
#         :return: True if an authorization exists and is valid, False otherwise
#         """
#         now = datetime.utcnow()
#         grant_query = AuthorizationGrant.query.filter(
#             AuthorizationGrant.user_id == user.id,
#             AuthorizationGrant.client_id == client.id,
#             AuthorizationGrant.revoked == False,
#             (AuthorizationGrant.expires_at == None) | (AuthorizationGrant.expires_at > now)
#         )
        
#         # If scope checking is required
#         if requested_scopes:
#             if isinstance(requested_scopes, str):
#                 requested_scopes = set(requested_scopes.split())
#             grant = grant_query.first()
#             if grant:
#                 granted_scopes = set(grant.scope.split()) if grant.scope else set()
#                 return requested_scopes.issubset(granted_scopes)
#             return False  # No grant matches the requested scopes
#         else:
#             # Simply check for any valid grant
#             return grant_query.first() is not None

```

## File: sbh-auth\website\oauth2.py

- Extension: .py
- Language: python
- Size: 5162 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from authlib.integrations.flask_oauth2 import (
    AuthorizationServer,
    ResourceProtector,
)
from authlib.integrations.sqla_oauth2 import (
    create_query_client_func,
    # create_save_token_func,
    create_revocation_endpoint,
    create_bearer_token_validator,
)
from authlib.oauth2.rfc6749 import grants
from authlib.oauth2.rfc7636 import CodeChallenge
from .models import db, User
from .models import OAuth2Client, OAuth2AuthorizationCode, OAuth2Token
from authlib.jose import jwt, JsonWebKey
import time
import uuid
from datetime import datetime, timedelta
import secrets

def generate_jwt_token(claims, secret_key='your_secret_key'):
    header = {'alg': 'HS256'}
    return jwt.encode(header, claims, secret_key).decode('utf-8') 

def create_save_token_func(token, request, *args, **kwargs):
    user_id = request.user.id if request.user else None
    client_id = request.client.client_id if request.client else None
    issue_time = int(time.time())
    expires_in = token.get('expires_in', 3600) # Default to 1 hour if not specified
    expiration_time = issue_time + expires_in

    # Prepare claims for JWT
    claims = {
        'iss': 'https://localhost:5001/',  # Issuer # TODO put in .env file
        'sub': str(user_id),  # Subject (User ID)
        'aud': client_id,  # Audience (Client ID)
        'exp': expiration_time,  # Expiration Time
        'iat': issue_time,  # Issued At
        'jti': token.get('jti', secrets.token_hex(32)),  # JWT ID, generate if not existing
    }

    # Generate JWT
    jwt_token = generate_jwt_token(claims)
    # refresh_token=token.get('refresh_token', create_refresh_token())

    # Return the JWT instead of the original token dictionary
    token['access_token'] = jwt_token
    # token['refresh_token'] = refresh_token TODO 
    return token

def create_refresh_token():
    # Generate a secure random string as the refresh token
    return secrets.token_hex(32)

class AuthorizationCodeGrant(grants.AuthorizationCodeGrant):
    TOKEN_ENDPOINT_AUTH_METHODS = [
        'client_secret_basic',
        'client_secret_post',
        'none',
    ]

    def save_authorization_code(self, code, request):
        code_challenge = request.data.get('code_challenge')
        code_challenge_method = request.data.get('code_challenge_method')
        auth_code = OAuth2AuthorizationCode(
            code=code,
            client_id=request.client.client_id,
            redirect_uri=request.redirect_uri,
            scope=request.scope,
            user_id=request.user.id,
            code_challenge=code_challenge,
            code_challenge_method=code_challenge_method,
        )
        db.session.add(auth_code)
        db.session.commit()
        return auth_code

    def query_authorization_code(self, code, client):
        auth_code = OAuth2AuthorizationCode.query.filter_by(
            code=code, client_id=client.client_id).first()
        if auth_code and not auth_code.is_expired():
            return auth_code

    def delete_authorization_code(self, authorization_code):
        db.session.delete(authorization_code)
        db.session.commit()

    def authenticate_user(self, authorization_code):
        return User.query.get(authorization_code.user_id)


class PasswordGrant(grants.ResourceOwnerPasswordCredentialsGrant):
    def authenticate_user(self, username, password):
        user = User.query.filter_by(username=username).first()
        if user is not None and user.check_password(password):
            return user


class RefreshTokenGrant(grants.RefreshTokenGrant):
    def authenticate_refresh_token(self, refresh_token):
        token = OAuth2Token.query.filter_by(refresh_token=refresh_token).first()
        if token and token.is_refresh_token_active():
            return token

    def authenticate_user(self, credential):
        return User.query.get(credential.user_id)

    def revoke_old_credential(self, credential):
        credential.revoked = True
        db.session.add(credential)
        db.session.commit()


query_client = create_query_client_func(db.session, OAuth2Client)
# save_token = create_save_token_func(db.session, OAuth2Token)
authorization = AuthorizationServer(
    query_client=query_client,
    save_token= create_save_token_func,
    # save_token=save_token,
)
require_oauth = ResourceProtector()


def config_oauth(app):
    authorization.init_app(app)

    # support all grants
    authorization.register_grant(grants.ImplicitGrant)
    authorization.register_grant(grants.ClientCredentialsGrant)
    authorization.register_grant(AuthorizationCodeGrant, [CodeChallenge(required=True)])
    authorization.register_grant(PasswordGrant)
    authorization.register_grant(RefreshTokenGrant)

    # support revocation
    revocation_cls = create_revocation_endpoint(db.session, OAuth2Token)
    authorization.register_endpoint(revocation_cls)

    # protect resource
    bearer_cls = create_bearer_token_validator(db.session, OAuth2Token)
    require_oauth.register_token_validator(bearer_cls())

```

## File: sbh-auth\website\routes.py

- Extension: .py
- Language: python
- Size: 7235 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
import time

from authlib.integrations.flask_oauth2 import current_token
from urllib.parse import urlparse, parse_qs
from authlib.oauth2 import OAuth2Error
from flask import Blueprint, request, session, jsonify
from flask import render_template, redirect, jsonify, Response, make_response, flash, url_for,current_app
from werkzeug.security import gen_salt
from werkzeug.datastructures import Headers

from .models import db, User, OAuth2Client
from .oauth2 import authorization, require_oauth

import jwt
from base64 import b64decode
from datetime import datetime, timedelta

bp = Blueprint('bp', __name__)

# TODO check for register function

@bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    response = Response(status=200)
    response.delete_cookie('access_token')
    # TODO revoke the token in the database ? 
    return render_template('home.html')


def current_user() -> User:
    if 'id' in session:
        uid = session['id']
        return User.query.get(uid)
    return None

# @bp.route('/', methods=['GET'])
# def index():
#     user = current_user()
#     clients = []
#     if user:
#         clients = OAuth2Client.query.filter_by(user_id=user.id).first() if user else []
#         for client in clients:
#             if AuthorizationGrant.authorization_granted(user.id, client.id):
#                 return authorization.create_authorization_response(grant_user=user)
        
#     # Render the home page normally if no authorization has already been granted
#     return render_template('home.html', user=user, clients=clients)
  

# Then the client will exchange the authorization code for an access token 


# @bp.route('/home', methods=['GET'])
@bp.route('/', methods=['GET'])
def home():
    user = current_user()
    clients = OAuth2Client.query.filter_by(user_id=user.id).all() if user else []
    return render_template('home.html', user=user, clients=clients)

# create a function that handle login and send back a authorization code at sbh-backend
@bp.route('/authenticate', methods=['POST'])
def authenticate():
    email = request.form.get('email')
    password = request.form.get('password')
    user = User.query.filter_by(email=email).first()

    if not user:
        # User email not found error message
        flash('Email not found.', 'error')
        return redirect(url_for('bp.home'))

    if not user.verify_password(password):
        # Wrong password error message
        flash('Incorrect password.', 'error')
        return redirect(url_for('bp.home'))
    
    client = OAuth2Client.query.filter_by(user_id=user.id).first() if user else []
    session['id'] = user.id
    
    # if authorization flow is allowed
    if client : 
        # Redirect with query parameters
        return redirect(url_for('bp.authorize', response_type="code", client_id=client.client_id, scope=client.scope))
    else:
        return redirect(url_for('bp.home'))

@bp.route('/oauth/authorize', methods=['GET', 'POST'])
def authorize():
    user = current_user()
    # if user log status is not true (Auth server), then to log it in
    if not user:
        return redirect(url_for('home.home', next=request.url))
    if request.method == 'GET':
        try:
            grant = authorization.get_consent_grant(end_user=user)
        except OAuth2Error as error:
            return error.error
        return render_template('authorize.html', user=user, grant=grant)
    if not user and 'username' in request.form:
        username = request.form.get('username')
        user = User.query.filter_by(username=username).first()
    if 'allow' in request.form:
        # The "Allow" button was clicked
        grant_user = user
        # TODO register grant user in db
    else:
        grant_user = None
    return authorization.create_authorization_response(grant_user=grant_user)

def split_by_crlf(s):
    return [v for v in s.splitlines() if v]

@bp.route('/create_user', methods=('GET', 'POST'))
def create_user_form():
    print("create_user_form")

    if request.method == 'GET':
        return render_template('create_user.html')
    form = request.form
    email = form["email"]
    password = form["password"]

    if request.method == 'POST':
        # check for existing email
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('A user with this email already exists. Please use a different email.', 'error')
            return redirect(url_for('bp.create_user_form'))
        user = User(
                    email=email,
                    password=password)
        db.session.add(user)
        db.session.commit()
        # TODO create client for authentification
        session['id'] = user.id
    return redirect('/')


@bp.route('/create_client', methods=('GET', 'POST'))
def create_client():
    user = current_user()
    if not user or user.role != 999: # if user is not admin redirect to home
        return redirect('/')
    if request.method == 'GET': 
        return render_template('create_client.html')
    form = request.form
    client_id = gen_salt(24)
    client = OAuth2Client(client_id=client_id, user_id=user.id)
    # Mixin doesn't set the issue_at date
    client.client_id_issued_at = int(time.time())
    if client.token_endpoint_auth_method == 'none':
        client.client_secret = ''
    else:
        client.client_secret = gen_salt(48)

    client_metadata = {
        "client_name": form["client_name"],
        "client_uri": form["client_uri"],
        "grant_types": split_by_crlf(form["grant_type"]),
        "redirect_uris": split_by_crlf(form["redirect_uri"]),
        "response_types": split_by_crlf(form["response_type"]),
        "scope": form["scope"],
        "token_endpoint_auth_method": form["token_endpoint_auth_method"]
    }
    client.set_client_metadata(client_metadata)
    db.session.add(client)
    db.session.commit()
    return redirect('/')

# TODO should be a delete post in the /client route
@bp.route('/delete_client', methods=['POST'])
def delete_client():
    user = current_user()
    if not user or user.role != 999: # if user is not admin redirect to home
        return redirect('/')
    form = request.form
    client_id = form["client_id"]
    client = OAuth2Client.query.filter_by(client_id=client_id).filter_by(user_id=user.id).first()

    if not client:
        flash('Client not found.', 'error')
    else:
        db.session.delete(client)
        db.session.commit()
    return redirect('/')

@bp.route('/oauth/token', methods=['POST'])
def issue_token():
    try:
        return authorization.create_token_response()
    except OAuth2Error as error:
        print("error", error.error)
        return error.error


@bp.route('/oauth/revoke', methods=['POST'])
def revoke_token():
    return authorization.create_endpoint_response('revocation')

# need the Authorization header : Bearer <access_token>
@bp.route('/api/me')  
@require_oauth('profile')
def api_me():
    user = current_token.user
    return jsonify(id=user.id)

```

## File: sbh-auth\website\settings.py

- Extension: .py
- Language: python
- Size: 549 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
# FLASK
SECRET_KEY = '...'

# Security
# TODO: Move to secrets vault
PEPPER = "..."

# OPENID OAUTH2 JWT
# https://docs.authlib.org/en/latest/flask/2/openid-connect.html
# https://openid.net/specs/openid-connect-core-1_0.html#IDToken
OAUTH2_JWT_ENABLED = True  # Not implemented
OAUTH2_JWT_KEY = '...'  # REQUIRED Should be strong
OAUTH2_JWT_ISS = 'https://authlib.org'  # REQUIRED Should be https, no query/fragment
OAUTH2_JWT_ALG = 'HS256'  # REQUIRED unless no token ID
OAUTH2_JWT_EXP = 3600  # REQUIRED

```

## File: sbh-auth\website\__init__.py

- Extension: .py
- Language: python
- Size: 0 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python

```

## File: sbh-auth\website\static\style.css

- Extension: .css
- Language: unknown
- Size: 369 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
/* static/style.css */
body {
    font-family: Arial, sans-serif;
}

.center {
    display: grid;
    justify-content: center;
    align-content: center;
    text-align: center;
}

.frame {
    max-width: 500px;
    padding: 3rem;
    text-align: center;
    border: 1px solid #707070;
    border-radius: 25px;
  }

/* Add more styles as needed */

```

## File: sbh-auth\website\templates\authorize.html

- Extension: .html
- Language: html
- Size: 1435 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```html
<html>
  <head>
<link rel="stylesheet" type="text/css" href="{{ url_for('static', filename='style.css') }}">
</head>

<body class="center">
  <div class="frame" style="padding: 30px;"> 
    <p style="display: flex;justify-content: left; margin: 0;">Sign in with SBH-Assistant</p>
    <hr>
    <h2>{{grant.client.client_name.upper() }} wants to have access to your SBH-assistant Account</h2>
    <p>{{user.email}}</p>
    
    <p> This will allow {{grant.client.client_name.upper() }} to: </p>
    <div>
      <lu>
        <li>
          <strong>see your {{ grant.request.scope }}</strong>
        </li>
      </lu>
    </div>        
    <form action="" method="post" style="padding-top: 1rem;">
      <!-- TODO show login if user not login ? or remove this part -->
      {% if not user %}
      <p>You haven't logged in. Log in with:</p>
      <div>
        <input type="text" name="email">
      </div>
      {% endif %}
      <br>
      <div class="mx-2" style="display: flex; justify-content: space-between; align-items: center; ">
        <button style="text-align: start; border-radius: 15px; padding: 5px 10px;" type="submit">DENIED</strong></button>
        <button style="background-color: rgb(47, 111, 224); color: white; border-radius: 15px; padding: 5px 10px;" type="submit" name="allow">
          <strong>ALLOW</strong>
        </button>
      </div>
    </form>
  </div>
</body>


```

## File: sbh-auth\website\templates\create_client.html

- Extension: .html
- Language: html
- Size: 1164 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```html
<style>
  label, label > span { display: block; }
  label { margin: 15px 0; }
</style>

<a href="/">Home</a>

<form action="" method="post">
  <label>
    <span>Client Name</span>
    <input type="text" name="client_name">
  </label>
  <label>
    <span>Client URI</span>
    <input type="url" name="client_uri">
  </label>
  <label>
    <span>Allowed Scope</span>
    <input type="text" name="scope">
  </label>
  <label>
    <span>Redirect URIs</span>
    <textarea name="redirect_uri" cols="30" rows="10"></textarea>
  </label>
  <label>
    <span>Allowed Grant Types</span>
    <textarea name="grant_type" cols="30" rows="10"></textarea>
  </label>
  <label>
    <span>Allowed Response Types</span>
    <textarea name="response_type" cols="30" rows="10"></textarea>
  </label>
  <label>
    <span>Token Endpoint Auth Method</span>
    <select name="token_endpoint_auth_method">
      <option value="client_secret_basic">client_secret_basic</option>
      <option value="client_secret_post">client_secret_post</option>
      <option value="none">none</option>
    </select>
  </label>
  <button>Submit</button>
</form>

```

## File: sbh-auth\website\templates\create_user.html

- Extension: .html
- Language: html
- Size: 2155 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```html
<html> 
 <head>
    <title>SBH-Assistant</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="{{ url_for('static', filename='style.css') }}">
  </head>
  <body class="center">
    <div class="frame">
      <h3>SBH-Assistant Register</h3>
      <img style="display: block; margin: auto; width: 100px; height: 100px;" src="{{ url_for('static', filename='assets/sbh-assistant-logo.svg') }}" alt="SBH-Assistant Logo">
      <form action="/create_user" method="post" style="text-align: start; max-width: 300px;" >
        {% with messages = get_flashed_messages(category_filter=["error"]) %}
          {% if messages %}
          <div class="alert alert-danger m-3 p-0">
            {% for message in messages %}
              <p class="m-2">{{ message }}</p>
            {% endfor %}
          </div>
          {% endif %}
        {% endwith %}
        <label>
            <span>Email</span>
            <input type="email" name="email" style="width: 100%;">
        </label>
        <label>
            <span>Password</span>
            <input type="password" name="password" id="password"  style="width: 100%;">
        </label>
        <label>
            <span>Repeat Password</span>
            <input type="password" name="password_2" id="password_2"  style="width: 100%;">
        </label>
        <button id="submit" disabled type="submit" class="w-100 mt-2">Register</button>
      </form>
      <a href="{{ url_for('.home') }}">Login</a>
    </div>
  </body>
  <script>
      const password = document.getElementById("password");
      const password_2 = document.getElementById("password_2");
      const button = document.getElementById("submit");

      // Disable button when passwords don't match
      password_2.addEventListener("input", () => {
          button.disabled = password.value !== password_2.value;
      });
  </script>

  <style>
      label, label > span {
          display: block;
      }

      label {
          margin: 15px 0;
      }
  </style>
</html>
```

## File: sbh-auth\website\templates\home.html

- Extension: .html
- Language: html
- Size: 4440 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```html
<html>
  <head>
    <title>SBH-Assistant</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="{{ url_for('static', filename='style.css') }}">
  </head>
  <body class="center">
    <div class="frame">
      {% if user %}
        <img style="display: block; margin: 10px auto; width: 40px; height: 40px;" src="{{ url_for('static', filename='assets/sbh-assistant-logo.svg') }}" alt="SBH-Assistant Logo">
        <div>Logged in as <strong>{{user}}</strong></div>
        <form class="m-2" action="{{ url_for('.logout') }}" method="post">
          <input type="submit" value="Log out">
        </form>
        {% if user.role == 999 %}
          <hr>
          <div class="mx-2" style="display: flex; justify-content: space-between; align-items: center; ">
            <h3><strong style="text-align: start;">Clients</strong></h3>
            <a href="{{ url_for('.create_client') }}">Create client</a>
          </div>

          {% for client in clients %}
            <div class="frame" style="padding: 10px; text-align: start;">
              <div class="mx-2" style="display: flex; justify-content: space-between; align-items: end; ">
                <h4><strong>client_info</strong></h4>
                <form action="{{ url_for('.delete_client') }}" method="post">
                  <input type="hidden" name="client_id" value="{{ client.client_info.client_id }}">
                  <input type="submit" value="Delete">
              </form>
              </div>
              {% for key, value in client.client_info.items() %}
                <div style="overflow-x: auto;">
                  <strong>{{ key }} :</strong> 
                  {{ value }}
                </div>
              {% endfor %}
              <br>
              <h4><strong>client_metadata</strong></h4>
              {% for key, value in client.client_metadata.items() %}
                <div style="overflow-x: auto;">
                  <strong>{{ key }} :</strong> 
                  {{ value }}
                </div>
              {% endfor %}
            </div>
            <hr>
          {% endfor %}
        {% endif %}
      {% else %}
      <h3>SBH-Assistant Sign in</h3>
      <img style="display: block; margin: auto; width: 100px; height: 100px;" src="{{ url_for('static', filename='assets/sbh-assistant-logo.svg') }}" alt="SBH-Assistant Logo">
      {% with messages = get_flashed_messages(category_filter=["error"]) %}
        {% if messages %}
          <div class="alert alert-danger m-3 p-0">
            {% for message in messages %}
              <p class="m-2">{{ message }}</p>
            {% endfor %}
          </div>
        {% endif %}
      {% endwith %}
      <form action="/authenticate" method="post" style="text-align: start;" id="authForm">
        <p>{{ errorMsg }}</p>
        <label>
            <span>Email</span>
            <input class="w-100" type="text" name="email">
        </label>
        <label>
            <span>Password</span>
            <input  class="w-100" type="password" name="password" >
        </label>
        <button id="LoginBtn" type="submit" class="w-100 mt-2">Login</button>
      </form>
      
      <div id="loadingSpinner" class="spinner-border text-primary" role="status" style="display: none;">
      </div>

      <a href="{{ url_for('.create_user_form') }}">Creer un compte</a>
      {% endif %}
    </div>
  </body>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <script>
    element = document.getElementById('authForm')
    if(element) {
        element.addEventListener('submit', function() {
        document.getElementById('loadingSpinner').style.display = 'inline';
        document.getElementById('loadingSpinner').style.marginLeft = 'auto';
        document.getElementById('loadingSpinner').style.marginRight = 'auto';
        document.getElementById('LoginBtn').style.display = 'none';
      });
    }
</script>
  <style>
    label, label > span {
        display: block;
    }

    label {
        margin: 15px 0;
    }
</style>
</html>

```

## File: sbh-backend\.dockerignore

- Extension: 
- Language: unknown
- Size: 38 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown

.venv/
__pycache__/
*.pyc
.vscode
```

## File: sbh-backend\.gitignore

- Extension: 
- Language: unknown
- Size: 54 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
.venv/
__pycache__/
*.pyc
.vscode

data/*

.env
```

## File: sbh-backend\Dockerfile

- Extension: 
- Language: unknown
- Size: 1324 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
FROM python:3.10

WORKDIR /sbh-backend/

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1

# Install npm and other dependencies you might need
RUN apt-get update && apt-get install -y \
    npm \
    build-essential \
    git \
    libgl1-mesa-glx \
    # Add any other dependencies you need here
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip, setuptools, and wheel
RUN pip install --upgrade pip setuptools wheel build

# Install Python dependencies from requirements.txt with verbose output
COPY /sbh-backend/requirements.txt /sbh-backend/requirements.txt
RUN pip install --no-cache-dir -v -r /sbh-backend/requirements.txt

# If you actively workiong on the neuroglancer submodule you need to install local version of neuroglancer uncomment this section 
# Note : we need to install the neuroglancer project each time we build the docker.
# COPY neuroglancer/ /opt/neuroglancer/
# COPY .git/ /opt/.git/
# RUN pip install /opt/neuroglancer/
# Else use the git online version of neuroglancer 
RUN pip install git+https://github.com/linum-uqam/neuroglancer.git@master

COPY ./sbh-backend/src/ .

EXPOSE 5000
EXPOSE 9000

# flask --app src/main.py --debug run --host 0.0.0.0 --port 5000
CMD [ "flask", "--app", "src/main.py", "--debug", "run", "--host", "0.0.0.0", "--port", "5000"]
```

## File: sbh-backend\README.md

- Extension: .md
- Language: markdown
- Size: 1185 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```markdown
# Backend setup dev

make sure you have python 3.10+ install

```
$ python --version
```

## Locally

Create the virtual environnement

```
python -m venv .venv/;
source .venv/bin/activate
```

\*on windows

```
source .venv/Scripts/activate
```

Install dependencies environnement

```
$ pip install -r requirements.txt
```

Start flask app with debugger

```
flask --app src/main.py --debug run --host 0.0.0.0 --port 5000
```

## Docker

### Linux/Max

```
$ . start.sh
```

### Window

Build the docker image

```
$ .\start.ps1
```

**_NOTE1:_** SomeTimes you dont need to rebuild the image. If you change only the content of a file you can only start the docker. In that case you can comment the build line in the start file.

**_NOTE2:_** Window command should be run in a powershell terminal.

**_NOTE3:_** Docker create a new image each time you build the docker. Docker prune will remove unwanted duplicate images.

### Other commands :

run database

```
$ docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

download PgAdmin : https://www.pgadmin.org/download/

```

## File: sbh-backend\requirements.txt

- Extension: .txt
- Language: plaintext
- Size: 296 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```plaintext
# allensdk==2.15.2
imageio==2.31.5
nibabel==5.0.1
unittest-xml-reporting==3.2.0
Flask==2.3.1
werkzeug==3.0.0
Flask-Cors==3.0.10
flask-restx==1.1.0
Flask-Script==2.0.6
Flask-SQLAlchemy==3.0.3
Flask-Testing==0.8.1
debugpy==1.8.0
mock==5.1.0
requests
PyJWT
python-dotenv
psycopg2


```

## File: sbh-backend\start.ps1

- Extension: .ps1
- Language: powershell
- Size: 370 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```powershell
# Build the image
docker build -t sbh-backend .; docker image prune;

# delete previous docker and run the app with the volume link to the local repository
docker stop sbh-backend 2> $null; docker rm sbh-backend 2> $null;
docker start sbh-backend 2> $null;docker run -dp 127.0.0.1:5000:5000 --expose 5000 -v ${PWD}:/api --name sbh-backend sbh-backend 2> $null



```

## File: sbh-backend\start.sh

- Extension: .sh
- Language: bash
- Size: 385 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```bash
# Build the image
docker build -t sbh-backend .; docker image prune;

# delete previous docker and run the app with the volume link to the local repository
docker stop sbh-backend 2> /dev/null; docker rm sbh-backend 2> /dev/null;
docker start sbh-backend 2> /dev/null; docker run -p 127.0.0.1:5000:5000 --expose 5000 -v $(pwd):/api --name sbh-backend sbh-backend 2> /dev/null;


```

## File: sbh-backend\src\database.py

- Extension: .py
- Language: python
- Size: 90 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from flask_sqlalchemy import SQLAlchemy

# Initialize the db instance
db = SQLAlchemy()
```

## File: sbh-backend\src\main.py

- Extension: .py
- Language: python
- Size: 2154 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
import os
from dotenv import load_dotenv

from flask import Flask
from flask_cors import CORS
from flask_restx import Api

from functools import wraps

from util.util import create_folder
from database import db 
from namespaces.experiment import api as experiment_ns
from namespaces.image import api as image_ns
from namespaces.neuroglancer import api as neuroglancer_ns
from namespaces.user import api as user_ns 
from namespaces.auth import setup_auth_routes
from neuroglancer_manager.neuroglancer_manager import NeuroglancerManager

def create_app():
    
    app = Flask(__name__)
    CORS(app, supports_credentials=True, origins=['http://127.0.0.1:8080', "http://localhost:8080"])

    # import env virables
    load_env(app)

    # Initialize the Flask-Restx API
    api = Api(
        title='SBH-Assistant Backend API ',
        version='1.0',
        description='Sbh-assistant Backend web service',
    )
    api.init_app(app)
    # api.add_namespace(user_ns, path='/users')
    api.add_namespace(experiment_ns, path='/experiments')
    api.add_namespace(image_ns, path='/images')
    api.add_namespace(neuroglancer_ns, path='/neuroglancer')
    api.add_namespace(user_ns, path='/user')
    setup_auth_routes(app)

    # Initialize the Flask-SQLAlchemy
    db.init_app(app)  
    with app.app_context():
        db.create_all()  

    # Create folders if not exist
    create_folder("data")
    create_folder("data/images")

    # Initialize the NeuroglancerManager
    NeuroglancerManager()
    
    return app

def load_env(app) : 
    # TODO this should be false in production 
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = 'true'

    # Access environment variables
    load_dotenv()
    CONNECTION_STRING = os.getenv('CONNECTION_STRING')

    # Set the Flask app configuration
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config["SQLALCHEMY_DATABASE_URI"] = CONNECTION_STRING
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


def run():
    app = create_app()    
    app.run(host="0.0.0.0", port=5000)

if __name__ == '__main__':
    run()


```

## File: sbh-backend\src\namespaces\auth.py

- Extension: .py
- Language: python
- Size: 4450 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python

from flask import jsonify
from functools import wraps
import jwt
from flask import request, redirect, make_response, jsonify
import requests
import base64
import os

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
TOKEN_ENDPOINT = os.getenv('TOKEN_ENDPOINT')
SECRET_KEY = os.getenv('SECRET_KEY')

def token_optional(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get('access_token')
        # call auth serveur to get user info also handle refresh token... 
        current_user = None  
        if token:
            try:
                data = jwt.decode(token, SECRET_KEY, audience=CLIENT_ID, algorithms=["HS256"])
                current_user = data['sub']
            except jwt.ExpiredSignatureError as e:
                print("ERROR : ", e)
            except Exception as e:
                pass  # Token is optional, so we ignore errors
        return f(*args, current_user, **kwargs)
    return decorated_function


def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get('access_token')
        # call auth serveur to get user info also handle refresh token... 
        current_user = None  
        if token:
            try:
                data = jwt.decode(token, SECRET_KEY, audience=CLIENT_ID, algorithms=["HS256"])
                current_user = data['sub']
            except jwt.ExpiredSignatureError as e:
                print("ERROR : ", e)
            except Exception as e:
                print("ERROR : ", e)
        return f(current_user, *args, **kwargs)
    return decorated_function

def setup_auth_routes(app):
    @app.route('/callback', methods=['GET'])
    def callback():
        code = request.args.get('code') 
        if not code:
            return "No authorization code provided.", 400

        # Prepare the Basic Auth header
        credentials = f"{CLIENT_ID}:{CLIENT_SECRET}"
        credentials_b64 = base64.b64encode(credentials.encode()).decode()

        headers = {
            'Authorization': f'Basic {credentials_b64}',
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        # Prepare the data payload
        data = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': 'http://127.0.0.1:5000/callback', 
            'scope': 'profile', 
        }
        # Make the POST request to exchange the code for a token
        try:
            res = requests.post(TOKEN_ENDPOINT, headers=headers, data=data)
            res.raise_for_status()  # Raises stored HTTPError, if one occurred
            token_json = res.json()
        except requests.RequestException as e:
            return f"Failed to exchange authorization code: {e}", 500
    
        # Extract the access token and refresh token from the response
        access_token = token_json.get('access_token', None)
        if not access_token : # or not refresh_token:
            return "Token missing in the response.", 500
        else:
            response = make_response(redirect('http://127.0.0.1:8080'))
            response.set_cookie('access_token', access_token, httponly=False, secure=False, samesite='Lax') # TODO secure=True
            return response
        
    @app.route('/get-access-token', methods=['GET'])
    def get_access_token():
        token = request.cookies.get('access_token', None)
        if token:
            try:
                jwt.decode(token, SECRET_KEY, audience=CLIENT_ID, algorithms=["HS256"])
                return jsonify({'access_token': token})
            except jwt.ExpiredSignatureError:
                return jsonify({'error': 'Token expired'}), 401
            except Exception as e:
                return jsonify({'error': 'Invalid token'}), 400
        return {}, 200


    @app.route('/token_optional', methods=['GET'])
    @token_optional
    def hello_user_optionnal(current_user):
        if current_user:
            return jsonify({'message': f'Hello, {current_user}!'})
        else:
            return jsonify({'message': 'Hello, Guest!'})

    @app.route('/token_required', methods=['GET'])
    @token_required
    def hello_user(current_user):
        if current_user:
            return jsonify({'message': f'Hello, {current_user}!'})

```

## File: sbh-backend\src\namespaces\experiment.py

- Extension: .py
- Language: python
- Size: 5793 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from flask import request
from flask_restx import Namespace, fields, Resource, reqparse
from tables.experiment import Experiment
# from tables.image import Image
# from tables.ROI import ROI
from util.util import get_response_obj, get_list, SUCCESS, ERROR


api = Namespace('experiment', description='Experiments')
model = api.model('experiment', {
    'id': fields.Integer(
        description='Experiment id'
    ),
    'name': fields.String(
        required=True,
        description='Experiment name'
    ),
    'description': fields.String(
        required=True,
        description='Experiment description'
    ),
    'date': fields.String(
        required=True,
        description='Date of the experiment'
    ),
    'resolution': fields.Float(
        required=True,
        description='Image resolution (micron/pixel)'
    )
})

request_parser = reqparse.RequestParser()
request_parser.add_argument('name', type=str, help="Name of the experiment")
request_parser.add_argument('description', type=str,
                            help="Description of the experiment")
request_parser.add_argument('date', type=str, help="Date of the experiment")
request_parser.add_argument(
    'resolution', type=float, help="Image resolution (micron/pixel)")

msg_not_found = "Experiment not found"
msg_created = "Experiment created"
msg_deleted = "Experiment deleted"
msg_updated = "Experiment updated"
msg_user_error = "Invalid user request"
msg_server_err = "Internal server error"


@api.route('/')
class ExperimentNoID(Resource):
    @api.response(201, msg_created)
    @api.response(400, msg_user_error)
    @api.response(500, msg_server_err)
    @api.doc('Creates new experiment')
    @api.expect(request_parser, True)
    def post(self):
        print("EXPERIMENTS POST /")
        args = request_parser.parse_args()
        name = args['name']
        description = args['description']
        date = args['date']
        resolution = args['resolution']
        is_incomplete = name == "" or description == "" or date == "" or resolution == ""
        if is_incomplete:
            return get_response_obj(ERROR, msg_user_error), 400
        exp = Experiment(
            name=name,
            description=description,
            date=date,
            resolution=resolution)
        # exp.save_to_db()
        return get_response_obj(SUCCESS, msg_created), 201

    @api.doc('Returns all experiments')
    @api.response(404, msg_not_found)
    @api.response(200, "List of experiments")
    def get(self):
        print("EXPERIMENTS GET / ")
        exps = Experiment.find_all()
        if not exps:
            return get_response_obj(ERROR, msg_not_found), 404
        else:
            exp_list = []
            for exp in exps:
                exp_list.append(exp.dict())
            return exp_list, 200


@api.route('/<int:exp_id>/')
@api.param('exp_id', 'Experiment id')
class ExperimentbyID(Resource):
    @api.doc('Returns an experiment')
    @api.response(404, msg_not_found)
    @api.response(200, "experiment")
    def get(self, exp_id):
        exp = Experiment.find_by_id(exp_id)
        if not exp:
            return get_response_obj(ERROR, msg_not_found), 404
        else:
            return exp.dict(), 200

    @api.doc('Updates an experiment')
    @api.response(201, msg_created)
    @api.response(400, msg_user_error)
    @api.response(404, msg_not_found)
    @api.response(500, msg_server_err)
    @api.expect(request_parser, True)
    def post(self, exp_id):
        exp = Experiment.find_by_id(exp_id)
        if not exp:
            return get_response_obj(ERROR, msg_not_found), 404
        else:
            args = request_parser.parse_args()
            name = args['name']
            description = args['description']
            date = args['date']
            resolution = args['resolution']
            is_incomplete = name == "" or description == "" or date == "" or resolution == ""
            if is_incomplete:
                return get_response_obj(ERROR, msg_user_error), 400
            # exp.update_in_db(id,name,description,date,resolution)
            return get_response_obj(SUCCESS, msg_updated), 201

    @api.doc('Deletes an experiment')
    @api.response(204, msg_deleted)
    @api.response(404, msg_not_found)
    def delete(self, exp_id):
        exp = Experiment.find_by_id(exp_id)
        if not exp:
            return get_response_obj(ERROR, msg_not_found), 404
        else:
            imgs = Image.find_by_exp(exp_id)
            for img in imgs:
                pass
                # img.delete_from_db()
                # exp.delete_from_db()
            return get_response_obj(SUCCESS, msg_deleted), 204


@api.route('/<int:exp_id>/images')
@api.param('exp_id', 'Experiment id')
class ExperimentImages(Resource):
    @api.doc('Returns all images from this experiment')
    @api.response(404, msg_not_found)
    @api.response(200, "Images found")
    def get(self, exp_id):
        imgs = Image.find_by_exp(exp_id)
        if not imgs:
            return get_response_obj(SUCCESS, msg_not_found), 404
        else:
            img_list = get_list(imgs)
            return img_list, 200


@api.route('/<int:exp_id>/ROIs')
@api.param('exp_id', 'Experiment id')
class experimentROIs(Resource):
    @api.doc('Returns all ROIs from this experiment')
    @api.response(404, msg_not_found)
    @api.response(200, "ROIs found")
    def get(self, exp_id):
        rois = ROI.find_by_exp(exp_id)
        if not rois:
            return get_response_obj(ERROR, msg_not_found), 404
        else:
            roi_list = get_list(rois)
            return roi_list, 200

```

## File: sbh-backend\src\namespaces\image.py

- Extension: .py
- Language: python
- Size: 5876 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
import os
from flask import send_from_directory
from flask_restx import Namespace,fields, Resource, reqparse
from werkzeug.utils import secure_filename
import uuid
from werkzeug.datastructures import FileStorage
from tables.image import Image
from util.util import get_response_obj, get_list, SUCCESS, ERROR, IMG_DIR


STRINGMAXLENGTH = 250
api = Namespace('image', description='Images')
upload_parser = reqparse.RequestParser()
upload_parser.add_argument('file', location='files',
                            type=FileStorage, required=True, help='Image file')
upload_parser.add_argument('exp_id', type=int, help='Experiment ID')
image_parser = reqparse.RequestParser()
image_parser.add_argument('annotations', type=str, help='Annotations')

model = api.model('Image', {
    'id': fields.Integer(
        required = True,
        description='Image id'
    ),
    'name': fields.String(
        required=True,
        description='Image name'
    ),
    'path': fields.String(
        required=True,
        description='Image path'
    ),
    'exp_id': fields.Integer(
        required=True,
        description='Experiment id'),
    'annotation' : fields.String(
        description='Annotations'
    )
})


img_dir = '/app/api/data/images'
msg_not_found="Image not found"
msg_no_images="No images available"
msg_length = "Annotation string too long"
msg_upload="Image uploaded"
msg_deleted="image deleted"
msg_server_err = "Internal server error"
msg_filename_err = "Invalid file type"
msg_success = "Success"

def create_filename(filename):
    filename = secure_filename(filename)
    ext = os.path.splitext(filename)[1]
    uniquename = str(uuid.uuid4())
    if ext.startswith('.'):
        filename = uniquename + ext
    else:
        filename = uniquename + '.' + ext
    return filename

def extension_is_valid(filename):
    ext = os.path.splitext(filename)[1]
    return (ext == '.tiff' or ext == '.tif' or ext == '.jpg' or ext == '.png' )
     

@api.route('/')
class Image_no_ID(Resource):    
    @api.response(201, msg_upload)
    @api.response(500, msg_server_err)
    @api.doc('Creates new image')
    @api.expect(upload_parser, True)
    def post(self):
        args = upload_parser.parse_args()
        file = args['file']
        exp_id = int(args['exp_id'])
        if not extension_is_valid(file.filename) :
            return get_response_obj(ERROR,msg_filename_err), 400
        filename = create_filename(file.filename)
        path = os.path.join(img_dir, filename)
        file.save(path)
        img = Image(
            name = filename,
            path = path,
            id_exp = exp_id,
            annotations = ""
        )
        img.save_to_db()
        return get_response_obj(SUCCESS,msg_upload), 201
            
    
    @api.doc('Returns all images')
    @api.response(404, msg_no_images)
    def get(self):
        imgs = Image.find_all()
        if not imgs :
            return get_response_obj(ERROR,msg_not_found),404
        else : 
            img_list = get_list(imgs)
            return img_list,200


@api.route('/<int:id>/')
@api.param('id', 'image id')
class Image_by_ID(Resource):
    @api.doc('returns an image')
    @api.response(404, msg_not_found)
    def get(self,id):
        img = Image.find_by_id(id)
        if not img:
            return get_response_obj(ERROR,msg_not_found),404
        else:
            return img.dict(),200

    @api.doc('updates an image')
    @api.response(201, msg_upload)
    @api.response(404, msg_not_found)
    @api.response(500, msg_server_err)
    @api.expect(image_parser, True)
    def post(self, id):        
        img = Image.find_by_id(id)
        if not img:
            return get_response_obj(ERROR,msg_not_found),404
        else:
            args = image_parser.parse_args()
            annotations = args.get('annotations')
            if len(annotations) > STRINGMAXLENGTH :
                return get_response_obj(ERROR,msg_length), 400
            img.update_in_db(img.name, img.path, img.id_exp, annotations)
            return get_response_obj(SUCCESS,msg_upload), 201
                
    @api.response(204, msg_deleted)
    @api.response(404, msg_not_found)
    def delete(self, id):
        img = Image.find_by_id(id)
        if not img:
            return get_response_obj(ERROR,msg_not_found),404
        else:
            if os.path.exists(img.path):
                os.remove(img.path)
            img.delete_from_db()
            return  get_response_obj(SUCCESS,msg_deleted),204


@api.route('/<int:id>/file')
@api.param('id', 'image id')
class Image_file(Resource):
    @api.doc('Returns an image file')
    @api.response(404, msg_not_found)
    def get(self,id):
        img = Image.find_by_id(id)
        if not img:
            return get_response_obj(ERROR,msg_not_found),404
        else:
            return send_from_directory(img_dir,
                                       img.name, as_attachment=True)
    
    @api.doc('updates an image file')
    @api.response(201, msg_upload)
    @api.response(404, msg_not_found)
    @api.response(500, msg_server_err)
    @api.expect(upload_parser, True)
    def post(self, id):        
        img = Image.find_by_id(id)
        if not img:
            return get_response_obj(ERROR,msg_not_found),404
        else:
            args = upload_parser.parse_args()
            file = args.get('file')
            filename = create_filename(file.filename)
            path = os.path.join(img_dir, filename)
            file.save(path)
            if os.path.exists(img.path):
                os.remove(img.path)
            img.update_in_db(img.id_exp, filename,path)
            return get_response_obj(SUCCESS,msg_upload), 204

```

## File: sbh-backend\src\namespaces\neuroglancer.py

- Extension: .py
- Language: python
- Size: 7606 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from flask import request
from flask_restx import Namespace, fields, Resource, reqparse
from tables.neuroglancer import Neuroglancer  
from util.util import get_response_obj, SUCCESS, ERROR
from neuroglancer_manager.neuroglancer_manager import NeuroglancerManager
from urllib.parse import urlparse, urlunparse
from namespaces.auth import token_optional, token_required

api = Namespace('neuroglancer', description='Neuroglancer session')
model = api.model('Neuroglancer', {
    'neuroglancer_id': fields.Integer(description='The primary key'),
    'experiment_id': fields.Integer(description='Experiment ID', readonly=True),
    'status': fields.Integer(required=True, description='Status of the neuroglancer'),
    'group_id': fields.Integer(required=True, description='Group ID associated with the experiment'),
    'state': fields.Raw(required=False, description='State of the neuroglancer in JSON format'),
    'shared_link': fields.String(required=False, description='Shared link for the neuroglancer'),
    'source_string': fields.String(required=False, description='Source string of the url where data are store'),
    'owner_id': fields.Integer(required=False, description='Owner ID for the neuroglancer')
})

# Define the parser for the request data
request_parser = reqparse.RequestParser()
request_parser.add_argument('status', type=int, required=True, help="Status of the neuroglancer")
request_parser.add_argument('group_id', type=int, required=True, help="Group ID associated with the neuroglancer")
request_parser.add_argument('state', type=dict, required=False, location='json', help="State of the neuroglancer in JSON format")
request_parser.add_argument('shared_link', type=str, required=False, help="Shared link for the neuroglancer")
request_parser.add_argument('source_string', type=str, required=False, help="Source ID for the neuroglancer")
request_parser.add_argument('owner_id', type=int, required=False, help="Owner ID for the neuroglancer")

msg_not_found = "Neuroglancer not found"
msg_created = "Neuroglancer created"
msg_deleted = "Neuroglancer deleted"
msg_updated = "Neuroglancer updated"
msg_user_error = "Invalid user request"
msg_server_err = "Internal server error"

@api.route('/')
class NeuroglancerList(Resource):
    @api.doc('List all neuroglancer sessions')
    @api.marshal_list_with(model)
    @token_optional
    def get(self, current_user):
        ng_list = Neuroglancer.find_all(current_user)
        safe_ng_list = []
        for ng in ng_list:
            try:
                ng.status = int(ng.status)
                safe_ng_list.append(ng)
            except ValueError:
                # Log the error or handle it as appropriate
                print(f"Invalid status for neuroglancer {ng.experiment_id}")
        if safe_ng_list:
            return safe_ng_list, 200
        else:
            return get_response_obj(ERROR, msg_not_found), 404

@api.route('/create_viewer')
class CreateViewer(Resource):
    @api.response(400, msg_user_error)
    @api.response(500, msg_server_err)
    @api.doc('Create a new neuroglancer session')
    @api.expect(model, validate=True)
    @token_optional
    def post(self, current_user):
        args = request_parser.parse_args()
        
        # Create instance in neuroglancer backend
        neuroglancerManager = NeuroglancerManager()
        viewer = neuroglancerManager.create_viewer(path=args['source_string'], state=args['state'])

        # Kind of a hack to get the real ip:port/v/token instead of the container ip.
        parsed_url = urlparse(viewer.get_viewer_url())
        new_netloc = "127.0.0.1:9000"
        url = urlunparse(parsed_url._replace(netloc=new_netloc))
        
        ng = Neuroglancer(
            status=args['status'],
            group_id=args['group_id'],
            state=viewer.state.to_json(),  
            shared_link=url, 
            source_string=args['source_string'],
            owner_id=current_user if current_user else None
        )

        # Save the viewer to the database
        ng.save() 
        
        return {
            "viewer_url": url,
            "session_details": ng.to_dict()  
        }, 200
    
@api.route('/<int:id>')
class NeuroglancerById(Resource):
    @api.response(404, 'Neuroglancer session not found')
    @api.doc('get_neuroglancer')
    def get(self, id):
        """Fetch a neuroglancer session given its identifier"""
        ng_session = Neuroglancer.find_by_id(id)
        neuroglancer_token = ng_session.shared_link.split("/v/")[1].rstrip("/")
        neuroglancerManager = NeuroglancerManager()
        neuroglancerManager.create_viewer(token=neuroglancer_token, path=ng_session.source_string, state=ng_session.state)

        if ng_session:
            return ng_session.to_dict(), 200
        api.abort(404, "Neuroglancer session not found")
        
    @api.response(204, 'Neuroglancer session deleted')
    @api.response(404, 'Neuroglancer session not found')
    @api.doc('delete_neuroglancer')
    def delete(self, id):
        """Delete a neuroglancer session given its identifier"""
        success = Neuroglancer.delete_by_id(id)
        if success:
            return '', 204
        else:
            api.abort(404, "Neuroglancer session not found or could not be deleted")

    @api.response(200, 'Neuroglancer session updated')
    @api.response(404, 'Neuroglancer session not found')
    @api.expect(api.model('NeuroglancerUpdate', {
        'status': fields.Integer(required=False, description='Status of the neuroglancer session'),
        'group_id': fields.Integer(required=False, description='Group ID associated with the session'),
        'state': fields.Raw(required=False, description='State of the neuroglancer in JSON format'),
        'shared_link': fields.String(required=False, description='Shared link for the session'),
        'source_string': fields.String(required=False, description='Source ID for the neuroglancer session')
    }), validate=True)
    @api.doc('update_neuroglancer')
    def patch(self, id):
        """Update a neuroglancer session given its identifier"""
        ng_session = Neuroglancer.find_by_id(id)
        if not ng_session:
            api.abort(404, "Neuroglancer session not found")

        # Use the `update` method with **request.json to unpack the dictionary directly into keyword arguments
        ng_session.update(**request.json)
        
        # Use the `to_dict` method to return the updated session data
        return ng_session.to_dict(), 200


@api.route('/save_state/<int:session_id>')
class SaveState(Resource):
    state_model = api.model('StateModel', {
        'state': fields.Raw(required=True, description='The new state of the Neuroglancer session')
    })

    @api.response(200, 'State updated successfully')
    @api.response(404, 'Session not found')
    @api.expect(state_model, validate=True)
    @api.doc('save_neuroglancer_state')
    def put(self, session_id):
        """Update the state of a Neuroglancer session given its ID."""
        args = request.json
        new_state = args.get('state')

        # Find the session by ID
        ng_session = Neuroglancer.find_by_id(session_id)
        if not ng_session:
            api.abort(404, "Session not found")

        # Update the session state
        ng_session.update(state=new_state)
        
        return {"message": "State updated successfully", "session_details": ng_session.to_dict()}, 200


```

## File: sbh-backend\src\namespaces\ROI.py

- Extension: .py
- Language: python
- Size: 4599 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
import os
import imageio
import numpy as np
from flask_restx import Namespace, fields, Resource, reqparse
from flask import send_from_directory
from tables.ROI import ROI, name_map
from util.util import ROI_DIR, get_list, get_response_obj


api = Namespace('ROI', description='Allen Brain ROIs')
model = api.model('ROIS', {
        'id': fields.Integer(
            required=True,
            description='id'
        ),
        'id_exp': fields.Integer(
            required=True,
            description='Experiment id'
        ),
        'id_allen': fields.Integer(
            required=True,
            description='Allen atlas id'
        )
    })

request_parser = reqparse.RequestParser()
request_parser.add_argument('id_exp', type=int, help="Experiment id is not an integer")
request_parser.add_argument('id_allen', type=int, help="ROI id is not an integer")
msg_not_found="ROI not found"
msg_created="ROI created"
msg_updated = "ROI updated"
msg_deleted = "ROI deleted"
msg_invalid_id = "Invalid ROI id"
msg_roi_exists = "This ROI is already associated with this experiment"
SUCCESS = "success"
ERROR = "error"

@api.route('/')
class ROIs(Resource):
    @api.response(201, msg_created)
    @api.response(400, msg_invalid_id)
    @api.doc('Creates new ROI')
    @api.expect(request_parser, True)
    def post(self) :
        args = request_parser.parse_args()
        idexp = args['id_exp']
        idallen = args['id_allen']
        if idallen < 0:
            return get_response_obj(ERROR,msg_invalid_id), 400
        if not name_map[idallen] :
            return get_response_obj(ERROR, msg_invalid_id), 400
        if ROI.find_by_id_allen(idallen,idexp) :
            return get_response_obj(ERROR, msg_roi_exists), 400
        
        roi = ROI(
            id_exp=idexp,
            id_allen=idallen
        )
        roi.save_to_db()
        return get_response_obj(SUCCESS,msg_created), 201

    @api.doc('Returns all ROIs')
    @api.response(404, msg_not_found)
    @api.response(200, "List of experiments")
    def get(self):
        rois = ROI.find_all()
        if not rois:
            return get_response_obj(ERROR, msg_not_found),404
        else:
            roi_list = get_list(rois)
            return roi_list,200

@api.route('/<int:id>/')
@api.param('id', 'ROI id')
class ROIbyId(Resource):
    @api.doc('Returns a ROI')
    @api.response(404, msg_not_found)
    @api.response(200, "ROI")
    def get(self, id):
        roi = ROI.find_by_id(id)
        if not roi:
            return  get_response_obj(ERROR, msg_not_found),404
        else:
            return roi.dict(),200

    @api.doc('Updates an experiment')
    @api.response(201, msg_created)
    @api.response(404, msg_not_found)
    @api.expect(request_parser, True)
    def post(self, id):        
        roi = ROI.find_by_id(id)
        if not roi:
            return  get_response_obj(ERROR, msg_not_found), 404
        else:
            args = request_parser.parse_args()
            idallen = args['id_allen']
            roi.update_in_db(id,idallen)
            return get_response_obj(SUCCESS,msg_updated), 201
    
    @api.doc('Deletes a ROI')
    @api.response(204, msg_deleted)
    @api.response(404, msg_not_found)
    def delete(self,id):
        roi = ROI.find_by_id(id)
        if not roi:
            return  get_response_obj(ERROR, msg_not_found), 404
        else:
            roi.delete_from_db()
            return get_response_obj(SUCCESS,msg_deleted), 204

@api.route('/<int:id>/mask/<int:index>')
@api.param('id', 'ROI id')
@api.param('index', 'Mask index')
class ROIbyId(Resource):
    @api.doc('Returns a ROI')
    @api.response(404, msg_not_found)
    @api.response(200, "ROI")
    def get(self, id,index):
        roi = ROI.find_by_id(id)
        if not roi:
            return  get_response_obj(ERROR, msg_not_found),404
        else:
            img_dir = ROI_DIR
            id_allen = roi.id_allen
            img_name = str(id_allen) + "_" + str(index) + ".png"
            if not os.path.exists(img_dir):
                os.makedirs(img_dir)
            img_path = os.path.join(img_dir, img_name)
            if not os.path.exists(img_path):
                mask = np.array(roi.get_mask())
                mask = mask/mask.max() * 255
                mask = mask.astype(np.uint8)
                img = mask[index,:]
                imageio.imwrite(img_path, img)
            return send_from_directory(img_dir, img_name, as_attachment=True)
```

## File: sbh-backend\src\namespaces\template.py

- Extension: .py
- Language: python
- Size: 3483 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
import os
import numpy as np
import nibabel as nib
import imageio
from flask import send_from_directory
from flask_restx import Namespace, Resource
from util.util import get_response_obj, ATLAS_DIR, VOL_PATH, MASK_DIR
from allensdk.core.mouse_connectivity_cache import MouseConnectivityCache
import time

api = Namespace('template', description='Allen Brain template')
msg_not_found = "Image not found"
response_obj_not_found = {
                'status':'fail',
                'message': msg_not_found
            }
mcc=MouseConnectivityCache()

def import_vol(path):
    """ Imports 3d nifti data 
    Parameters
    ----------
    path : str
        The file location of the data

    Returns
    -------
    ndarray
        ndarray containing the 3d data
    
    ndarray
        affine matrix of the data
    """
    template, template_info = mcc.get_template_volume(file_name=VOL_PATH)
    return template

@api.route('/')
class Template(Resource):
    @api.doc('returns atlas information')
    @api.response(404, msg_not_found)
    def get(self):
        volume = import_vol(VOL_PATH)
        length = len(volume)
        response_obj = {
                'path': VOL_PATH,
                'length': length
        }
        return response_obj, 200


@api.route('/<int:id>/')
@api.param('id', 'image id')
class Template_by_ID(Resource):
    @api.doc('returns an image')
    @api.response(404, msg_not_found)
    def get(self,id):
        img_dir = ATLAS_DIR
        img_name = str(id) + ".png"
        if not os.path.exists(img_dir):
            os.makedirs(img_dir)
        img_path = os.path.join(img_dir, img_name)
        if not os.path.exists(img_path):
            volume = import_vol(VOL_PATH)
            volume = volume/volume.max() * 255
            volume = volume.astype(np.uint8)
            if id < 0 or id >= len(volume):
                return response_obj_not_found,404
            img = volume[id]
            imageio.imwrite(img_path, img)
        return send_from_directory(img_dir, img_name, as_attachment=True)



@api.route('/<int:id>/mask/<int:mask_id>')
@api.param('id', 'Image id')
@api.param('mask_id', 'Mask id')
class Template_mask(Resource):
    @api.doc('Returns a template image')
    @api.response(404, msg_not_found)
    @api.response(200, "Masked image")
    def get(self, id, mask_id):
        img_dir = MASK_DIR
        img_name = "mask_{mask_id}_{id}.png".format(id=id, mask_id=mask_id)
        if not os.path.exists(img_dir):
            os.makedirs(img_dir)
        img_path = os.path.join(img_dir, img_name)
        if not os.path.exists(img_path):
            volume = import_vol(VOL_PATH)
            if id >= len(volume) :
                return get_response_obj("ERROR", msg_not_found),404
            img = volume[id]    
            mask,mask_info = mcc.get_structure_mask(mask_id)
            npmask = np.array(mask[id])
            nptemplate = np.array(img)
            x=npmask.shape[0]
            y=npmask.shape[1]
            maskedtemplate = np.zeros((x,y,3),dtype=np.uint8)
            maskedtemplate[:,:,0] = (nptemplate/nptemplate.max()) * 200
            maskedtemplate[:,:,1] = maskedtemplate[:,:,0]
            maskedtemplate[:,:,2] = maskedtemplate[:,:,0]
            maskedtemplate[:,:,2] += npmask * 55
            imageio.imwrite(img_path, maskedtemplate)
        return send_from_directory(img_dir,img_name)
```

## File: sbh-backend\src\namespaces\user.py

- Extension: .py
- Language: python
- Size: 3539 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from flask import request
from flask_restx import Namespace, fields, Resource, reqparse
from tables.user import User  # Adjust this import path according to your project structure
from util.util import get_response_obj, SUCCESS, ERROR

api = Namespace('user', description='User management operations')

model = api.model('User', {
    'id': fields.Integer(description='User ID', readonly=True),
    'email': fields.String(required=True, description='User email address'),
    'password': fields.String(required=True, description='User password'),
    'salt': fields.String(required=True, description='Salt for password hashing'),
    'role': fields.Integer(required=True, description='User role'),
    'status': fields.Integer(required=True, description='User status'),
    'created_on': fields.DateTime(description='Account creation date', readonly=True),
    'last_login': fields.DateTime(description='Last login date', readonly=True)
})

# Define the parser for the request data
request_parser = reqparse.RequestParser()
request_parser.add_argument('email', type=str, required=True, help="User email address")
request_parser.add_argument('password', type=str, required=True, help="User password")
request_parser.add_argument('salt', type=str, required=True, help="Salt for password hashing")
request_parser.add_argument('role', type=int, required=True, help="User role")
request_parser.add_argument('status', type=int, required=True, help="User status")

msg_not_found = "User not found"
msg_created = "User created"
msg_deleted = "User deleted"
msg_updated = "User updated"
msg_user_error = "Invalid user request"
msg_server_err = "Internal server error"

@api.route('/')
class UserList(Resource):
    @api.response(201, msg_created)
    @api.response(400, msg_user_error)
    @api.response(500, msg_server_err)
    @api.doc('Create a new user')
    @api.expect(model, validate=True)
    def post(self):
        args = request_parser.parse_args()
        user = User(
            email=args['email'],
            password=args['password'],
            salt=args['salt'],
            role=args['role'],
            status=args['status']
        )
        user.save_to_db()
        return get_response_obj(SUCCESS, msg_created), 201

    @api.doc('List all users')
    @api.marshal_list_with(model)
    def get(self):
        users = User.find_all()
        if users:
            return users, 200
        else:
            return get_response_obj(ERROR, msg_not_found), 404

@api.route('/<int:id>')
@api.param('id', 'The user identifier')
class UserResource(Resource):
    @api.doc('Get a user')
    @api.marshal_with(model)
    def get(self, id):
        user = User.find_by_id(id)
        if user:
            return user, 200
        else:
            return get_response_obj(ERROR, msg_not_found), 404

    @api.doc('Delete a user')
    @api.response(204, msg_deleted)
    def delete(self, id):
        user = User.find_by_id(id)
        if user:
            user.delete_from_db()
            return '', 204
        else:
            return get_response_obj(ERROR, msg_not_found), 404

    @api.doc('Update a user')
    @api.expect(model)
    def put(self, id):
        user = User.find_by_id(id)
        if user:
            args = request_parser.parse_args()
            user.update_in_db(**args)
            return get_response_obj(SUCCESS, msg_updated), 200
        else:
            return get_response_obj(ERROR, msg_not_found), 404

```

## File: sbh-backend\src\neuroglancer_manager\neuroglancer_manager.py

- Extension: .py
- Language: python
- Size: 4254 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
# neuroglancer_manager.py
import sys
sys.path.append('/opt/neuroglancer/python')
import neuroglancer
import json
import time 
import numpy as np

class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]

def get_state_as_json(state):
        # Note: At the moment. The shft +s keybind and the button are sending different responses.
        # That is because the button sends the viewerState directly while the keybind sends the selectedValues and the viewerState.
        # We check if the viewerState is present and if so, we extract it and save it to the file. 
        # Saving the state without extracting the viewerState will result in a file that is not readable by neuroglancer.
        state = state.to_json()
        if "viewerState" in state:
            state = state["viewerState"]
        return json.dumps(state, indent=4)
           
class NeuroglancerManager(metaclass=Singleton):
    
    def __init__(self):
        self.server_instance = None
        self.ip = '0.0.0.0'
        self.port = 9000
        self.observers = []
        neuroglancer.set_server_bind_address(self.ip, self.port)
        print(f" * Neuroglancer running on : http://{self.ip}:{self.port}")
    
    def register_observer(self, observer):
        self.observers.append(observer)
    
    def notify_observers(self, state):
        for observer in self.observers:
            observer.update(state)
                
    def save_state(self, state):
        # TODO save state to db
        self.notify_observers(state) 
        
    def bind_action(self, viewer, action, keybinds, message, action_name):
        viewer.actions.add('save_state', action)
        with viewer.config_state.txn() as s:
            s.input_event_bindings.viewer[keybinds] = action_name
            s.status_messages[action_name] = message
             
    def stop_server(self):
        '''Stop the Neuroglancer tornado server'''
        self.server_instance = None
        print("Neuroglancer tornado server stopped.")
        neuroglancer.stop()
    
    def is_server_running(self):
        '''Check if the Neuroglancer server is running.'''
        return neuroglancer.is_server_running()

    def create_viewer(self, path=None, state=None, token=None, synchronized=True):
        '''Create a Neuroglancer viewer.'''
        if synchronized:
            viewer = neuroglancer.Viewer(token=token, allow_credentials=False) # To tell ng that it's built in authentication is not needed
        else:
            viewer = neuroglancer.UnsynchronizedViewer(token=token, allow_credentials=False) # Launch an unsynchronized viewer, no state sharing between client instances.
        
        if state:
            self.update_viewer_state(viewer, state)
        elif path :
            with viewer.txn() as s:
                s.layers['image'] = neuroglancer.ImageLayer(source=path)   

        self.bind_action(viewer, self.save_state, 'control+keys', 'Press ctrl+s to save state', 'save_state') # Bind a save action to the Shift + s key
        return viewer
    
    def get_viewer(self, neuroglancer_token):
        '''Get a Neuroglancer viewer by its id.'''
        print("get_viewer ", neuroglancer_token)
        return neuroglancer.Viewer(token=neuroglancer_token)

    def update_viewer_state(self, viewer, state):
        '''Update the state of a Neuroglancer viewer.'''
        viewer.set_state(state)
    
    def get_viewer_state(self, viewer):
        '''Get the state of a Neuroglancer viewer.'''
        return viewer.state
    
    def add_segmentation_layer(self, viewer, path):
        '''Add a segmentation layer to a Neuroglancer viewer.'''
        with viewer.txn() as s:
            s.layers['segmentation'] = neuroglancer.SegmentationLayer(source=path)


if __name__ == '__main__':
    ngm = NeuroglancerManager()
    viewer = ngm.create_viewer(path='precomputed://https://storage.googleapis.com/neuroglancer-public-data/flyem_fib-25/image')
    print(viewer)
    time.sleep(999)

```

## File: sbh-backend\src\tables\experiment.py

- Extension: .py
- Language: python
- Size: 1335 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from database import db
from tables.image import Image


class Experiment(db.Model):
    __tablename__ = 'Experiments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(120))
    date = db.Column(db.String(20))
    resolution = db.Column(db.Float)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def update_in_db(self, name, description, date, resolution):
        db.session.query(Experiment).filter_by(id=self.id).update({
            'name': name,
            'description': description,
            "date": date,
            "resolution": resolution
        })
        db.session.commit()

    def dict(self):
        images = Image.find_by_exp(self.id)
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "date": self.date,
            "resolution": self.resolution,
            "images": len(images)
        }

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_all(cls):
        return cls.query.all()

```

## File: sbh-backend\src\tables\image.py

- Extension: .py
- Language: python
- Size: 1356 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from main import db

class Image(db.Model):
    __tablename__ = 'Images'

    id = db.Column(db.Integer, primary_key=True)
    id_exp = db.Column(db.Integer, db.ForeignKey('Experiments.id'))
    name = db.Column(db.String(50), nullable=False)
    path = db.Column(db.String(120), unique=True, nullable=False)
    annotations = db.Column(db.String(250))

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def update_in_db(self, name, path, id_exp, annotations):
        db.session.query(Image).filter_by(id=self.id).update({
            'name': name,
            'path': path,
            'id_exp': id_exp,
            'annotations': annotations

        })
        db.session.commit()

    def dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "path": self.path,
            "exp_id": self.id_exp,
            "annotations": self.annotations
        }

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_exp(cls, exp_id):
        return cls.query.filter_by(id_exp=exp_id).all()

```

## File: sbh-backend\src\tables\neuroglancer.py

- Extension: .py
- Language: python
- Size: 2247 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from main import db

class Neuroglancer(db.Model):
    __tablename__ = 'neuroglancer'
    neuroglancer_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    experiment_id = db.Column(db.BigInteger)
    status = db.Column(db.BigInteger, nullable=False)
    group_id = db.Column(db.BigInteger, nullable=False)
    state = db.Column(db.JSON)
    shared_link = db.Column(db.String, nullable=True)
    source_string = db.Column(db.Text, nullable=True)
    owner_id = db.Column(db.BigInteger, nullable=True)

    def save(self):
        """Save or update the current instance to the database."""
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """Delete the current instance from the database."""
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, neuroglancer_id) -> "Neuroglancer" :
        """Find a neuroglancer session by its ID."""
        return cls.query.filter_by(neuroglancer_id=neuroglancer_id).first()

    @classmethod
    def find_all(cls, owner_id):
        """Find all neuroglancer sessions of a user."""
        return cls.query.filter_by(owner_id=owner_id).all()

    @classmethod
    def delete_by_id(cls, neuroglancer_id):
        """Delete a neuroglancer session by its ID."""
        obj = cls.find_by_id(neuroglancer_id)
        if obj:
            db.session.delete(obj)
            db.session.commit()
            return True
        return False

    def update(self, **kwargs):
        """Update the current instance with provided keyword arguments."""
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        db.session.commit()

    def to_dict(self):
        """Convert the current instance into a dictionary."""
        return {
            "neuroglancer_id": self.neuroglancer_id,
            "experiment_id": self.experiment_id,
            "status": self.status,
            "group_id": self.group_id,
            "state": self.state,
            "shared_link": self.shared_link,
            "source_string": self.source_string,
            "owner_id" : self.owner_id
        }

```

## File: sbh-backend\src\tables\ROI.py

- Extension: .py
- Language: python
- Size: 1833 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from main import db
from allensdk.core.reference_space_cache import ReferenceSpaceCache
from allensdk.core.mouse_connectivity_cache import MouseConnectivityCache


reference_space_key = 'annotation/ccf_2017'
resolution = 25
rspc = ReferenceSpaceCache(
    resolution, reference_space_key, manifest='manifest.json')
mcc = MouseConnectivityCache()
rsp = rspc.get_reference_space()
tree = mcc.get_structure_tree()
name_map = tree.get_name_map()


class ROI(db.Model):
    __tablename__ = 'ROI'
    __table_args__ = (db.UniqueConstraint('id_exp', 'id_allen'), )
    id = db.Column(db.Integer, primary_key=True)
    id_exp = db.Column(db.Integer, db.ForeignKey('Experiments.id'))
    id_allen = db.Column(db.Integer, nullable=False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def update_in_db(self, id_allen):
        db.session.query(ROI).filter_by(id=self.id).update({
            "id_allen": id_allen,
        })
        db.session.commit()

    def get_mask(self):
        return rsp.make_structure_mask([self.id_allen])

    def dict(self):
        return {
            "id": self.id,
            "name": name_map[self.id_allen],
            "id_exp": self.id_exp,
            "id_allen": self.id_allen
        }

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_by_id_allen(cls, id_allen, id_exp):
        return cls.query.filter_by(id_allen=id_allen, id_exp=id_exp).first()

    @classmethod
    def find_by_exp(cls, exp_id):
        return cls.query.filter_by(id_exp=exp_id).all()

```

## File: sbh-backend\src\tables\user.py

- Extension: .py
- Language: python
- Size: 1670 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from main import db
from sqlalchemy.sql import func

class User(db.Model):
    __tablename__ = 'user'  # Specify the table name if it's different from the class name

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    email = db.Column(db.String, nullable=False)  # Assuming 'character varying' translates to 'String' in SQLAlchemy
    password = db.Column(db.String, nullable=False)
    salt = db.Column(db.String, nullable=False)
    role = db.Column(db.BigInteger, nullable=False)
    status = db.Column(db.BigInteger, nullable=False)
    created_on = db.Column(db.DateTime(timezone=False), nullable=False, server_default=func.now())
    last_login = db.Column(db.DateTime(timezone=False), nullable=False, server_default=func.now())

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def update_in_db(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        db.session.commit()

    def dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,
            "salt": self.salt,
            "role": self.role,
            "status": self.status,
            "created_on": self.created_on,
            "last_login": self.last_login
        }

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, id_):
        return cls.query.filter_by(id=id_).first()

    @classmethod
    def find_all(cls):
        return cls.query.all()

```

## File: sbh-backend\src\util\util.py

- Extension: .py
- Language: python
- Size: 1285 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
import uuid
import os
from pathlib import Path
from werkzeug.utils import secure_filename
SUCCESS = "Success"
ERROR = "Error"
DATA_DIR = Path("/data/")
IMG_DIR = str(DATA_DIR / "images")
ATLAS_DIR = str(DATA_DIR / "atlas")
ROI_DIR = str(DATA_DIR / "roi")
VOL_PATH = str(DATA_DIR / "template")
MASK_DIR = str(DATA_DIR / "masks")


def get_response_obj(status, message):
    obj = {
        "status": status,
        "message": message,
    }
    return obj


def create_filename(filename):
    filename = secure_filename(filename)
    ext = os.path.splitext(filename)[1]
    uniquename = str(uuid.uuid4())
    if ext.startswith('.'):
        filename = uniquename + ext
    else:
        filename = uniquename + '.' + ext
    return filename


def extension_is_valid(filename):
    ext = os.path.splitext(filename)[1]
    print(ext)
    return (ext == 'jpg' or ext == '.jpg')


def get_list(objs):
    obj_list = []
    for obj in objs:
        obj_list.append(obj.dict())
    return obj_list

def create_folder(path):
    folder = os.path.exists(path)
    if not folder:
        os.makedirs(path)

class StateObserver:
    """ Observer interface for state changes """
    def update(self, state):
        raise NotImplementedError

```

## File: sbh-backend\test\basetest.py

- Extension: .py
- Language: python
- Size: 446 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from app.main import app,db
from flask_testing import TestCase

class BaseTest(TestCase):

    def create_app(self):
        app.config['TESTING'] = True
        db.init_app(app)
        return app
        
    def setUp(self):
        with app.app_context():
            db.create_all()
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        with app.app_context():
            db.drop_all()

```

## File: sbh-backend\test\test.py

- Extension: .py
- Language: python
- Size: 336 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
# TODO remettre en place
# def test():
#     create_db('test.db')
#     app.register_blueprint(blueprint)
#     tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
#     result = XMLTestRunner(output="tests-reports", verbosity=2).run(tests)
#     if result.wasSuccessful():
#         return 0
#     return 1

```

## File: sbh-backend\test\testtest.py

- Extension: .py
- Language: python
- Size: 199 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from app.test.basetest import BaseTest
import unittest


class TestTest(BaseTest):
    def test_test(self):
        self.assertEqual(0, 0)


if __name__ == '__main__':
    unittest.main()

```

## File: sbh-backend\test\test_experience.py

- Extension: .py
- Language: python
- Size: 2313 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from app.test.basetest import BaseTest
from api.app.main.tables.experiment import Experiment
import unittest
import time

class TestExperiment(BaseTest):
    def test_exp_save(self):
        exp = Experiment(
            id=1,
            name='Experiment', 
            description='Une experience')
        expid = exp.id
        exp.save_to_db()            
        
        exp2 = Experiment.query.filter_by(id=expid).first()
        self.assertEquals(expid, exp2.id)

    
    def test_exp_delete(self):
        experiment = Experiment(
            id=2,
            name="Exp",
            description="Une autre experience",
        )
        experiment.save_to_db()
        expid = experiment.id
        experiment.delete_from_db()
        self.assertTrue(Experiment.query.filter_by(id=expid).first() == None)

    
    def test_exp_get(self):
        experiment = Experiment(
            id=3,
            name="Test",
            description="Test",
        )
        expid = experiment.id
        experiment.save_to_db()
        exp2 = Experiment.find_by_id(expid)
        self.assertEquals(exp2.id, expid)

    def test_exp_update(self):
        experiment = Experiment(
            id=4,
            name="Experiment",
            description="An experiment",
            date="1900-01-01",
            resolution=2
        )
        experiment.save_to_db()
        experiment.update_in_db("Updated", "Updated description", "2022-02-02", 10)
        self.assertTrue(experiment.name == "Updated" and experiment.description == "Updated description")
    
    def test_exp_all(self):
        experiment = Experiment(
            id=5,
            name="Exp",
            description="An experiment",
        )
        experiment2 = Experiment(
            id=6,
            name="Exp 2",
            description="Another experiment",
        )
        experiment3 = Experiment(
            id=7,
            name="Exp 3",
            description="Bla bla",
        )
        experiment.save_to_db()
        experiment2.save_to_db()
        experiment3.save_to_db()
        exps = Experiment.find_all()
        print(len(exps))
        self.assertEquals(len(exps), 3)


    

if __name__ == '__main__':
    unittest.main()

```

## File: sbh-backend\test\test_roi.py

- Extension: .py
- Language: python
- Size: 2418 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from app.test.basetest import BaseTest
from api.app.main.tables.experiment import Experience
from app.main.tables.ROI import ROI
import unittest

class TestROI(BaseTest):
    def test_roi_save(self):
        experience = Experience(
            id=1,
            name="Experience",
            description="Une autre experience",
        )
        experience.save_to_db()
        roi = ROI(
            id=1,
            id_exp=1, 
            id_allen=33)
        roi.save_to_db()            
        
        roi2 = ROI.query.filter_by(id=1).first()
        self.assertEquals(roi.id, roi2.id)

    
    def test_roi_delete(self):
        experience = Experience(
            id=1,
            name="Experience",
            description="Une autre experience",
        )
        experience.save_to_db()
        roi = ROI(
            id=2,
            id_exp=1, 
            id_allen=34)
        roi.save_to_db() 
        roi.delete_from_db()
        self.assertTrue(Experience.query.filter_by(id=2).first() == None)

    
    def test_roi_get(self):
        experience = Experience(
            id=1,
            name="Experience",
            description="Une autre experience",
        )
        experience.save_to_db()
        roi = ROI(
            id=3,
            id_exp=1, 
            id_allen=34)
        roi.save_to_db()
        roi2 = ROI.find_by_id(3)
        self.assertEquals(roi2.id, 3)

    def test_roi_update(self):
        experience = Experience(
            id=1,
            name="Experience",
            description="Une autre experience",
        )
        experience.save_to_db()
        roi = ROI(
            id=4,
            id_exp=1, 
            id_allen=11)
        roi.save_to_db()
        roi.update_in_db(12)
        self.assertTrue(roi.id_allen == 12)
    
    def test_roi_all(self):
        experience = Experience(
            id=5,
            name="Exp",
            description="An experience",
        )
        experience.save_to_db()
        roi1 = ROI(
            id=5,
            id_exp=1, 
            id_allen=10)
        roi1.save_to_db()
        roi2 = ROI(
            id=6,
            id_exp=1, 
            id_allen=20)
        roi2.save_to_db()
        rois = ROI.find_all()
        self.assertEquals(len(rois), 2)


if __name__ == '__main__':
    unittest.main()

```

## File: sbh-file-server\.gitignore

- Extension: 
- Language: unknown
- Size: 21 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
venv/
*__*__*
data/
```

## File: sbh-file-server\Dockerfile

- Extension: 
- Language: unknown
- Size: 527 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
FROM python:3.11-alpine

WORKDIR /app

RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

COPY ./src ./src

# Install dependencies 
RUN python -m pip install ./src

# Expose port 5001
EXPOSE 8866

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Run the application
CMD [ "python3", "src/file_server.py", "-d", "data", "-a", "0.0.0.0", "-p", "8866", "--connection_string", "postgresql://user:password@ip:port/postgres", "--tokens_path", "src/cashed_tokens.json" ]

```

## File: sbh-file-server\README.md

- Extension: .md
- Language: markdown
- Size: 1479 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```markdown
# CORS File Server for SBH-Assistant

This file server allows Cross-Origin Resource Sharing (CORS) for accessing local data.

## Installation

To install the necessary dependencies, run the following command:

```
py -m pip install .
```

## Usage

### Running the File Server

To run the file server, use the following command, specifying the required parameters inside the src repository.

For Linux Users
```
py file_server.py -d "Your_data_folder_path" \
    -a "IP" -p port --connection_string 'your_connection_string_here' \
    --tokens_path 'your_tokens_path_here'
```

For Windows Users
```
py .\file_server.py -d "Your_data_folder_path" `
    -a "IP" -p port --connection_string 'your_connection_string_here' `
    --tokens_path 'your_tokens_path_here'
```

Replace `"Your_data_folder_path"` with the path to your data folder, `"IP"` with the desired IP address, and `port` with the preferred port number.

### Running File server with docker 

For Linux Users
```
./start.sh
```

Please ensure that the start.sh script has execute permissions. If not, you can add them using the command chmod +x start.sh.

For Windows Users
```
.\start.ps1
```

Please ensure that your execution policy allows the running of scripts. If not, you can change the execution policy using the command Set-ExecutionPolicy RemoteSigned -Scope CurrentUser.

Remember, Docker must be installed and running on your system to use these scripts. 
```

## File: sbh-file-server\start.ps1

- Extension: .ps1
- Language: powershell
- Size: 363 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```powershell
# Start Docker
Start-Service docker

# Docker system prune
docker system prune -f

# Build the Docker image
docker build -t sbh-file-server .

# Run the Docker container
docker run `
    -p 8866:8866 `
    --name sbh-file-server `
    -v ${PWD}/data:/app/data `
    -v ${PWD}/src/cashed_tokens.json:/app/src/cashed_tokens.json `
    sbh-file-server
```

## File: sbh-file-server\start.sh

- Extension: .sh
- Language: bash
- Size: 404 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```bash
# Start Docker
service docker start

docker system prune -f

# Build the Docker image
docker build -t sbh-file-server .


# Run the Docker container
# -v $(pwd)/src/file_server.py:/app/src/file_server.py \
docker run \
    -p 8866:8866 \
    --name sbh-file-server \
    -v $(pwd)/data:/app/data \
    -v $(pwd)/src/cashed_tokens.json:/app/src/cashed_tokens.json \
    sbh-file-server


```

## File: sbh-file-server\temp_list_of_tokens.txt

- Extension: .txt
- Language: plaintext
- Size: 3933 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```plaintext
(1, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', '9njauY5naIIkprCCuSDHGhoYJRlfkokveqpyhyIja9', None, 'profile', 1700538564, 0, 0, 864000)
(2, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'C2iEEziv2V0HyAN4dfX7L0bESSc4lKItBwcukBwtE2', None, 'profile', 1700538895, 0, 0, 864000)
(3, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', '9vP3S1MGad5x4LOQD1476XuCyxsN0CUf8rWgMZH1YX', None, 'profile', 1700539092, 0, 0, 864000)
(4, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'upnISeUy2TsY1M7V6H2eO1g0ktIKxUA83VIjx35eFC', None, 'profile', 1700574702, 0, 0, 864000)
(5, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'SmbOaf9Wvx1kFM9b0BYpZCkeTNc7Dg3k5leGqcJlh0', None, 'profile', 1700580821, 0, 0, 864000)
(6, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'nL0ul5R1OZc0j7KqovjP8uD0vsmPnqVF97i7DMDm7L', None, 'profile', 1700677799, 0, 0, 864000)
(7, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'WWcSbrY10JMCyWtvFhDVndsFPTVlfHUHkx4suCS0Xg', None, 'profile', 1700678523, 0, 0, 864000)
(8, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', '4HP6bfUceAeOKg0wCY7pVwk3FX5Ii0b2JJEBOS3l2W', None, 'profile', 1700678635, 0, 0, 864000)
(9, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'KOAesLwhO29GVgWenCvWut4SNJsFwK1Wlc0qP3VOBn', None, 'profile', 1700678940, 0, 0, 864000)
(10, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'X1icv0FjNoAGwX8epDpqpyaNS0D9oQIHKzfO8u4fHa', None, 'profile', 1700679113, 0, 0, 864000)
(11, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'rVINYq6GCZYAyBFNwRuWn2nqpOtGWJTP6VqOXnr5e8', None, 'profile', 1700679162, 0, 0, 864000)
(12, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'plHb939Lt6IeiRsykDkGtPC63HPdix4nbj0D0xvJAC', None, 'profile', 1700679200, 0, 0, 864000)
(13, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'zry02W1UYC9XXrVBlIjX6lcaqFwgCeVQ55wKHKyRoa', None, 'profile', 1700679267, 0, 0, 864000)
(14, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'oAWqvIM4l7VD8UqEn0hx4mmpJNeYJLz9NyFTfUzQhs', None, 'profile', 1700679389, 0, 0, 864000)
(15, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'AtkuwxyxO6WVSyC4vSS6GCtlK6UK0XZMkru5f2yjQc', None, 'profile', 1700679785, 0, 0, 864000)
(16, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'KrNOJCdjMIcVaOSabwRdq5bJ9jJYuqQ2F4ROKGHsMF', None, 'profile', 1700684191, 0, 0, 864000)
(17, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'WZFhtX65ghmXQLqNurISef56urKCZQgKbxSIDfAIBI', None, 'profile', 1700688336, 0, 0, 864000)
(18, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'MSH8Uvf4Sxqa5NkjQFvfwFC2ehlkp8PZAo7Tq4yNk0', None, 'profile', 1700690684, 0, 0, 864000)
(19, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'L4gR1z0Jc0um6WWvdY82zhzUZpStNFpIQo63KJ1eYl', None, 'profile', 1700690851, 0, 0, 864000)
(20, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'Laf7m98e9JoIamZU4G5RiCDfl3pZsG46tASu1WcQLb', None, 'profile', 1700692606, 0, 0, 864000)
(21, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'rOKir9h45h4fnZnsFk5BDmGtTIMJv4BW2yegxbNfaD', None, 'profile', 1700692653, 0, 0, 864000)
(22, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'SF8oaeB8Q8QEUJmaXwONmRrUK2dJlKPMsly46uAcHD', None, 'profile', 1700702983, 0, 0, 864000)
(23, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'NkMJwsrIQ0Ny3WosNfuAUgzlmWWfpHdCmuQbOn6hnw', None, 'profile', 1700703447, 0, 0, 864000)
(24, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', '5LbxtKnjsUxdtuBHBW8zzxwJ6C1EhGQ45lo1LPPTHD', None, 'profile', 1700709864, 0, 0, 864000)
(25, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'rUfJChRhJSwrjGunvTiQX0xb2oIOFKwsRJ47TajxrN', None, 'profile', 1700712384, 0, 0, 864000)
(26, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'ECX5O1yW3gcx0SNvK12xyNgTGa98rQZdQNYl4GF2Qn', None, 'profile', 1700712549, 0, 0, 864000)
(27, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'mGRKpuw0N2cTLsMI7HcCrsV6EgEGaD9sXqDen3r7ok', None, 'profile', 1700714264, 0, 0, 864000)
(28, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'xQSXUATcXC7L1sIdISzkwOsLRkPLVLZcYi3QiS9cjP', None, 'profile', 1700716101, 0, 0, 864000)
(29, 9, 'S0xScbo1slLxgLfcioyvvd3v', 'Bearer', 'JKooLClGu8wyXI9b178FMd6Nmprk4QvEyAQJDf0z66', None, 'profile', 1700716612, 0, 0, 864000)
```

## File: sbh-file-server\sbh_file_server.egg-info\dependency_links.txt

- Extension: .txt
- Language: plaintext
- Size: 2 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```plaintext


```

## File: sbh-file-server\sbh_file_server.egg-info\PKG-INFO

- Extension: 
- Language: unknown
- Size: 136 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
Metadata-Version: 2.1
Name: sbh-file-server
Version: 1.0.0
Requires-Python: >=3.6
Requires-Dist: argparse
Requires-Dist: psycopg2

```

## File: sbh-file-server\sbh_file_server.egg-info\requires.txt

- Extension: .txt
- Language: plaintext
- Size: 20 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```plaintext
argparse
psycopg2

```

## File: sbh-file-server\sbh_file_server.egg-info\SOURCES.txt

- Extension: .txt
- Language: plaintext
- Size: 218 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```plaintext
README.md
setup.py
sbh_file_server.egg-info/PKG-INFO
sbh_file_server.egg-info/SOURCES.txt
sbh_file_server.egg-info/dependency_links.txt
sbh_file_server.egg-info/requires.txt
sbh_file_server.egg-info/top_level.txt
```

## File: sbh-file-server\sbh_file_server.egg-info\top_level.txt

- Extension: .txt
- Language: plaintext
- Size: 2 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```plaintext


```

## File: sbh-file-server\src\cashed_tokens.json

- Extension: .json
- Language: json
- Size: 2 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```json
{}
```

## File: sbh-file-server\src\cleanup.py

- Extension: .py
- Language: python
- Size: 1772 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
import json
from datetime import datetime, timedelta
import threading
import time
from utils import get_tokens_from_file, save_tokens_to_file
import argparse
import os
import sys

# Function to clean expired tokens from the file
def clean_expired_tokens(tokens_path, silent):
     
        while True :
            # while not exit_flag:  # Use a flag to control termination
            existing_tokens = get_tokens_from_file(tokens_path)
            current_time = datetime.utcnow()
            # print(f"Existing tokens: {existing_tokens}")
            # Filter out expired tokens
            valid_tokens = {token: expiration_time for token, expiration_time in existing_tokens.items()
                            if datetime.fromisoformat(expiration_time) > current_time}
            # print(f"Valid tokens: {valid_tokens}")
            if not silent:
                print("Cleaner")
                print(f"Current time: {current_time}") 
                print(f"Expired tokens: {set(existing_tokens) - set(valid_tokens)}")  
                print ("--------------------------------------------------------------") 
            # Save the filtered valid tokens back to the file
            save_tokens_to_file(valid_tokens, tokens_path)
            # Sleep for 10 seconds before cleaning again
            time.sleep(10)
   
        
def cleanup_start(tokens_path, silent): 
    try :
        # Start a background thread for cleaning expired tokens every 10 seconds
        cleanup_thread = threading.Thread(target=clean_expired_tokens, args=(tokens_path,silent))
        cleanup_thread.start()
    except KeyboardInterrupt:
        print("KeyboardInterrupt has been caught.")
        cleanup_thread.join()
        sys.exit()

```

## File: sbh-file-server\src\file_server.py

- Extension: .py
- Language: python
- Size: 5457 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
"""
Simple web server serving local files that permits cross-origin requests.
We validate the bearer token in the Authorization header of the request with its permission to access the resource.
We also cash all token and permission information into a json file to avoid querying the database for every GET request.
"""
from __future__ import print_function, absolute_import

import argparse
import os
import sys
import threading
import time
import ssl
try:
    # Python3 and Python2 with future package.
    from http.server import SimpleHTTPRequestHandler, HTTPServer
except ImportError:
    from BaseHTTPServer import HTTPServer
    from SimpleHTTPServer import SimpleHTTPRequestHandler

from datetime import datetime
from database.main import check_token_exist, check_permission
from utils import get_token_expiration_time_from_file
from cleanup import cleanup_start


class RequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Authorization')
        SimpleHTTPRequestHandler.end_headers(self)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Authorization')  # Add other required headers
        self.end_headers()
        
    def do_GET(self):
        # Get the token from the request headers
        token = self.headers.get('Authorization')

        # Perform permission validation based on the token
        if self.validate_permission(token):
            # If permission is granted, serve the file
            return SimpleHTTPRequestHandler.do_GET(self)
        else:
            # If permission is denied, respond with a 403 Forbidden status
            self.send_response(403)
            self.end_headers()
            self.wfile.write("403 Forbidden: You don't have permission to access this resource.".encode('utf-8'))

    def validate_permission(self, token):
        if token:
            print(f'Validating token: {token}')         
            exists_in_table = check_token_exist(args.connection_string, token, args.tokens_path)
            if exists_in_table:
                print(f"The token '{token}' exists in the oauth2_token table.")
                permission_granted = check_permission(args.connection_string, token, args.tokens_path)
            else:
                print(f"The token '{token}' does not exist in the oauth2_token table.")
                return False
            if permission_granted:
                print(f"The token '{token}' has permission to access the resource.")
            else:
                print(f"The token '{token}' does not have permission to access the resource.")
                return False
            # Get token's expiration time from the database or generate a temporary token with expiration time
            expiration_time = get_token_expiration_time_from_file(token, args.tokens_path)
            if expiration_time:
                print(f"The token '{token}' expires at {expiration_time}.")
                current_time = datetime.utcnow()
                if current_time < expiration_time:
                    print(f"The token '{token}' is valid and not expired.")
                    return True
                else:
                    print(f"The token '{token}' is expired.")
                    return False

            print(f"The token '{token}' is invalid.")
            return False

        return False

class Server(HTTPServer):
    def __init__(self, server_address, handler_class):
        super().__init__(server_address, handler_class)

    def serve_forever(self, certfile, keyfile):
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        context.load_cert_chain(certfile=certfile, keyfile=keyfile)
        self.socket = context.wrap_socket(self.socket, server_side=True)
        super().serve_forever()


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('-p', '--port', type=int, default=8866, help='TCP port to listen on')
    ap.add_argument('-a', '--bind', default='127.0.0.2', help='Bind address')
    ap.add_argument('-d', '--directory', default='.', help='Directory to serve')
    ap.add_argument('--connection_string', default='postgresql://user:password@ip:port/postgres/postgres', help='Database connection string')
    ap.add_argument('-t', '--tokens_path', default='cashed_tokens.json',
                    help='Path to the tokens json file')
    ap.add_argument('-s', '--silent', default=True, help='Silent mode on cleaner')

    args = ap.parse_args()
    os.chdir(args.directory)
    
    cleanup_start(args.tokens_path, args.silent)
    certfile = os.path.join(os.path.dirname(__file__), 'certificate.pem')
    keyfile = os.path.join(os.path.dirname(__file__), 'key.pem')
    
    server = Server((args.bind, args.port), RequestHandler)
    sa = server.socket.getsockname()
    print("Serving directory %s at https://%s:%d" % (os.getcwd(), sa[0], sa[1]))
    try:
        server.serve_forever(certfile=certfile, keyfile=keyfile)
    except KeyboardInterrupt:
        server.server_close()
        sys.exit(0)

```

## File: sbh-file-server\src\setup.py

- Extension: .py
- Language: python
- Size: 246 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from setuptools import setup, find_packages

setup(
    name='sbh-file-server',
    version='1.0.0',
    packages=find_packages(),
    install_requires=[
        'argparse',
        'psycopg2',
    ],
    python_requires='>=3.6',  
)

```

## File: sbh-file-server\src\utils.py

- Extension: .py
- Language: python
- Size: 2037 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
from datetime import datetime, timedelta
import json
import secrets
import os

# Read tokens and their expiration times from a file
def get_tokens_from_file(path):
    try:
        with open(path, 'r') as file:
            tokens = json.load(file)
            return tokens
    except FileNotFoundError:
        print(f"File '{path}' not found.")
        return {}  # Return an empty dictionary if the file doesn't exist or is empty


# Function to get the expiration time of a token from the file
def get_token_expiration_time_from_file(token, path):
    tokens = get_tokens_from_file(path)
    if token in tokens:
        expiration_time_str = tokens[token]
        expiration_time = datetime.fromisoformat(expiration_time_str)
        return expiration_time

    return None  # Return None if the token is not found or expired

# Function to update a token's expiration time in the cashed tokens file
def update_tokens_file(tokens, path):
    
    existing_tokens = get_tokens_from_file(path)
    # append new tokens to existing tokens
    for key in tokens:
        existing_tokens[key] = tokens[key]
    tokens = existing_tokens
    with open(path, 'w') as file:
        json.dump(tokens, file, default=str) 
        
def save_tokens_to_file(tokens, path):
    with open(path, 'w') as file:
        json.dump(tokens, file, default=str) 
    
def add_token_to_file(token, expiration_time, path):
    tokens = get_tokens_from_file(path)
    tokens[token] = expiration_time.isoformat()
    with open(path, 'w') as file:
        json.dump(tokens, file, default=str) 
        
def remove_token_from_file(token, path):
    tokens = get_tokens_from_file(path)
    del tokens[token]
    with open(path, 'w') as file:
        json.dump(tokens, file, default=str) 
        
# Compute a tokens expiration time
def compute_token_expiration_time(token, expiration_time = timedelta(minutes=5)):

    expiration_time = datetime.utcnow() + expiration_time
    return token, expiration_time

```

## File: sbh-file-server\src\database\main.py

- Extension: .py
- Language: python
- Size: 2294 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```python
import psycopg2
from utils import get_token_expiration_time_from_file, compute_token_expiration_time, add_token_to_file
from datetime import datetime, timedelta

def check_token_exist(connection_string, token_to_check, path):
    
    token_expiration_time = get_token_expiration_time_from_file(token_to_check, path)
    if token_expiration_time is None or token_expiration_time < datetime.utcnow():
        try:
            # Connect to the PostgreSQL database
            conn = psycopg2.connect(connection_string)

            # Create a cursor object
            cursor = conn.cursor()

            # Query to check if the token exists in the column of oauth2_token table
            query = "SELECT EXISTS(SELECT 1 FROM oauth2_token WHERE access_token = %s)"
            cursor.execute(query, (token_to_check,))

            # Retrieve the result
            exists = cursor.fetchone()[0]

            # Close the cursor and connection
            cursor.close()
            conn.close()

            # Register the token and its expiration time into a file
            if exists:
                token, expiration_time = compute_token_expiration_time(token_to_check, timedelta(minutes=5))
                add_token_to_file(token, expiration_time, path)
            return exists

        except psycopg2.Error as e:
            print("Error connecting to PostgreSQL database:", e)
            return False  # Return False in case of any error
    else:
        return True # token is registered and not expired
        
        

def check_permission(connection_string, token_to_check, url_to_check):
    # TODO: Implement this function
    try:
        return True

    except psycopg2.Error as e:
        print("Error connecting to PostgreSQL database:", e)
        return False  # Return False in case of any error
    
# Example usage
# connection_string = 'postgresql://user:password@ip:port/postgres'
# token = 'JKooLClGu8wyXI9b178FMd6Nmprk4QvEyAQJDf0z66'

# exists_in_table = check_token_exist(connection_string, token)

# if exists_in_table:
#     print(f"The token '{token}' exists in the oauth2_token table.")
# else:
#     print(f"The token '{token}' does not exist in the oauth2_token table.")

```

## File: sbh-frontend\.browserslistrc

- Extension: 
- Language: unknown
- Size: 44 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
> 1%
last 2 versions
not dead
not ie 11

```

## File: sbh-frontend\.eslintrc.js

- Extension: .js
- Language: javascript
- Size: 404 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```javascript
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}

```

## File: sbh-frontend\.gitignore

- Extension: 
- Language: unknown
- Size: 255 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
.DS_Store
node_modules/
/dist


# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

## File: sbh-frontend\babel.config.js

- Extension: .js
- Language: javascript
- Size: 78 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}

```

## File: sbh-frontend\Dockerfile

- Extension: 
- Language: unknown
- Size: 476 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
# Specify the base image
FROM node:16

# Set the working directory in the container
WORKDIR /sbh-frontend/

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependenciess
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the app
CMD ["npm", "run", "serve"]
# CMD ["npm", "run", "serve", "--", "--public", "0.0.0.0:8080"]

```

## File: sbh-frontend\package.json

- Extension: .json
- Language: json
- Size: 1246 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```json
{
  "name": "SBH-ASSISTANT",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "@mdi/font": "5.9.55",
    "axios": "^1.6.0",
    "core-js": "^3.8.3",
    "js-cookie": "^3.0.5",
    "roboto-fontface": "*",
    "vue": "^3.2.13",
    "vue-router": "^4.0.3",
    "vuetify": "^3.0.0-beta.0",
    "vuex": "^4.0.0",
    "webfontloader": "^1.0.0"
  },
  "devDependencies": {
    "@jamescoyle/vue-icon": "^0.1.2",
    "@mdi/js": "^7.3.67",
    "@types/js-cookie": "^3.0.6",
    "@types/webfontloader": "^1.0.0",
    "@typescript-eslint/eslint-plugin": "^5.4.0",
    "@typescript-eslint/parser": "^5.4.0",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-plugin-router": "~5.0.0",
    "@vue/cli-plugin-typescript": "~5.0.0",
    "@vue/cli-plugin-vuex": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "@vue/eslint-config-typescript": "^9.1.0",
    "eslint": "^7.32.0",
    "eslint-plugin-vue": "^8.0.3",
    "typescript": "5.2.2",
    "vue-cli-plugin-vuetify": "~2.5.8",
    "webpack-plugin-vuetify": "^2.0.0-alpha.0"
  }
}

```

## File: sbh-frontend\README.md

- Extension: .md
- Language: markdown
- Size: 348 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```markdown
# sbh-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```

## File: sbh-frontend\vue.config.js

- Extension: .js
- Language: javascript
- Size: 536 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```javascript
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    host: '0.0.0.0',
    port: 8080,
  },

  configureWebpack: {
    entry: "./src/main.ts",
    devServer: {
        hot: true,
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },
  },
  
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },

  
})

```

## File: sbh-frontend\public\demos.json

- Extension: .json
- Language: json
- Size: 444 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```json
[
  {
    "experimentName": "Demo 1",
    "id": 6,
    "description": "This is the first demo",
    "date_created": "2021-01-01",
    "status": "Completed",
    "tags": [
      "tag1",
      "tag2"
    ]
  },
  {
    "experimentName": "Experiment 2",
    "id": 7,
    "description": "This is the second demo",
    "date_created": "2021-02-01",
    "status": "Ongoing",
    "tags": [
      "tag3",
      "tag4"
    ]
  }
]
```

## File: sbh-frontend\public\experiments.json

- Extension: .json
- Language: json
- Size: 1124 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```json
[
    {
      "experimentName": "Experiment 1",
      "id": 1,
      "description": "This is the first experiment",
      "date_created": "2021-01-01",
      "status": "Completed",
      "tags": ["tag1", "tag2"]
    },
    {
      "experimentName": "Experiment 2",
      "id": 2,
      "description": "This is the second experiment",
      "date_created": "2021-02-01",
      "status": "Ongoing",
      "tags": ["tag3", "tag4"]
    },
    {
      "experimentName": "Experiment 3",
      "id": 3,
      "description": "This is the third experiment",
      "date_created": "2021-03-01",
      "status": "Planned",
      "tags": ["tag5", "tag6"]
    },
    {
      "experimentName": "Experiment 4",
      "id": 4,
      "description": "This is the fourth experiment",
      "date_created": "2021-04-01",
      "status": "Pending",
      "tags": ["tag7", "tag8"]
    },
    {
      "experimentName": "Experiment 5",
      "id": 5,
      "description": "This is the fifth experiment",
      "date_created": "2021-05-01",
      "status": "Failed",
      "tags": ["tag9", "tag10"]
    }
  ]
```

## File: sbh-frontend\public\index.html

- Extension: .html
- Language: html
- Size: 630 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```

## File: sbh-frontend\src\App.vue

- Extension: .vue
- Language: unknown
- Size: 5046 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
<template>
  <v-app>
    <v-app-bar app :elevation="1" density="compact">
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-app-bar-title>
        <v-btn @click="routeTo('/')" variant="text" class="px-1">
          <v-img v-if="theme.global.name.value=='light'" src="./assets/logo_light.svg" width="25px" height="25px" style="margin:5px;" />
          <v-img v-if="theme.global.name.value=='dark'" src="./assets/logo_dark.svg" width="25px" height="25px" style="margin:5px;" />
          <span style="margin: auto; margin-left: 10px;">SBH-Assistant</span>
        </v-btn>
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn v-if="theme.global.name.value=='light'" @click="toggleTheme()" icon="mdi-lightbulb"></v-btn>
        <v-btn v-if="theme.global.name.value=='dark'" @click="toggleTheme()" icon="mdi-lightbulb-on-outline"></v-btn>
      <v-btn v-if="isAuthenticated" icon>
        <v-icon icon="mdi-account-circle"></v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item
              v-for="(item, index) in accountMenuItems"
              :key="index"
              :value="index"
              @click="item.action"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
      <v-btn v-else @click="navigateTo('http://127.0.0.1:5001/')">
        Login
      </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawerOpen">
      <v-list dense>
        <v-list-item
            v-for="item in sideMenuItems"
            :key="item.title"
            link
            @click="item.action"
          >
          <template v-slot:prepend>
            <v-icon v-if="item.title=='Experiment'" >
              <v-img v-if="theme.global.name.value=='light'" src="./assets/microscope_light.svg" width="24px" height="24px"/>
              <v-img v-if="theme.global.name.value=='dark'" src="./assets/microscope_dark.svg" width="24px" height="24px"/>
            </v-icon>
            <v-icon v-else :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, computed, } from 'vue'
import { useTheme } from 'vuetify'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from '@/plugins/axios';
import { MenuItem } from '@/types/MenuItem'

export default defineComponent({
  name: 'App',
  
  methods: {
    
    toggleTheme () {
      this.theme.global.name.value = this.theme.global.current.value.dark ? 'light' : 'dark'
    },
    
    routeTo(path:string) {
      this.$router.push({ path: path })
    },
  },

  setup() {
    const drawerOpen = ref(false);
    const theme = useTheme()
    const store = useStore();
    const router = useRouter();
    const icons: { [key: string]: string; } = { 
      '/experiment': 'microscope',  
      '/about': 'mdi-account-group-outline',
      '/neuroglancers' : 'mdi-cube-scan'
    };

    const navigateTo = (url: string) => {
      // Check if the URL is external
      if (url.startsWith('http')) {
        // External URL, redirect
        window.location.href = url;
      } else {
        router.push({ path: url });
      }
    };

    const isAuthenticated = computed(() => store.getters.isLoggedIn);

    const sideMenuItems = computed(() => {
      const routes = router.getRoutes()
      let items:Array<MenuItem> = []
      
      routes.forEach(route => {
        if (route.meta.sideMenuDisplay && (route.meta.requiresAuth ? store.state.isAuthenticated : true)) {
          items.push({
            title: route.name as string,
            icon: icons[route.path] as string,
            action: () => router.push(route.path)
          });
        }
      });
      return items
    });

   
    const toggleDrawer = () => {
      drawerOpen.value = !drawerOpen.value;
    }

    const logout = () => {
      axios.post('/logout', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then(() => {
        router.push('/')
        store.commit('setAuthentication', false)
      });
    }

    const accountMenuItems: Array<MenuItem> = [
      { title: "settings", icon: "mdi-cog-outline", action: () => router.push('/profile') },
      { title: "logout", icon: "mdi-logout", action: logout }
    ];

    return {
      drawerOpen,
      isAuthenticated,
      sideMenuItems,
      theme,
      accountMenuItems,
      logout,
      toggleDrawer,
      navigateTo
    }
  },
})
</script>

```

## File: sbh-frontend\src\main.ts

- Extension: .ts
- Language: typescript
- Size: 408 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from './plugins/axios';

loadFonts()

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);
app.provide('axios', axios);
app.mount('#app');


```

## File: sbh-frontend\src\shims-vue.d.ts

- Extension: .ts
- Language: typescript
- Size: 174 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```typescript
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

```

## File: sbh-frontend\src\components\Experiment.vue

- Extension: .vue
- Language: unknown
- Size: 905 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
<template>
    <v-list dense>
      <v-list-item v-for="item in items" :key="item.experimentName" link>
        <div class="list-item-content">
          <p><strong>Name:</strong> {{ item.experimentName }}, <strong>id:</strong> {{ item.id }}</p>
          <p><strong>Creation Date:</strong> {{ item.date_created }}, <strong>tags: </strong>
            <span v-for="(tag, index) in item.tags" :key="index">{{ tag }}, </span>
          </p>
          <p><strong>Description:</strong> {{ item.description }}</p>
        </div>
      </v-list-item>
    </v-list>
  </template>
  
  <script>
  export default {
    name: "ExperimentComponent",
    props: {
      items: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .list-item-content {
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }
  </style>
```

## File: sbh-frontend\src\plugins\axios.ts

- Extension: .ts
- Language: typescript
- Size: 274 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```typescript
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  withCredentials: true,
});

export const auth_instance = axios.create({
  baseURL: 'http://127.0.0.1:5001',
  withCredentials: true,
});

export default instance;

```

## File: sbh-frontend\src\plugins\vuetify.ts

- Extension: .ts
- Language: typescript
- Size: 491 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```typescript
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify, ThemeDefinition } from 'vuetify'

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#64A9FF',
  },
}
const light: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#64A9FF',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark,
      light,
    },
  },
})



  
```

## File: sbh-frontend\src\plugins\webfontloader.ts

- Extension: .ts
- Language: typescript
- Size: 375 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```typescript
/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts () {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')

  webFontLoader.load({
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap'],
    },
  })
}

```

## File: sbh-frontend\src\router\index.ts

- Extension: .ts
- Language: typescript
- Size: 2729 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```typescript
import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
import store from '@/store/index' 
import HomeView from '../views/HomeView.vue'
import Cookies from 'js-cookie';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: false, sideMenuDisplay: false, },
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    meta: { requiresAuth: false, sideMenuDisplay: false },
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/authentification',
    name: 'authentification',
    meta: { requiresAuth: false, sideMenuDisplay: false },
    component: () => import('../views/AuthentificationView.vue')
  },
  {
    path: '/experiment',
    name: 'Experiment',
    meta: { requiresAuth: true, sideMenuDisplay: true },
    component: () => import('../views/ExperiementView.vue')
  },
  {
    path: '/about',
    name: 'About & FAQ',
    meta: { requiresAuth: false, sideMenuDisplay: true },
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    meta: { requiresAuth: false, sideMenuDisplay: false },
    component: () => import('../views/ForgotPasswordView.vue')
  },
  {
    path: '/neuroglancers',
    name: 'Neuroglancers',
    meta: { requiresAuth: false, sideMenuDisplay: true },
    component: () => import('../views/NeuroglancerViewer.vue')
  },
  {
    path: '/viewer',
    name: 'Viewer',
    meta: { requiresAuth: false, sideMenuDisplay: false },
    component: () => import('../views/ViewerView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach(async (to, from, next) => {
  // check the user authenticate status
  const access_token = checkAccessToken()
  if (access_token) store.commit("setAccessToken", access_token)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !store.getters.isLoggedIn) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

const checkAccessToken = () => {
  // Now we ask the server directyl if we use httponly like this:
  // fetch('http://127.0.0.1:5000/get-access-token', {
  //   credentials: 'include'
  // })
  // .then(response => {
  //   response.json().then(data => {
  //       console.log('Access Token:', data.access_token);
  //       return data.access_token;
  //   })
  // })
  // .catch(error => console.error('Error fetching access token:', error));
  // Else we can simply get the cookie from js
  const token = Cookies.get('access_token')
  return token;
} 

export default router

```

## File: sbh-frontend\src\store\index.ts

- Extension: .ts
- Language: typescript
- Size: 655 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```typescript
import { createStore } from 'vuex';
import { auth_instance } from '../plugins/axios'; // Import the Axios instance you just configured

interface State {
  isLoggedIn: boolean;
  accessToken: string;
}

export default createStore<State>({
  state: {
    isLoggedIn: false,
    accessToken: "",
  },
  mutations: {
    setLoggedIn(state, payload: boolean) {
      state.isLoggedIn = payload;
    },
    setAccessToken(state, token) { 
      state.accessToken = token;
    },
  },
  actions: {
  },
  getters: {
    isLoggedIn: (state) => state.accessToken ? true : false,
    accessToken: (state) => state.accessToken,
  },
});

```

## File: sbh-frontend\src\types\ExperimentType.ts

- Extension: .ts
- Language: typescript
- Size: 175 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```typescript
export interface Experiment {
    experimentName: string;
    id: number;
    description: string;
    date_created: string;
    status: string;
    tags: string[];
  }
```

## File: sbh-frontend\src\types\MenuItem.ts

- Extension: .ts
- Language: typescript
- Size: 96 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```typescript
export interface MenuItem {
    title: string;
    icon: string;
    action: () => void;
  }
```

## File: sbh-frontend\src\types\ViewerPayload.ts

- Extension: .ts
- Language: typescript
- Size: 217 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```typescript
export default interface ViewerPayload {
    neuroglancer_id : number;
    status: number;
    group_id: number;
    state: object;
    shared_link: string;
    source_string: string;
    owner_id: number;
  }
```

## File: sbh-frontend\src\views\AboutView.vue

- Extension: .vue
- Language: unknown
- Size: 3615 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
<template>
  <div class="about">
    <h1>About SBH-Assistant</h1>
    <p> SBH-Assistant is a sophisticated web application developed by LINUM (Laboratoire d'Imagerie Numérique,
      Neurophotonique et Microscopie), spearheaded by Professor Joël Lefebvre. With a strong emphasis on advancing
      computer vision techniques and image analysis algorithms for microscopy and neurophotonics, LINUM has meticulously
      engineered this platform.
      <br>
      SBH-Assistant serves as a crucial tool for simplifying the intricacies of SBH (Serial Blockface Histology)
      experiments. Streamlining crucial phases such as experiment preparation, image acquisition, and data visualization,
      our application focuses on data storage and manipulation without managing data processing pipelines.
      <br>
      This user-friendly application is designed to accommodate the diverse needs of laboratory members and collaborators,
      fostering a seamless experience in data manipulation without necessitating extensive technological expertise.
      Discover the power of SBH-Assistant in enhancing the efficiency and precision of your research endeavors.
    </p>
    <v-expansion-panels v-model="panel" multiple class="dropdown">
      <v-expansion-panel v-for="item in FAQ" :key="item.index">
        <v-expansion-panel-title class="dropdown_title">{{ item.Question }}</v-expansion-panel-title>
        <v-expansion-panel-text class="dropdown_text">{{ item.Answer }}</v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutView',

  data() {
    return {
      panel: [],
      FAQ: [
      {
          index: 0,
          Question: "How can I get access to SBH-Assistant for my research project?",
          Answer: "You need to sign up for an account. Once your account is approved, you will be able to access the public preuploaded datasets and request access to other private."
        },
        {
          index: 1,
          Question: "How secure is the data stored and processed within SBH-Assistant?",
          Answer: "Data security is a top priority for SBH-Assistant. Our platform employs robust security measures to ensure the confidentiality and integrity of your research data."
        },
        {
          index: 2,
          Question: "Can SBH-Assistant handle large datasets efficiently?",
          Answer: "We use the Zarr file format to store large datasets. This format is designed to store large arrays of numerical data efficiently, with a particular emphasis on scientific data processing. Zarr is a Python package that provides an implementation of chunked, compressed, N-dimensional arrays that are designed to be efficient to work with using NumPy and Dask."
        },
        {
          index: 3,
          Question: "How can I upload my data to SBH-Assistant?",
          Answer: "Currently, SBH-Assistant provide pre-uploaded datasets for public access. If you want to upload your data, please contact us at info@linumlab.ca"
        },
      ]
    }
  },
  methods: {
  },
});

</script>

<style scoped>
.about {
  text-align: center;
  padding: 3rem;
  margin-left: 10%;
  margin-right: 10%;

}

.about p {
  font-size: 1.2rem;
  padding-top: 3rem;
}

.dropdown {
  padding-top: 3rem;

}

.dropdown_title {
  font-size: 1.2rem;
  font-weight: bold;
}

.dropdown_text {
  font-size: 1.2rem;
  text-align: left;
}

</style>
```

## File: sbh-frontend\src\views\AuthentificationView.vue

- Extension: .vue
- Language: unknown
- Size: 4786 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
<template>
  <v-card class="center" style="width:50%; min-width:max-content">
    <v-form validate-on="submit lazy" @submit.prevent="login()" ref="form">
      <h2 class="pa-2">Sign in</h2>
      <label class="pa-3 text-medium-emphasis">Email</label>
      <v-text-field 
        v-model="email"
        :rules="[rules.required]" 
        placeholder="Enter your email"  
        variant="solo" density="compact"
        prepend-inner-icon="mdi-email"
        ></v-text-field>
        <div class="px-3 text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
        
      </div>
      <v-text-field
        v-model="password"
        @click:append-inner="visible = !visible"
        :rules="[rules.minimumRequirements, rules.required]" 
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="solo"
      ></v-text-field>
      <v-btn @click="routeTo('/forgot-password')" class="text-caption text-decoration-none text-blue" variant="text">
        Forgot password?
      </v-btn>
        
        <v-card v-if="errors.length>0 && showErrors" color="error" class="my-2">
          <v-btn class="float-right ma-2" size="x-small" icon variant="text" @click="showErrors=false"><v-icon>mdi-close</v-icon></v-btn>
          <v-container>
            <v-row v-for="error in errors" :key="error" class="d-flex align-center py-1">
              {{ error }}
            </v-row>
          </v-container>
        </v-card>
        <v-container>
        <v-row justify="center" class="mt-2">
          <v-btn type="submit" variant="outlined">
          Sign in
          <v-icon class="ma-1">mdi-login</v-icon>
        </v-btn>
        </v-row>
      </v-container>
      <div class="alternative-option mt-4">
        You don't have an account ? 
        <a
          role="button"
          class="text-decoration-none text-blue "
          @click="routeTo('/register')"
        >
        Register now</a>
      </div>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import router from "@/router/index"
import axios from '@/plugins/axios';
import { ref } from 'vue'
import { useStore } from 'vuex';


  export default {
    name: 'AuthentificationView',

    setup() {
    const store = useStore();

    const password = ref('');
    const email = ref('');
    const errors = ref<string[]>([]);
    const showErrors = ref<boolean>(false);
    const visible = ref(false);

    const rules = {
      required: (value: string) => value.length > 0 || 'Required.',
      minimumRequirements: (v: string) => v.length >= 8 || 'Min 8 characters',
    };

    const routeTo = (path: string) => {
      router.push({ path });
    };

    
    const validateEmail = (email:string) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validate = () => {  
      errors.value = []
      if(password.value=="" || email.value=="") {
        errors.value.push("Missing field(s)")
      }   
      if(!validateEmail(email.value)) {
        errors.value.push("Email format is not valid")
      }
    
      if(errors.value.length > 0) {
        showErrors.value = true
      }
      return errors.value.length == 0
    };  

    const login = async () => {
      if(validate()) {
        const formData = new URLSearchParams();
        formData.append('email', email.value);
        formData.append('password', password.value);

        axios.post('/authenticate', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then(() => {
          store.commit('setAuthentication', true)
          routeTo('/')
        })
        .catch((error) => {
          showErrors.value=true
          errors.value.push(error.response.data)
        });  
      }
    
    };

    return {
      password,
      email,
      visible,
      rules,
      errors,
      showErrors,
      routeTo,
      login,
    };
  },
}
  
</script>
<style>
.center {
  max-width: 600px;
  order: 5px solid;
  position:absolute;
  top: 50%;
  left: 50%; 
  padding: 40px;
  transform: translate(-50%,-50%);
}
.input {
  padding:10px;
}
.alternative-option {
  text-align: center;
}
.alternative-option > span {
  color: #0d6efd;
  cursor: pointer;
}


</style>

```

## File: sbh-frontend\src\views\ExperiementView.vue

- Extension: .vue
- Language: unknown
- Size: 3810 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
<template>
  <div class="d-flex flex-column  mx-auto w-75 mt-7">
    <div class="d-flex">
      <!-- Search bar -->
      <v-text-field v-model="searchKeyword" label="Search" class="mr-4" ></v-text-field>
      <!-- New button -->
      <v-btn @click="handleNew" color="primary" height="55" width="15%">New</v-btn>
    </div>
    <!-- Experiments -->
    <v-expansion-panels class=" mt-5" v-model="panel" :disabled="false" multiple>
      <v-expansion-panel>
        <v-expansion-panel-title>Experiments</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list dense>
              <experiment-component :items="filteredExperiments"/>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <!-- Demos -->
      <v-expansion-panel>
        <v-expansion-panel-title>Demos</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list dense>
              <experiment-component :items="filteredDemos"/>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Experiment } from '@/types/ExperimentType';
import ExperimentComponent from '@/components/Experiment.vue';
export default defineComponent({
  name: 'HomeView',
  components: {
    ExperimentComponent,
  },
  data: () => ({
    panel: [0, 1] as number[],
    disabled: false as boolean,
    experiments: [] as Experiment[],
    demos: [] as Experiment[],
    searchKeyword: '' as string, 
  }),
  computed: {
    filteredExperiments(): Experiment[] {
      return this.experiments.filter(experiment =>
        this.filterExperiment(experiment, this.searchKeyword)
      );
    },
    filteredDemos(): Experiment[] {
      return this.demos.filter(demo => this.filterExperiment(demo, this.searchKeyword));
    },
  },
  methods: {
    fetchDataLocally(): void {
      // Fetch Experiments
      fetch('experiments.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: Experiment[]) => {
          this.experiments = data;
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
      // Fetch Demos
      fetch('demos.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: Experiment[]) => {
          this.demos = data;
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    },
    handleNew(): void {
      // TODO: Implement
    },
    filterExperiment(experiment: Experiment, keyword: string): boolean {
      // Check if any of the fields match the keyword
      const nameMatch = experiment.experimentName.toLowerCase().includes(keyword.toLowerCase());
      const tagMatch = experiment.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()));
      const idMatch = experiment.id == Number(keyword);
      const dateMatch = experiment.date_created.toLowerCase().includes(keyword.toLowerCase());
      const descriptionMatch = experiment.description.toLowerCase().includes(keyword.toLowerCase());
      return nameMatch || tagMatch || idMatch || dateMatch || descriptionMatch;
    },
  },
  mounted() {
    this.fetchDataLocally();
  },
});
</script>
<style>
.list-item-content {
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
</style>
```

## File: sbh-frontend\src\views\ForgotPasswordView.vue

- Extension: .vue
- Language: unknown
- Size: 3765 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
<template>
  <v-card class="center" style="width:50%; min-width:max-content">
    <v-form v-if="!sentView" validate-on="submit lazy" @submit.prevent="sendRecoverPassword()" ref="form">
      <h2 class="pa-2">Forgot your password ? </h2>
      <p class="pa-2">Enter your email address, and we will send you a password recovery link.</p>
      <label class="pa-3 text-medium-emphasis">Email</label>
      <v-text-field 
        v-model="email"
        :rules="[rules.required]" 
        placeholder="Enter your email"  
        variant="solo" density="compact"
        prepend-inner-icon="mdi-email"
        ></v-text-field>
       <v-card v-if="errors.length>0 && showErrors" color="error" class="my-2">
          <v-btn class="float-right ma-2" size="x-small" icon variant="text" @click="showErrors=false"><v-icon>mdi-close</v-icon></v-btn>
          <v-container>
            <v-row v-for="error in errors" :key="error" class="d-flex align-center py-1">
              {{ error }}
            </v-row>
          </v-container>
        </v-card>
        <v-container>
        <v-row justify="center" class="mt-2">
          <v-btn type="submit" variant="outlined">
          Recover password
          <v-icon class="ma-1">mdi-email</v-icon>
        </v-btn>
        </v-row>
      </v-container>
    </v-form>
    <div v-else>
      <p>If your email is recognized, we will send you a recovery message. </p>
      <p>Please check your spam or junk folder if you do not see it in your inbox.</p>
      <div class="alternative-option mt-4">
        <a 
        role="button"
        class="text-decoration-none text-blue "
        @click="routeTo('/Authentification')"
        ><v-icon>mdi-chevron-left</v-icon> Go back to Sign in</a>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import router from "@/router/index"
import { ref } from 'vue'

  export default {
    name: 'AuthentificationView',

    setup() {
    const email = ref('');
    const errors = ref<string[]>([]);
    const showErrors = ref<boolean>(false);
    const visible = ref(false);
    const sentView = ref(false);

    const rules = {
      required: (value: string) => value.length > 0 || 'Required.',
      minimumRequirements: (v: string) => v.length >= 8 || 'Min 8 characters',
    };

    const routeTo = (path: string) => {
      router.push({ path });
    };

    
    const validateEmail = (email:string) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validate = () => {  
      errors.value = []
      if(email.value=="") {
        errors.value.push("Missing field(s)")
      }   
      if(!validateEmail(email.value)) {
        errors.value.push("Email format is not valid")
      }
    
      if(errors.value.length > 0) {
        showErrors.value = true
      }
      return errors.value.length == 0
    };  

    const sendRecoverPassword = async () => {
      if(validate()) {
        const formData = new URLSearchParams();
        formData.append('email', email.value);

        // TODO in auth backend
        // axios.post('/recover-password', formData, {
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   },
        // })

        sentView.value=true;
      }
    
    };

    return {
      email,
      visible,
      rules,
      errors,
      showErrors,
      sentView,
      routeTo,
      sendRecoverPassword,
    };
  },
}
  
</script>
<style>
</style>

```

## File: sbh-frontend\src\views\HomeView.vue

- Extension: .vue
- Language: unknown
- Size: 2429 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
<template>
  <v-img src="@/assets/logo.png" contain max-width="30%" class="mx-auto py-7"></v-img>
  <div class="mx-auto d-flex flex-column" max-width="50%">
    <h1 class="text-center mb-2">Welcome to SBH Assistant</h1>
    <div class="text-center mb-2">
      <p>Get started by signing in or checking out our demos.</p>
    </div>
    <div class="d-flex flex-column w-25 text-center mx-auto">
      <!-- Update the @click handler to use navigateTo instead -->
      <v-btn class="bg-primary text-center ma-2" @click="navigateTo('http://127.0.0.1:5001/')" block>Sign In</v-btn>
      <v-btn class="border-solid border-2 text-center ma-2" @click="createViewer();" block>View Demos</v-btn>
      <!-- <v-btn class="bg-primary text-center ma-2" @click="navigateTo('http://127.0.0.1:5000/token_optional')" block>token_optional</v-btn>
      <v-btn class="bg-primary text-center ma-2" @click="navigateTo('http://127.0.0.1:5000/token_required')" block>token_required</v-btn> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '@/plugins/axios';
import { useRouter } from 'vue-router';
import ViewerPayload from "../types/ViewerPayload"

export default defineComponent({
  name: 'HomeView',
  
  setup() {

    const router = useRouter(); 

    const navigateTo = (url: string) => {
      // Check if the URL is external
      if (url.startsWith('http')) {
        // External URL, redirect
        window.location.href = url;
      } else {
        router.push({ path: url });
      }
    };

    const createViewer = async () => {
      const payload: ViewerPayload = {
        neuroglancer_id: 0,
        status: 0,
        group_id: 0,
        state: {},
        shared_link: "string",
        source_string: "zarr://gs://sbh-assistant-data/allen_demo_10um.zarr/",
        owner_id: 0 
      };
      try {
        const response = await axios.post('/neuroglancer/create_viewer', payload);
        console.log("create_viewer response", response.data);
        const ngId = response.data.session_details.neuroglancer_id
        console.log("ngId :", ngId)
        
        router.push({ name: "Viewer", query: { id: ngId } }) 

      } catch (error) {
        console.error(error); // Handle errors
      }
    };

    return { 
      navigateTo, 
      createViewer,
    };
  },
});
</script>


```

## File: sbh-frontend\src\views\NeuroglancerViewer.vue

- Extension: .vue
- Language: unknown
- Size: 2759 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
<template>
    <div class="ma-6">
      <h1>Viewer list</h1>
      <v-table class="my-2">
        <thead>
          <tr>
            <th class="text-left">Owner Id</th>
            <th class="text-left">Group Id</th>
            <th class="text-left">Shared Link</th>
            <th class="text-left">Source String</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="viewer in viewerData"
            :key="viewer.owner_id"
            :class="theme.global.name.value=='dark' ? 'tableRowDark' : 'tableRowLight'"
            @click="view(viewer.neuroglancer_id)"
          >
            <td>{{ viewer.owner_id }}</td>
            <td>{{ viewer.group_id }}</td>
            <td>{{ viewer.shared_link }}</td>
            <td>{{ viewer.source_string }}</td>
            <td v-if="viewer.status == 0"><v-icon color="green">mdi-check</v-icon></td>
            <td v-if="viewer.status == 1"><v-icon color="red">mdi-close</v-icon></td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import axios from '@/plugins/axios';
  import { useRouter } from 'vue-router';
  import { useTheme } from 'vuetify'
  import ViewerPayload from "../types/ViewerPayload"
    

  export default defineComponent({
    name: 'HomeView',
    
    setup() {
  
      const router = useRouter(); 
      const theme = useTheme()
      const viewerData = ref<Array<ViewerPayload> | null>(null); 

      const view = (ngId:number) => {
        router.push({ name: "Viewer", query: { id: ngId } }) 
      }

      const navigateTo = (url: string) => {
        // Check if the URL is external
        if (url.startsWith('http')) {
          // External URL, redirect
          window.location.href = url;
        } else {
          router.push({ path: url });
        }
      };
  
      const fetchUserViewers = async () => {
        try {
          const response = await axios.get('/neuroglancer/');
          console.log("neuroglancer response", response.data);  
          viewerData.value = response.data
        } catch (error) {
          console.error(error); // Handle errors
        }
      };

      onMounted(()=> {
        fetchUserViewers()
      })
  
      return { 
        theme,
        view,
        navigateTo, 
        viewerData
      };
    },
  });
  </script>
  
  <style scoped>
  .tableRowDark:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.116)
  }
  .tableRowLight:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.116)
  }
  </style>
```

## File: sbh-frontend\src\views\RegisterView.vue

- Extension: .vue
- Language: unknown
- Size: 5035 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
<template>
  <v-card class="center" style="width:50%; min-width:max-content">
    <v-form validate-on="submit lazy" @submit.prevent="register()" ref="form">
      <h2 class="pa-2">Register</h2>
      <label class="pa-3">Email</label>
      <v-text-field 
      v-model="email"
      :rules="[rules.required]" 
      placeholder="Enter your email" 
      variant="solo" 
      density="compact"
      prepend-inner-icon="mdi-email"
      ></v-text-field>
      <label class="pa-3">Password</label>
      <v-text-field
        v-model="password"
        
        :rules="[rules.minimumRequirements, rules.required]" 
        @click:append-inner="visible = !visible"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="solo"
      ></v-text-field>
      <label class="pa-3">Confirm password</label>
      <v-text-field
        v-model="confirmPassword"
        :rules="[rules.minimumRequirements, rules.required]" 
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="visible = !visible"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Confirm your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="solo"
      ></v-text-field>

      <v-card v-if="errors.length>0 && showErrors" color="error" class="my-2">
        <v-btn class="float-right ma-2" size="x-small" icon variant="text" @click="showErrors=false"><v-icon>mdi-close</v-icon></v-btn>
        <v-container>
          <v-row v-for="error in errors" :key="error" class="d-flex align-center py-1">
            {{ error }}
          </v-row>
        </v-container>
      </v-card>
      <v-container>
          <v-row justify="center">
            <v-btn type="submit" variant="outlined">
            Create account
          </v-btn>
          </v-row>
        </v-container>
        <div class="alternative-option mt-4">
          <a 
          role="button"
          class="text-decoration-none text-blue "
          @click="routeTo('/Authentification')"
          ><v-icon>mdi-chevron-left</v-icon> Go back to Sign in</a>
        </div>
    </v-form>
  </v-card>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import router from "@/router/index"
import axios from '@/plugins/axios';
import { useStore } from 'vuex';
import { ref } from 'vue'


export default {
  name: 'RegisterView',

  setup() {
    const store = useStore();

    const password = ref('');
    const confirmPassword = ref('');
    const email = ref<string>('');
    const errors = ref<string[]>([]);
    const showErrors = ref<boolean>(false);
    const visible = ref(false);


    const rules = {
      required: (value: string) => value.length > 0 || 'Required.',
      minimumRequirements: (v: string) => v.length >= 8 || 'Min 8 characters',
    };

    const routeTo = (path: string) => {
      router.push({ path });
    };

    const validateEmail = (email:string) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validate = () => {  
      errors.value = []
      if(password.value=="" || confirmPassword.value=="" || email.value=="") {
        errors.value.push("Missing field(s)")
      }   
      if(!validateEmail(email.value)) {
        errors.value.push("Email format is not valid")
      }
      if(password.value !== confirmPassword.value) {
        errors.value.push("Passwords does not match")
      }

      if(errors.value.length > 0) {
        showErrors.value = true
      }
      return errors.value.length == 0
    };  

    const register = async () => {
      if(validate()) {
        errors.value = []
        const formData = new URLSearchParams();
        formData.append('email', email.value);
        formData.append('password', password.value);

        axios.post('/create_user', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then(() => {
          store.commit('setAuthentication', true)
          routeTo('/')
        })
        .catch((error) => {
          showErrors.value=true
          errors.value.push(error.response.data)
        });    
      }
    };

    return {
      password,
      confirmPassword,
      email,
      visible,
      rules,
      errors,
      showErrors,
      routeTo,
      register,
    };
  }
}
</script>
<style>
.center {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
padding: 40px;
text-align: left;
}
</style>

```

## File: sbh-frontend\src\views\ViewerView.vue

- Extension: .vue
- Language: unknown
- Size: 1520 bytes
- Created: 2024-07-26 11:30:16
- Modified: 2024-07-26 11:30:16

### Code

```unknown
<template>
    <iframe :src="link" style="width: 100%; border-radius: 50px; border: none; height: calc(100% - 48px); padding: 40px;"></iframe>
</template>
  

  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from '../plugins/axios';
  import ViewerPayload from "../types/ViewerPayload"

  export default defineComponent({
    name: 'HomeView',
    
    setup() {
      const route = useRoute();
      const routeQuery= route.query;
      const data = ref<ViewerPayload | null>(null); 
      const link = ref<string | undefined>(undefined)

      console.log("Router params :", routeQuery)
        
      // on mount -> load neuroglancer with id 
      // A function to fetch data based on the ID from the route query
      const fetchData = async () => {
        const id = route.query.id; // Assuming the ID is passed as a query parameter 'id'
        if (id) {
          try {
            const response = await axios.get(`http://127.0.0.1:5000/neuroglancer/${id}`);
            data.value = response.data;
            console.log("Fetched data:", data.value);
            link.value = data.value?.shared_link; 
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      };

      // Execute fetchData on component mount
      onMounted(() => {
        fetchData();
      });

      return { link };
    },
  });
  </script>
  
  
```

