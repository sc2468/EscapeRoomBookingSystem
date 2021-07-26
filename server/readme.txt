The server is a graphql server which is implemented using expressGraphql. The server is backed by a mysql database server.

Setup mysql database

setup Mysql on mac
  1: brew install mysql
  2: brew services start mysql
  3: mysql_secure_installation
  4: setup approbate initial setting for your server

As we started mysql with brew it will auto restart when ever you restart your mac
if you don't want this to happen you can stop it using `brew services stop mysql`
you can then restart the server when you want to use it by running `mysql.server start`
stopping it using `mysql.server stop`

Next setup the table