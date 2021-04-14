# Groupomania

Projet final du parcours Développeur Web d'OpenClassrooms  
Création d'un réseau social d'entreprise

## Technologies utilisées

-   Koa (Backend)
-   Vue (Frontend)
-   Bootstrap

## 1. Installer ce projet en local:

```
git clone https://github.com/sebastien-coupe/groupomania.git groupomania
```

## 2. Mise en place de la base de données

Si vous le souhaitez, un fichier `docker-compose.yml` est présent dans le dossier `db`, pour le mettre en place, lancez la commande suivante:

```
cd db && docker-compose up
```

Importez le fichier `groupomania.sql` dans mysql:

```
docker exec -i groupomania sh -c 'exec mysql -uroot -proot' < groupomania.sql
```

Si vous ne souhaitez pas utiliser docker, récupèrez simplement le fichier `groupomania.sql` et importez le dans votre instance de Mysql.

## 3. Mise en place du backend

Rendez vous dans le dossier `api` et installez les dépendances:

```
npm install
```

Placez le fichier `env.api` fourni dans les livrables dans le dossier api et renommez le en `.env`:

```
mv en.api .env
```

Une fois que tout est en place vous pouvez lancer le serveur backend:

```
npm start
```

## 4. Mise en place du frontend

Rendez vous dans le dossier `client` et installez les dépendances:

```
npm install
```

Il ne reste plus qu'à lancer serveur frontend:

```
npm run serve
```

Si tous s'est bien passé, vous avez maintenant accès à l'application depuis [http://localhost:8080](http://localhost:8080)
