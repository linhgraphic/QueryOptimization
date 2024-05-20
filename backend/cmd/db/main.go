package main

import (
	"database/sql"
	"fmt"
	"log"
	"math/rand"
	"net"
	"os"
	"time"

	"github.com/bxcodec/faker/v3"
	_ "github.com/mattn/go-sqlite3"
)

const dbFileName = "assets.db"

func init() {
	rand.Seed(time.Now().UnixNano())
}

func randomDomain() string {
	return faker.DomainName()
}

func randomWord() string {
	return faker.Word()
}

func randomComment() string {
	return faker.Sentence()
}

func randomIP() string {
	ip := make(net.IP, 4)
	rand.Read(ip)
	return ip.String()
}

func randomOwner() string {
	return faker.Name()
}

func main() {
	if _, err := os.Stat(dbFileName); err == nil {
		os.Remove(dbFileName)
	}

	db, err := sql.Open("sqlite3", dbFileName)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	createTableSQL := `CREATE TABLE assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        host TEXT NOT NULL,
        comment TEXT,
        ip TEXT NOT NULL,
        owner TEXT NOT NULL
    );`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		log.Fatal(err)
	}

	stmt, err := db.Prepare("INSERT INTO assets(host, comment, ip, owner) VALUES(?, ?, ?, ?)")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	for i := 0; i < 100000; i++ {
		host := randomDomain()
		word := randomWord()
		comment := randomComment()
		ip := randomIP()
		owner := randomOwner()
		_, err = stmt.Exec(fmt.Sprintf("%s.%s", word, host), comment, ip, owner)
		if err != nil {
			log.Fatal(err)
		}
	}

	log.Println("Database created and populated successfully")
}
