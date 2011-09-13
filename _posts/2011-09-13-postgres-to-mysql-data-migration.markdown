---
layout: post
title: "Heroku Postgres to MySQL Data Migration"
date: 2011-09-13 11:42
categories: 
- blog
- mysql
- postgres
---

Author [Bry Ashman](/crew.html#ba)

Recently we had to migrate a project from a large postgres database on heroku
to a MySQL Amazon RDS instance. 

For smaller migrations Herokus builtin [taps](https://github.com/ricardochimal/taps) support
makes this proccess extremely straightforward.

    heroku db:pull mysql://user:password@mysql_host/db_name

However for larger datasets this can be quite time consuming. Another approach is to use 
pg_dump to export a plain sql script file, and manage the schema migration yourself.
Assuming you have a local postgres instance running you can use the pgbackups addon on
heroku to fetch the data from your heroku instance and then use pg_restore to load it into
your local database.

    heroku pgbackups:capture
    curl -o latest.dump $(heroku pgbackups:url)
    pg_restore --verbose --clean --no-acl --no-owner -d dbname latest.dump

Once this has completed you can create a data only dump. For example to dump from the database dbname to the file 
'dump.sql' as a plain sql file, with the column names specified on each insert command you could use the following command.

    pg_dump -Fp --data-only --column-inserts --file=dump.sql dbname 

However this will still need to be processed as there are some postgres specific SET and SELECT 
commands, and potentially doing database conversion if the datatypes in your schema have changed.
One common change is that postgres has a boolean type that is represented by 't' and 'f', where as
MySQL uses a tinyint(1) with the values '1' and '0' to represent true and false. 

This approach is still quite slow, made even slower if you require the column names in all the inserts.
A faster method it to do a bulk export and import. Postgres allows you to dump a table to a tab separated
file (tsv) with the COPY command. MySQL allows you import this with the 'mysqlimport' command. Also tsv's
are simple to process with unix tools such as sed and awk, or with a programming language to do more involved
data conversion and manipulation.

To export a table to a tsv to '/tmp/table_name.dump.tsv' on the postgres server you can use.

    COPY table_name TO '/tmp/table_name_dump.tsv' 

If you don't have access to the server, there is a \copy command in psql that follows the same syntax
which allows you to output the file client side. After carrying out the datatype conversions that you
need. You can import this into mysql using mysqlimport. For example if I have a local file 
'/tmp/table\_name.tsv'. 

You can import this into mysql as follows:

    mysqlimport --local --compress --user=user --password=password \
    --verbose --host=mysql_host db_name /tmp/table_name.tsv

With large exports you may want to split this into mulitple parts. The 'split' utility is very useful for this purpose
allowing you to take a large file and split it into a set of smaller files. To split a file into 512MB chunks, where
lines are sigificant you can use the following command to get a set of 512mb output_prefix01, output_prefix02, etc files.

    split -C 512m -d input_file output_prefix

