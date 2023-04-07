# Kafka Boilerplate

#### Technologies
1. Kafka
2. Nodejs
3. Typescript
4. Docker

#### How to install and set the environment
```bash
docker-compose -f docker-compose.yml up -d
```
then:
```bash
docker exec -it kafka /bin/sh
```
Just replace `kafka` with the value of `container_name`, if you’ve decided to name it differently in the `docker-compose.yml` file.

Create a topic with this command:
```bash
kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic my_topic
```
`my_topic` means the name of my topic. You must set also in `const.js`

You can see the list of the topic:

```bash
kafka-topics.sh --list --zookeeper zookeeper:2181
```
#### How to run
Install the node modules
```bash
npm install
```
Set your environment variables in the `.env` file.
Currently used are:
```bash
APP_ID=""
APP_KEY=""
```
Run scripts for Kafka consumer and producer
```bash
npm run consumer
npm run producer
```
