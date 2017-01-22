#!/usr/bin/env bash
./mvnw clean package -Pprod -DskipTests
heroku deploy:jar --jar target/*.war
